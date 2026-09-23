import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model HospitalOnlineDay
 *
 */
export type HospitalOnlineDayModel = runtime.Types.Result.DefaultSelection<Prisma.$HospitalOnlineDayPayload>;
export type AggregateHospitalOnlineDay = {
    _count: HospitalOnlineDayCountAggregateOutputType | null;
    _avg: HospitalOnlineDayAvgAggregateOutputType | null;
    _sum: HospitalOnlineDaySumAggregateOutputType | null;
    _min: HospitalOnlineDayMinAggregateOutputType | null;
    _max: HospitalOnlineDayMaxAggregateOutputType | null;
};
export type HospitalOnlineDayAvgAggregateOutputType = {
    onlineTotal: number | null;
    onlineCount: number | null;
};
export type HospitalOnlineDaySumAggregateOutputType = {
    onlineTotal: number | null;
    onlineCount: number | null;
};
export type HospitalOnlineDayMinAggregateOutputType = {
    id: string | null;
    hospitalId: string | null;
    date: Date | null;
    kind: string | null;
    onlineTotal: number | null;
    onlineCount: number | null;
    closedAt: Date | null;
    createdAt: Date | null;
};
export type HospitalOnlineDayMaxAggregateOutputType = {
    id: string | null;
    hospitalId: string | null;
    date: Date | null;
    kind: string | null;
    onlineTotal: number | null;
    onlineCount: number | null;
    closedAt: Date | null;
    createdAt: Date | null;
};
export type HospitalOnlineDayCountAggregateOutputType = {
    id: number;
    hospitalId: number;
    date: number;
    kind: number;
    onlineTotal: number;
    onlineCount: number;
    closedAt: number;
    createdAt: number;
    _all: number;
};
export type HospitalOnlineDayAvgAggregateInputType = {
    onlineTotal?: true;
    onlineCount?: true;
};
export type HospitalOnlineDaySumAggregateInputType = {
    onlineTotal?: true;
    onlineCount?: true;
};
export type HospitalOnlineDayMinAggregateInputType = {
    id?: true;
    hospitalId?: true;
    date?: true;
    kind?: true;
    onlineTotal?: true;
    onlineCount?: true;
    closedAt?: true;
    createdAt?: true;
};
export type HospitalOnlineDayMaxAggregateInputType = {
    id?: true;
    hospitalId?: true;
    date?: true;
    kind?: true;
    onlineTotal?: true;
    onlineCount?: true;
    closedAt?: true;
    createdAt?: true;
};
export type HospitalOnlineDayCountAggregateInputType = {
    id?: true;
    hospitalId?: true;
    date?: true;
    kind?: true;
    onlineTotal?: true;
    onlineCount?: true;
    closedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type HospitalOnlineDayAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalOnlineDay to aggregate.
     */
    where?: Prisma.HospitalOnlineDayWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HospitalOnlineDays to fetch.
     */
    orderBy?: Prisma.HospitalOnlineDayOrderByWithRelationInput | Prisma.HospitalOnlineDayOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.HospitalOnlineDayWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HospitalOnlineDays from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HospitalOnlineDays.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned HospitalOnlineDays
    **/
    _count?: true | HospitalOnlineDayCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: HospitalOnlineDayAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: HospitalOnlineDaySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: HospitalOnlineDayMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: HospitalOnlineDayMaxAggregateInputType;
};
export type GetHospitalOnlineDayAggregateType<T extends HospitalOnlineDayAggregateArgs> = {
    [P in keyof T & keyof AggregateHospitalOnlineDay]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHospitalOnlineDay[P]> : Prisma.GetScalarType<T[P], AggregateHospitalOnlineDay[P]>;
};
export type HospitalOnlineDayGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HospitalOnlineDayWhereInput;
    orderBy?: Prisma.HospitalOnlineDayOrderByWithAggregationInput | Prisma.HospitalOnlineDayOrderByWithAggregationInput[];
    by: Prisma.HospitalOnlineDayScalarFieldEnum[] | Prisma.HospitalOnlineDayScalarFieldEnum;
    having?: Prisma.HospitalOnlineDayScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HospitalOnlineDayCountAggregateInputType | true;
    _avg?: HospitalOnlineDayAvgAggregateInputType;
    _sum?: HospitalOnlineDaySumAggregateInputType;
    _min?: HospitalOnlineDayMinAggregateInputType;
    _max?: HospitalOnlineDayMaxAggregateInputType;
};
export type HospitalOnlineDayGroupByOutputType = {
    id: string;
    hospitalId: string;
    date: Date;
    kind: string;
    onlineTotal: number;
    onlineCount: number;
    closedAt: Date;
    createdAt: Date;
    _count: HospitalOnlineDayCountAggregateOutputType | null;
    _avg: HospitalOnlineDayAvgAggregateOutputType | null;
    _sum: HospitalOnlineDaySumAggregateOutputType | null;
    _min: HospitalOnlineDayMinAggregateOutputType | null;
    _max: HospitalOnlineDayMaxAggregateOutputType | null;
};
type GetHospitalOnlineDayGroupByPayload<T extends HospitalOnlineDayGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HospitalOnlineDayGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HospitalOnlineDayGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HospitalOnlineDayGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HospitalOnlineDayGroupByOutputType[P]>;
}>>;
export type HospitalOnlineDayWhereInput = {
    AND?: Prisma.HospitalOnlineDayWhereInput | Prisma.HospitalOnlineDayWhereInput[];
    OR?: Prisma.HospitalOnlineDayWhereInput[];
    NOT?: Prisma.HospitalOnlineDayWhereInput | Prisma.HospitalOnlineDayWhereInput[];
    id?: Prisma.StringFilter<"HospitalOnlineDay"> | string;
    hospitalId?: Prisma.StringFilter<"HospitalOnlineDay"> | string;
    date?: Prisma.DateTimeFilter<"HospitalOnlineDay"> | Date | string;
    kind?: Prisma.StringFilter<"HospitalOnlineDay"> | string;
    onlineTotal?: Prisma.FloatFilter<"HospitalOnlineDay"> | number;
    onlineCount?: Prisma.IntFilter<"HospitalOnlineDay"> | number;
    closedAt?: Prisma.DateTimeFilter<"HospitalOnlineDay"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"HospitalOnlineDay"> | Date | string;
    hospital?: Prisma.XOR<Prisma.HospitalScalarRelationFilter, Prisma.HospitalWhereInput>;
};
export type HospitalOnlineDayOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    onlineTotal?: Prisma.SortOrder;
    onlineCount?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    hospital?: Prisma.HospitalOrderByWithRelationInput;
};
export type HospitalOnlineDayWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    hospitalId_date?: Prisma.HospitalOnlineDayHospitalIdDateCompoundUniqueInput;
    AND?: Prisma.HospitalOnlineDayWhereInput | Prisma.HospitalOnlineDayWhereInput[];
    OR?: Prisma.HospitalOnlineDayWhereInput[];
    NOT?: Prisma.HospitalOnlineDayWhereInput | Prisma.HospitalOnlineDayWhereInput[];
    hospitalId?: Prisma.StringFilter<"HospitalOnlineDay"> | string;
    date?: Prisma.DateTimeFilter<"HospitalOnlineDay"> | Date | string;
    kind?: Prisma.StringFilter<"HospitalOnlineDay"> | string;
    onlineTotal?: Prisma.FloatFilter<"HospitalOnlineDay"> | number;
    onlineCount?: Prisma.IntFilter<"HospitalOnlineDay"> | number;
    closedAt?: Prisma.DateTimeFilter<"HospitalOnlineDay"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"HospitalOnlineDay"> | Date | string;
    hospital?: Prisma.XOR<Prisma.HospitalScalarRelationFilter, Prisma.HospitalWhereInput>;
}, "id" | "hospitalId_date">;
export type HospitalOnlineDayOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    onlineTotal?: Prisma.SortOrder;
    onlineCount?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.HospitalOnlineDayCountOrderByAggregateInput;
    _avg?: Prisma.HospitalOnlineDayAvgOrderByAggregateInput;
    _max?: Prisma.HospitalOnlineDayMaxOrderByAggregateInput;
    _min?: Prisma.HospitalOnlineDayMinOrderByAggregateInput;
    _sum?: Prisma.HospitalOnlineDaySumOrderByAggregateInput;
};
export type HospitalOnlineDayScalarWhereWithAggregatesInput = {
    AND?: Prisma.HospitalOnlineDayScalarWhereWithAggregatesInput | Prisma.HospitalOnlineDayScalarWhereWithAggregatesInput[];
    OR?: Prisma.HospitalOnlineDayScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HospitalOnlineDayScalarWhereWithAggregatesInput | Prisma.HospitalOnlineDayScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"HospitalOnlineDay"> | string;
    hospitalId?: Prisma.StringWithAggregatesFilter<"HospitalOnlineDay"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"HospitalOnlineDay"> | Date | string;
    kind?: Prisma.StringWithAggregatesFilter<"HospitalOnlineDay"> | string;
    onlineTotal?: Prisma.FloatWithAggregatesFilter<"HospitalOnlineDay"> | number;
    onlineCount?: Prisma.IntWithAggregatesFilter<"HospitalOnlineDay"> | number;
    closedAt?: Prisma.DateTimeWithAggregatesFilter<"HospitalOnlineDay"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"HospitalOnlineDay"> | Date | string;
};
export type HospitalOnlineDayCreateInput = {
    id?: string;
    date: Date | string;
    kind?: string;
    onlineTotal?: number;
    onlineCount?: number;
    closedAt?: Date | string;
    createdAt?: Date | string;
    hospital: Prisma.HospitalCreateNestedOneWithoutOnlineDaysInput;
};
export type HospitalOnlineDayUncheckedCreateInput = {
    id?: string;
    hospitalId: string;
    date: Date | string;
    kind?: string;
    onlineTotal?: number;
    onlineCount?: number;
    closedAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalOnlineDayUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    onlineTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    onlineCount?: Prisma.IntFieldUpdateOperationsInput | number;
    closedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hospital?: Prisma.HospitalUpdateOneRequiredWithoutOnlineDaysNestedInput;
};
export type HospitalOnlineDayUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hospitalId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    onlineTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    onlineCount?: Prisma.IntFieldUpdateOperationsInput | number;
    closedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalOnlineDayCreateManyInput = {
    id?: string;
    hospitalId: string;
    date: Date | string;
    kind?: string;
    onlineTotal?: number;
    onlineCount?: number;
    closedAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalOnlineDayUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    onlineTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    onlineCount?: Prisma.IntFieldUpdateOperationsInput | number;
    closedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalOnlineDayUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hospitalId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    onlineTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    onlineCount?: Prisma.IntFieldUpdateOperationsInput | number;
    closedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalOnlineDayListRelationFilter = {
    every?: Prisma.HospitalOnlineDayWhereInput;
    some?: Prisma.HospitalOnlineDayWhereInput;
    none?: Prisma.HospitalOnlineDayWhereInput;
};
export type HospitalOnlineDayOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HospitalOnlineDayHospitalIdDateCompoundUniqueInput = {
    hospitalId: string;
    date: Date | string;
};
export type HospitalOnlineDayCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    onlineTotal?: Prisma.SortOrder;
    onlineCount?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HospitalOnlineDayAvgOrderByAggregateInput = {
    onlineTotal?: Prisma.SortOrder;
    onlineCount?: Prisma.SortOrder;
};
export type HospitalOnlineDayMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    onlineTotal?: Prisma.SortOrder;
    onlineCount?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HospitalOnlineDayMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    onlineTotal?: Prisma.SortOrder;
    onlineCount?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HospitalOnlineDaySumOrderByAggregateInput = {
    onlineTotal?: Prisma.SortOrder;
    onlineCount?: Prisma.SortOrder;
};
export type HospitalOnlineDayCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.HospitalOnlineDayCreateWithoutHospitalInput, Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput> | Prisma.HospitalOnlineDayCreateWithoutHospitalInput[] | Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.HospitalOnlineDayCreateOrConnectWithoutHospitalInput | Prisma.HospitalOnlineDayCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.HospitalOnlineDayCreateManyHospitalInputEnvelope;
    connect?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
};
export type HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.HospitalOnlineDayCreateWithoutHospitalInput, Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput> | Prisma.HospitalOnlineDayCreateWithoutHospitalInput[] | Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.HospitalOnlineDayCreateOrConnectWithoutHospitalInput | Prisma.HospitalOnlineDayCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.HospitalOnlineDayCreateManyHospitalInputEnvelope;
    connect?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
};
export type HospitalOnlineDayUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalOnlineDayCreateWithoutHospitalInput, Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput> | Prisma.HospitalOnlineDayCreateWithoutHospitalInput[] | Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.HospitalOnlineDayCreateOrConnectWithoutHospitalInput | Prisma.HospitalOnlineDayCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.HospitalOnlineDayUpsertWithWhereUniqueWithoutHospitalInput | Prisma.HospitalOnlineDayUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.HospitalOnlineDayCreateManyHospitalInputEnvelope;
    set?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
    disconnect?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
    delete?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
    connect?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
    update?: Prisma.HospitalOnlineDayUpdateWithWhereUniqueWithoutHospitalInput | Prisma.HospitalOnlineDayUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.HospitalOnlineDayUpdateManyWithWhereWithoutHospitalInput | Prisma.HospitalOnlineDayUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.HospitalOnlineDayScalarWhereInput | Prisma.HospitalOnlineDayScalarWhereInput[];
};
export type HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalOnlineDayCreateWithoutHospitalInput, Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput> | Prisma.HospitalOnlineDayCreateWithoutHospitalInput[] | Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.HospitalOnlineDayCreateOrConnectWithoutHospitalInput | Prisma.HospitalOnlineDayCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.HospitalOnlineDayUpsertWithWhereUniqueWithoutHospitalInput | Prisma.HospitalOnlineDayUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.HospitalOnlineDayCreateManyHospitalInputEnvelope;
    set?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
    disconnect?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
    delete?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
    connect?: Prisma.HospitalOnlineDayWhereUniqueInput | Prisma.HospitalOnlineDayWhereUniqueInput[];
    update?: Prisma.HospitalOnlineDayUpdateWithWhereUniqueWithoutHospitalInput | Prisma.HospitalOnlineDayUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.HospitalOnlineDayUpdateManyWithWhereWithoutHospitalInput | Prisma.HospitalOnlineDayUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.HospitalOnlineDayScalarWhereInput | Prisma.HospitalOnlineDayScalarWhereInput[];
};
export type HospitalOnlineDayCreateWithoutHospitalInput = {
    id?: string;
    date: Date | string;
    kind?: string;
    onlineTotal?: number;
    onlineCount?: number;
    closedAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalOnlineDayUncheckedCreateWithoutHospitalInput = {
    id?: string;
    date: Date | string;
    kind?: string;
    onlineTotal?: number;
    onlineCount?: number;
    closedAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalOnlineDayCreateOrConnectWithoutHospitalInput = {
    where: Prisma.HospitalOnlineDayWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalOnlineDayCreateWithoutHospitalInput, Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput>;
};
export type HospitalOnlineDayCreateManyHospitalInputEnvelope = {
    data: Prisma.HospitalOnlineDayCreateManyHospitalInput | Prisma.HospitalOnlineDayCreateManyHospitalInput[];
    skipDuplicates?: boolean;
};
export type HospitalOnlineDayUpsertWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.HospitalOnlineDayWhereUniqueInput;
    update: Prisma.XOR<Prisma.HospitalOnlineDayUpdateWithoutHospitalInput, Prisma.HospitalOnlineDayUncheckedUpdateWithoutHospitalInput>;
    create: Prisma.XOR<Prisma.HospitalOnlineDayCreateWithoutHospitalInput, Prisma.HospitalOnlineDayUncheckedCreateWithoutHospitalInput>;
};
export type HospitalOnlineDayUpdateWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.HospitalOnlineDayWhereUniqueInput;
    data: Prisma.XOR<Prisma.HospitalOnlineDayUpdateWithoutHospitalInput, Prisma.HospitalOnlineDayUncheckedUpdateWithoutHospitalInput>;
};
export type HospitalOnlineDayUpdateManyWithWhereWithoutHospitalInput = {
    where: Prisma.HospitalOnlineDayScalarWhereInput;
    data: Prisma.XOR<Prisma.HospitalOnlineDayUpdateManyMutationInput, Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalInput>;
};
export type HospitalOnlineDayScalarWhereInput = {
    AND?: Prisma.HospitalOnlineDayScalarWhereInput | Prisma.HospitalOnlineDayScalarWhereInput[];
    OR?: Prisma.HospitalOnlineDayScalarWhereInput[];
    NOT?: Prisma.HospitalOnlineDayScalarWhereInput | Prisma.HospitalOnlineDayScalarWhereInput[];
    id?: Prisma.StringFilter<"HospitalOnlineDay"> | string;
    hospitalId?: Prisma.StringFilter<"HospitalOnlineDay"> | string;
    date?: Prisma.DateTimeFilter<"HospitalOnlineDay"> | Date | string;
    kind?: Prisma.StringFilter<"HospitalOnlineDay"> | string;
    onlineTotal?: Prisma.FloatFilter<"HospitalOnlineDay"> | number;
    onlineCount?: Prisma.IntFilter<"HospitalOnlineDay"> | number;
    closedAt?: Prisma.DateTimeFilter<"HospitalOnlineDay"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"HospitalOnlineDay"> | Date | string;
};
export type HospitalOnlineDayCreateManyHospitalInput = {
    id?: string;
    date: Date | string;
    kind?: string;
    onlineTotal?: number;
    onlineCount?: number;
    closedAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalOnlineDayUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    onlineTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    onlineCount?: Prisma.IntFieldUpdateOperationsInput | number;
    closedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalOnlineDayUncheckedUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    onlineTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    onlineCount?: Prisma.IntFieldUpdateOperationsInput | number;
    closedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalOnlineDayUncheckedUpdateManyWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    kind?: Prisma.StringFieldUpdateOperationsInput | string;
    onlineTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    onlineCount?: Prisma.IntFieldUpdateOperationsInput | number;
    closedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalOnlineDaySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hospitalId?: boolean;
    date?: boolean;
    kind?: boolean;
    onlineTotal?: boolean;
    onlineCount?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hospitalOnlineDay"]>;
export type HospitalOnlineDaySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hospitalId?: boolean;
    date?: boolean;
    kind?: boolean;
    onlineTotal?: boolean;
    onlineCount?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hospitalOnlineDay"]>;
export type HospitalOnlineDaySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hospitalId?: boolean;
    date?: boolean;
    kind?: boolean;
    onlineTotal?: boolean;
    onlineCount?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hospitalOnlineDay"]>;
export type HospitalOnlineDaySelectScalar = {
    id?: boolean;
    hospitalId?: boolean;
    date?: boolean;
    kind?: boolean;
    onlineTotal?: boolean;
    onlineCount?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
};
export type HospitalOnlineDayOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hospitalId" | "date" | "kind" | "onlineTotal" | "onlineCount" | "closedAt" | "createdAt", ExtArgs["result"]["hospitalOnlineDay"]>;
export type HospitalOnlineDayInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
};
export type HospitalOnlineDayIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
};
export type HospitalOnlineDayIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
};
export type $HospitalOnlineDayPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HospitalOnlineDay";
    objects: {
        hospital: Prisma.$HospitalPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        hospitalId: string;
        date: Date;
        kind: string;
        onlineTotal: number;
        onlineCount: number;
        closedAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["hospitalOnlineDay"]>;
    composites: {};
};
export type HospitalOnlineDayGetPayload<S extends boolean | null | undefined | HospitalOnlineDayDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload, S>;
export type HospitalOnlineDayCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HospitalOnlineDayFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HospitalOnlineDayCountAggregateInputType | true;
};
export interface HospitalOnlineDayDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HospitalOnlineDay'];
        meta: {
            name: 'HospitalOnlineDay';
        };
    };
    /**
     * Find zero or one HospitalOnlineDay that matches the filter.
     * @param {HospitalOnlineDayFindUniqueArgs} args - Arguments to find a HospitalOnlineDay
     * @example
     * // Get one HospitalOnlineDay
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalOnlineDayFindUniqueArgs>(args: Prisma.SelectSubset<T, HospitalOnlineDayFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HospitalOnlineDayClient<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one HospitalOnlineDay that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalOnlineDayFindUniqueOrThrowArgs} args - Arguments to find a HospitalOnlineDay
     * @example
     * // Get one HospitalOnlineDay
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalOnlineDayFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HospitalOnlineDayFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HospitalOnlineDayClient<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first HospitalOnlineDay that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalOnlineDayFindFirstArgs} args - Arguments to find a HospitalOnlineDay
     * @example
     * // Get one HospitalOnlineDay
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalOnlineDayFindFirstArgs>(args?: Prisma.SelectSubset<T, HospitalOnlineDayFindFirstArgs<ExtArgs>>): Prisma.Prisma__HospitalOnlineDayClient<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first HospitalOnlineDay that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalOnlineDayFindFirstOrThrowArgs} args - Arguments to find a HospitalOnlineDay
     * @example
     * // Get one HospitalOnlineDay
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalOnlineDayFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HospitalOnlineDayFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HospitalOnlineDayClient<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more HospitalOnlineDays that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalOnlineDayFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HospitalOnlineDays
     * const hospitalOnlineDays = await prisma.hospitalOnlineDay.findMany()
     *
     * // Get first 10 HospitalOnlineDays
     * const hospitalOnlineDays = await prisma.hospitalOnlineDay.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const hospitalOnlineDayWithIdOnly = await prisma.hospitalOnlineDay.findMany({ select: { id: true } })
     *
     */
    findMany<T extends HospitalOnlineDayFindManyArgs>(args?: Prisma.SelectSubset<T, HospitalOnlineDayFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a HospitalOnlineDay.
     * @param {HospitalOnlineDayCreateArgs} args - Arguments to create a HospitalOnlineDay.
     * @example
     * // Create one HospitalOnlineDay
     * const HospitalOnlineDay = await prisma.hospitalOnlineDay.create({
     *   data: {
     *     // ... data to create a HospitalOnlineDay
     *   }
     * })
     *
     */
    create<T extends HospitalOnlineDayCreateArgs>(args: Prisma.SelectSubset<T, HospitalOnlineDayCreateArgs<ExtArgs>>): Prisma.Prisma__HospitalOnlineDayClient<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many HospitalOnlineDays.
     * @param {HospitalOnlineDayCreateManyArgs} args - Arguments to create many HospitalOnlineDays.
     * @example
     * // Create many HospitalOnlineDays
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HospitalOnlineDayCreateManyArgs>(args?: Prisma.SelectSubset<T, HospitalOnlineDayCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many HospitalOnlineDays and returns the data saved in the database.
     * @param {HospitalOnlineDayCreateManyAndReturnArgs} args - Arguments to create many HospitalOnlineDays.
     * @example
     * // Create many HospitalOnlineDays
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many HospitalOnlineDays and only return the `id`
     * const hospitalOnlineDayWithIdOnly = await prisma.hospitalOnlineDay.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends HospitalOnlineDayCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HospitalOnlineDayCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a HospitalOnlineDay.
     * @param {HospitalOnlineDayDeleteArgs} args - Arguments to delete one HospitalOnlineDay.
     * @example
     * // Delete one HospitalOnlineDay
     * const HospitalOnlineDay = await prisma.hospitalOnlineDay.delete({
     *   where: {
     *     // ... filter to delete one HospitalOnlineDay
     *   }
     * })
     *
     */
    delete<T extends HospitalOnlineDayDeleteArgs>(args: Prisma.SelectSubset<T, HospitalOnlineDayDeleteArgs<ExtArgs>>): Prisma.Prisma__HospitalOnlineDayClient<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one HospitalOnlineDay.
     * @param {HospitalOnlineDayUpdateArgs} args - Arguments to update one HospitalOnlineDay.
     * @example
     * // Update one HospitalOnlineDay
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HospitalOnlineDayUpdateArgs>(args: Prisma.SelectSubset<T, HospitalOnlineDayUpdateArgs<ExtArgs>>): Prisma.Prisma__HospitalOnlineDayClient<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more HospitalOnlineDays.
     * @param {HospitalOnlineDayDeleteManyArgs} args - Arguments to filter HospitalOnlineDays to delete.
     * @example
     * // Delete a few HospitalOnlineDays
     * const { count } = await prisma.hospitalOnlineDay.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HospitalOnlineDayDeleteManyArgs>(args?: Prisma.SelectSubset<T, HospitalOnlineDayDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more HospitalOnlineDays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalOnlineDayUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HospitalOnlineDays
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HospitalOnlineDayUpdateManyArgs>(args: Prisma.SelectSubset<T, HospitalOnlineDayUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more HospitalOnlineDays and returns the data updated in the database.
     * @param {HospitalOnlineDayUpdateManyAndReturnArgs} args - Arguments to update many HospitalOnlineDays.
     * @example
     * // Update many HospitalOnlineDays
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more HospitalOnlineDays and only return the `id`
     * const hospitalOnlineDayWithIdOnly = await prisma.hospitalOnlineDay.updateManyAndReturn({
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
    updateManyAndReturn<T extends HospitalOnlineDayUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HospitalOnlineDayUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one HospitalOnlineDay.
     * @param {HospitalOnlineDayUpsertArgs} args - Arguments to update or create a HospitalOnlineDay.
     * @example
     * // Update or create a HospitalOnlineDay
     * const hospitalOnlineDay = await prisma.hospitalOnlineDay.upsert({
     *   create: {
     *     // ... data to create a HospitalOnlineDay
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HospitalOnlineDay we want to update
     *   }
     * })
     */
    upsert<T extends HospitalOnlineDayUpsertArgs>(args: Prisma.SelectSubset<T, HospitalOnlineDayUpsertArgs<ExtArgs>>): Prisma.Prisma__HospitalOnlineDayClient<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of HospitalOnlineDays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalOnlineDayCountArgs} args - Arguments to filter HospitalOnlineDays to count.
     * @example
     * // Count the number of HospitalOnlineDays
     * const count = await prisma.hospitalOnlineDay.count({
     *   where: {
     *     // ... the filter for the HospitalOnlineDays we want to count
     *   }
     * })
    **/
    count<T extends HospitalOnlineDayCountArgs>(args?: Prisma.Subset<T, HospitalOnlineDayCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HospitalOnlineDayCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a HospitalOnlineDay.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalOnlineDayAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HospitalOnlineDayAggregateArgs>(args: Prisma.Subset<T, HospitalOnlineDayAggregateArgs>): Prisma.PrismaPromise<GetHospitalOnlineDayAggregateType<T>>;
    /**
     * Group by HospitalOnlineDay.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalOnlineDayGroupByArgs} args - Group by arguments.
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
    groupBy<T extends HospitalOnlineDayGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HospitalOnlineDayGroupByArgs['orderBy'];
    } : {
        orderBy?: HospitalOnlineDayGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HospitalOnlineDayGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalOnlineDayGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the HospitalOnlineDay model
     */
    readonly fields: HospitalOnlineDayFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for HospitalOnlineDay.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__HospitalOnlineDayClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    hospital<T extends Prisma.HospitalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.HospitalDefaultArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the HospitalOnlineDay model
 */
export interface HospitalOnlineDayFieldRefs {
    readonly id: Prisma.FieldRef<"HospitalOnlineDay", 'String'>;
    readonly hospitalId: Prisma.FieldRef<"HospitalOnlineDay", 'String'>;
    readonly date: Prisma.FieldRef<"HospitalOnlineDay", 'DateTime'>;
    readonly kind: Prisma.FieldRef<"HospitalOnlineDay", 'String'>;
    readonly onlineTotal: Prisma.FieldRef<"HospitalOnlineDay", 'Float'>;
    readonly onlineCount: Prisma.FieldRef<"HospitalOnlineDay", 'Int'>;
    readonly closedAt: Prisma.FieldRef<"HospitalOnlineDay", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"HospitalOnlineDay", 'DateTime'>;
}
/**
 * HospitalOnlineDay findUnique
 */
export type HospitalOnlineDayFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalOnlineDay to fetch.
     */
    where: Prisma.HospitalOnlineDayWhereUniqueInput;
};
/**
 * HospitalOnlineDay findUniqueOrThrow
 */
export type HospitalOnlineDayFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalOnlineDay to fetch.
     */
    where: Prisma.HospitalOnlineDayWhereUniqueInput;
};
/**
 * HospitalOnlineDay findFirst
 */
export type HospitalOnlineDayFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalOnlineDay to fetch.
     */
    where?: Prisma.HospitalOnlineDayWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HospitalOnlineDays to fetch.
     */
    orderBy?: Prisma.HospitalOnlineDayOrderByWithRelationInput | Prisma.HospitalOnlineDayOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for HospitalOnlineDays.
     */
    cursor?: Prisma.HospitalOnlineDayWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HospitalOnlineDays from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HospitalOnlineDays.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of HospitalOnlineDays.
     */
    distinct?: Prisma.HospitalOnlineDayScalarFieldEnum | Prisma.HospitalOnlineDayScalarFieldEnum[];
};
/**
 * HospitalOnlineDay findFirstOrThrow
 */
export type HospitalOnlineDayFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalOnlineDay to fetch.
     */
    where?: Prisma.HospitalOnlineDayWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HospitalOnlineDays to fetch.
     */
    orderBy?: Prisma.HospitalOnlineDayOrderByWithRelationInput | Prisma.HospitalOnlineDayOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for HospitalOnlineDays.
     */
    cursor?: Prisma.HospitalOnlineDayWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HospitalOnlineDays from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HospitalOnlineDays.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of HospitalOnlineDays.
     */
    distinct?: Prisma.HospitalOnlineDayScalarFieldEnum | Prisma.HospitalOnlineDayScalarFieldEnum[];
};
/**
 * HospitalOnlineDay findMany
 */
export type HospitalOnlineDayFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalOnlineDays to fetch.
     */
    where?: Prisma.HospitalOnlineDayWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HospitalOnlineDays to fetch.
     */
    orderBy?: Prisma.HospitalOnlineDayOrderByWithRelationInput | Prisma.HospitalOnlineDayOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing HospitalOnlineDays.
     */
    cursor?: Prisma.HospitalOnlineDayWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HospitalOnlineDays from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HospitalOnlineDays.
     */
    skip?: number;
    distinct?: Prisma.HospitalOnlineDayScalarFieldEnum | Prisma.HospitalOnlineDayScalarFieldEnum[];
};
/**
 * HospitalOnlineDay create
 */
export type HospitalOnlineDayCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
    /**
     * The data needed to create a HospitalOnlineDay.
     */
    data: Prisma.XOR<Prisma.HospitalOnlineDayCreateInput, Prisma.HospitalOnlineDayUncheckedCreateInput>;
};
/**
 * HospitalOnlineDay createMany
 */
export type HospitalOnlineDayCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many HospitalOnlineDays.
     */
    data: Prisma.HospitalOnlineDayCreateManyInput | Prisma.HospitalOnlineDayCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * HospitalOnlineDay createManyAndReturn
 */
export type HospitalOnlineDayCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * The data used to create many HospitalOnlineDays.
     */
    data: Prisma.HospitalOnlineDayCreateManyInput | Prisma.HospitalOnlineDayCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * HospitalOnlineDay update
 */
export type HospitalOnlineDayUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
    /**
     * The data needed to update a HospitalOnlineDay.
     */
    data: Prisma.XOR<Prisma.HospitalOnlineDayUpdateInput, Prisma.HospitalOnlineDayUncheckedUpdateInput>;
    /**
     * Choose, which HospitalOnlineDay to update.
     */
    where: Prisma.HospitalOnlineDayWhereUniqueInput;
};
/**
 * HospitalOnlineDay updateMany
 */
export type HospitalOnlineDayUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update HospitalOnlineDays.
     */
    data: Prisma.XOR<Prisma.HospitalOnlineDayUpdateManyMutationInput, Prisma.HospitalOnlineDayUncheckedUpdateManyInput>;
    /**
     * Filter which HospitalOnlineDays to update
     */
    where?: Prisma.HospitalOnlineDayWhereInput;
    /**
     * Limit how many HospitalOnlineDays to update.
     */
    limit?: number;
};
/**
 * HospitalOnlineDay updateManyAndReturn
 */
export type HospitalOnlineDayUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * The data used to update HospitalOnlineDays.
     */
    data: Prisma.XOR<Prisma.HospitalOnlineDayUpdateManyMutationInput, Prisma.HospitalOnlineDayUncheckedUpdateManyInput>;
    /**
     * Filter which HospitalOnlineDays to update
     */
    where?: Prisma.HospitalOnlineDayWhereInput;
    /**
     * Limit how many HospitalOnlineDays to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * HospitalOnlineDay upsert
 */
export type HospitalOnlineDayUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
    /**
     * The filter to search for the HospitalOnlineDay to update in case it exists.
     */
    where: Prisma.HospitalOnlineDayWhereUniqueInput;
    /**
     * In case the HospitalOnlineDay found by the `where` argument doesn't exist, create a new HospitalOnlineDay with this data.
     */
    create: Prisma.XOR<Prisma.HospitalOnlineDayCreateInput, Prisma.HospitalOnlineDayUncheckedCreateInput>;
    /**
     * In case the HospitalOnlineDay was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.HospitalOnlineDayUpdateInput, Prisma.HospitalOnlineDayUncheckedUpdateInput>;
};
/**
 * HospitalOnlineDay delete
 */
export type HospitalOnlineDayDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
    /**
     * Filter which HospitalOnlineDay to delete.
     */
    where: Prisma.HospitalOnlineDayWhereUniqueInput;
};
/**
 * HospitalOnlineDay deleteMany
 */
export type HospitalOnlineDayDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalOnlineDays to delete
     */
    where?: Prisma.HospitalOnlineDayWhereInput;
    /**
     * Limit how many HospitalOnlineDays to delete.
     */
    limit?: number;
};
/**
 * HospitalOnlineDay without action
 */
export type HospitalOnlineDayDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalOnlineDay
     */
    select?: Prisma.HospitalOnlineDaySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalOnlineDay
     */
    omit?: Prisma.HospitalOnlineDayOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalOnlineDayInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=HospitalOnlineDay.d.ts.map