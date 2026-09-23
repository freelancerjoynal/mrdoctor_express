import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model DoctorInformation
 *
 */
export type DoctorInformationModel = runtime.Types.Result.DefaultSelection<Prisma.$DoctorInformationPayload>;
export type AggregateDoctorInformation = {
    _count: DoctorInformationCountAggregateOutputType | null;
    _min: DoctorInformationMinAggregateOutputType | null;
    _max: DoctorInformationMaxAggregateOutputType | null;
};
export type DoctorInformationMinAggregateOutputType = {
    id: string | null;
    doctorId: string | null;
    aboutImage: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DoctorInformationMaxAggregateOutputType = {
    id: string | null;
    doctorId: string | null;
    aboutImage: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DoctorInformationCountAggregateOutputType = {
    id: number;
    doctorId: number;
    expertise: number;
    expertise_en: number;
    timeline: number;
    highlights: number;
    highlights_en: number;
    stats: number;
    stats_en: number;
    aboutImage: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DoctorInformationMinAggregateInputType = {
    id?: true;
    doctorId?: true;
    aboutImage?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DoctorInformationMaxAggregateInputType = {
    id?: true;
    doctorId?: true;
    aboutImage?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DoctorInformationCountAggregateInputType = {
    id?: true;
    doctorId?: true;
    expertise?: true;
    expertise_en?: true;
    timeline?: true;
    highlights?: true;
    highlights_en?: true;
    stats?: true;
    stats_en?: true;
    aboutImage?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DoctorInformationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorInformation to aggregate.
     */
    where?: Prisma.DoctorInformationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorInformations to fetch.
     */
    orderBy?: Prisma.DoctorInformationOrderByWithRelationInput | Prisma.DoctorInformationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DoctorInformationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorInformations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorInformations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DoctorInformations
    **/
    _count?: true | DoctorInformationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DoctorInformationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DoctorInformationMaxAggregateInputType;
};
export type GetDoctorInformationAggregateType<T extends DoctorInformationAggregateArgs> = {
    [P in keyof T & keyof AggregateDoctorInformation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDoctorInformation[P]> : Prisma.GetScalarType<T[P], AggregateDoctorInformation[P]>;
};
export type DoctorInformationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DoctorInformationWhereInput;
    orderBy?: Prisma.DoctorInformationOrderByWithAggregationInput | Prisma.DoctorInformationOrderByWithAggregationInput[];
    by: Prisma.DoctorInformationScalarFieldEnum[] | Prisma.DoctorInformationScalarFieldEnum;
    having?: Prisma.DoctorInformationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DoctorInformationCountAggregateInputType | true;
    _min?: DoctorInformationMinAggregateInputType;
    _max?: DoctorInformationMaxAggregateInputType;
};
export type DoctorInformationGroupByOutputType = {
    id: string;
    doctorId: string;
    expertise: runtime.JsonValue;
    expertise_en: runtime.JsonValue | null;
    timeline: runtime.JsonValue;
    highlights: runtime.JsonValue;
    highlights_en: runtime.JsonValue | null;
    stats: runtime.JsonValue;
    stats_en: runtime.JsonValue | null;
    aboutImage: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DoctorInformationCountAggregateOutputType | null;
    _min: DoctorInformationMinAggregateOutputType | null;
    _max: DoctorInformationMaxAggregateOutputType | null;
};
type GetDoctorInformationGroupByPayload<T extends DoctorInformationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DoctorInformationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DoctorInformationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DoctorInformationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DoctorInformationGroupByOutputType[P]>;
}>>;
export type DoctorInformationWhereInput = {
    AND?: Prisma.DoctorInformationWhereInput | Prisma.DoctorInformationWhereInput[];
    OR?: Prisma.DoctorInformationWhereInput[];
    NOT?: Prisma.DoctorInformationWhereInput | Prisma.DoctorInformationWhereInput[];
    id?: Prisma.StringFilter<"DoctorInformation"> | string;
    doctorId?: Prisma.StringFilter<"DoctorInformation"> | string;
    expertise?: Prisma.JsonFilter<"DoctorInformation">;
    expertise_en?: Prisma.JsonNullableFilter<"DoctorInformation">;
    timeline?: Prisma.JsonFilter<"DoctorInformation">;
    highlights?: Prisma.JsonFilter<"DoctorInformation">;
    highlights_en?: Prisma.JsonNullableFilter<"DoctorInformation">;
    stats?: Prisma.JsonFilter<"DoctorInformation">;
    stats_en?: Prisma.JsonNullableFilter<"DoctorInformation">;
    aboutImage?: Prisma.StringNullableFilter<"DoctorInformation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DoctorInformation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DoctorInformation"> | Date | string;
    doctor?: Prisma.XOR<Prisma.DoctorScalarRelationFilter, Prisma.DoctorWhereInput>;
};
export type DoctorInformationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    expertise?: Prisma.SortOrder;
    expertise_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    timeline?: Prisma.SortOrder;
    highlights?: Prisma.SortOrder;
    highlights_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    stats?: Prisma.SortOrder;
    stats_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    aboutImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    doctor?: Prisma.DoctorOrderByWithRelationInput;
};
export type DoctorInformationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    doctorId?: string;
    AND?: Prisma.DoctorInformationWhereInput | Prisma.DoctorInformationWhereInput[];
    OR?: Prisma.DoctorInformationWhereInput[];
    NOT?: Prisma.DoctorInformationWhereInput | Prisma.DoctorInformationWhereInput[];
    expertise?: Prisma.JsonFilter<"DoctorInformation">;
    expertise_en?: Prisma.JsonNullableFilter<"DoctorInformation">;
    timeline?: Prisma.JsonFilter<"DoctorInformation">;
    highlights?: Prisma.JsonFilter<"DoctorInformation">;
    highlights_en?: Prisma.JsonNullableFilter<"DoctorInformation">;
    stats?: Prisma.JsonFilter<"DoctorInformation">;
    stats_en?: Prisma.JsonNullableFilter<"DoctorInformation">;
    aboutImage?: Prisma.StringNullableFilter<"DoctorInformation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DoctorInformation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DoctorInformation"> | Date | string;
    doctor?: Prisma.XOR<Prisma.DoctorScalarRelationFilter, Prisma.DoctorWhereInput>;
}, "id" | "doctorId">;
export type DoctorInformationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    expertise?: Prisma.SortOrder;
    expertise_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    timeline?: Prisma.SortOrder;
    highlights?: Prisma.SortOrder;
    highlights_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    stats?: Prisma.SortOrder;
    stats_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    aboutImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DoctorInformationCountOrderByAggregateInput;
    _max?: Prisma.DoctorInformationMaxOrderByAggregateInput;
    _min?: Prisma.DoctorInformationMinOrderByAggregateInput;
};
export type DoctorInformationScalarWhereWithAggregatesInput = {
    AND?: Prisma.DoctorInformationScalarWhereWithAggregatesInput | Prisma.DoctorInformationScalarWhereWithAggregatesInput[];
    OR?: Prisma.DoctorInformationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DoctorInformationScalarWhereWithAggregatesInput | Prisma.DoctorInformationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DoctorInformation"> | string;
    doctorId?: Prisma.StringWithAggregatesFilter<"DoctorInformation"> | string;
    expertise?: Prisma.JsonWithAggregatesFilter<"DoctorInformation">;
    expertise_en?: Prisma.JsonNullableWithAggregatesFilter<"DoctorInformation">;
    timeline?: Prisma.JsonWithAggregatesFilter<"DoctorInformation">;
    highlights?: Prisma.JsonWithAggregatesFilter<"DoctorInformation">;
    highlights_en?: Prisma.JsonNullableWithAggregatesFilter<"DoctorInformation">;
    stats?: Prisma.JsonWithAggregatesFilter<"DoctorInformation">;
    stats_en?: Prisma.JsonNullableWithAggregatesFilter<"DoctorInformation">;
    aboutImage?: Prisma.StringNullableWithAggregatesFilter<"DoctorInformation"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DoctorInformation"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DoctorInformation"> | Date | string;
};
export type DoctorInformationCreateInput = {
    id?: string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    doctor: Prisma.DoctorCreateNestedOneWithoutInformationInput;
};
export type DoctorInformationUncheckedCreateInput = {
    id?: string;
    doctorId: string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorInformationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorUpdateOneRequiredWithoutInformationNestedInput;
};
export type DoctorInformationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorInformationCreateManyInput = {
    id?: string;
    doctorId: string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorInformationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorInformationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorInformationNullableScalarRelationFilter = {
    is?: Prisma.DoctorInformationWhereInput | null;
    isNot?: Prisma.DoctorInformationWhereInput | null;
};
export type DoctorInformationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    expertise?: Prisma.SortOrder;
    expertise_en?: Prisma.SortOrder;
    timeline?: Prisma.SortOrder;
    highlights?: Prisma.SortOrder;
    highlights_en?: Prisma.SortOrder;
    stats?: Prisma.SortOrder;
    stats_en?: Prisma.SortOrder;
    aboutImage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorInformationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    aboutImage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorInformationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    aboutImage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorInformationCreateNestedOneWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.DoctorInformationCreateWithoutDoctorInput, Prisma.DoctorInformationUncheckedCreateWithoutDoctorInput>;
    connectOrCreate?: Prisma.DoctorInformationCreateOrConnectWithoutDoctorInput;
    connect?: Prisma.DoctorInformationWhereUniqueInput;
};
export type DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.DoctorInformationCreateWithoutDoctorInput, Prisma.DoctorInformationUncheckedCreateWithoutDoctorInput>;
    connectOrCreate?: Prisma.DoctorInformationCreateOrConnectWithoutDoctorInput;
    connect?: Prisma.DoctorInformationWhereUniqueInput;
};
export type DoctorInformationUpdateOneWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorInformationCreateWithoutDoctorInput, Prisma.DoctorInformationUncheckedCreateWithoutDoctorInput>;
    connectOrCreate?: Prisma.DoctorInformationCreateOrConnectWithoutDoctorInput;
    upsert?: Prisma.DoctorInformationUpsertWithoutDoctorInput;
    disconnect?: Prisma.DoctorInformationWhereInput | boolean;
    delete?: Prisma.DoctorInformationWhereInput | boolean;
    connect?: Prisma.DoctorInformationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorInformationUpdateToOneWithWhereWithoutDoctorInput, Prisma.DoctorInformationUpdateWithoutDoctorInput>, Prisma.DoctorInformationUncheckedUpdateWithoutDoctorInput>;
};
export type DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorInformationCreateWithoutDoctorInput, Prisma.DoctorInformationUncheckedCreateWithoutDoctorInput>;
    connectOrCreate?: Prisma.DoctorInformationCreateOrConnectWithoutDoctorInput;
    upsert?: Prisma.DoctorInformationUpsertWithoutDoctorInput;
    disconnect?: Prisma.DoctorInformationWhereInput | boolean;
    delete?: Prisma.DoctorInformationWhereInput | boolean;
    connect?: Prisma.DoctorInformationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorInformationUpdateToOneWithWhereWithoutDoctorInput, Prisma.DoctorInformationUpdateWithoutDoctorInput>, Prisma.DoctorInformationUncheckedUpdateWithoutDoctorInput>;
};
export type DoctorInformationCreateWithoutDoctorInput = {
    id?: string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorInformationUncheckedCreateWithoutDoctorInput = {
    id?: string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorInformationCreateOrConnectWithoutDoctorInput = {
    where: Prisma.DoctorInformationWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorInformationCreateWithoutDoctorInput, Prisma.DoctorInformationUncheckedCreateWithoutDoctorInput>;
};
export type DoctorInformationUpsertWithoutDoctorInput = {
    update: Prisma.XOR<Prisma.DoctorInformationUpdateWithoutDoctorInput, Prisma.DoctorInformationUncheckedUpdateWithoutDoctorInput>;
    create: Prisma.XOR<Prisma.DoctorInformationCreateWithoutDoctorInput, Prisma.DoctorInformationUncheckedCreateWithoutDoctorInput>;
    where?: Prisma.DoctorInformationWhereInput;
};
export type DoctorInformationUpdateToOneWithWhereWithoutDoctorInput = {
    where?: Prisma.DoctorInformationWhereInput;
    data: Prisma.XOR<Prisma.DoctorInformationUpdateWithoutDoctorInput, Prisma.DoctorInformationUncheckedUpdateWithoutDoctorInput>;
};
export type DoctorInformationUpdateWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorInformationUncheckedUpdateWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expertise?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expertise_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    timeline?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    highlights_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    stats?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    stats_en?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    aboutImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorInformationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    expertise?: boolean;
    expertise_en?: boolean;
    timeline?: boolean;
    highlights?: boolean;
    highlights_en?: boolean;
    stats?: boolean;
    stats_en?: boolean;
    aboutImage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctorInformation"]>;
export type DoctorInformationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    expertise?: boolean;
    expertise_en?: boolean;
    timeline?: boolean;
    highlights?: boolean;
    highlights_en?: boolean;
    stats?: boolean;
    stats_en?: boolean;
    aboutImage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctorInformation"]>;
export type DoctorInformationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    expertise?: boolean;
    expertise_en?: boolean;
    timeline?: boolean;
    highlights?: boolean;
    highlights_en?: boolean;
    stats?: boolean;
    stats_en?: boolean;
    aboutImage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctorInformation"]>;
export type DoctorInformationSelectScalar = {
    id?: boolean;
    doctorId?: boolean;
    expertise?: boolean;
    expertise_en?: boolean;
    timeline?: boolean;
    highlights?: boolean;
    highlights_en?: boolean;
    stats?: boolean;
    stats_en?: boolean;
    aboutImage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DoctorInformationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "doctorId" | "expertise" | "expertise_en" | "timeline" | "highlights" | "highlights_en" | "stats" | "stats_en" | "aboutImage" | "createdAt" | "updatedAt", ExtArgs["result"]["doctorInformation"]>;
export type DoctorInformationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
};
export type DoctorInformationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
};
export type DoctorInformationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
};
export type $DoctorInformationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DoctorInformation";
    objects: {
        doctor: Prisma.$DoctorPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        doctorId: string;
        expertise: runtime.JsonValue;
        expertise_en: runtime.JsonValue | null;
        timeline: runtime.JsonValue;
        highlights: runtime.JsonValue;
        highlights_en: runtime.JsonValue | null;
        stats: runtime.JsonValue;
        stats_en: runtime.JsonValue | null;
        aboutImage: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["doctorInformation"]>;
    composites: {};
};
export type DoctorInformationGetPayload<S extends boolean | null | undefined | DoctorInformationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload, S>;
export type DoctorInformationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DoctorInformationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DoctorInformationCountAggregateInputType | true;
};
export interface DoctorInformationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DoctorInformation'];
        meta: {
            name: 'DoctorInformation';
        };
    };
    /**
     * Find zero or one DoctorInformation that matches the filter.
     * @param {DoctorInformationFindUniqueArgs} args - Arguments to find a DoctorInformation
     * @example
     * // Get one DoctorInformation
     * const doctorInformation = await prisma.doctorInformation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorInformationFindUniqueArgs>(args: Prisma.SelectSubset<T, DoctorInformationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DoctorInformationClient<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DoctorInformation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorInformationFindUniqueOrThrowArgs} args - Arguments to find a DoctorInformation
     * @example
     * // Get one DoctorInformation
     * const doctorInformation = await prisma.doctorInformation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorInformationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DoctorInformationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DoctorInformationClient<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DoctorInformation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInformationFindFirstArgs} args - Arguments to find a DoctorInformation
     * @example
     * // Get one DoctorInformation
     * const doctorInformation = await prisma.doctorInformation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorInformationFindFirstArgs>(args?: Prisma.SelectSubset<T, DoctorInformationFindFirstArgs<ExtArgs>>): Prisma.Prisma__DoctorInformationClient<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DoctorInformation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInformationFindFirstOrThrowArgs} args - Arguments to find a DoctorInformation
     * @example
     * // Get one DoctorInformation
     * const doctorInformation = await prisma.doctorInformation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorInformationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DoctorInformationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DoctorInformationClient<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DoctorInformations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInformationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorInformations
     * const doctorInformations = await prisma.doctorInformation.findMany()
     *
     * // Get first 10 DoctorInformations
     * const doctorInformations = await prisma.doctorInformation.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const doctorInformationWithIdOnly = await prisma.doctorInformation.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DoctorInformationFindManyArgs>(args?: Prisma.SelectSubset<T, DoctorInformationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DoctorInformation.
     * @param {DoctorInformationCreateArgs} args - Arguments to create a DoctorInformation.
     * @example
     * // Create one DoctorInformation
     * const DoctorInformation = await prisma.doctorInformation.create({
     *   data: {
     *     // ... data to create a DoctorInformation
     *   }
     * })
     *
     */
    create<T extends DoctorInformationCreateArgs>(args: Prisma.SelectSubset<T, DoctorInformationCreateArgs<ExtArgs>>): Prisma.Prisma__DoctorInformationClient<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DoctorInformations.
     * @param {DoctorInformationCreateManyArgs} args - Arguments to create many DoctorInformations.
     * @example
     * // Create many DoctorInformations
     * const doctorInformation = await prisma.doctorInformation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DoctorInformationCreateManyArgs>(args?: Prisma.SelectSubset<T, DoctorInformationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DoctorInformations and returns the data saved in the database.
     * @param {DoctorInformationCreateManyAndReturnArgs} args - Arguments to create many DoctorInformations.
     * @example
     * // Create many DoctorInformations
     * const doctorInformation = await prisma.doctorInformation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DoctorInformations and only return the `id`
     * const doctorInformationWithIdOnly = await prisma.doctorInformation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DoctorInformationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DoctorInformationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DoctorInformation.
     * @param {DoctorInformationDeleteArgs} args - Arguments to delete one DoctorInformation.
     * @example
     * // Delete one DoctorInformation
     * const DoctorInformation = await prisma.doctorInformation.delete({
     *   where: {
     *     // ... filter to delete one DoctorInformation
     *   }
     * })
     *
     */
    delete<T extends DoctorInformationDeleteArgs>(args: Prisma.SelectSubset<T, DoctorInformationDeleteArgs<ExtArgs>>): Prisma.Prisma__DoctorInformationClient<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DoctorInformation.
     * @param {DoctorInformationUpdateArgs} args - Arguments to update one DoctorInformation.
     * @example
     * // Update one DoctorInformation
     * const doctorInformation = await prisma.doctorInformation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DoctorInformationUpdateArgs>(args: Prisma.SelectSubset<T, DoctorInformationUpdateArgs<ExtArgs>>): Prisma.Prisma__DoctorInformationClient<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DoctorInformations.
     * @param {DoctorInformationDeleteManyArgs} args - Arguments to filter DoctorInformations to delete.
     * @example
     * // Delete a few DoctorInformations
     * const { count } = await prisma.doctorInformation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DoctorInformationDeleteManyArgs>(args?: Prisma.SelectSubset<T, DoctorInformationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DoctorInformations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInformationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorInformations
     * const doctorInformation = await prisma.doctorInformation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DoctorInformationUpdateManyArgs>(args: Prisma.SelectSubset<T, DoctorInformationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DoctorInformations and returns the data updated in the database.
     * @param {DoctorInformationUpdateManyAndReturnArgs} args - Arguments to update many DoctorInformations.
     * @example
     * // Update many DoctorInformations
     * const doctorInformation = await prisma.doctorInformation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DoctorInformations and only return the `id`
     * const doctorInformationWithIdOnly = await prisma.doctorInformation.updateManyAndReturn({
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
    updateManyAndReturn<T extends DoctorInformationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DoctorInformationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DoctorInformation.
     * @param {DoctorInformationUpsertArgs} args - Arguments to update or create a DoctorInformation.
     * @example
     * // Update or create a DoctorInformation
     * const doctorInformation = await prisma.doctorInformation.upsert({
     *   create: {
     *     // ... data to create a DoctorInformation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorInformation we want to update
     *   }
     * })
     */
    upsert<T extends DoctorInformationUpsertArgs>(args: Prisma.SelectSubset<T, DoctorInformationUpsertArgs<ExtArgs>>): Prisma.Prisma__DoctorInformationClient<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DoctorInformations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInformationCountArgs} args - Arguments to filter DoctorInformations to count.
     * @example
     * // Count the number of DoctorInformations
     * const count = await prisma.doctorInformation.count({
     *   where: {
     *     // ... the filter for the DoctorInformations we want to count
     *   }
     * })
    **/
    count<T extends DoctorInformationCountArgs>(args?: Prisma.Subset<T, DoctorInformationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DoctorInformationCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DoctorInformation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInformationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoctorInformationAggregateArgs>(args: Prisma.Subset<T, DoctorInformationAggregateArgs>): Prisma.PrismaPromise<GetDoctorInformationAggregateType<T>>;
    /**
     * Group by DoctorInformation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorInformationGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DoctorInformationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DoctorInformationGroupByArgs['orderBy'];
    } : {
        orderBy?: DoctorInformationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DoctorInformationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorInformationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DoctorInformation model
     */
    readonly fields: DoctorInformationFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DoctorInformation.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DoctorInformationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    doctor<T extends Prisma.DoctorDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DoctorDefaultArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the DoctorInformation model
 */
export interface DoctorInformationFieldRefs {
    readonly id: Prisma.FieldRef<"DoctorInformation", 'String'>;
    readonly doctorId: Prisma.FieldRef<"DoctorInformation", 'String'>;
    readonly expertise: Prisma.FieldRef<"DoctorInformation", 'Json'>;
    readonly expertise_en: Prisma.FieldRef<"DoctorInformation", 'Json'>;
    readonly timeline: Prisma.FieldRef<"DoctorInformation", 'Json'>;
    readonly highlights: Prisma.FieldRef<"DoctorInformation", 'Json'>;
    readonly highlights_en: Prisma.FieldRef<"DoctorInformation", 'Json'>;
    readonly stats: Prisma.FieldRef<"DoctorInformation", 'Json'>;
    readonly stats_en: Prisma.FieldRef<"DoctorInformation", 'Json'>;
    readonly aboutImage: Prisma.FieldRef<"DoctorInformation", 'String'>;
    readonly createdAt: Prisma.FieldRef<"DoctorInformation", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DoctorInformation", 'DateTime'>;
}
/**
 * DoctorInformation findUnique
 */
export type DoctorInformationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorInformation to fetch.
     */
    where: Prisma.DoctorInformationWhereUniqueInput;
};
/**
 * DoctorInformation findUniqueOrThrow
 */
export type DoctorInformationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorInformation to fetch.
     */
    where: Prisma.DoctorInformationWhereUniqueInput;
};
/**
 * DoctorInformation findFirst
 */
export type DoctorInformationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorInformation to fetch.
     */
    where?: Prisma.DoctorInformationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorInformations to fetch.
     */
    orderBy?: Prisma.DoctorInformationOrderByWithRelationInput | Prisma.DoctorInformationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DoctorInformations.
     */
    cursor?: Prisma.DoctorInformationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorInformations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorInformations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DoctorInformations.
     */
    distinct?: Prisma.DoctorInformationScalarFieldEnum | Prisma.DoctorInformationScalarFieldEnum[];
};
/**
 * DoctorInformation findFirstOrThrow
 */
export type DoctorInformationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorInformation to fetch.
     */
    where?: Prisma.DoctorInformationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorInformations to fetch.
     */
    orderBy?: Prisma.DoctorInformationOrderByWithRelationInput | Prisma.DoctorInformationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DoctorInformations.
     */
    cursor?: Prisma.DoctorInformationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorInformations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorInformations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DoctorInformations.
     */
    distinct?: Prisma.DoctorInformationScalarFieldEnum | Prisma.DoctorInformationScalarFieldEnum[];
};
/**
 * DoctorInformation findMany
 */
export type DoctorInformationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
    /**
     * Filter, which DoctorInformations to fetch.
     */
    where?: Prisma.DoctorInformationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DoctorInformations to fetch.
     */
    orderBy?: Prisma.DoctorInformationOrderByWithRelationInput | Prisma.DoctorInformationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DoctorInformations.
     */
    cursor?: Prisma.DoctorInformationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DoctorInformations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DoctorInformations.
     */
    skip?: number;
    distinct?: Prisma.DoctorInformationScalarFieldEnum | Prisma.DoctorInformationScalarFieldEnum[];
};
/**
 * DoctorInformation create
 */
export type DoctorInformationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
    /**
     * The data needed to create a DoctorInformation.
     */
    data: Prisma.XOR<Prisma.DoctorInformationCreateInput, Prisma.DoctorInformationUncheckedCreateInput>;
};
/**
 * DoctorInformation createMany
 */
export type DoctorInformationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorInformations.
     */
    data: Prisma.DoctorInformationCreateManyInput | Prisma.DoctorInformationCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DoctorInformation createManyAndReturn
 */
export type DoctorInformationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * The data used to create many DoctorInformations.
     */
    data: Prisma.DoctorInformationCreateManyInput | Prisma.DoctorInformationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DoctorInformation update
 */
export type DoctorInformationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
    /**
     * The data needed to update a DoctorInformation.
     */
    data: Prisma.XOR<Prisma.DoctorInformationUpdateInput, Prisma.DoctorInformationUncheckedUpdateInput>;
    /**
     * Choose, which DoctorInformation to update.
     */
    where: Prisma.DoctorInformationWhereUniqueInput;
};
/**
 * DoctorInformation updateMany
 */
export type DoctorInformationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorInformations.
     */
    data: Prisma.XOR<Prisma.DoctorInformationUpdateManyMutationInput, Prisma.DoctorInformationUncheckedUpdateManyInput>;
    /**
     * Filter which DoctorInformations to update
     */
    where?: Prisma.DoctorInformationWhereInput;
    /**
     * Limit how many DoctorInformations to update.
     */
    limit?: number;
};
/**
 * DoctorInformation updateManyAndReturn
 */
export type DoctorInformationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * The data used to update DoctorInformations.
     */
    data: Prisma.XOR<Prisma.DoctorInformationUpdateManyMutationInput, Prisma.DoctorInformationUncheckedUpdateManyInput>;
    /**
     * Filter which DoctorInformations to update
     */
    where?: Prisma.DoctorInformationWhereInput;
    /**
     * Limit how many DoctorInformations to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DoctorInformation upsert
 */
export type DoctorInformationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
    /**
     * The filter to search for the DoctorInformation to update in case it exists.
     */
    where: Prisma.DoctorInformationWhereUniqueInput;
    /**
     * In case the DoctorInformation found by the `where` argument doesn't exist, create a new DoctorInformation with this data.
     */
    create: Prisma.XOR<Prisma.DoctorInformationCreateInput, Prisma.DoctorInformationUncheckedCreateInput>;
    /**
     * In case the DoctorInformation was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DoctorInformationUpdateInput, Prisma.DoctorInformationUncheckedUpdateInput>;
};
/**
 * DoctorInformation delete
 */
export type DoctorInformationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
    /**
     * Filter which DoctorInformation to delete.
     */
    where: Prisma.DoctorInformationWhereUniqueInput;
};
/**
 * DoctorInformation deleteMany
 */
export type DoctorInformationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorInformations to delete
     */
    where?: Prisma.DoctorInformationWhereInput;
    /**
     * Limit how many DoctorInformations to delete.
     */
    limit?: number;
};
/**
 * DoctorInformation without action
 */
export type DoctorInformationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorInformation
     */
    select?: Prisma.DoctorInformationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DoctorInformation
     */
    omit?: Prisma.DoctorInformationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInformationInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DoctorInformation.d.ts.map