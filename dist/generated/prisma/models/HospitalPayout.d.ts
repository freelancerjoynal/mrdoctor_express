import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model HospitalPayout
 *
 */
export type HospitalPayoutModel = runtime.Types.Result.DefaultSelection<Prisma.$HospitalPayoutPayload>;
export type AggregateHospitalPayout = {
    _count: HospitalPayoutCountAggregateOutputType | null;
    _avg: HospitalPayoutAvgAggregateOutputType | null;
    _sum: HospitalPayoutSumAggregateOutputType | null;
    _min: HospitalPayoutMinAggregateOutputType | null;
    _max: HospitalPayoutMaxAggregateOutputType | null;
};
export type HospitalPayoutAvgAggregateOutputType = {
    amount: number | null;
};
export type HospitalPayoutSumAggregateOutputType = {
    amount: number | null;
};
export type HospitalPayoutMinAggregateOutputType = {
    id: string | null;
    hospitalId: string | null;
    amount: number | null;
    method: string | null;
    note: string | null;
    paidBy: string | null;
    paidByName: string | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type HospitalPayoutMaxAggregateOutputType = {
    id: string | null;
    hospitalId: string | null;
    amount: number | null;
    method: string | null;
    note: string | null;
    paidBy: string | null;
    paidByName: string | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type HospitalPayoutCountAggregateOutputType = {
    id: number;
    hospitalId: number;
    amount: number;
    method: number;
    note: number;
    paidBy: number;
    paidByName: number;
    paidAt: number;
    createdAt: number;
    _all: number;
};
export type HospitalPayoutAvgAggregateInputType = {
    amount?: true;
};
export type HospitalPayoutSumAggregateInputType = {
    amount?: true;
};
export type HospitalPayoutMinAggregateInputType = {
    id?: true;
    hospitalId?: true;
    amount?: true;
    method?: true;
    note?: true;
    paidBy?: true;
    paidByName?: true;
    paidAt?: true;
    createdAt?: true;
};
export type HospitalPayoutMaxAggregateInputType = {
    id?: true;
    hospitalId?: true;
    amount?: true;
    method?: true;
    note?: true;
    paidBy?: true;
    paidByName?: true;
    paidAt?: true;
    createdAt?: true;
};
export type HospitalPayoutCountAggregateInputType = {
    id?: true;
    hospitalId?: true;
    amount?: true;
    method?: true;
    note?: true;
    paidBy?: true;
    paidByName?: true;
    paidAt?: true;
    createdAt?: true;
    _all?: true;
};
export type HospitalPayoutAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalPayout to aggregate.
     */
    where?: Prisma.HospitalPayoutWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HospitalPayouts to fetch.
     */
    orderBy?: Prisma.HospitalPayoutOrderByWithRelationInput | Prisma.HospitalPayoutOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.HospitalPayoutWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HospitalPayouts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HospitalPayouts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned HospitalPayouts
    **/
    _count?: true | HospitalPayoutCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: HospitalPayoutAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: HospitalPayoutSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: HospitalPayoutMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: HospitalPayoutMaxAggregateInputType;
};
export type GetHospitalPayoutAggregateType<T extends HospitalPayoutAggregateArgs> = {
    [P in keyof T & keyof AggregateHospitalPayout]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHospitalPayout[P]> : Prisma.GetScalarType<T[P], AggregateHospitalPayout[P]>;
};
export type HospitalPayoutGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HospitalPayoutWhereInput;
    orderBy?: Prisma.HospitalPayoutOrderByWithAggregationInput | Prisma.HospitalPayoutOrderByWithAggregationInput[];
    by: Prisma.HospitalPayoutScalarFieldEnum[] | Prisma.HospitalPayoutScalarFieldEnum;
    having?: Prisma.HospitalPayoutScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HospitalPayoutCountAggregateInputType | true;
    _avg?: HospitalPayoutAvgAggregateInputType;
    _sum?: HospitalPayoutSumAggregateInputType;
    _min?: HospitalPayoutMinAggregateInputType;
    _max?: HospitalPayoutMaxAggregateInputType;
};
export type HospitalPayoutGroupByOutputType = {
    id: string;
    hospitalId: string;
    amount: number;
    method: string | null;
    note: string | null;
    paidBy: string;
    paidByName: string | null;
    paidAt: Date;
    createdAt: Date;
    _count: HospitalPayoutCountAggregateOutputType | null;
    _avg: HospitalPayoutAvgAggregateOutputType | null;
    _sum: HospitalPayoutSumAggregateOutputType | null;
    _min: HospitalPayoutMinAggregateOutputType | null;
    _max: HospitalPayoutMaxAggregateOutputType | null;
};
type GetHospitalPayoutGroupByPayload<T extends HospitalPayoutGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HospitalPayoutGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HospitalPayoutGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HospitalPayoutGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HospitalPayoutGroupByOutputType[P]>;
}>>;
export type HospitalPayoutWhereInput = {
    AND?: Prisma.HospitalPayoutWhereInput | Prisma.HospitalPayoutWhereInput[];
    OR?: Prisma.HospitalPayoutWhereInput[];
    NOT?: Prisma.HospitalPayoutWhereInput | Prisma.HospitalPayoutWhereInput[];
    id?: Prisma.StringFilter<"HospitalPayout"> | string;
    hospitalId?: Prisma.StringFilter<"HospitalPayout"> | string;
    amount?: Prisma.FloatFilter<"HospitalPayout"> | number;
    method?: Prisma.StringNullableFilter<"HospitalPayout"> | string | null;
    note?: Prisma.StringNullableFilter<"HospitalPayout"> | string | null;
    paidBy?: Prisma.StringFilter<"HospitalPayout"> | string;
    paidByName?: Prisma.StringNullableFilter<"HospitalPayout"> | string | null;
    paidAt?: Prisma.DateTimeFilter<"HospitalPayout"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"HospitalPayout"> | Date | string;
    hospital?: Prisma.XOR<Prisma.HospitalScalarRelationFilter, Prisma.HospitalWhereInput>;
};
export type HospitalPayoutOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidBy?: Prisma.SortOrder;
    paidByName?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    hospital?: Prisma.HospitalOrderByWithRelationInput;
};
export type HospitalPayoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.HospitalPayoutWhereInput | Prisma.HospitalPayoutWhereInput[];
    OR?: Prisma.HospitalPayoutWhereInput[];
    NOT?: Prisma.HospitalPayoutWhereInput | Prisma.HospitalPayoutWhereInput[];
    hospitalId?: Prisma.StringFilter<"HospitalPayout"> | string;
    amount?: Prisma.FloatFilter<"HospitalPayout"> | number;
    method?: Prisma.StringNullableFilter<"HospitalPayout"> | string | null;
    note?: Prisma.StringNullableFilter<"HospitalPayout"> | string | null;
    paidBy?: Prisma.StringFilter<"HospitalPayout"> | string;
    paidByName?: Prisma.StringNullableFilter<"HospitalPayout"> | string | null;
    paidAt?: Prisma.DateTimeFilter<"HospitalPayout"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"HospitalPayout"> | Date | string;
    hospital?: Prisma.XOR<Prisma.HospitalScalarRelationFilter, Prisma.HospitalWhereInput>;
}, "id">;
export type HospitalPayoutOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidBy?: Prisma.SortOrder;
    paidByName?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.HospitalPayoutCountOrderByAggregateInput;
    _avg?: Prisma.HospitalPayoutAvgOrderByAggregateInput;
    _max?: Prisma.HospitalPayoutMaxOrderByAggregateInput;
    _min?: Prisma.HospitalPayoutMinOrderByAggregateInput;
    _sum?: Prisma.HospitalPayoutSumOrderByAggregateInput;
};
export type HospitalPayoutScalarWhereWithAggregatesInput = {
    AND?: Prisma.HospitalPayoutScalarWhereWithAggregatesInput | Prisma.HospitalPayoutScalarWhereWithAggregatesInput[];
    OR?: Prisma.HospitalPayoutScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HospitalPayoutScalarWhereWithAggregatesInput | Prisma.HospitalPayoutScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"HospitalPayout"> | string;
    hospitalId?: Prisma.StringWithAggregatesFilter<"HospitalPayout"> | string;
    amount?: Prisma.FloatWithAggregatesFilter<"HospitalPayout"> | number;
    method?: Prisma.StringNullableWithAggregatesFilter<"HospitalPayout"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"HospitalPayout"> | string | null;
    paidBy?: Prisma.StringWithAggregatesFilter<"HospitalPayout"> | string;
    paidByName?: Prisma.StringNullableWithAggregatesFilter<"HospitalPayout"> | string | null;
    paidAt?: Prisma.DateTimeWithAggregatesFilter<"HospitalPayout"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"HospitalPayout"> | Date | string;
};
export type HospitalPayoutCreateInput = {
    id?: string;
    amount: number;
    method?: string | null;
    note?: string | null;
    paidBy: string;
    paidByName?: string | null;
    paidAt?: Date | string;
    createdAt?: Date | string;
    hospital: Prisma.HospitalCreateNestedOneWithoutPayoutsInput;
};
export type HospitalPayoutUncheckedCreateInput = {
    id?: string;
    hospitalId: string;
    amount: number;
    method?: string | null;
    note?: string | null;
    paidBy: string;
    paidByName?: string | null;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalPayoutUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    method?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidBy?: Prisma.StringFieldUpdateOperationsInput | string;
    paidByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hospital?: Prisma.HospitalUpdateOneRequiredWithoutPayoutsNestedInput;
};
export type HospitalPayoutUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hospitalId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    method?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidBy?: Prisma.StringFieldUpdateOperationsInput | string;
    paidByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalPayoutCreateManyInput = {
    id?: string;
    hospitalId: string;
    amount: number;
    method?: string | null;
    note?: string | null;
    paidBy: string;
    paidByName?: string | null;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalPayoutUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    method?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidBy?: Prisma.StringFieldUpdateOperationsInput | string;
    paidByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalPayoutUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hospitalId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    method?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidBy?: Prisma.StringFieldUpdateOperationsInput | string;
    paidByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalPayoutListRelationFilter = {
    every?: Prisma.HospitalPayoutWhereInput;
    some?: Prisma.HospitalPayoutWhereInput;
    none?: Prisma.HospitalPayoutWhereInput;
};
export type HospitalPayoutOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HospitalPayoutCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    paidBy?: Prisma.SortOrder;
    paidByName?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HospitalPayoutAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type HospitalPayoutMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    paidBy?: Prisma.SortOrder;
    paidByName?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HospitalPayoutMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    paidBy?: Prisma.SortOrder;
    paidByName?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HospitalPayoutSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type HospitalPayoutCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.HospitalPayoutCreateWithoutHospitalInput, Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput> | Prisma.HospitalPayoutCreateWithoutHospitalInput[] | Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.HospitalPayoutCreateOrConnectWithoutHospitalInput | Prisma.HospitalPayoutCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.HospitalPayoutCreateManyHospitalInputEnvelope;
    connect?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
};
export type HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.HospitalPayoutCreateWithoutHospitalInput, Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput> | Prisma.HospitalPayoutCreateWithoutHospitalInput[] | Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.HospitalPayoutCreateOrConnectWithoutHospitalInput | Prisma.HospitalPayoutCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.HospitalPayoutCreateManyHospitalInputEnvelope;
    connect?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
};
export type HospitalPayoutUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalPayoutCreateWithoutHospitalInput, Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput> | Prisma.HospitalPayoutCreateWithoutHospitalInput[] | Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.HospitalPayoutCreateOrConnectWithoutHospitalInput | Prisma.HospitalPayoutCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.HospitalPayoutUpsertWithWhereUniqueWithoutHospitalInput | Prisma.HospitalPayoutUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.HospitalPayoutCreateManyHospitalInputEnvelope;
    set?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
    disconnect?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
    delete?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
    connect?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
    update?: Prisma.HospitalPayoutUpdateWithWhereUniqueWithoutHospitalInput | Prisma.HospitalPayoutUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.HospitalPayoutUpdateManyWithWhereWithoutHospitalInput | Prisma.HospitalPayoutUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.HospitalPayoutScalarWhereInput | Prisma.HospitalPayoutScalarWhereInput[];
};
export type HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalPayoutCreateWithoutHospitalInput, Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput> | Prisma.HospitalPayoutCreateWithoutHospitalInput[] | Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.HospitalPayoutCreateOrConnectWithoutHospitalInput | Prisma.HospitalPayoutCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.HospitalPayoutUpsertWithWhereUniqueWithoutHospitalInput | Prisma.HospitalPayoutUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.HospitalPayoutCreateManyHospitalInputEnvelope;
    set?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
    disconnect?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
    delete?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
    connect?: Prisma.HospitalPayoutWhereUniqueInput | Prisma.HospitalPayoutWhereUniqueInput[];
    update?: Prisma.HospitalPayoutUpdateWithWhereUniqueWithoutHospitalInput | Prisma.HospitalPayoutUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.HospitalPayoutUpdateManyWithWhereWithoutHospitalInput | Prisma.HospitalPayoutUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.HospitalPayoutScalarWhereInput | Prisma.HospitalPayoutScalarWhereInput[];
};
export type HospitalPayoutCreateWithoutHospitalInput = {
    id?: string;
    amount: number;
    method?: string | null;
    note?: string | null;
    paidBy: string;
    paidByName?: string | null;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalPayoutUncheckedCreateWithoutHospitalInput = {
    id?: string;
    amount: number;
    method?: string | null;
    note?: string | null;
    paidBy: string;
    paidByName?: string | null;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalPayoutCreateOrConnectWithoutHospitalInput = {
    where: Prisma.HospitalPayoutWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalPayoutCreateWithoutHospitalInput, Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput>;
};
export type HospitalPayoutCreateManyHospitalInputEnvelope = {
    data: Prisma.HospitalPayoutCreateManyHospitalInput | Prisma.HospitalPayoutCreateManyHospitalInput[];
    skipDuplicates?: boolean;
};
export type HospitalPayoutUpsertWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.HospitalPayoutWhereUniqueInput;
    update: Prisma.XOR<Prisma.HospitalPayoutUpdateWithoutHospitalInput, Prisma.HospitalPayoutUncheckedUpdateWithoutHospitalInput>;
    create: Prisma.XOR<Prisma.HospitalPayoutCreateWithoutHospitalInput, Prisma.HospitalPayoutUncheckedCreateWithoutHospitalInput>;
};
export type HospitalPayoutUpdateWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.HospitalPayoutWhereUniqueInput;
    data: Prisma.XOR<Prisma.HospitalPayoutUpdateWithoutHospitalInput, Prisma.HospitalPayoutUncheckedUpdateWithoutHospitalInput>;
};
export type HospitalPayoutUpdateManyWithWhereWithoutHospitalInput = {
    where: Prisma.HospitalPayoutScalarWhereInput;
    data: Prisma.XOR<Prisma.HospitalPayoutUpdateManyMutationInput, Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalInput>;
};
export type HospitalPayoutScalarWhereInput = {
    AND?: Prisma.HospitalPayoutScalarWhereInput | Prisma.HospitalPayoutScalarWhereInput[];
    OR?: Prisma.HospitalPayoutScalarWhereInput[];
    NOT?: Prisma.HospitalPayoutScalarWhereInput | Prisma.HospitalPayoutScalarWhereInput[];
    id?: Prisma.StringFilter<"HospitalPayout"> | string;
    hospitalId?: Prisma.StringFilter<"HospitalPayout"> | string;
    amount?: Prisma.FloatFilter<"HospitalPayout"> | number;
    method?: Prisma.StringNullableFilter<"HospitalPayout"> | string | null;
    note?: Prisma.StringNullableFilter<"HospitalPayout"> | string | null;
    paidBy?: Prisma.StringFilter<"HospitalPayout"> | string;
    paidByName?: Prisma.StringNullableFilter<"HospitalPayout"> | string | null;
    paidAt?: Prisma.DateTimeFilter<"HospitalPayout"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"HospitalPayout"> | Date | string;
};
export type HospitalPayoutCreateManyHospitalInput = {
    id?: string;
    amount: number;
    method?: string | null;
    note?: string | null;
    paidBy: string;
    paidByName?: string | null;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type HospitalPayoutUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    method?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidBy?: Prisma.StringFieldUpdateOperationsInput | string;
    paidByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalPayoutUncheckedUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    method?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidBy?: Prisma.StringFieldUpdateOperationsInput | string;
    paidByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalPayoutUncheckedUpdateManyWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    method?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidBy?: Prisma.StringFieldUpdateOperationsInput | string;
    paidByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalPayoutSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hospitalId?: boolean;
    amount?: boolean;
    method?: boolean;
    note?: boolean;
    paidBy?: boolean;
    paidByName?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hospitalPayout"]>;
export type HospitalPayoutSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hospitalId?: boolean;
    amount?: boolean;
    method?: boolean;
    note?: boolean;
    paidBy?: boolean;
    paidByName?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hospitalPayout"]>;
export type HospitalPayoutSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hospitalId?: boolean;
    amount?: boolean;
    method?: boolean;
    note?: boolean;
    paidBy?: boolean;
    paidByName?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hospitalPayout"]>;
export type HospitalPayoutSelectScalar = {
    id?: boolean;
    hospitalId?: boolean;
    amount?: boolean;
    method?: boolean;
    note?: boolean;
    paidBy?: boolean;
    paidByName?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
};
export type HospitalPayoutOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hospitalId" | "amount" | "method" | "note" | "paidBy" | "paidByName" | "paidAt" | "createdAt", ExtArgs["result"]["hospitalPayout"]>;
export type HospitalPayoutInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
};
export type HospitalPayoutIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
};
export type HospitalPayoutIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hospital?: boolean | Prisma.HospitalDefaultArgs<ExtArgs>;
};
export type $HospitalPayoutPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HospitalPayout";
    objects: {
        hospital: Prisma.$HospitalPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        hospitalId: string;
        amount: number;
        method: string | null;
        note: string | null;
        paidBy: string;
        paidByName: string | null;
        paidAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["hospitalPayout"]>;
    composites: {};
};
export type HospitalPayoutGetPayload<S extends boolean | null | undefined | HospitalPayoutDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload, S>;
export type HospitalPayoutCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HospitalPayoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HospitalPayoutCountAggregateInputType | true;
};
export interface HospitalPayoutDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HospitalPayout'];
        meta: {
            name: 'HospitalPayout';
        };
    };
    /**
     * Find zero or one HospitalPayout that matches the filter.
     * @param {HospitalPayoutFindUniqueArgs} args - Arguments to find a HospitalPayout
     * @example
     * // Get one HospitalPayout
     * const hospitalPayout = await prisma.hospitalPayout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalPayoutFindUniqueArgs>(args: Prisma.SelectSubset<T, HospitalPayoutFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HospitalPayoutClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one HospitalPayout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalPayoutFindUniqueOrThrowArgs} args - Arguments to find a HospitalPayout
     * @example
     * // Get one HospitalPayout
     * const hospitalPayout = await prisma.hospitalPayout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalPayoutFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HospitalPayoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HospitalPayoutClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first HospitalPayout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalPayoutFindFirstArgs} args - Arguments to find a HospitalPayout
     * @example
     * // Get one HospitalPayout
     * const hospitalPayout = await prisma.hospitalPayout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalPayoutFindFirstArgs>(args?: Prisma.SelectSubset<T, HospitalPayoutFindFirstArgs<ExtArgs>>): Prisma.Prisma__HospitalPayoutClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first HospitalPayout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalPayoutFindFirstOrThrowArgs} args - Arguments to find a HospitalPayout
     * @example
     * // Get one HospitalPayout
     * const hospitalPayout = await prisma.hospitalPayout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalPayoutFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HospitalPayoutFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HospitalPayoutClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more HospitalPayouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalPayoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HospitalPayouts
     * const hospitalPayouts = await prisma.hospitalPayout.findMany()
     *
     * // Get first 10 HospitalPayouts
     * const hospitalPayouts = await prisma.hospitalPayout.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const hospitalPayoutWithIdOnly = await prisma.hospitalPayout.findMany({ select: { id: true } })
     *
     */
    findMany<T extends HospitalPayoutFindManyArgs>(args?: Prisma.SelectSubset<T, HospitalPayoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a HospitalPayout.
     * @param {HospitalPayoutCreateArgs} args - Arguments to create a HospitalPayout.
     * @example
     * // Create one HospitalPayout
     * const HospitalPayout = await prisma.hospitalPayout.create({
     *   data: {
     *     // ... data to create a HospitalPayout
     *   }
     * })
     *
     */
    create<T extends HospitalPayoutCreateArgs>(args: Prisma.SelectSubset<T, HospitalPayoutCreateArgs<ExtArgs>>): Prisma.Prisma__HospitalPayoutClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many HospitalPayouts.
     * @param {HospitalPayoutCreateManyArgs} args - Arguments to create many HospitalPayouts.
     * @example
     * // Create many HospitalPayouts
     * const hospitalPayout = await prisma.hospitalPayout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HospitalPayoutCreateManyArgs>(args?: Prisma.SelectSubset<T, HospitalPayoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many HospitalPayouts and returns the data saved in the database.
     * @param {HospitalPayoutCreateManyAndReturnArgs} args - Arguments to create many HospitalPayouts.
     * @example
     * // Create many HospitalPayouts
     * const hospitalPayout = await prisma.hospitalPayout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many HospitalPayouts and only return the `id`
     * const hospitalPayoutWithIdOnly = await prisma.hospitalPayout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends HospitalPayoutCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HospitalPayoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a HospitalPayout.
     * @param {HospitalPayoutDeleteArgs} args - Arguments to delete one HospitalPayout.
     * @example
     * // Delete one HospitalPayout
     * const HospitalPayout = await prisma.hospitalPayout.delete({
     *   where: {
     *     // ... filter to delete one HospitalPayout
     *   }
     * })
     *
     */
    delete<T extends HospitalPayoutDeleteArgs>(args: Prisma.SelectSubset<T, HospitalPayoutDeleteArgs<ExtArgs>>): Prisma.Prisma__HospitalPayoutClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one HospitalPayout.
     * @param {HospitalPayoutUpdateArgs} args - Arguments to update one HospitalPayout.
     * @example
     * // Update one HospitalPayout
     * const hospitalPayout = await prisma.hospitalPayout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HospitalPayoutUpdateArgs>(args: Prisma.SelectSubset<T, HospitalPayoutUpdateArgs<ExtArgs>>): Prisma.Prisma__HospitalPayoutClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more HospitalPayouts.
     * @param {HospitalPayoutDeleteManyArgs} args - Arguments to filter HospitalPayouts to delete.
     * @example
     * // Delete a few HospitalPayouts
     * const { count } = await prisma.hospitalPayout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HospitalPayoutDeleteManyArgs>(args?: Prisma.SelectSubset<T, HospitalPayoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more HospitalPayouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalPayoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HospitalPayouts
     * const hospitalPayout = await prisma.hospitalPayout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HospitalPayoutUpdateManyArgs>(args: Prisma.SelectSubset<T, HospitalPayoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more HospitalPayouts and returns the data updated in the database.
     * @param {HospitalPayoutUpdateManyAndReturnArgs} args - Arguments to update many HospitalPayouts.
     * @example
     * // Update many HospitalPayouts
     * const hospitalPayout = await prisma.hospitalPayout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more HospitalPayouts and only return the `id`
     * const hospitalPayoutWithIdOnly = await prisma.hospitalPayout.updateManyAndReturn({
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
    updateManyAndReturn<T extends HospitalPayoutUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HospitalPayoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one HospitalPayout.
     * @param {HospitalPayoutUpsertArgs} args - Arguments to update or create a HospitalPayout.
     * @example
     * // Update or create a HospitalPayout
     * const hospitalPayout = await prisma.hospitalPayout.upsert({
     *   create: {
     *     // ... data to create a HospitalPayout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HospitalPayout we want to update
     *   }
     * })
     */
    upsert<T extends HospitalPayoutUpsertArgs>(args: Prisma.SelectSubset<T, HospitalPayoutUpsertArgs<ExtArgs>>): Prisma.Prisma__HospitalPayoutClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of HospitalPayouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalPayoutCountArgs} args - Arguments to filter HospitalPayouts to count.
     * @example
     * // Count the number of HospitalPayouts
     * const count = await prisma.hospitalPayout.count({
     *   where: {
     *     // ... the filter for the HospitalPayouts we want to count
     *   }
     * })
    **/
    count<T extends HospitalPayoutCountArgs>(args?: Prisma.Subset<T, HospitalPayoutCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HospitalPayoutCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a HospitalPayout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalPayoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HospitalPayoutAggregateArgs>(args: Prisma.Subset<T, HospitalPayoutAggregateArgs>): Prisma.PrismaPromise<GetHospitalPayoutAggregateType<T>>;
    /**
     * Group by HospitalPayout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalPayoutGroupByArgs} args - Group by arguments.
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
    groupBy<T extends HospitalPayoutGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HospitalPayoutGroupByArgs['orderBy'];
    } : {
        orderBy?: HospitalPayoutGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HospitalPayoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalPayoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the HospitalPayout model
     */
    readonly fields: HospitalPayoutFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for HospitalPayout.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__HospitalPayoutClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the HospitalPayout model
 */
export interface HospitalPayoutFieldRefs {
    readonly id: Prisma.FieldRef<"HospitalPayout", 'String'>;
    readonly hospitalId: Prisma.FieldRef<"HospitalPayout", 'String'>;
    readonly amount: Prisma.FieldRef<"HospitalPayout", 'Float'>;
    readonly method: Prisma.FieldRef<"HospitalPayout", 'String'>;
    readonly note: Prisma.FieldRef<"HospitalPayout", 'String'>;
    readonly paidBy: Prisma.FieldRef<"HospitalPayout", 'String'>;
    readonly paidByName: Prisma.FieldRef<"HospitalPayout", 'String'>;
    readonly paidAt: Prisma.FieldRef<"HospitalPayout", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"HospitalPayout", 'DateTime'>;
}
/**
 * HospitalPayout findUnique
 */
export type HospitalPayoutFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalPayout to fetch.
     */
    where: Prisma.HospitalPayoutWhereUniqueInput;
};
/**
 * HospitalPayout findUniqueOrThrow
 */
export type HospitalPayoutFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalPayout to fetch.
     */
    where: Prisma.HospitalPayoutWhereUniqueInput;
};
/**
 * HospitalPayout findFirst
 */
export type HospitalPayoutFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalPayout to fetch.
     */
    where?: Prisma.HospitalPayoutWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HospitalPayouts to fetch.
     */
    orderBy?: Prisma.HospitalPayoutOrderByWithRelationInput | Prisma.HospitalPayoutOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for HospitalPayouts.
     */
    cursor?: Prisma.HospitalPayoutWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HospitalPayouts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HospitalPayouts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of HospitalPayouts.
     */
    distinct?: Prisma.HospitalPayoutScalarFieldEnum | Prisma.HospitalPayoutScalarFieldEnum[];
};
/**
 * HospitalPayout findFirstOrThrow
 */
export type HospitalPayoutFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalPayout to fetch.
     */
    where?: Prisma.HospitalPayoutWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HospitalPayouts to fetch.
     */
    orderBy?: Prisma.HospitalPayoutOrderByWithRelationInput | Prisma.HospitalPayoutOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for HospitalPayouts.
     */
    cursor?: Prisma.HospitalPayoutWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HospitalPayouts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HospitalPayouts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of HospitalPayouts.
     */
    distinct?: Prisma.HospitalPayoutScalarFieldEnum | Prisma.HospitalPayoutScalarFieldEnum[];
};
/**
 * HospitalPayout findMany
 */
export type HospitalPayoutFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
    /**
     * Filter, which HospitalPayouts to fetch.
     */
    where?: Prisma.HospitalPayoutWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HospitalPayouts to fetch.
     */
    orderBy?: Prisma.HospitalPayoutOrderByWithRelationInput | Prisma.HospitalPayoutOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing HospitalPayouts.
     */
    cursor?: Prisma.HospitalPayoutWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HospitalPayouts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HospitalPayouts.
     */
    skip?: number;
    distinct?: Prisma.HospitalPayoutScalarFieldEnum | Prisma.HospitalPayoutScalarFieldEnum[];
};
/**
 * HospitalPayout create
 */
export type HospitalPayoutCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
    /**
     * The data needed to create a HospitalPayout.
     */
    data: Prisma.XOR<Prisma.HospitalPayoutCreateInput, Prisma.HospitalPayoutUncheckedCreateInput>;
};
/**
 * HospitalPayout createMany
 */
export type HospitalPayoutCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many HospitalPayouts.
     */
    data: Prisma.HospitalPayoutCreateManyInput | Prisma.HospitalPayoutCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * HospitalPayout createManyAndReturn
 */
export type HospitalPayoutCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * The data used to create many HospitalPayouts.
     */
    data: Prisma.HospitalPayoutCreateManyInput | Prisma.HospitalPayoutCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * HospitalPayout update
 */
export type HospitalPayoutUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
    /**
     * The data needed to update a HospitalPayout.
     */
    data: Prisma.XOR<Prisma.HospitalPayoutUpdateInput, Prisma.HospitalPayoutUncheckedUpdateInput>;
    /**
     * Choose, which HospitalPayout to update.
     */
    where: Prisma.HospitalPayoutWhereUniqueInput;
};
/**
 * HospitalPayout updateMany
 */
export type HospitalPayoutUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update HospitalPayouts.
     */
    data: Prisma.XOR<Prisma.HospitalPayoutUpdateManyMutationInput, Prisma.HospitalPayoutUncheckedUpdateManyInput>;
    /**
     * Filter which HospitalPayouts to update
     */
    where?: Prisma.HospitalPayoutWhereInput;
    /**
     * Limit how many HospitalPayouts to update.
     */
    limit?: number;
};
/**
 * HospitalPayout updateManyAndReturn
 */
export type HospitalPayoutUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * The data used to update HospitalPayouts.
     */
    data: Prisma.XOR<Prisma.HospitalPayoutUpdateManyMutationInput, Prisma.HospitalPayoutUncheckedUpdateManyInput>;
    /**
     * Filter which HospitalPayouts to update
     */
    where?: Prisma.HospitalPayoutWhereInput;
    /**
     * Limit how many HospitalPayouts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * HospitalPayout upsert
 */
export type HospitalPayoutUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
    /**
     * The filter to search for the HospitalPayout to update in case it exists.
     */
    where: Prisma.HospitalPayoutWhereUniqueInput;
    /**
     * In case the HospitalPayout found by the `where` argument doesn't exist, create a new HospitalPayout with this data.
     */
    create: Prisma.XOR<Prisma.HospitalPayoutCreateInput, Prisma.HospitalPayoutUncheckedCreateInput>;
    /**
     * In case the HospitalPayout was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.HospitalPayoutUpdateInput, Prisma.HospitalPayoutUncheckedUpdateInput>;
};
/**
 * HospitalPayout delete
 */
export type HospitalPayoutDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
    /**
     * Filter which HospitalPayout to delete.
     */
    where: Prisma.HospitalPayoutWhereUniqueInput;
};
/**
 * HospitalPayout deleteMany
 */
export type HospitalPayoutDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalPayouts to delete
     */
    where?: Prisma.HospitalPayoutWhereInput;
    /**
     * Limit how many HospitalPayouts to delete.
     */
    limit?: number;
};
/**
 * HospitalPayout without action
 */
export type HospitalPayoutDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalPayout
     */
    select?: Prisma.HospitalPayoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HospitalPayout
     */
    omit?: Prisma.HospitalPayoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalPayoutInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=HospitalPayout.d.ts.map