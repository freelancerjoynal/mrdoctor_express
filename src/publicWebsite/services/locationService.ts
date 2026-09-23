// Location catalog derived from chambers (single source of truth).
// Division > District > Thana, each level with chambers/doctors/hospitals counts.
// Counts only include APPROVED doctors/hospitals so frontend never routes to empty pages.
// Single-query + in-memory aggregation: easy to maintain, no N+1.
import { prisma } from '../../lib/prisma.js';

export interface LocationCounts {
  chambers: number;
  doctors: number;
  hospitals: number;
}

export interface ThanaNode extends LocationCounts {
  thana: string;
}

export interface DistrictNode extends LocationCounts {
  district: string;
  thanas: ThanaNode[];
}

export interface DivisionNode extends LocationCounts {
  division: string;
  districts: DistrictNode[];
}

interface ChamberRow {
  division: string;
  district: string;
  thana: string;
  doctorId: string | null;
  hospitalId: string | null;
  doctor: { status: string } | null;
  hospital: { status: string } | null;
}

async function loadApprovedChamberRows(): Promise<ChamberRow[]> {
  const rows = await prisma.chamber.findMany({
    select: {
      division: true,
      district: true,
      thana: true,
      doctorId: true,
      hospitalId: true,
      doctor: { select: { status: true } },
      hospital: { select: { status: true } },
    },
  });
  // Keep chambers attached to approved (or standalone) owners only.
  return rows.filter(
    (r) =>
      (!r.doctorId || r.doctor?.status === 'APPROVED') &&
      (!r.hospitalId || r.hospital?.status === 'APPROVED'),
  ) as ChamberRow[];
}

type InternalCounts = LocationCounts & { _doctors: Set<string>; _hospitals: Set<string> };

type InternalThanaNode = ThanaNode & { _doctors: Set<string>; _hospitals: Set<string> };

type InternalDistrictNode = Omit<DistrictNode, 'thanas'> & {
  thanas: InternalThanaNode[];
  _doctors: Set<string>;
  _hospitals: Set<string>;
};

type InternalDivisionNode = Omit<DivisionNode, 'districts'> & {
  districts: InternalDistrictNode[];
  _doctors: Set<string>;
  _hospitals: Set<string>;
};

function blankCounts(): InternalCounts {
  return { chambers: 0, doctors: 0, hospitals: 0, _doctors: new Set(), _hospitals: new Set() };
}

function bump(
  acc: { chambers: number; doctors: number; hospitals: number; _doctors: Set<string>; _hospitals: Set<string> },
  row: ChamberRow,
) {
  acc.chambers += 1;
  if (row.doctorId) acc._doctors.add(row.doctorId);
  if (row.hospitalId) acc._hospitals.add(row.hospitalId);
  acc.doctors = acc._doctors.size;
  acc.hospitals = acc._hospitals.size;
}

function strip<T extends { _doctors: Set<string>; _hospitals: Set<string> }>(node: T): Omit<T, '_doctors' | '_hospitals'> {
  const { _doctors, _hospitals, ...rest } = node;
  return rest;
}

export async function getLocationTree(): Promise<DivisionNode[]> {
  const rows = await loadApprovedChamberRows();
  const divisions = new Map<string, InternalDivisionNode>();

  for (const row of rows) {
    let div = divisions.get(row.division);
    if (!div) {
      div = { division: row.division, chambers: 0, doctors: 0, hospitals: 0, districts: [], _doctors: new Set(), _hospitals: new Set() };
      divisions.set(row.division, div);
    }
    bump(div, row);

    let dist: InternalDistrictNode | undefined = div.districts.find((d) => d.district === row.district);
    if (!dist) {
      const fresh = blankCounts();
      const newDist: InternalDistrictNode = { district: row.district, chambers: 0, doctors: 0, hospitals: 0, thanas: [], _doctors: fresh._doctors, _hospitals: fresh._hospitals };
      div.districts.push(newDist);
      dist = newDist;
    }
    bump(dist, row);

    let thana: InternalThanaNode | undefined = dist.thanas.find((t) => t.thana === row.thana);
    if (!thana) {
      const fresh = blankCounts();
      const newThana: InternalThanaNode = { thana: row.thana, chambers: 0, doctors: 0, hospitals: 0, _doctors: fresh._doctors, _hospitals: fresh._hospitals };
      dist.thanas.push(newThana);
      thana = newThana;
    }
    bump(thana, row);
  }

  return [...divisions.values()]
    .sort((a, b) => a.division.localeCompare(b.division))
    .map((div) => ({
      ...strip(div),
      districts: div.districts
        .sort((a, b) => a.district.localeCompare(b.district))
        .map((dist) => ({
          ...strip(dist),
          thanas: dist.thanas.sort((a, b) => a.thana.localeCompare(b.thana)).map((t) => strip(t)),
        })),
    })) as DivisionNode[];
}

export async function listDivisions() {
  const tree = await getLocationTree();
  return tree.map(({ districts, ...rest }) => rest);
}

export async function listDistricts(division?: string) {
  const tree = await getLocationTree();
  const out: (Omit<DistrictNode, 'thanas'> & { division: string })[] = [];
  for (const div of tree) {
    if (division && div.division.toLowerCase() !== division.toLowerCase()) continue;
    for (const dist of div.districts) {
      const { thanas, ...rest } = dist;
      out.push({ ...rest, division: div.division });
    }
  }
  return out;
}

export async function listThanas(division?: string, district?: string) {
  const tree = await getLocationTree();
  const out: (ThanaNode & { division: string; district: string })[] = [];
  for (const div of tree) {
    if (division && div.division.toLowerCase() !== division.toLowerCase()) continue;
    for (const dist of div.districts) {
      if (district && dist.district.toLowerCase() !== district.toLowerCase()) continue;
      for (const thana of dist.thanas) {
        out.push({ ...thana, division: div.division, district: dist.district });
      }
    }
  }
  return out;
}
