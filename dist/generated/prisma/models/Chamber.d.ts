import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Chamber
 *
 */
export type ChamberModel = runtime.Types.Result.DefaultSelection<Prisma.$ChamberPayload>;
export type AggregateChamber = {
    _count: ChamberCountAggregateOutputType | null;
    _avg: ChamberAvgAggregateOutputType | null;
    _sum: ChamberSumAggregateOutputType | null;
    _min: ChamberMinAggregateOutputType | null;
    _max: ChamberMaxAggregateOutputType | null;
};
export type ChamberAvgAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    newPatientFee: number | null;
    oldPatientFee: number | null;
};
export type ChamberSumAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    newPatientFee: number | null;
    oldPatientFee: number | null;
};
export type ChamberMinAggregateOutputType = {
    id: string | null;
    doctorId: string | null;
    hospitalId: string | null;
    chamberName: string | null;
    chamberName_en: string | null;
    addressLine: string | null;
    addressLine_en: string | null;
    thana: string | null;
    thana_en: string | null;
    district: string | null;
    district_en: string | null;
    division: string | null;
    division_en: string | null;
    latitude: number | null;
    longitude: number | null;
    newPatientFee: number | null;
    oldPatientFee: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChamberMaxAggregateOutputType = {
    id: string | null;
    doctorId: string | null;
    hospitalId: string | null;
    chamberName: string | null;
    chamberName_en: string | null;
    addressLine: string | null;
    addressLine_en: string | null;
    thana: string | null;
    thana_en: string | null;
    district: string | null;
    district_en: string | null;
    division: string | null;
    division_en: string | null;
    latitude: number | null;
    longitude: number | null;
    newPatientFee: number | null;
    oldPatientFee: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChamberCountAggregateOutputType = {
    id: number;
    doctorId: number;
    hospitalId: number;
    chamberName: number;
    chamberName_en: number;
    addressLine: number;
    addressLine_en: number;
    thana: number;
    thana_en: number;
    district: number;
    district_en: number;
    division: number;
    division_en: number;
    latitude: number;
    longitude: number;
    newPatientFee: number;
    oldPatientFee: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ChamberAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
    newPatientFee?: true;
    oldPatientFee?: true;
};
export type ChamberSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
    newPatientFee?: true;
    oldPatientFee?: true;
};
export type ChamberMinAggregateInputType = {
    id?: true;
    doctorId?: true;
    hospitalId?: true;
    chamberName?: true;
    chamberName_en?: true;
    addressLine?: true;
    addressLine_en?: true;
    thana?: true;
    thana_en?: true;
    district?: true;
    district_en?: true;
    division?: true;
    division_en?: true;
    latitude?: true;
    longitude?: true;
    newPatientFee?: true;
    oldPatientFee?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChamberMaxAggregateInputType = {
    id?: true;
    doctorId?: true;
    hospitalId?: true;
    chamberName?: true;
    chamberName_en?: true;
    addressLine?: true;
    addressLine_en?: true;
    thana?: true;
    thana_en?: true;
    district?: true;
    district_en?: true;
    division?: true;
    division_en?: true;
    latitude?: true;
    longitude?: true;
    newPatientFee?: true;
    oldPatientFee?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChamberCountAggregateInputType = {
    id?: true;
    doctorId?: true;
    hospitalId?: true;
    chamberName?: true;
    chamberName_en?: true;
    addressLine?: true;
    addressLine_en?: true;
    thana?: true;
    thana_en?: true;
    district?: true;
    district_en?: true;
    division?: true;
    division_en?: true;
    latitude?: true;
    longitude?: true;
    newPatientFee?: true;
    oldPatientFee?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ChamberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Chamber to aggregate.
     */
    where?: Prisma.ChamberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chambers to fetch.
     */
    orderBy?: Prisma.ChamberOrderByWithRelationInput | Prisma.ChamberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ChamberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chambers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chambers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Chambers
    **/
    _count?: true | ChamberCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ChamberAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ChamberSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ChamberMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ChamberMaxAggregateInputType;
};
export type GetChamberAggregateType<T extends ChamberAggregateArgs> = {
    [P in keyof T & keyof AggregateChamber]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChamber[P]> : Prisma.GetScalarType<T[P], AggregateChamber[P]>;
};
export type ChamberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChamberWhereInput;
    orderBy?: Prisma.ChamberOrderByWithAggregationInput | Prisma.ChamberOrderByWithAggregationInput[];
    by: Prisma.ChamberScalarFieldEnum[] | Prisma.ChamberScalarFieldEnum;
    having?: Prisma.ChamberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChamberCountAggregateInputType | true;
    _avg?: ChamberAvgAggregateInputType;
    _sum?: ChamberSumAggregateInputType;
    _min?: ChamberMinAggregateInputType;
    _max?: ChamberMaxAggregateInputType;
};
export type ChamberGroupByOutputType = {
    id: string;
    doctorId: string | null;
    hospitalId: string | null;
    chamberName: string | null;
    chamberName_en: string | null;
    addressLine: string | null;
    addressLine_en: string | null;
    thana: string | null;
    thana_en: string | null;
    district: string | null;
    district_en: string | null;
    division: string | null;
    division_en: string | null;
    latitude: number | null;
    longitude: number | null;
    newPatientFee: number;
    oldPatientFee: number;
    createdAt: Date;
    updatedAt: Date;
    _count: ChamberCountAggregateOutputType | null;
    _avg: ChamberAvgAggregateOutputType | null;
    _sum: ChamberSumAggregateOutputType | null;
    _min: ChamberMinAggregateOutputType | null;
    _max: ChamberMaxAggregateOutputType | null;
};
type GetChamberGroupByPayload<T extends ChamberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChamberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChamberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChamberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChamberGroupByOutputType[P]>;
}>>;
export type ChamberWhereInput = {
    AND?: Prisma.ChamberWhereInput | Prisma.ChamberWhereInput[];
    OR?: Prisma.ChamberWhereInput[];
    NOT?: Prisma.ChamberWhereInput | Prisma.ChamberWhereInput[];
    id?: Prisma.StringFilter<"Chamber"> | string;
    doctorId?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    chamberName_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    addressLine?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    addressLine_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    thana?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    thana_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    district?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    district_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    division?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    division_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"Chamber"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"Chamber"> | number | null;
    newPatientFee?: Prisma.FloatFilter<"Chamber"> | number;
    oldPatientFee?: Prisma.FloatFilter<"Chamber"> | number;
    createdAt?: Prisma.DateTimeFilter<"Chamber"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Chamber"> | Date | string;
    doctor?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
    hospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
    schedules?: Prisma.DoctorScheduleListRelationFilter;
};
export type ChamberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberName?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberName_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    district_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    division_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    newPatientFee?: Prisma.SortOrder;
    oldPatientFee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    doctor?: Prisma.DoctorOrderByWithRelationInput;
    hospital?: Prisma.HospitalOrderByWithRelationInput;
    schedules?: Prisma.DoctorScheduleOrderByRelationAggregateInput;
};
export type ChamberWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ChamberWhereInput | Prisma.ChamberWhereInput[];
    OR?: Prisma.ChamberWhereInput[];
    NOT?: Prisma.ChamberWhereInput | Prisma.ChamberWhereInput[];
    doctorId?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    chamberName_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    addressLine?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    addressLine_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    thana?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    thana_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    district?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    district_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    division?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    division_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"Chamber"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"Chamber"> | number | null;
    newPatientFee?: Prisma.FloatFilter<"Chamber"> | number;
    oldPatientFee?: Prisma.FloatFilter<"Chamber"> | number;
    createdAt?: Prisma.DateTimeFilter<"Chamber"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Chamber"> | Date | string;
    doctor?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
    hospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
    schedules?: Prisma.DoctorScheduleListRelationFilter;
}, "id">;
export type ChamberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberName?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberName_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    district_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    division_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    newPatientFee?: Prisma.SortOrder;
    oldPatientFee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ChamberCountOrderByAggregateInput;
    _avg?: Prisma.ChamberAvgOrderByAggregateInput;
    _max?: Prisma.ChamberMaxOrderByAggregateInput;
    _min?: Prisma.ChamberMinOrderByAggregateInput;
    _sum?: Prisma.ChamberSumOrderByAggregateInput;
};
export type ChamberScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChamberScalarWhereWithAggregatesInput | Prisma.ChamberScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChamberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChamberScalarWhereWithAggregatesInput | Prisma.ChamberScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Chamber"> | string;
    doctorId?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    hospitalId?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    chamberName?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    chamberName_en?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    addressLine?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    addressLine_en?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    thana?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    thana_en?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    district?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    district_en?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    division?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    division_en?: Prisma.StringNullableWithAggregatesFilter<"Chamber"> | string | null;
    latitude?: Prisma.FloatNullableWithAggregatesFilter<"Chamber"> | number | null;
    longitude?: Prisma.FloatNullableWithAggregatesFilter<"Chamber"> | number | null;
    newPatientFee?: Prisma.FloatWithAggregatesFilter<"Chamber"> | number;
    oldPatientFee?: Prisma.FloatWithAggregatesFilter<"Chamber"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Chamber"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Chamber"> | Date | string;
};
export type ChamberCreateInput = {
    id?: string;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    doctor?: Prisma.DoctorCreateNestedOneWithoutChambersInput;
    hospital?: Prisma.HospitalCreateNestedOneWithoutChambersInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutChamberInput;
};
export type ChamberUncheckedCreateInput = {
    id?: string;
    doctorId?: string | null;
    hospitalId?: string | null;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutChamberInput;
};
export type ChamberUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorUpdateOneWithoutChambersNestedInput;
    hospital?: Prisma.HospitalUpdateOneWithoutChambersNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutChamberNestedInput;
};
export type ChamberUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutChamberNestedInput;
};
export type ChamberCreateManyInput = {
    id?: string;
    doctorId?: string | null;
    hospitalId?: string | null;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChamberUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChamberUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChamberListRelationFilter = {
    every?: Prisma.ChamberWhereInput;
    some?: Prisma.ChamberWhereInput;
    none?: Prisma.ChamberWhereInput;
};
export type ChamberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ChamberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    chamberName?: Prisma.SortOrder;
    chamberName_en?: Prisma.SortOrder;
    addressLine?: Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    thana_en?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    district_en?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    division_en?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    newPatientFee?: Prisma.SortOrder;
    oldPatientFee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChamberAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    newPatientFee?: Prisma.SortOrder;
    oldPatientFee?: Prisma.SortOrder;
};
export type ChamberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    chamberName?: Prisma.SortOrder;
    chamberName_en?: Prisma.SortOrder;
    addressLine?: Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    thana_en?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    district_en?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    division_en?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    newPatientFee?: Prisma.SortOrder;
    oldPatientFee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChamberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    chamberName?: Prisma.SortOrder;
    chamberName_en?: Prisma.SortOrder;
    addressLine?: Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    thana_en?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    district_en?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    division_en?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    newPatientFee?: Prisma.SortOrder;
    oldPatientFee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChamberSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    newPatientFee?: Prisma.SortOrder;
    oldPatientFee?: Prisma.SortOrder;
};
export type ChamberNullableScalarRelationFilter = {
    is?: Prisma.ChamberWhereInput | null;
    isNot?: Prisma.ChamberWhereInput | null;
};
export type ChamberCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutDoctorInput, Prisma.ChamberUncheckedCreateWithoutDoctorInput> | Prisma.ChamberCreateWithoutDoctorInput[] | Prisma.ChamberUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutDoctorInput | Prisma.ChamberCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.ChamberCreateManyDoctorInputEnvelope;
    connect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
};
export type ChamberUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutDoctorInput, Prisma.ChamberUncheckedCreateWithoutDoctorInput> | Prisma.ChamberCreateWithoutDoctorInput[] | Prisma.ChamberUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutDoctorInput | Prisma.ChamberCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.ChamberCreateManyDoctorInputEnvelope;
    connect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
};
export type ChamberUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutDoctorInput, Prisma.ChamberUncheckedCreateWithoutDoctorInput> | Prisma.ChamberCreateWithoutDoctorInput[] | Prisma.ChamberUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutDoctorInput | Prisma.ChamberCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.ChamberUpsertWithWhereUniqueWithoutDoctorInput | Prisma.ChamberUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.ChamberCreateManyDoctorInputEnvelope;
    set?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    disconnect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    delete?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    connect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    update?: Prisma.ChamberUpdateWithWhereUniqueWithoutDoctorInput | Prisma.ChamberUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.ChamberUpdateManyWithWhereWithoutDoctorInput | Prisma.ChamberUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.ChamberScalarWhereInput | Prisma.ChamberScalarWhereInput[];
};
export type ChamberUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutDoctorInput, Prisma.ChamberUncheckedCreateWithoutDoctorInput> | Prisma.ChamberCreateWithoutDoctorInput[] | Prisma.ChamberUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutDoctorInput | Prisma.ChamberCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.ChamberUpsertWithWhereUniqueWithoutDoctorInput | Prisma.ChamberUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.ChamberCreateManyDoctorInputEnvelope;
    set?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    disconnect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    delete?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    connect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    update?: Prisma.ChamberUpdateWithWhereUniqueWithoutDoctorInput | Prisma.ChamberUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.ChamberUpdateManyWithWhereWithoutDoctorInput | Prisma.ChamberUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.ChamberScalarWhereInput | Prisma.ChamberScalarWhereInput[];
};
export type ChamberCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutHospitalInput, Prisma.ChamberUncheckedCreateWithoutHospitalInput> | Prisma.ChamberCreateWithoutHospitalInput[] | Prisma.ChamberUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutHospitalInput | Prisma.ChamberCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.ChamberCreateManyHospitalInputEnvelope;
    connect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
};
export type ChamberUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutHospitalInput, Prisma.ChamberUncheckedCreateWithoutHospitalInput> | Prisma.ChamberCreateWithoutHospitalInput[] | Prisma.ChamberUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutHospitalInput | Prisma.ChamberCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.ChamberCreateManyHospitalInputEnvelope;
    connect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
};
export type ChamberUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutHospitalInput, Prisma.ChamberUncheckedCreateWithoutHospitalInput> | Prisma.ChamberCreateWithoutHospitalInput[] | Prisma.ChamberUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutHospitalInput | Prisma.ChamberCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.ChamberUpsertWithWhereUniqueWithoutHospitalInput | Prisma.ChamberUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.ChamberCreateManyHospitalInputEnvelope;
    set?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    disconnect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    delete?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    connect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    update?: Prisma.ChamberUpdateWithWhereUniqueWithoutHospitalInput | Prisma.ChamberUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.ChamberUpdateManyWithWhereWithoutHospitalInput | Prisma.ChamberUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.ChamberScalarWhereInput | Prisma.ChamberScalarWhereInput[];
};
export type ChamberUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutHospitalInput, Prisma.ChamberUncheckedCreateWithoutHospitalInput> | Prisma.ChamberCreateWithoutHospitalInput[] | Prisma.ChamberUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutHospitalInput | Prisma.ChamberCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.ChamberUpsertWithWhereUniqueWithoutHospitalInput | Prisma.ChamberUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.ChamberCreateManyHospitalInputEnvelope;
    set?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    disconnect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    delete?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    connect?: Prisma.ChamberWhereUniqueInput | Prisma.ChamberWhereUniqueInput[];
    update?: Prisma.ChamberUpdateWithWhereUniqueWithoutHospitalInput | Prisma.ChamberUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.ChamberUpdateManyWithWhereWithoutHospitalInput | Prisma.ChamberUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.ChamberScalarWhereInput | Prisma.ChamberScalarWhereInput[];
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ChamberCreateNestedOneWithoutSchedulesInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutSchedulesInput, Prisma.ChamberUncheckedCreateWithoutSchedulesInput>;
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutSchedulesInput;
    connect?: Prisma.ChamberWhereUniqueInput;
};
export type ChamberUpdateOneWithoutSchedulesNestedInput = {
    create?: Prisma.XOR<Prisma.ChamberCreateWithoutSchedulesInput, Prisma.ChamberUncheckedCreateWithoutSchedulesInput>;
    connectOrCreate?: Prisma.ChamberCreateOrConnectWithoutSchedulesInput;
    upsert?: Prisma.ChamberUpsertWithoutSchedulesInput;
    disconnect?: Prisma.ChamberWhereInput | boolean;
    delete?: Prisma.ChamberWhereInput | boolean;
    connect?: Prisma.ChamberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ChamberUpdateToOneWithWhereWithoutSchedulesInput, Prisma.ChamberUpdateWithoutSchedulesInput>, Prisma.ChamberUncheckedUpdateWithoutSchedulesInput>;
};
export type ChamberCreateWithoutDoctorInput = {
    id?: string;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    hospital?: Prisma.HospitalCreateNestedOneWithoutChambersInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutChamberInput;
};
export type ChamberUncheckedCreateWithoutDoctorInput = {
    id?: string;
    hospitalId?: string | null;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutChamberInput;
};
export type ChamberCreateOrConnectWithoutDoctorInput = {
    where: Prisma.ChamberWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChamberCreateWithoutDoctorInput, Prisma.ChamberUncheckedCreateWithoutDoctorInput>;
};
export type ChamberCreateManyDoctorInputEnvelope = {
    data: Prisma.ChamberCreateManyDoctorInput | Prisma.ChamberCreateManyDoctorInput[];
    skipDuplicates?: boolean;
};
export type ChamberUpsertWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.ChamberWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChamberUpdateWithoutDoctorInput, Prisma.ChamberUncheckedUpdateWithoutDoctorInput>;
    create: Prisma.XOR<Prisma.ChamberCreateWithoutDoctorInput, Prisma.ChamberUncheckedCreateWithoutDoctorInput>;
};
export type ChamberUpdateWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.ChamberWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChamberUpdateWithoutDoctorInput, Prisma.ChamberUncheckedUpdateWithoutDoctorInput>;
};
export type ChamberUpdateManyWithWhereWithoutDoctorInput = {
    where: Prisma.ChamberScalarWhereInput;
    data: Prisma.XOR<Prisma.ChamberUpdateManyMutationInput, Prisma.ChamberUncheckedUpdateManyWithoutDoctorInput>;
};
export type ChamberScalarWhereInput = {
    AND?: Prisma.ChamberScalarWhereInput | Prisma.ChamberScalarWhereInput[];
    OR?: Prisma.ChamberScalarWhereInput[];
    NOT?: Prisma.ChamberScalarWhereInput | Prisma.ChamberScalarWhereInput[];
    id?: Prisma.StringFilter<"Chamber"> | string;
    doctorId?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    chamberName_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    addressLine?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    addressLine_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    thana?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    thana_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    district?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    district_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    division?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    division_en?: Prisma.StringNullableFilter<"Chamber"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"Chamber"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"Chamber"> | number | null;
    newPatientFee?: Prisma.FloatFilter<"Chamber"> | number;
    oldPatientFee?: Prisma.FloatFilter<"Chamber"> | number;
    createdAt?: Prisma.DateTimeFilter<"Chamber"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Chamber"> | Date | string;
};
export type ChamberCreateWithoutHospitalInput = {
    id?: string;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    doctor?: Prisma.DoctorCreateNestedOneWithoutChambersInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutChamberInput;
};
export type ChamberUncheckedCreateWithoutHospitalInput = {
    id?: string;
    doctorId?: string | null;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutChamberInput;
};
export type ChamberCreateOrConnectWithoutHospitalInput = {
    where: Prisma.ChamberWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChamberCreateWithoutHospitalInput, Prisma.ChamberUncheckedCreateWithoutHospitalInput>;
};
export type ChamberCreateManyHospitalInputEnvelope = {
    data: Prisma.ChamberCreateManyHospitalInput | Prisma.ChamberCreateManyHospitalInput[];
    skipDuplicates?: boolean;
};
export type ChamberUpsertWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.ChamberWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChamberUpdateWithoutHospitalInput, Prisma.ChamberUncheckedUpdateWithoutHospitalInput>;
    create: Prisma.XOR<Prisma.ChamberCreateWithoutHospitalInput, Prisma.ChamberUncheckedCreateWithoutHospitalInput>;
};
export type ChamberUpdateWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.ChamberWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChamberUpdateWithoutHospitalInput, Prisma.ChamberUncheckedUpdateWithoutHospitalInput>;
};
export type ChamberUpdateManyWithWhereWithoutHospitalInput = {
    where: Prisma.ChamberScalarWhereInput;
    data: Prisma.XOR<Prisma.ChamberUpdateManyMutationInput, Prisma.ChamberUncheckedUpdateManyWithoutHospitalInput>;
};
export type ChamberCreateWithoutSchedulesInput = {
    id?: string;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    doctor?: Prisma.DoctorCreateNestedOneWithoutChambersInput;
    hospital?: Prisma.HospitalCreateNestedOneWithoutChambersInput;
};
export type ChamberUncheckedCreateWithoutSchedulesInput = {
    id?: string;
    doctorId?: string | null;
    hospitalId?: string | null;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChamberCreateOrConnectWithoutSchedulesInput = {
    where: Prisma.ChamberWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChamberCreateWithoutSchedulesInput, Prisma.ChamberUncheckedCreateWithoutSchedulesInput>;
};
export type ChamberUpsertWithoutSchedulesInput = {
    update: Prisma.XOR<Prisma.ChamberUpdateWithoutSchedulesInput, Prisma.ChamberUncheckedUpdateWithoutSchedulesInput>;
    create: Prisma.XOR<Prisma.ChamberCreateWithoutSchedulesInput, Prisma.ChamberUncheckedCreateWithoutSchedulesInput>;
    where?: Prisma.ChamberWhereInput;
};
export type ChamberUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: Prisma.ChamberWhereInput;
    data: Prisma.XOR<Prisma.ChamberUpdateWithoutSchedulesInput, Prisma.ChamberUncheckedUpdateWithoutSchedulesInput>;
};
export type ChamberUpdateWithoutSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorUpdateOneWithoutChambersNestedInput;
    hospital?: Prisma.HospitalUpdateOneWithoutChambersNestedInput;
};
export type ChamberUncheckedUpdateWithoutSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChamberCreateManyDoctorInput = {
    id?: string;
    hospitalId?: string | null;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChamberUpdateWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hospital?: Prisma.HospitalUpdateOneWithoutChambersNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutChamberNestedInput;
};
export type ChamberUncheckedUpdateWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutChamberNestedInput;
};
export type ChamberUncheckedUpdateManyWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChamberCreateManyHospitalInput = {
    id?: string;
    doctorId?: string | null;
    chamberName?: string | null;
    chamberName_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    thana?: string | null;
    thana_en?: string | null;
    district?: string | null;
    district_en?: string | null;
    division?: string | null;
    division_en?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    newPatientFee?: number;
    oldPatientFee?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChamberUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorUpdateOneWithoutChambersNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutChamberNestedInput;
};
export type ChamberUncheckedUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutChamberNestedInput;
};
export type ChamberUncheckedUpdateManyWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    newPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    oldPatientFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type ChamberCountOutputType
 */
export type ChamberCountOutputType = {
    schedules: number;
};
export type ChamberCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    schedules?: boolean | ChamberCountOutputTypeCountSchedulesArgs;
};
/**
 * ChamberCountOutputType without action
 */
export type ChamberCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChamberCountOutputType
     */
    select?: Prisma.ChamberCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ChamberCountOutputType without action
 */
export type ChamberCountOutputTypeCountSchedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DoctorScheduleWhereInput;
};
export type ChamberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    hospitalId?: boolean;
    chamberName?: boolean;
    chamberName_en?: boolean;
    addressLine?: boolean;
    addressLine_en?: boolean;
    thana?: boolean;
    thana_en?: boolean;
    district?: boolean;
    district_en?: boolean;
    division?: boolean;
    division_en?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    newPatientFee?: boolean;
    oldPatientFee?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.Chamber$doctorArgs<ExtArgs>;
    hospital?: boolean | Prisma.Chamber$hospitalArgs<ExtArgs>;
    schedules?: boolean | Prisma.Chamber$schedulesArgs<ExtArgs>;
    _count?: boolean | Prisma.ChamberCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chamber"]>;
export type ChamberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    hospitalId?: boolean;
    chamberName?: boolean;
    chamberName_en?: boolean;
    addressLine?: boolean;
    addressLine_en?: boolean;
    thana?: boolean;
    thana_en?: boolean;
    district?: boolean;
    district_en?: boolean;
    division?: boolean;
    division_en?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    newPatientFee?: boolean;
    oldPatientFee?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.Chamber$doctorArgs<ExtArgs>;
    hospital?: boolean | Prisma.Chamber$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["chamber"]>;
export type ChamberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    hospitalId?: boolean;
    chamberName?: boolean;
    chamberName_en?: boolean;
    addressLine?: boolean;
    addressLine_en?: boolean;
    thana?: boolean;
    thana_en?: boolean;
    district?: boolean;
    district_en?: boolean;
    division?: boolean;
    division_en?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    newPatientFee?: boolean;
    oldPatientFee?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.Chamber$doctorArgs<ExtArgs>;
    hospital?: boolean | Prisma.Chamber$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["chamber"]>;
export type ChamberSelectScalar = {
    id?: boolean;
    doctorId?: boolean;
    hospitalId?: boolean;
    chamberName?: boolean;
    chamberName_en?: boolean;
    addressLine?: boolean;
    addressLine_en?: boolean;
    thana?: boolean;
    thana_en?: boolean;
    district?: boolean;
    district_en?: boolean;
    division?: boolean;
    division_en?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    newPatientFee?: boolean;
    oldPatientFee?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ChamberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "doctorId" | "hospitalId" | "chamberName" | "chamberName_en" | "addressLine" | "addressLine_en" | "thana" | "thana_en" | "district" | "district_en" | "division" | "division_en" | "latitude" | "longitude" | "newPatientFee" | "oldPatientFee" | "createdAt" | "updatedAt", ExtArgs["result"]["chamber"]>;
export type ChamberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.Chamber$doctorArgs<ExtArgs>;
    hospital?: boolean | Prisma.Chamber$hospitalArgs<ExtArgs>;
    schedules?: boolean | Prisma.Chamber$schedulesArgs<ExtArgs>;
    _count?: boolean | Prisma.ChamberCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ChamberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.Chamber$doctorArgs<ExtArgs>;
    hospital?: boolean | Prisma.Chamber$hospitalArgs<ExtArgs>;
};
export type ChamberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.Chamber$doctorArgs<ExtArgs>;
    hospital?: boolean | Prisma.Chamber$hospitalArgs<ExtArgs>;
};
export type $ChamberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Chamber";
    objects: {
        doctor: Prisma.$DoctorPayload<ExtArgs> | null;
        hospital: Prisma.$HospitalPayload<ExtArgs> | null;
        schedules: Prisma.$DoctorSchedulePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        doctorId: string | null;
        hospitalId: string | null;
        chamberName: string | null;
        chamberName_en: string | null;
        addressLine: string | null;
        addressLine_en: string | null;
        thana: string | null;
        thana_en: string | null;
        district: string | null;
        district_en: string | null;
        division: string | null;
        division_en: string | null;
        latitude: number | null;
        longitude: number | null;
        newPatientFee: number;
        oldPatientFee: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["chamber"]>;
    composites: {};
};
export type ChamberGetPayload<S extends boolean | null | undefined | ChamberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChamberPayload, S>;
export type ChamberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChamberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChamberCountAggregateInputType | true;
};
export interface ChamberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Chamber'];
        meta: {
            name: 'Chamber';
        };
    };
    /**
     * Find zero or one Chamber that matches the filter.
     * @param {ChamberFindUniqueArgs} args - Arguments to find a Chamber
     * @example
     * // Get one Chamber
     * const chamber = await prisma.chamber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChamberFindUniqueArgs>(args: Prisma.SelectSubset<T, ChamberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChamberClient<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Chamber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChamberFindUniqueOrThrowArgs} args - Arguments to find a Chamber
     * @example
     * // Get one Chamber
     * const chamber = await prisma.chamber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChamberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChamberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChamberClient<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Chamber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamberFindFirstArgs} args - Arguments to find a Chamber
     * @example
     * // Get one Chamber
     * const chamber = await prisma.chamber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChamberFindFirstArgs>(args?: Prisma.SelectSubset<T, ChamberFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChamberClient<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Chamber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamberFindFirstOrThrowArgs} args - Arguments to find a Chamber
     * @example
     * // Get one Chamber
     * const chamber = await prisma.chamber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChamberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChamberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChamberClient<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Chambers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chambers
     * const chambers = await prisma.chamber.findMany()
     *
     * // Get first 10 Chambers
     * const chambers = await prisma.chamber.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const chamberWithIdOnly = await prisma.chamber.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ChamberFindManyArgs>(args?: Prisma.SelectSubset<T, ChamberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Chamber.
     * @param {ChamberCreateArgs} args - Arguments to create a Chamber.
     * @example
     * // Create one Chamber
     * const Chamber = await prisma.chamber.create({
     *   data: {
     *     // ... data to create a Chamber
     *   }
     * })
     *
     */
    create<T extends ChamberCreateArgs>(args: Prisma.SelectSubset<T, ChamberCreateArgs<ExtArgs>>): Prisma.Prisma__ChamberClient<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Chambers.
     * @param {ChamberCreateManyArgs} args - Arguments to create many Chambers.
     * @example
     * // Create many Chambers
     * const chamber = await prisma.chamber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ChamberCreateManyArgs>(args?: Prisma.SelectSubset<T, ChamberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Chambers and returns the data saved in the database.
     * @param {ChamberCreateManyAndReturnArgs} args - Arguments to create many Chambers.
     * @example
     * // Create many Chambers
     * const chamber = await prisma.chamber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Chambers and only return the `id`
     * const chamberWithIdOnly = await prisma.chamber.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ChamberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ChamberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Chamber.
     * @param {ChamberDeleteArgs} args - Arguments to delete one Chamber.
     * @example
     * // Delete one Chamber
     * const Chamber = await prisma.chamber.delete({
     *   where: {
     *     // ... filter to delete one Chamber
     *   }
     * })
     *
     */
    delete<T extends ChamberDeleteArgs>(args: Prisma.SelectSubset<T, ChamberDeleteArgs<ExtArgs>>): Prisma.Prisma__ChamberClient<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Chamber.
     * @param {ChamberUpdateArgs} args - Arguments to update one Chamber.
     * @example
     * // Update one Chamber
     * const chamber = await prisma.chamber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ChamberUpdateArgs>(args: Prisma.SelectSubset<T, ChamberUpdateArgs<ExtArgs>>): Prisma.Prisma__ChamberClient<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Chambers.
     * @param {ChamberDeleteManyArgs} args - Arguments to filter Chambers to delete.
     * @example
     * // Delete a few Chambers
     * const { count } = await prisma.chamber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ChamberDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChamberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Chambers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chambers
     * const chamber = await prisma.chamber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ChamberUpdateManyArgs>(args: Prisma.SelectSubset<T, ChamberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Chambers and returns the data updated in the database.
     * @param {ChamberUpdateManyAndReturnArgs} args - Arguments to update many Chambers.
     * @example
     * // Update many Chambers
     * const chamber = await prisma.chamber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Chambers and only return the `id`
     * const chamberWithIdOnly = await prisma.chamber.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ChamberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ChamberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Chamber.
     * @param {ChamberUpsertArgs} args - Arguments to update or create a Chamber.
     * @example
     * // Update or create a Chamber
     * const chamber = await prisma.chamber.upsert({
     *   create: {
     *     // ... data to create a Chamber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chamber we want to update
     *   }
     * })
     */
    upsert<T extends ChamberUpsertArgs>(args: Prisma.SelectSubset<T, ChamberUpsertArgs<ExtArgs>>): Prisma.Prisma__ChamberClient<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Chambers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamberCountArgs} args - Arguments to filter Chambers to count.
     * @example
     * // Count the number of Chambers
     * const count = await prisma.chamber.count({
     *   where: {
     *     // ... the filter for the Chambers we want to count
     *   }
     * })
    **/
    count<T extends ChamberCountArgs>(args?: Prisma.Subset<T, ChamberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChamberCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Chamber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChamberAggregateArgs>(args: Prisma.Subset<T, ChamberAggregateArgs>): Prisma.PrismaPromise<GetChamberAggregateType<T>>;
    /**
     * Group by Chamber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChamberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends ChamberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChamberGroupByArgs['orderBy'];
    } : {
        orderBy?: ChamberGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChamberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChamberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Chamber model
     */
    readonly fields: ChamberFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Chamber.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ChamberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    doctor<T extends Prisma.Chamber$doctorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Chamber$doctorArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    hospital<T extends Prisma.Chamber$hospitalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Chamber$hospitalArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    schedules<T extends Prisma.Chamber$schedulesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Chamber$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Chamber model
 */
export interface ChamberFieldRefs {
    readonly id: Prisma.FieldRef<"Chamber", 'String'>;
    readonly doctorId: Prisma.FieldRef<"Chamber", 'String'>;
    readonly hospitalId: Prisma.FieldRef<"Chamber", 'String'>;
    readonly chamberName: Prisma.FieldRef<"Chamber", 'String'>;
    readonly chamberName_en: Prisma.FieldRef<"Chamber", 'String'>;
    readonly addressLine: Prisma.FieldRef<"Chamber", 'String'>;
    readonly addressLine_en: Prisma.FieldRef<"Chamber", 'String'>;
    readonly thana: Prisma.FieldRef<"Chamber", 'String'>;
    readonly thana_en: Prisma.FieldRef<"Chamber", 'String'>;
    readonly district: Prisma.FieldRef<"Chamber", 'String'>;
    readonly district_en: Prisma.FieldRef<"Chamber", 'String'>;
    readonly division: Prisma.FieldRef<"Chamber", 'String'>;
    readonly division_en: Prisma.FieldRef<"Chamber", 'String'>;
    readonly latitude: Prisma.FieldRef<"Chamber", 'Float'>;
    readonly longitude: Prisma.FieldRef<"Chamber", 'Float'>;
    readonly newPatientFee: Prisma.FieldRef<"Chamber", 'Float'>;
    readonly oldPatientFee: Prisma.FieldRef<"Chamber", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"Chamber", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Chamber", 'DateTime'>;
}
/**
 * Chamber findUnique
 */
export type ChamberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
    /**
     * Filter, which Chamber to fetch.
     */
    where: Prisma.ChamberWhereUniqueInput;
};
/**
 * Chamber findUniqueOrThrow
 */
export type ChamberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
    /**
     * Filter, which Chamber to fetch.
     */
    where: Prisma.ChamberWhereUniqueInput;
};
/**
 * Chamber findFirst
 */
export type ChamberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
    /**
     * Filter, which Chamber to fetch.
     */
    where?: Prisma.ChamberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chambers to fetch.
     */
    orderBy?: Prisma.ChamberOrderByWithRelationInput | Prisma.ChamberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Chambers.
     */
    cursor?: Prisma.ChamberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chambers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chambers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Chambers.
     */
    distinct?: Prisma.ChamberScalarFieldEnum | Prisma.ChamberScalarFieldEnum[];
};
/**
 * Chamber findFirstOrThrow
 */
export type ChamberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
    /**
     * Filter, which Chamber to fetch.
     */
    where?: Prisma.ChamberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chambers to fetch.
     */
    orderBy?: Prisma.ChamberOrderByWithRelationInput | Prisma.ChamberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Chambers.
     */
    cursor?: Prisma.ChamberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chambers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chambers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Chambers.
     */
    distinct?: Prisma.ChamberScalarFieldEnum | Prisma.ChamberScalarFieldEnum[];
};
/**
 * Chamber findMany
 */
export type ChamberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
    /**
     * Filter, which Chambers to fetch.
     */
    where?: Prisma.ChamberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chambers to fetch.
     */
    orderBy?: Prisma.ChamberOrderByWithRelationInput | Prisma.ChamberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Chambers.
     */
    cursor?: Prisma.ChamberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chambers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chambers.
     */
    skip?: number;
    distinct?: Prisma.ChamberScalarFieldEnum | Prisma.ChamberScalarFieldEnum[];
};
/**
 * Chamber create
 */
export type ChamberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
    /**
     * The data needed to create a Chamber.
     */
    data: Prisma.XOR<Prisma.ChamberCreateInput, Prisma.ChamberUncheckedCreateInput>;
};
/**
 * Chamber createMany
 */
export type ChamberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chambers.
     */
    data: Prisma.ChamberCreateManyInput | Prisma.ChamberCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Chamber createManyAndReturn
 */
export type ChamberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * The data used to create many Chambers.
     */
    data: Prisma.ChamberCreateManyInput | Prisma.ChamberCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Chamber update
 */
export type ChamberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
    /**
     * The data needed to update a Chamber.
     */
    data: Prisma.XOR<Prisma.ChamberUpdateInput, Prisma.ChamberUncheckedUpdateInput>;
    /**
     * Choose, which Chamber to update.
     */
    where: Prisma.ChamberWhereUniqueInput;
};
/**
 * Chamber updateMany
 */
export type ChamberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Chambers.
     */
    data: Prisma.XOR<Prisma.ChamberUpdateManyMutationInput, Prisma.ChamberUncheckedUpdateManyInput>;
    /**
     * Filter which Chambers to update
     */
    where?: Prisma.ChamberWhereInput;
    /**
     * Limit how many Chambers to update.
     */
    limit?: number;
};
/**
 * Chamber updateManyAndReturn
 */
export type ChamberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * The data used to update Chambers.
     */
    data: Prisma.XOR<Prisma.ChamberUpdateManyMutationInput, Prisma.ChamberUncheckedUpdateManyInput>;
    /**
     * Filter which Chambers to update
     */
    where?: Prisma.ChamberWhereInput;
    /**
     * Limit how many Chambers to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Chamber upsert
 */
export type ChamberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
    /**
     * The filter to search for the Chamber to update in case it exists.
     */
    where: Prisma.ChamberWhereUniqueInput;
    /**
     * In case the Chamber found by the `where` argument doesn't exist, create a new Chamber with this data.
     */
    create: Prisma.XOR<Prisma.ChamberCreateInput, Prisma.ChamberUncheckedCreateInput>;
    /**
     * In case the Chamber was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ChamberUpdateInput, Prisma.ChamberUncheckedUpdateInput>;
};
/**
 * Chamber delete
 */
export type ChamberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
    /**
     * Filter which Chamber to delete.
     */
    where: Prisma.ChamberWhereUniqueInput;
};
/**
 * Chamber deleteMany
 */
export type ChamberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Chambers to delete
     */
    where?: Prisma.ChamberWhereInput;
    /**
     * Limit how many Chambers to delete.
     */
    limit?: number;
};
/**
 * Chamber.doctor
 */
export type Chamber$doctorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: Prisma.DoctorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Doctor
     */
    omit?: Prisma.DoctorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInclude<ExtArgs> | null;
    where?: Prisma.DoctorWhereInput;
};
/**
 * Chamber.hospital
 */
export type Chamber$hospitalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: Prisma.HospitalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Hospital
     */
    omit?: Prisma.HospitalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalInclude<ExtArgs> | null;
    where?: Prisma.HospitalWhereInput;
};
/**
 * Chamber.schedules
 */
export type Chamber$schedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: Prisma.DoctorScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: Prisma.DoctorScheduleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorScheduleInclude<ExtArgs> | null;
    where?: Prisma.DoctorScheduleWhereInput;
    orderBy?: Prisma.DoctorScheduleOrderByWithRelationInput | Prisma.DoctorScheduleOrderByWithRelationInput[];
    cursor?: Prisma.DoctorScheduleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DoctorScheduleScalarFieldEnum | Prisma.DoctorScheduleScalarFieldEnum[];
};
/**
 * Chamber without action
 */
export type ChamberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chamber
     */
    select?: Prisma.ChamberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chamber
     */
    omit?: Prisma.ChamberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChamberInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Chamber.d.ts.map