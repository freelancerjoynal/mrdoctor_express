import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model CancelledAppointmentLocal
 *
 */
export type CancelledAppointmentLocalModel = runtime.Types.Result.DefaultSelection<Prisma.$CancelledAppointmentLocalPayload>;
export type AggregateCancelledAppointmentLocal = {
    _count: CancelledAppointmentLocalCountAggregateOutputType | null;
    _avg: CancelledAppointmentLocalAvgAggregateOutputType | null;
    _sum: CancelledAppointmentLocalSumAggregateOutputType | null;
    _min: CancelledAppointmentLocalMinAggregateOutputType | null;
    _max: CancelledAppointmentLocalMaxAggregateOutputType | null;
};
export type CancelledAppointmentLocalAvgAggregateOutputType = {
    serial: number | null;
    amount: number | null;
};
export type CancelledAppointmentLocalSumAggregateOutputType = {
    serial: number | null;
    amount: number | null;
};
export type CancelledAppointmentLocalMinAggregateOutputType = {
    id: string | null;
    appointmentId: string | null;
    doctorId: string | null;
    doctorName: string | null;
    patientName: string | null;
    contactPhone: string | null;
    patientType: string | null;
    appointmentDate: Date | null;
    serial: number | null;
    amount: number | null;
    reason: string | null;
    requestedBy: string | null;
    createdAt: Date | null;
};
export type CancelledAppointmentLocalMaxAggregateOutputType = {
    id: string | null;
    appointmentId: string | null;
    doctorId: string | null;
    doctorName: string | null;
    patientName: string | null;
    contactPhone: string | null;
    patientType: string | null;
    appointmentDate: Date | null;
    serial: number | null;
    amount: number | null;
    reason: string | null;
    requestedBy: string | null;
    createdAt: Date | null;
};
export type CancelledAppointmentLocalCountAggregateOutputType = {
    id: number;
    appointmentId: number;
    doctorId: number;
    doctorName: number;
    patientName: number;
    contactPhone: number;
    patientType: number;
    appointmentDate: number;
    serial: number;
    amount: number;
    reason: number;
    requestedBy: number;
    createdAt: number;
    _all: number;
};
export type CancelledAppointmentLocalAvgAggregateInputType = {
    serial?: true;
    amount?: true;
};
export type CancelledAppointmentLocalSumAggregateInputType = {
    serial?: true;
    amount?: true;
};
export type CancelledAppointmentLocalMinAggregateInputType = {
    id?: true;
    appointmentId?: true;
    doctorId?: true;
    doctorName?: true;
    patientName?: true;
    contactPhone?: true;
    patientType?: true;
    appointmentDate?: true;
    serial?: true;
    amount?: true;
    reason?: true;
    requestedBy?: true;
    createdAt?: true;
};
export type CancelledAppointmentLocalMaxAggregateInputType = {
    id?: true;
    appointmentId?: true;
    doctorId?: true;
    doctorName?: true;
    patientName?: true;
    contactPhone?: true;
    patientType?: true;
    appointmentDate?: true;
    serial?: true;
    amount?: true;
    reason?: true;
    requestedBy?: true;
    createdAt?: true;
};
export type CancelledAppointmentLocalCountAggregateInputType = {
    id?: true;
    appointmentId?: true;
    doctorId?: true;
    doctorName?: true;
    patientName?: true;
    contactPhone?: true;
    patientType?: true;
    appointmentDate?: true;
    serial?: true;
    amount?: true;
    reason?: true;
    requestedBy?: true;
    createdAt?: true;
    _all?: true;
};
export type CancelledAppointmentLocalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CancelledAppointmentLocal to aggregate.
     */
    where?: Prisma.CancelledAppointmentLocalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CancelledAppointmentLocals to fetch.
     */
    orderBy?: Prisma.CancelledAppointmentLocalOrderByWithRelationInput | Prisma.CancelledAppointmentLocalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.CancelledAppointmentLocalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CancelledAppointmentLocals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CancelledAppointmentLocals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CancelledAppointmentLocals
    **/
    _count?: true | CancelledAppointmentLocalCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: CancelledAppointmentLocalAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: CancelledAppointmentLocalSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CancelledAppointmentLocalMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CancelledAppointmentLocalMaxAggregateInputType;
};
export type GetCancelledAppointmentLocalAggregateType<T extends CancelledAppointmentLocalAggregateArgs> = {
    [P in keyof T & keyof AggregateCancelledAppointmentLocal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCancelledAppointmentLocal[P]> : Prisma.GetScalarType<T[P], AggregateCancelledAppointmentLocal[P]>;
};
export type CancelledAppointmentLocalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CancelledAppointmentLocalWhereInput;
    orderBy?: Prisma.CancelledAppointmentLocalOrderByWithAggregationInput | Prisma.CancelledAppointmentLocalOrderByWithAggregationInput[];
    by: Prisma.CancelledAppointmentLocalScalarFieldEnum[] | Prisma.CancelledAppointmentLocalScalarFieldEnum;
    having?: Prisma.CancelledAppointmentLocalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CancelledAppointmentLocalCountAggregateInputType | true;
    _avg?: CancelledAppointmentLocalAvgAggregateInputType;
    _sum?: CancelledAppointmentLocalSumAggregateInputType;
    _min?: CancelledAppointmentLocalMinAggregateInputType;
    _max?: CancelledAppointmentLocalMaxAggregateInputType;
};
export type CancelledAppointmentLocalGroupByOutputType = {
    id: string;
    appointmentId: string;
    doctorId: string;
    doctorName: string | null;
    patientName: string;
    contactPhone: string;
    patientType: string;
    appointmentDate: Date;
    serial: number;
    amount: number;
    reason: string | null;
    requestedBy: string;
    createdAt: Date;
    _count: CancelledAppointmentLocalCountAggregateOutputType | null;
    _avg: CancelledAppointmentLocalAvgAggregateOutputType | null;
    _sum: CancelledAppointmentLocalSumAggregateOutputType | null;
    _min: CancelledAppointmentLocalMinAggregateOutputType | null;
    _max: CancelledAppointmentLocalMaxAggregateOutputType | null;
};
type GetCancelledAppointmentLocalGroupByPayload<T extends CancelledAppointmentLocalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CancelledAppointmentLocalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CancelledAppointmentLocalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CancelledAppointmentLocalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CancelledAppointmentLocalGroupByOutputType[P]>;
}>>;
export type CancelledAppointmentLocalWhereInput = {
    AND?: Prisma.CancelledAppointmentLocalWhereInput | Prisma.CancelledAppointmentLocalWhereInput[];
    OR?: Prisma.CancelledAppointmentLocalWhereInput[];
    NOT?: Prisma.CancelledAppointmentLocalWhereInput | Prisma.CancelledAppointmentLocalWhereInput[];
    id?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    appointmentId?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    doctorId?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    doctorName?: Prisma.StringNullableFilter<"CancelledAppointmentLocal"> | string | null;
    patientName?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    contactPhone?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    patientType?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"CancelledAppointmentLocal"> | Date | string;
    serial?: Prisma.IntFilter<"CancelledAppointmentLocal"> | number;
    amount?: Prisma.FloatFilter<"CancelledAppointmentLocal"> | number;
    reason?: Prisma.StringNullableFilter<"CancelledAppointmentLocal"> | string | null;
    requestedBy?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    createdAt?: Prisma.DateTimeFilter<"CancelledAppointmentLocal"> | Date | string;
};
export type CancelledAppointmentLocalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    requestedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CancelledAppointmentLocalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    appointmentId?: string;
    AND?: Prisma.CancelledAppointmentLocalWhereInput | Prisma.CancelledAppointmentLocalWhereInput[];
    OR?: Prisma.CancelledAppointmentLocalWhereInput[];
    NOT?: Prisma.CancelledAppointmentLocalWhereInput | Prisma.CancelledAppointmentLocalWhereInput[];
    doctorId?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    doctorName?: Prisma.StringNullableFilter<"CancelledAppointmentLocal"> | string | null;
    patientName?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    contactPhone?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    patientType?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"CancelledAppointmentLocal"> | Date | string;
    serial?: Prisma.IntFilter<"CancelledAppointmentLocal"> | number;
    amount?: Prisma.FloatFilter<"CancelledAppointmentLocal"> | number;
    reason?: Prisma.StringNullableFilter<"CancelledAppointmentLocal"> | string | null;
    requestedBy?: Prisma.StringFilter<"CancelledAppointmentLocal"> | string;
    createdAt?: Prisma.DateTimeFilter<"CancelledAppointmentLocal"> | Date | string;
}, "id" | "appointmentId">;
export type CancelledAppointmentLocalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    requestedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CancelledAppointmentLocalCountOrderByAggregateInput;
    _avg?: Prisma.CancelledAppointmentLocalAvgOrderByAggregateInput;
    _max?: Prisma.CancelledAppointmentLocalMaxOrderByAggregateInput;
    _min?: Prisma.CancelledAppointmentLocalMinOrderByAggregateInput;
    _sum?: Prisma.CancelledAppointmentLocalSumOrderByAggregateInput;
};
export type CancelledAppointmentLocalScalarWhereWithAggregatesInput = {
    AND?: Prisma.CancelledAppointmentLocalScalarWhereWithAggregatesInput | Prisma.CancelledAppointmentLocalScalarWhereWithAggregatesInput[];
    OR?: Prisma.CancelledAppointmentLocalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CancelledAppointmentLocalScalarWhereWithAggregatesInput | Prisma.CancelledAppointmentLocalScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentLocal"> | string;
    appointmentId?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentLocal"> | string;
    doctorId?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentLocal"> | string;
    doctorName?: Prisma.StringNullableWithAggregatesFilter<"CancelledAppointmentLocal"> | string | null;
    patientName?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentLocal"> | string;
    contactPhone?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentLocal"> | string;
    patientType?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentLocal"> | string;
    appointmentDate?: Prisma.DateTimeWithAggregatesFilter<"CancelledAppointmentLocal"> | Date | string;
    serial?: Prisma.IntWithAggregatesFilter<"CancelledAppointmentLocal"> | number;
    amount?: Prisma.FloatWithAggregatesFilter<"CancelledAppointmentLocal"> | number;
    reason?: Prisma.StringNullableWithAggregatesFilter<"CancelledAppointmentLocal"> | string | null;
    requestedBy?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentLocal"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CancelledAppointmentLocal"> | Date | string;
};
export type CancelledAppointmentLocalCreateInput = {
    id?: string;
    appointmentId: string;
    doctorId: string;
    doctorName?: string | null;
    patientName: string;
    contactPhone: string;
    patientType?: string;
    appointmentDate: Date | string;
    serial?: number;
    amount?: number;
    reason?: string | null;
    requestedBy: string;
    createdAt?: Date | string;
};
export type CancelledAppointmentLocalUncheckedCreateInput = {
    id?: string;
    appointmentId: string;
    doctorId: string;
    doctorName?: string | null;
    patientName: string;
    contactPhone: string;
    patientType?: string;
    appointmentDate: Date | string;
    serial?: number;
    amount?: number;
    reason?: string | null;
    requestedBy: string;
    createdAt?: Date | string;
};
export type CancelledAppointmentLocalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancelledAppointmentLocalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancelledAppointmentLocalCreateManyInput = {
    id?: string;
    appointmentId: string;
    doctorId: string;
    doctorName?: string | null;
    patientName: string;
    contactPhone: string;
    patientType?: string;
    appointmentDate: Date | string;
    serial?: number;
    amount?: number;
    reason?: string | null;
    requestedBy: string;
    createdAt?: Date | string;
};
export type CancelledAppointmentLocalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancelledAppointmentLocalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    requestedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CancelledAppointmentLocalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CancelledAppointmentLocalAvgOrderByAggregateInput = {
    serial?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type CancelledAppointmentLocalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CancelledAppointmentLocalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    requestedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CancelledAppointmentLocalSumOrderByAggregateInput = {
    serial?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type CancelledAppointmentLocalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    appointmentId?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    patientName?: boolean;
    contactPhone?: boolean;
    patientType?: boolean;
    appointmentDate?: boolean;
    serial?: boolean;
    amount?: boolean;
    reason?: boolean;
    requestedBy?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["cancelledAppointmentLocal"]>;
export type CancelledAppointmentLocalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    appointmentId?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    patientName?: boolean;
    contactPhone?: boolean;
    patientType?: boolean;
    appointmentDate?: boolean;
    serial?: boolean;
    amount?: boolean;
    reason?: boolean;
    requestedBy?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["cancelledAppointmentLocal"]>;
export type CancelledAppointmentLocalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    appointmentId?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    patientName?: boolean;
    contactPhone?: boolean;
    patientType?: boolean;
    appointmentDate?: boolean;
    serial?: boolean;
    amount?: boolean;
    reason?: boolean;
    requestedBy?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["cancelledAppointmentLocal"]>;
export type CancelledAppointmentLocalSelectScalar = {
    id?: boolean;
    appointmentId?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    patientName?: boolean;
    contactPhone?: boolean;
    patientType?: boolean;
    appointmentDate?: boolean;
    serial?: boolean;
    amount?: boolean;
    reason?: boolean;
    requestedBy?: boolean;
    createdAt?: boolean;
};
export type CancelledAppointmentLocalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "appointmentId" | "doctorId" | "doctorName" | "patientName" | "contactPhone" | "patientType" | "appointmentDate" | "serial" | "amount" | "reason" | "requestedBy" | "createdAt", ExtArgs["result"]["cancelledAppointmentLocal"]>;
export type $CancelledAppointmentLocalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CancelledAppointmentLocal";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        appointmentId: string;
        doctorId: string;
        doctorName: string | null;
        patientName: string;
        contactPhone: string;
        patientType: string;
        appointmentDate: Date;
        serial: number;
        amount: number;
        reason: string | null;
        requestedBy: string;
        createdAt: Date;
    }, ExtArgs["result"]["cancelledAppointmentLocal"]>;
    composites: {};
};
export type CancelledAppointmentLocalGetPayload<S extends boolean | null | undefined | CancelledAppointmentLocalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload, S>;
export type CancelledAppointmentLocalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CancelledAppointmentLocalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CancelledAppointmentLocalCountAggregateInputType | true;
};
export interface CancelledAppointmentLocalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CancelledAppointmentLocal'];
        meta: {
            name: 'CancelledAppointmentLocal';
        };
    };
    /**
     * Find zero or one CancelledAppointmentLocal that matches the filter.
     * @param {CancelledAppointmentLocalFindUniqueArgs} args - Arguments to find a CancelledAppointmentLocal
     * @example
     * // Get one CancelledAppointmentLocal
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CancelledAppointmentLocalFindUniqueArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentLocalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentLocalClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one CancelledAppointmentLocal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CancelledAppointmentLocalFindUniqueOrThrowArgs} args - Arguments to find a CancelledAppointmentLocal
     * @example
     * // Get one CancelledAppointmentLocal
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CancelledAppointmentLocalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentLocalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentLocalClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CancelledAppointmentLocal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentLocalFindFirstArgs} args - Arguments to find a CancelledAppointmentLocal
     * @example
     * // Get one CancelledAppointmentLocal
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CancelledAppointmentLocalFindFirstArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentLocalFindFirstArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentLocalClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CancelledAppointmentLocal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentLocalFindFirstOrThrowArgs} args - Arguments to find a CancelledAppointmentLocal
     * @example
     * // Get one CancelledAppointmentLocal
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CancelledAppointmentLocalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentLocalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentLocalClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more CancelledAppointmentLocals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentLocalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CancelledAppointmentLocals
     * const cancelledAppointmentLocals = await prisma.cancelledAppointmentLocal.findMany()
     *
     * // Get first 10 CancelledAppointmentLocals
     * const cancelledAppointmentLocals = await prisma.cancelledAppointmentLocal.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const cancelledAppointmentLocalWithIdOnly = await prisma.cancelledAppointmentLocal.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CancelledAppointmentLocalFindManyArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentLocalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a CancelledAppointmentLocal.
     * @param {CancelledAppointmentLocalCreateArgs} args - Arguments to create a CancelledAppointmentLocal.
     * @example
     * // Create one CancelledAppointmentLocal
     * const CancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.create({
     *   data: {
     *     // ... data to create a CancelledAppointmentLocal
     *   }
     * })
     *
     */
    create<T extends CancelledAppointmentLocalCreateArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentLocalCreateArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentLocalClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many CancelledAppointmentLocals.
     * @param {CancelledAppointmentLocalCreateManyArgs} args - Arguments to create many CancelledAppointmentLocals.
     * @example
     * // Create many CancelledAppointmentLocals
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CancelledAppointmentLocalCreateManyArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentLocalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many CancelledAppointmentLocals and returns the data saved in the database.
     * @param {CancelledAppointmentLocalCreateManyAndReturnArgs} args - Arguments to create many CancelledAppointmentLocals.
     * @example
     * // Create many CancelledAppointmentLocals
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CancelledAppointmentLocals and only return the `id`
     * const cancelledAppointmentLocalWithIdOnly = await prisma.cancelledAppointmentLocal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CancelledAppointmentLocalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentLocalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a CancelledAppointmentLocal.
     * @param {CancelledAppointmentLocalDeleteArgs} args - Arguments to delete one CancelledAppointmentLocal.
     * @example
     * // Delete one CancelledAppointmentLocal
     * const CancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.delete({
     *   where: {
     *     // ... filter to delete one CancelledAppointmentLocal
     *   }
     * })
     *
     */
    delete<T extends CancelledAppointmentLocalDeleteArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentLocalDeleteArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentLocalClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one CancelledAppointmentLocal.
     * @param {CancelledAppointmentLocalUpdateArgs} args - Arguments to update one CancelledAppointmentLocal.
     * @example
     * // Update one CancelledAppointmentLocal
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CancelledAppointmentLocalUpdateArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentLocalUpdateArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentLocalClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more CancelledAppointmentLocals.
     * @param {CancelledAppointmentLocalDeleteManyArgs} args - Arguments to filter CancelledAppointmentLocals to delete.
     * @example
     * // Delete a few CancelledAppointmentLocals
     * const { count } = await prisma.cancelledAppointmentLocal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CancelledAppointmentLocalDeleteManyArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentLocalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CancelledAppointmentLocals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentLocalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CancelledAppointmentLocals
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CancelledAppointmentLocalUpdateManyArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentLocalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CancelledAppointmentLocals and returns the data updated in the database.
     * @param {CancelledAppointmentLocalUpdateManyAndReturnArgs} args - Arguments to update many CancelledAppointmentLocals.
     * @example
     * // Update many CancelledAppointmentLocals
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more CancelledAppointmentLocals and only return the `id`
     * const cancelledAppointmentLocalWithIdOnly = await prisma.cancelledAppointmentLocal.updateManyAndReturn({
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
    updateManyAndReturn<T extends CancelledAppointmentLocalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentLocalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one CancelledAppointmentLocal.
     * @param {CancelledAppointmentLocalUpsertArgs} args - Arguments to update or create a CancelledAppointmentLocal.
     * @example
     * // Update or create a CancelledAppointmentLocal
     * const cancelledAppointmentLocal = await prisma.cancelledAppointmentLocal.upsert({
     *   create: {
     *     // ... data to create a CancelledAppointmentLocal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CancelledAppointmentLocal we want to update
     *   }
     * })
     */
    upsert<T extends CancelledAppointmentLocalUpsertArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentLocalUpsertArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentLocalClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentLocalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of CancelledAppointmentLocals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentLocalCountArgs} args - Arguments to filter CancelledAppointmentLocals to count.
     * @example
     * // Count the number of CancelledAppointmentLocals
     * const count = await prisma.cancelledAppointmentLocal.count({
     *   where: {
     *     // ... the filter for the CancelledAppointmentLocals we want to count
     *   }
     * })
    **/
    count<T extends CancelledAppointmentLocalCountArgs>(args?: Prisma.Subset<T, CancelledAppointmentLocalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CancelledAppointmentLocalCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a CancelledAppointmentLocal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentLocalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CancelledAppointmentLocalAggregateArgs>(args: Prisma.Subset<T, CancelledAppointmentLocalAggregateArgs>): Prisma.PrismaPromise<GetCancelledAppointmentLocalAggregateType<T>>;
    /**
     * Group by CancelledAppointmentLocal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentLocalGroupByArgs} args - Group by arguments.
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
    groupBy<T extends CancelledAppointmentLocalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CancelledAppointmentLocalGroupByArgs['orderBy'];
    } : {
        orderBy?: CancelledAppointmentLocalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CancelledAppointmentLocalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCancelledAppointmentLocalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CancelledAppointmentLocal model
     */
    readonly fields: CancelledAppointmentLocalFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for CancelledAppointmentLocal.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CancelledAppointmentLocalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the CancelledAppointmentLocal model
 */
export interface CancelledAppointmentLocalFieldRefs {
    readonly id: Prisma.FieldRef<"CancelledAppointmentLocal", 'String'>;
    readonly appointmentId: Prisma.FieldRef<"CancelledAppointmentLocal", 'String'>;
    readonly doctorId: Prisma.FieldRef<"CancelledAppointmentLocal", 'String'>;
    readonly doctorName: Prisma.FieldRef<"CancelledAppointmentLocal", 'String'>;
    readonly patientName: Prisma.FieldRef<"CancelledAppointmentLocal", 'String'>;
    readonly contactPhone: Prisma.FieldRef<"CancelledAppointmentLocal", 'String'>;
    readonly patientType: Prisma.FieldRef<"CancelledAppointmentLocal", 'String'>;
    readonly appointmentDate: Prisma.FieldRef<"CancelledAppointmentLocal", 'DateTime'>;
    readonly serial: Prisma.FieldRef<"CancelledAppointmentLocal", 'Int'>;
    readonly amount: Prisma.FieldRef<"CancelledAppointmentLocal", 'Float'>;
    readonly reason: Prisma.FieldRef<"CancelledAppointmentLocal", 'String'>;
    readonly requestedBy: Prisma.FieldRef<"CancelledAppointmentLocal", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CancelledAppointmentLocal", 'DateTime'>;
}
/**
 * CancelledAppointmentLocal findUnique
 */
export type CancelledAppointmentLocalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentLocal to fetch.
     */
    where: Prisma.CancelledAppointmentLocalWhereUniqueInput;
};
/**
 * CancelledAppointmentLocal findUniqueOrThrow
 */
export type CancelledAppointmentLocalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentLocal to fetch.
     */
    where: Prisma.CancelledAppointmentLocalWhereUniqueInput;
};
/**
 * CancelledAppointmentLocal findFirst
 */
export type CancelledAppointmentLocalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentLocal to fetch.
     */
    where?: Prisma.CancelledAppointmentLocalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CancelledAppointmentLocals to fetch.
     */
    orderBy?: Prisma.CancelledAppointmentLocalOrderByWithRelationInput | Prisma.CancelledAppointmentLocalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CancelledAppointmentLocals.
     */
    cursor?: Prisma.CancelledAppointmentLocalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CancelledAppointmentLocals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CancelledAppointmentLocals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CancelledAppointmentLocals.
     */
    distinct?: Prisma.CancelledAppointmentLocalScalarFieldEnum | Prisma.CancelledAppointmentLocalScalarFieldEnum[];
};
/**
 * CancelledAppointmentLocal findFirstOrThrow
 */
export type CancelledAppointmentLocalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentLocal to fetch.
     */
    where?: Prisma.CancelledAppointmentLocalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CancelledAppointmentLocals to fetch.
     */
    orderBy?: Prisma.CancelledAppointmentLocalOrderByWithRelationInput | Prisma.CancelledAppointmentLocalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CancelledAppointmentLocals.
     */
    cursor?: Prisma.CancelledAppointmentLocalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CancelledAppointmentLocals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CancelledAppointmentLocals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CancelledAppointmentLocals.
     */
    distinct?: Prisma.CancelledAppointmentLocalScalarFieldEnum | Prisma.CancelledAppointmentLocalScalarFieldEnum[];
};
/**
 * CancelledAppointmentLocal findMany
 */
export type CancelledAppointmentLocalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentLocals to fetch.
     */
    where?: Prisma.CancelledAppointmentLocalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CancelledAppointmentLocals to fetch.
     */
    orderBy?: Prisma.CancelledAppointmentLocalOrderByWithRelationInput | Prisma.CancelledAppointmentLocalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CancelledAppointmentLocals.
     */
    cursor?: Prisma.CancelledAppointmentLocalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CancelledAppointmentLocals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CancelledAppointmentLocals.
     */
    skip?: number;
    distinct?: Prisma.CancelledAppointmentLocalScalarFieldEnum | Prisma.CancelledAppointmentLocalScalarFieldEnum[];
};
/**
 * CancelledAppointmentLocal create
 */
export type CancelledAppointmentLocalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * The data needed to create a CancelledAppointmentLocal.
     */
    data: Prisma.XOR<Prisma.CancelledAppointmentLocalCreateInput, Prisma.CancelledAppointmentLocalUncheckedCreateInput>;
};
/**
 * CancelledAppointmentLocal createMany
 */
export type CancelledAppointmentLocalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many CancelledAppointmentLocals.
     */
    data: Prisma.CancelledAppointmentLocalCreateManyInput | Prisma.CancelledAppointmentLocalCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * CancelledAppointmentLocal createManyAndReturn
 */
export type CancelledAppointmentLocalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * The data used to create many CancelledAppointmentLocals.
     */
    data: Prisma.CancelledAppointmentLocalCreateManyInput | Prisma.CancelledAppointmentLocalCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * CancelledAppointmentLocal update
 */
export type CancelledAppointmentLocalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * The data needed to update a CancelledAppointmentLocal.
     */
    data: Prisma.XOR<Prisma.CancelledAppointmentLocalUpdateInput, Prisma.CancelledAppointmentLocalUncheckedUpdateInput>;
    /**
     * Choose, which CancelledAppointmentLocal to update.
     */
    where: Prisma.CancelledAppointmentLocalWhereUniqueInput;
};
/**
 * CancelledAppointmentLocal updateMany
 */
export type CancelledAppointmentLocalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update CancelledAppointmentLocals.
     */
    data: Prisma.XOR<Prisma.CancelledAppointmentLocalUpdateManyMutationInput, Prisma.CancelledAppointmentLocalUncheckedUpdateManyInput>;
    /**
     * Filter which CancelledAppointmentLocals to update
     */
    where?: Prisma.CancelledAppointmentLocalWhereInput;
    /**
     * Limit how many CancelledAppointmentLocals to update.
     */
    limit?: number;
};
/**
 * CancelledAppointmentLocal updateManyAndReturn
 */
export type CancelledAppointmentLocalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * The data used to update CancelledAppointmentLocals.
     */
    data: Prisma.XOR<Prisma.CancelledAppointmentLocalUpdateManyMutationInput, Prisma.CancelledAppointmentLocalUncheckedUpdateManyInput>;
    /**
     * Filter which CancelledAppointmentLocals to update
     */
    where?: Prisma.CancelledAppointmentLocalWhereInput;
    /**
     * Limit how many CancelledAppointmentLocals to update.
     */
    limit?: number;
};
/**
 * CancelledAppointmentLocal upsert
 */
export type CancelledAppointmentLocalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * The filter to search for the CancelledAppointmentLocal to update in case it exists.
     */
    where: Prisma.CancelledAppointmentLocalWhereUniqueInput;
    /**
     * In case the CancelledAppointmentLocal found by the `where` argument doesn't exist, create a new CancelledAppointmentLocal with this data.
     */
    create: Prisma.XOR<Prisma.CancelledAppointmentLocalCreateInput, Prisma.CancelledAppointmentLocalUncheckedCreateInput>;
    /**
     * In case the CancelledAppointmentLocal was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.CancelledAppointmentLocalUpdateInput, Prisma.CancelledAppointmentLocalUncheckedUpdateInput>;
};
/**
 * CancelledAppointmentLocal delete
 */
export type CancelledAppointmentLocalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
    /**
     * Filter which CancelledAppointmentLocal to delete.
     */
    where: Prisma.CancelledAppointmentLocalWhereUniqueInput;
};
/**
 * CancelledAppointmentLocal deleteMany
 */
export type CancelledAppointmentLocalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CancelledAppointmentLocals to delete
     */
    where?: Prisma.CancelledAppointmentLocalWhereInput;
    /**
     * Limit how many CancelledAppointmentLocals to delete.
     */
    limit?: number;
};
/**
 * CancelledAppointmentLocal without action
 */
export type CancelledAppointmentLocalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentLocal
     */
    select?: Prisma.CancelledAppointmentLocalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentLocal
     */
    omit?: Prisma.CancelledAppointmentLocalOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=CancelledAppointmentLocal.d.ts.map