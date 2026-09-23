import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model CancelledAppointmentOnline
 *
 */
export type CancelledAppointmentOnlineModel = runtime.Types.Result.DefaultSelection<Prisma.$CancelledAppointmentOnlinePayload>;
export type AggregateCancelledAppointmentOnline = {
    _count: CancelledAppointmentOnlineCountAggregateOutputType | null;
    _avg: CancelledAppointmentOnlineAvgAggregateOutputType | null;
    _sum: CancelledAppointmentOnlineSumAggregateOutputType | null;
    _min: CancelledAppointmentOnlineMinAggregateOutputType | null;
    _max: CancelledAppointmentOnlineMaxAggregateOutputType | null;
};
export type CancelledAppointmentOnlineAvgAggregateOutputType = {
    serial: number | null;
    amount: number | null;
};
export type CancelledAppointmentOnlineSumAggregateOutputType = {
    serial: number | null;
    amount: number | null;
};
export type CancelledAppointmentOnlineMinAggregateOutputType = {
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
export type CancelledAppointmentOnlineMaxAggregateOutputType = {
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
export type CancelledAppointmentOnlineCountAggregateOutputType = {
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
export type CancelledAppointmentOnlineAvgAggregateInputType = {
    serial?: true;
    amount?: true;
};
export type CancelledAppointmentOnlineSumAggregateInputType = {
    serial?: true;
    amount?: true;
};
export type CancelledAppointmentOnlineMinAggregateInputType = {
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
export type CancelledAppointmentOnlineMaxAggregateInputType = {
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
export type CancelledAppointmentOnlineCountAggregateInputType = {
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
export type CancelledAppointmentOnlineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CancelledAppointmentOnline to aggregate.
     */
    where?: Prisma.CancelledAppointmentOnlineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CancelledAppointmentOnlines to fetch.
     */
    orderBy?: Prisma.CancelledAppointmentOnlineOrderByWithRelationInput | Prisma.CancelledAppointmentOnlineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.CancelledAppointmentOnlineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CancelledAppointmentOnlines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CancelledAppointmentOnlines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CancelledAppointmentOnlines
    **/
    _count?: true | CancelledAppointmentOnlineCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: CancelledAppointmentOnlineAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: CancelledAppointmentOnlineSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CancelledAppointmentOnlineMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CancelledAppointmentOnlineMaxAggregateInputType;
};
export type GetCancelledAppointmentOnlineAggregateType<T extends CancelledAppointmentOnlineAggregateArgs> = {
    [P in keyof T & keyof AggregateCancelledAppointmentOnline]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCancelledAppointmentOnline[P]> : Prisma.GetScalarType<T[P], AggregateCancelledAppointmentOnline[P]>;
};
export type CancelledAppointmentOnlineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CancelledAppointmentOnlineWhereInput;
    orderBy?: Prisma.CancelledAppointmentOnlineOrderByWithAggregationInput | Prisma.CancelledAppointmentOnlineOrderByWithAggregationInput[];
    by: Prisma.CancelledAppointmentOnlineScalarFieldEnum[] | Prisma.CancelledAppointmentOnlineScalarFieldEnum;
    having?: Prisma.CancelledAppointmentOnlineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CancelledAppointmentOnlineCountAggregateInputType | true;
    _avg?: CancelledAppointmentOnlineAvgAggregateInputType;
    _sum?: CancelledAppointmentOnlineSumAggregateInputType;
    _min?: CancelledAppointmentOnlineMinAggregateInputType;
    _max?: CancelledAppointmentOnlineMaxAggregateInputType;
};
export type CancelledAppointmentOnlineGroupByOutputType = {
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
    _count: CancelledAppointmentOnlineCountAggregateOutputType | null;
    _avg: CancelledAppointmentOnlineAvgAggregateOutputType | null;
    _sum: CancelledAppointmentOnlineSumAggregateOutputType | null;
    _min: CancelledAppointmentOnlineMinAggregateOutputType | null;
    _max: CancelledAppointmentOnlineMaxAggregateOutputType | null;
};
type GetCancelledAppointmentOnlineGroupByPayload<T extends CancelledAppointmentOnlineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CancelledAppointmentOnlineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CancelledAppointmentOnlineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CancelledAppointmentOnlineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CancelledAppointmentOnlineGroupByOutputType[P]>;
}>>;
export type CancelledAppointmentOnlineWhereInput = {
    AND?: Prisma.CancelledAppointmentOnlineWhereInput | Prisma.CancelledAppointmentOnlineWhereInput[];
    OR?: Prisma.CancelledAppointmentOnlineWhereInput[];
    NOT?: Prisma.CancelledAppointmentOnlineWhereInput | Prisma.CancelledAppointmentOnlineWhereInput[];
    id?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    appointmentId?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    doctorId?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    doctorName?: Prisma.StringNullableFilter<"CancelledAppointmentOnline"> | string | null;
    patientName?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    contactPhone?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    patientType?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"CancelledAppointmentOnline"> | Date | string;
    serial?: Prisma.IntFilter<"CancelledAppointmentOnline"> | number;
    amount?: Prisma.FloatFilter<"CancelledAppointmentOnline"> | number;
    reason?: Prisma.StringNullableFilter<"CancelledAppointmentOnline"> | string | null;
    requestedBy?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    createdAt?: Prisma.DateTimeFilter<"CancelledAppointmentOnline"> | Date | string;
};
export type CancelledAppointmentOnlineOrderByWithRelationInput = {
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
export type CancelledAppointmentOnlineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    appointmentId?: string;
    AND?: Prisma.CancelledAppointmentOnlineWhereInput | Prisma.CancelledAppointmentOnlineWhereInput[];
    OR?: Prisma.CancelledAppointmentOnlineWhereInput[];
    NOT?: Prisma.CancelledAppointmentOnlineWhereInput | Prisma.CancelledAppointmentOnlineWhereInput[];
    doctorId?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    doctorName?: Prisma.StringNullableFilter<"CancelledAppointmentOnline"> | string | null;
    patientName?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    contactPhone?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    patientType?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"CancelledAppointmentOnline"> | Date | string;
    serial?: Prisma.IntFilter<"CancelledAppointmentOnline"> | number;
    amount?: Prisma.FloatFilter<"CancelledAppointmentOnline"> | number;
    reason?: Prisma.StringNullableFilter<"CancelledAppointmentOnline"> | string | null;
    requestedBy?: Prisma.StringFilter<"CancelledAppointmentOnline"> | string;
    createdAt?: Prisma.DateTimeFilter<"CancelledAppointmentOnline"> | Date | string;
}, "id" | "appointmentId">;
export type CancelledAppointmentOnlineOrderByWithAggregationInput = {
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
    _count?: Prisma.CancelledAppointmentOnlineCountOrderByAggregateInput;
    _avg?: Prisma.CancelledAppointmentOnlineAvgOrderByAggregateInput;
    _max?: Prisma.CancelledAppointmentOnlineMaxOrderByAggregateInput;
    _min?: Prisma.CancelledAppointmentOnlineMinOrderByAggregateInput;
    _sum?: Prisma.CancelledAppointmentOnlineSumOrderByAggregateInput;
};
export type CancelledAppointmentOnlineScalarWhereWithAggregatesInput = {
    AND?: Prisma.CancelledAppointmentOnlineScalarWhereWithAggregatesInput | Prisma.CancelledAppointmentOnlineScalarWhereWithAggregatesInput[];
    OR?: Prisma.CancelledAppointmentOnlineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CancelledAppointmentOnlineScalarWhereWithAggregatesInput | Prisma.CancelledAppointmentOnlineScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentOnline"> | string;
    appointmentId?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentOnline"> | string;
    doctorId?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentOnline"> | string;
    doctorName?: Prisma.StringNullableWithAggregatesFilter<"CancelledAppointmentOnline"> | string | null;
    patientName?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentOnline"> | string;
    contactPhone?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentOnline"> | string;
    patientType?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentOnline"> | string;
    appointmentDate?: Prisma.DateTimeWithAggregatesFilter<"CancelledAppointmentOnline"> | Date | string;
    serial?: Prisma.IntWithAggregatesFilter<"CancelledAppointmentOnline"> | number;
    amount?: Prisma.FloatWithAggregatesFilter<"CancelledAppointmentOnline"> | number;
    reason?: Prisma.StringNullableWithAggregatesFilter<"CancelledAppointmentOnline"> | string | null;
    requestedBy?: Prisma.StringWithAggregatesFilter<"CancelledAppointmentOnline"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CancelledAppointmentOnline"> | Date | string;
};
export type CancelledAppointmentOnlineCreateInput = {
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
export type CancelledAppointmentOnlineUncheckedCreateInput = {
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
export type CancelledAppointmentOnlineUpdateInput = {
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
export type CancelledAppointmentOnlineUncheckedUpdateInput = {
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
export type CancelledAppointmentOnlineCreateManyInput = {
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
export type CancelledAppointmentOnlineUpdateManyMutationInput = {
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
export type CancelledAppointmentOnlineUncheckedUpdateManyInput = {
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
export type CancelledAppointmentOnlineCountOrderByAggregateInput = {
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
export type CancelledAppointmentOnlineAvgOrderByAggregateInput = {
    serial?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type CancelledAppointmentOnlineMaxOrderByAggregateInput = {
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
export type CancelledAppointmentOnlineMinOrderByAggregateInput = {
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
export type CancelledAppointmentOnlineSumOrderByAggregateInput = {
    serial?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type CancelledAppointmentOnlineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
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
}, ExtArgs["result"]["cancelledAppointmentOnline"]>;
export type CancelledAppointmentOnlineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
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
}, ExtArgs["result"]["cancelledAppointmentOnline"]>;
export type CancelledAppointmentOnlineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
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
}, ExtArgs["result"]["cancelledAppointmentOnline"]>;
export type CancelledAppointmentOnlineSelectScalar = {
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
export type CancelledAppointmentOnlineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "appointmentId" | "doctorId" | "doctorName" | "patientName" | "contactPhone" | "patientType" | "appointmentDate" | "serial" | "amount" | "reason" | "requestedBy" | "createdAt", ExtArgs["result"]["cancelledAppointmentOnline"]>;
export type $CancelledAppointmentOnlinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CancelledAppointmentOnline";
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
    }, ExtArgs["result"]["cancelledAppointmentOnline"]>;
    composites: {};
};
export type CancelledAppointmentOnlineGetPayload<S extends boolean | null | undefined | CancelledAppointmentOnlineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload, S>;
export type CancelledAppointmentOnlineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CancelledAppointmentOnlineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CancelledAppointmentOnlineCountAggregateInputType | true;
};
export interface CancelledAppointmentOnlineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CancelledAppointmentOnline'];
        meta: {
            name: 'CancelledAppointmentOnline';
        };
    };
    /**
     * Find zero or one CancelledAppointmentOnline that matches the filter.
     * @param {CancelledAppointmentOnlineFindUniqueArgs} args - Arguments to find a CancelledAppointmentOnline
     * @example
     * // Get one CancelledAppointmentOnline
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CancelledAppointmentOnlineFindUniqueArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentOnlineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentOnlineClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one CancelledAppointmentOnline that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CancelledAppointmentOnlineFindUniqueOrThrowArgs} args - Arguments to find a CancelledAppointmentOnline
     * @example
     * // Get one CancelledAppointmentOnline
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CancelledAppointmentOnlineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentOnlineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentOnlineClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CancelledAppointmentOnline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentOnlineFindFirstArgs} args - Arguments to find a CancelledAppointmentOnline
     * @example
     * // Get one CancelledAppointmentOnline
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CancelledAppointmentOnlineFindFirstArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentOnlineFindFirstArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentOnlineClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CancelledAppointmentOnline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentOnlineFindFirstOrThrowArgs} args - Arguments to find a CancelledAppointmentOnline
     * @example
     * // Get one CancelledAppointmentOnline
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CancelledAppointmentOnlineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentOnlineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentOnlineClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more CancelledAppointmentOnlines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentOnlineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CancelledAppointmentOnlines
     * const cancelledAppointmentOnlines = await prisma.cancelledAppointmentOnline.findMany()
     *
     * // Get first 10 CancelledAppointmentOnlines
     * const cancelledAppointmentOnlines = await prisma.cancelledAppointmentOnline.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const cancelledAppointmentOnlineWithIdOnly = await prisma.cancelledAppointmentOnline.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CancelledAppointmentOnlineFindManyArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentOnlineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a CancelledAppointmentOnline.
     * @param {CancelledAppointmentOnlineCreateArgs} args - Arguments to create a CancelledAppointmentOnline.
     * @example
     * // Create one CancelledAppointmentOnline
     * const CancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.create({
     *   data: {
     *     // ... data to create a CancelledAppointmentOnline
     *   }
     * })
     *
     */
    create<T extends CancelledAppointmentOnlineCreateArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentOnlineCreateArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentOnlineClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many CancelledAppointmentOnlines.
     * @param {CancelledAppointmentOnlineCreateManyArgs} args - Arguments to create many CancelledAppointmentOnlines.
     * @example
     * // Create many CancelledAppointmentOnlines
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CancelledAppointmentOnlineCreateManyArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentOnlineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many CancelledAppointmentOnlines and returns the data saved in the database.
     * @param {CancelledAppointmentOnlineCreateManyAndReturnArgs} args - Arguments to create many CancelledAppointmentOnlines.
     * @example
     * // Create many CancelledAppointmentOnlines
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CancelledAppointmentOnlines and only return the `id`
     * const cancelledAppointmentOnlineWithIdOnly = await prisma.cancelledAppointmentOnline.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CancelledAppointmentOnlineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentOnlineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a CancelledAppointmentOnline.
     * @param {CancelledAppointmentOnlineDeleteArgs} args - Arguments to delete one CancelledAppointmentOnline.
     * @example
     * // Delete one CancelledAppointmentOnline
     * const CancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.delete({
     *   where: {
     *     // ... filter to delete one CancelledAppointmentOnline
     *   }
     * })
     *
     */
    delete<T extends CancelledAppointmentOnlineDeleteArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentOnlineDeleteArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentOnlineClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one CancelledAppointmentOnline.
     * @param {CancelledAppointmentOnlineUpdateArgs} args - Arguments to update one CancelledAppointmentOnline.
     * @example
     * // Update one CancelledAppointmentOnline
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CancelledAppointmentOnlineUpdateArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentOnlineUpdateArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentOnlineClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more CancelledAppointmentOnlines.
     * @param {CancelledAppointmentOnlineDeleteManyArgs} args - Arguments to filter CancelledAppointmentOnlines to delete.
     * @example
     * // Delete a few CancelledAppointmentOnlines
     * const { count } = await prisma.cancelledAppointmentOnline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CancelledAppointmentOnlineDeleteManyArgs>(args?: Prisma.SelectSubset<T, CancelledAppointmentOnlineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CancelledAppointmentOnlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentOnlineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CancelledAppointmentOnlines
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CancelledAppointmentOnlineUpdateManyArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentOnlineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CancelledAppointmentOnlines and returns the data updated in the database.
     * @param {CancelledAppointmentOnlineUpdateManyAndReturnArgs} args - Arguments to update many CancelledAppointmentOnlines.
     * @example
     * // Update many CancelledAppointmentOnlines
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more CancelledAppointmentOnlines and only return the `id`
     * const cancelledAppointmentOnlineWithIdOnly = await prisma.cancelledAppointmentOnline.updateManyAndReturn({
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
    updateManyAndReturn<T extends CancelledAppointmentOnlineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentOnlineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one CancelledAppointmentOnline.
     * @param {CancelledAppointmentOnlineUpsertArgs} args - Arguments to update or create a CancelledAppointmentOnline.
     * @example
     * // Update or create a CancelledAppointmentOnline
     * const cancelledAppointmentOnline = await prisma.cancelledAppointmentOnline.upsert({
     *   create: {
     *     // ... data to create a CancelledAppointmentOnline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CancelledAppointmentOnline we want to update
     *   }
     * })
     */
    upsert<T extends CancelledAppointmentOnlineUpsertArgs>(args: Prisma.SelectSubset<T, CancelledAppointmentOnlineUpsertArgs<ExtArgs>>): Prisma.Prisma__CancelledAppointmentOnlineClient<runtime.Types.Result.GetResult<Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of CancelledAppointmentOnlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentOnlineCountArgs} args - Arguments to filter CancelledAppointmentOnlines to count.
     * @example
     * // Count the number of CancelledAppointmentOnlines
     * const count = await prisma.cancelledAppointmentOnline.count({
     *   where: {
     *     // ... the filter for the CancelledAppointmentOnlines we want to count
     *   }
     * })
    **/
    count<T extends CancelledAppointmentOnlineCountArgs>(args?: Prisma.Subset<T, CancelledAppointmentOnlineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CancelledAppointmentOnlineCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a CancelledAppointmentOnline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentOnlineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CancelledAppointmentOnlineAggregateArgs>(args: Prisma.Subset<T, CancelledAppointmentOnlineAggregateArgs>): Prisma.PrismaPromise<GetCancelledAppointmentOnlineAggregateType<T>>;
    /**
     * Group by CancelledAppointmentOnline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CancelledAppointmentOnlineGroupByArgs} args - Group by arguments.
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
    groupBy<T extends CancelledAppointmentOnlineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CancelledAppointmentOnlineGroupByArgs['orderBy'];
    } : {
        orderBy?: CancelledAppointmentOnlineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CancelledAppointmentOnlineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCancelledAppointmentOnlineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CancelledAppointmentOnline model
     */
    readonly fields: CancelledAppointmentOnlineFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for CancelledAppointmentOnline.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CancelledAppointmentOnlineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the CancelledAppointmentOnline model
 */
export interface CancelledAppointmentOnlineFieldRefs {
    readonly id: Prisma.FieldRef<"CancelledAppointmentOnline", 'String'>;
    readonly appointmentId: Prisma.FieldRef<"CancelledAppointmentOnline", 'String'>;
    readonly doctorId: Prisma.FieldRef<"CancelledAppointmentOnline", 'String'>;
    readonly doctorName: Prisma.FieldRef<"CancelledAppointmentOnline", 'String'>;
    readonly patientName: Prisma.FieldRef<"CancelledAppointmentOnline", 'String'>;
    readonly contactPhone: Prisma.FieldRef<"CancelledAppointmentOnline", 'String'>;
    readonly patientType: Prisma.FieldRef<"CancelledAppointmentOnline", 'String'>;
    readonly appointmentDate: Prisma.FieldRef<"CancelledAppointmentOnline", 'DateTime'>;
    readonly serial: Prisma.FieldRef<"CancelledAppointmentOnline", 'Int'>;
    readonly amount: Prisma.FieldRef<"CancelledAppointmentOnline", 'Float'>;
    readonly reason: Prisma.FieldRef<"CancelledAppointmentOnline", 'String'>;
    readonly requestedBy: Prisma.FieldRef<"CancelledAppointmentOnline", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CancelledAppointmentOnline", 'DateTime'>;
}
/**
 * CancelledAppointmentOnline findUnique
 */
export type CancelledAppointmentOnlineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentOnline to fetch.
     */
    where: Prisma.CancelledAppointmentOnlineWhereUniqueInput;
};
/**
 * CancelledAppointmentOnline findUniqueOrThrow
 */
export type CancelledAppointmentOnlineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentOnline to fetch.
     */
    where: Prisma.CancelledAppointmentOnlineWhereUniqueInput;
};
/**
 * CancelledAppointmentOnline findFirst
 */
export type CancelledAppointmentOnlineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentOnline to fetch.
     */
    where?: Prisma.CancelledAppointmentOnlineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CancelledAppointmentOnlines to fetch.
     */
    orderBy?: Prisma.CancelledAppointmentOnlineOrderByWithRelationInput | Prisma.CancelledAppointmentOnlineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CancelledAppointmentOnlines.
     */
    cursor?: Prisma.CancelledAppointmentOnlineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CancelledAppointmentOnlines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CancelledAppointmentOnlines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CancelledAppointmentOnlines.
     */
    distinct?: Prisma.CancelledAppointmentOnlineScalarFieldEnum | Prisma.CancelledAppointmentOnlineScalarFieldEnum[];
};
/**
 * CancelledAppointmentOnline findFirstOrThrow
 */
export type CancelledAppointmentOnlineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentOnline to fetch.
     */
    where?: Prisma.CancelledAppointmentOnlineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CancelledAppointmentOnlines to fetch.
     */
    orderBy?: Prisma.CancelledAppointmentOnlineOrderByWithRelationInput | Prisma.CancelledAppointmentOnlineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CancelledAppointmentOnlines.
     */
    cursor?: Prisma.CancelledAppointmentOnlineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CancelledAppointmentOnlines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CancelledAppointmentOnlines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CancelledAppointmentOnlines.
     */
    distinct?: Prisma.CancelledAppointmentOnlineScalarFieldEnum | Prisma.CancelledAppointmentOnlineScalarFieldEnum[];
};
/**
 * CancelledAppointmentOnline findMany
 */
export type CancelledAppointmentOnlineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * Filter, which CancelledAppointmentOnlines to fetch.
     */
    where?: Prisma.CancelledAppointmentOnlineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CancelledAppointmentOnlines to fetch.
     */
    orderBy?: Prisma.CancelledAppointmentOnlineOrderByWithRelationInput | Prisma.CancelledAppointmentOnlineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CancelledAppointmentOnlines.
     */
    cursor?: Prisma.CancelledAppointmentOnlineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CancelledAppointmentOnlines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CancelledAppointmentOnlines.
     */
    skip?: number;
    distinct?: Prisma.CancelledAppointmentOnlineScalarFieldEnum | Prisma.CancelledAppointmentOnlineScalarFieldEnum[];
};
/**
 * CancelledAppointmentOnline create
 */
export type CancelledAppointmentOnlineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * The data needed to create a CancelledAppointmentOnline.
     */
    data: Prisma.XOR<Prisma.CancelledAppointmentOnlineCreateInput, Prisma.CancelledAppointmentOnlineUncheckedCreateInput>;
};
/**
 * CancelledAppointmentOnline createMany
 */
export type CancelledAppointmentOnlineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many CancelledAppointmentOnlines.
     */
    data: Prisma.CancelledAppointmentOnlineCreateManyInput | Prisma.CancelledAppointmentOnlineCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * CancelledAppointmentOnline createManyAndReturn
 */
export type CancelledAppointmentOnlineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * The data used to create many CancelledAppointmentOnlines.
     */
    data: Prisma.CancelledAppointmentOnlineCreateManyInput | Prisma.CancelledAppointmentOnlineCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * CancelledAppointmentOnline update
 */
export type CancelledAppointmentOnlineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * The data needed to update a CancelledAppointmentOnline.
     */
    data: Prisma.XOR<Prisma.CancelledAppointmentOnlineUpdateInput, Prisma.CancelledAppointmentOnlineUncheckedUpdateInput>;
    /**
     * Choose, which CancelledAppointmentOnline to update.
     */
    where: Prisma.CancelledAppointmentOnlineWhereUniqueInput;
};
/**
 * CancelledAppointmentOnline updateMany
 */
export type CancelledAppointmentOnlineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update CancelledAppointmentOnlines.
     */
    data: Prisma.XOR<Prisma.CancelledAppointmentOnlineUpdateManyMutationInput, Prisma.CancelledAppointmentOnlineUncheckedUpdateManyInput>;
    /**
     * Filter which CancelledAppointmentOnlines to update
     */
    where?: Prisma.CancelledAppointmentOnlineWhereInput;
    /**
     * Limit how many CancelledAppointmentOnlines to update.
     */
    limit?: number;
};
/**
 * CancelledAppointmentOnline updateManyAndReturn
 */
export type CancelledAppointmentOnlineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * The data used to update CancelledAppointmentOnlines.
     */
    data: Prisma.XOR<Prisma.CancelledAppointmentOnlineUpdateManyMutationInput, Prisma.CancelledAppointmentOnlineUncheckedUpdateManyInput>;
    /**
     * Filter which CancelledAppointmentOnlines to update
     */
    where?: Prisma.CancelledAppointmentOnlineWhereInput;
    /**
     * Limit how many CancelledAppointmentOnlines to update.
     */
    limit?: number;
};
/**
 * CancelledAppointmentOnline upsert
 */
export type CancelledAppointmentOnlineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * The filter to search for the CancelledAppointmentOnline to update in case it exists.
     */
    where: Prisma.CancelledAppointmentOnlineWhereUniqueInput;
    /**
     * In case the CancelledAppointmentOnline found by the `where` argument doesn't exist, create a new CancelledAppointmentOnline with this data.
     */
    create: Prisma.XOR<Prisma.CancelledAppointmentOnlineCreateInput, Prisma.CancelledAppointmentOnlineUncheckedCreateInput>;
    /**
     * In case the CancelledAppointmentOnline was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.CancelledAppointmentOnlineUpdateInput, Prisma.CancelledAppointmentOnlineUncheckedUpdateInput>;
};
/**
 * CancelledAppointmentOnline delete
 */
export type CancelledAppointmentOnlineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
    /**
     * Filter which CancelledAppointmentOnline to delete.
     */
    where: Prisma.CancelledAppointmentOnlineWhereUniqueInput;
};
/**
 * CancelledAppointmentOnline deleteMany
 */
export type CancelledAppointmentOnlineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CancelledAppointmentOnlines to delete
     */
    where?: Prisma.CancelledAppointmentOnlineWhereInput;
    /**
     * Limit how many CancelledAppointmentOnlines to delete.
     */
    limit?: number;
};
/**
 * CancelledAppointmentOnline without action
 */
export type CancelledAppointmentOnlineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CancelledAppointmentOnline
     */
    select?: Prisma.CancelledAppointmentOnlineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CancelledAppointmentOnline
     */
    omit?: Prisma.CancelledAppointmentOnlineOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=CancelledAppointmentOnline.d.ts.map