export interface IncomeRow {
    id: string;
    name: string;
    sub: string | null;
    total: number;
    count: number;
    onlineTotal: number;
    onlineCount: number;
    offlineTotal: number;
    offlineCount: number;
}
export interface IncomeDayPoint {
    date: string;
    total: number;
    count: number;
}
export declare function getIncomeOverview(opts: {
    scope?: unknown;
    period?: unknown;
    anchor?: unknown;
    search?: unknown;
    take?: unknown;
}): Promise<{
    scope: string;
    period: string;
    label: string;
    from: string;
    to: string;
    total: number;
    count: number;
    rows: IncomeRow[];
    days: IncomeDayPoint[] | null;
}>;
//# sourceMappingURL=incomeOverviewService.d.ts.map