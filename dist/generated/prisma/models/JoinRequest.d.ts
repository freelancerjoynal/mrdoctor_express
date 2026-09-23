import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model JoinRequest
 *
 */
export type JoinRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$JoinRequestPayload>;
export type AggregateJoinRequest = {
    _count: JoinRequestCountAggregateOutputType | null;
    _min: JoinRequestMinAggregateOutputType | null;
    _max: JoinRequestMaxAggregateOutputType | null;
};
export type JoinRequestMinAggregateOutputType = {
    id: string | null;
    type: $Enums.JoinRequestType | null;
    status: $Enums.JoinRequestStatus | null;
    email: string | null;
    phone: string | null;
    name: string | null;
    degree: string | null;
    speciality: string | null;
    username: string | null;
    hospitalName: string | null;
    slug: string | null;
    division: string | null;
    district: string | null;
    thana: string | null;
    addressLine: string | null;
    foundUs: string | null;
    joinReason: string | null;
    note: string | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type JoinRequestMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.JoinRequestType | null;
    status: $Enums.JoinRequestStatus | null;
    email: string | null;
    phone: string | null;
    name: string | null;
    degree: string | null;
    speciality: string | null;
    username: string | null;
    hospitalName: string | null;
    slug: string | null;
    division: string | null;
    district: string | null;
    thana: string | null;
    addressLine: string | null;
    foundUs: string | null;
    joinReason: string | null;
    note: string | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type JoinRequestCountAggregateOutputType = {
    id: number;
    type: number;
    status: number;
    email: number;
    phone: number;
    name: number;
    degree: number;
    speciality: number;
    username: number;
    hospitalName: number;
    slug: number;
    division: number;
    district: number;
    thana: number;
    addressLine: number;
    foundUs: number;
    joinReason: number;
    note: number;
    reviewedBy: number;
    reviewedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type JoinRequestMinAggregateInputType = {
    id?: true;
    type?: true;
    status?: true;
    email?: true;
    phone?: true;
    name?: true;
    degree?: true;
    speciality?: true;
    username?: true;
    hospitalName?: true;
    slug?: true;
    division?: true;
    district?: true;
    thana?: true;
    addressLine?: true;
    foundUs?: true;
    joinReason?: true;
    note?: true;
    reviewedBy?: true;
    reviewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type JoinRequestMaxAggregateInputType = {
    id?: true;
    type?: true;
    status?: true;
    email?: true;
    phone?: true;
    name?: true;
    degree?: true;
    speciality?: true;
    username?: true;
    hospitalName?: true;
    slug?: true;
    division?: true;
    district?: true;
    thana?: true;
    addressLine?: true;
    foundUs?: true;
    joinReason?: true;
    note?: true;
    reviewedBy?: true;
    reviewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type JoinRequestCountAggregateInputType = {
    id?: true;
    type?: true;
    status?: true;
    email?: true;
    phone?: true;
    name?: true;
    degree?: true;
    speciality?: true;
    username?: true;
    hospitalName?: true;
    slug?: true;
    division?: true;
    district?: true;
    thana?: true;
    addressLine?: true;
    foundUs?: true;
    joinReason?: true;
    note?: true;
    reviewedBy?: true;
    reviewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type JoinRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which JoinRequest to aggregate.
     */
    where?: Prisma.JoinRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of JoinRequests to fetch.
     */
    orderBy?: Prisma.JoinRequestOrderByWithRelationInput | Prisma.JoinRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.JoinRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` JoinRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` JoinRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned JoinRequests
    **/
    _count?: true | JoinRequestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: JoinRequestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: JoinRequestMaxAggregateInputType;
};
export type GetJoinRequestAggregateType<T extends JoinRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateJoinRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJoinRequest[P]> : Prisma.GetScalarType<T[P], AggregateJoinRequest[P]>;
};
export type JoinRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JoinRequestWhereInput;
    orderBy?: Prisma.JoinRequestOrderByWithAggregationInput | Prisma.JoinRequestOrderByWithAggregationInput[];
    by: Prisma.JoinRequestScalarFieldEnum[] | Prisma.JoinRequestScalarFieldEnum;
    having?: Prisma.JoinRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JoinRequestCountAggregateInputType | true;
    _min?: JoinRequestMinAggregateInputType;
    _max?: JoinRequestMaxAggregateInputType;
};
export type JoinRequestGroupByOutputType = {
    id: string;
    type: $Enums.JoinRequestType;
    status: $Enums.JoinRequestStatus;
    email: string;
    phone: string;
    name: string | null;
    degree: string | null;
    speciality: string | null;
    username: string | null;
    hospitalName: string | null;
    slug: string | null;
    division: string | null;
    district: string | null;
    thana: string | null;
    addressLine: string | null;
    foundUs: string | null;
    joinReason: string | null;
    note: string | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: JoinRequestCountAggregateOutputType | null;
    _min: JoinRequestMinAggregateOutputType | null;
    _max: JoinRequestMaxAggregateOutputType | null;
};
type GetJoinRequestGroupByPayload<T extends JoinRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JoinRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JoinRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JoinRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JoinRequestGroupByOutputType[P]>;
}>>;
export type JoinRequestWhereInput = {
    AND?: Prisma.JoinRequestWhereInput | Prisma.JoinRequestWhereInput[];
    OR?: Prisma.JoinRequestWhereInput[];
    NOT?: Prisma.JoinRequestWhereInput | Prisma.JoinRequestWhereInput[];
    id?: Prisma.StringFilter<"JoinRequest"> | string;
    type?: Prisma.EnumJoinRequestTypeFilter<"JoinRequest"> | $Enums.JoinRequestType;
    status?: Prisma.EnumJoinRequestStatusFilter<"JoinRequest"> | $Enums.JoinRequestStatus;
    email?: Prisma.StringFilter<"JoinRequest"> | string;
    phone?: Prisma.StringFilter<"JoinRequest"> | string;
    name?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    degree?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    speciality?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    username?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    hospitalName?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    slug?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    division?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    district?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    thana?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    addressLine?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    foundUs?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    joinReason?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    note?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    reviewedBy?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"JoinRequest"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"JoinRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"JoinRequest"> | Date | string;
};
export type JoinRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    degree?: Prisma.SortOrderInput | Prisma.SortOrder;
    speciality?: Prisma.SortOrderInput | Prisma.SortOrder;
    username?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalName?: Prisma.SortOrderInput | Prisma.SortOrder;
    slug?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine?: Prisma.SortOrderInput | Prisma.SortOrder;
    foundUs?: Prisma.SortOrderInput | Prisma.SortOrder;
    joinReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type JoinRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.JoinRequestWhereInput | Prisma.JoinRequestWhereInput[];
    OR?: Prisma.JoinRequestWhereInput[];
    NOT?: Prisma.JoinRequestWhereInput | Prisma.JoinRequestWhereInput[];
    type?: Prisma.EnumJoinRequestTypeFilter<"JoinRequest"> | $Enums.JoinRequestType;
    status?: Prisma.EnumJoinRequestStatusFilter<"JoinRequest"> | $Enums.JoinRequestStatus;
    email?: Prisma.StringFilter<"JoinRequest"> | string;
    phone?: Prisma.StringFilter<"JoinRequest"> | string;
    name?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    degree?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    speciality?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    username?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    hospitalName?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    slug?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    division?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    district?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    thana?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    addressLine?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    foundUs?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    joinReason?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    note?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    reviewedBy?: Prisma.StringNullableFilter<"JoinRequest"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"JoinRequest"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"JoinRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"JoinRequest"> | Date | string;
}, "id">;
export type JoinRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    degree?: Prisma.SortOrderInput | Prisma.SortOrder;
    speciality?: Prisma.SortOrderInput | Prisma.SortOrder;
    username?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalName?: Prisma.SortOrderInput | Prisma.SortOrder;
    slug?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine?: Prisma.SortOrderInput | Prisma.SortOrder;
    foundUs?: Prisma.SortOrderInput | Prisma.SortOrder;
    joinReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.JoinRequestCountOrderByAggregateInput;
    _max?: Prisma.JoinRequestMaxOrderByAggregateInput;
    _min?: Prisma.JoinRequestMinOrderByAggregateInput;
};
export type JoinRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.JoinRequestScalarWhereWithAggregatesInput | Prisma.JoinRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.JoinRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JoinRequestScalarWhereWithAggregatesInput | Prisma.JoinRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"JoinRequest"> | string;
    type?: Prisma.EnumJoinRequestTypeWithAggregatesFilter<"JoinRequest"> | $Enums.JoinRequestType;
    status?: Prisma.EnumJoinRequestStatusWithAggregatesFilter<"JoinRequest"> | $Enums.JoinRequestStatus;
    email?: Prisma.StringWithAggregatesFilter<"JoinRequest"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"JoinRequest"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    degree?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    speciality?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    username?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    hospitalName?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    slug?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    division?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    district?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    thana?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    addressLine?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    foundUs?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    joinReason?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    reviewedBy?: Prisma.StringNullableWithAggregatesFilter<"JoinRequest"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"JoinRequest"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"JoinRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"JoinRequest"> | Date | string;
};
export type JoinRequestCreateInput = {
    id?: string;
    type: $Enums.JoinRequestType;
    status?: $Enums.JoinRequestStatus;
    email: string;
    phone: string;
    name?: string | null;
    degree?: string | null;
    speciality?: string | null;
    username?: string | null;
    hospitalName?: string | null;
    slug?: string | null;
    division?: string | null;
    district?: string | null;
    thana?: string | null;
    addressLine?: string | null;
    foundUs?: string | null;
    joinReason?: string | null;
    note?: string | null;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JoinRequestUncheckedCreateInput = {
    id?: string;
    type: $Enums.JoinRequestType;
    status?: $Enums.JoinRequestStatus;
    email: string;
    phone: string;
    name?: string | null;
    degree?: string | null;
    speciality?: string | null;
    username?: string | null;
    hospitalName?: string | null;
    slug?: string | null;
    division?: string | null;
    district?: string | null;
    thana?: string | null;
    addressLine?: string | null;
    foundUs?: string | null;
    joinReason?: string | null;
    note?: string | null;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JoinRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumJoinRequestTypeFieldUpdateOperationsInput | $Enums.JoinRequestType;
    status?: Prisma.EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    foundUs?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JoinRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumJoinRequestTypeFieldUpdateOperationsInput | $Enums.JoinRequestType;
    status?: Prisma.EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    foundUs?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JoinRequestCreateManyInput = {
    id?: string;
    type: $Enums.JoinRequestType;
    status?: $Enums.JoinRequestStatus;
    email: string;
    phone: string;
    name?: string | null;
    degree?: string | null;
    speciality?: string | null;
    username?: string | null;
    hospitalName?: string | null;
    slug?: string | null;
    division?: string | null;
    district?: string | null;
    thana?: string | null;
    addressLine?: string | null;
    foundUs?: string | null;
    joinReason?: string | null;
    note?: string | null;
    reviewedBy?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type JoinRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumJoinRequestTypeFieldUpdateOperationsInput | $Enums.JoinRequestType;
    status?: Prisma.EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    foundUs?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JoinRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumJoinRequestTypeFieldUpdateOperationsInput | $Enums.JoinRequestType;
    status?: Prisma.EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    foundUs?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type JoinRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    speciality?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    hospitalName?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    addressLine?: Prisma.SortOrder;
    foundUs?: Prisma.SortOrder;
    joinReason?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type JoinRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    speciality?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    hospitalName?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    addressLine?: Prisma.SortOrder;
    foundUs?: Prisma.SortOrder;
    joinReason?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type JoinRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    speciality?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    hospitalName?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    addressLine?: Prisma.SortOrder;
    foundUs?: Prisma.SortOrder;
    joinReason?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumJoinRequestTypeFieldUpdateOperationsInput = {
    set?: $Enums.JoinRequestType;
};
export type EnumJoinRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.JoinRequestStatus;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type JoinRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    status?: boolean;
    email?: boolean;
    phone?: boolean;
    name?: boolean;
    degree?: boolean;
    speciality?: boolean;
    username?: boolean;
    hospitalName?: boolean;
    slug?: boolean;
    division?: boolean;
    district?: boolean;
    thana?: boolean;
    addressLine?: boolean;
    foundUs?: boolean;
    joinReason?: boolean;
    note?: boolean;
    reviewedBy?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["joinRequest"]>;
export type JoinRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    status?: boolean;
    email?: boolean;
    phone?: boolean;
    name?: boolean;
    degree?: boolean;
    speciality?: boolean;
    username?: boolean;
    hospitalName?: boolean;
    slug?: boolean;
    division?: boolean;
    district?: boolean;
    thana?: boolean;
    addressLine?: boolean;
    foundUs?: boolean;
    joinReason?: boolean;
    note?: boolean;
    reviewedBy?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["joinRequest"]>;
export type JoinRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    status?: boolean;
    email?: boolean;
    phone?: boolean;
    name?: boolean;
    degree?: boolean;
    speciality?: boolean;
    username?: boolean;
    hospitalName?: boolean;
    slug?: boolean;
    division?: boolean;
    district?: boolean;
    thana?: boolean;
    addressLine?: boolean;
    foundUs?: boolean;
    joinReason?: boolean;
    note?: boolean;
    reviewedBy?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["joinRequest"]>;
export type JoinRequestSelectScalar = {
    id?: boolean;
    type?: boolean;
    status?: boolean;
    email?: boolean;
    phone?: boolean;
    name?: boolean;
    degree?: boolean;
    speciality?: boolean;
    username?: boolean;
    hospitalName?: boolean;
    slug?: boolean;
    division?: boolean;
    district?: boolean;
    thana?: boolean;
    addressLine?: boolean;
    foundUs?: boolean;
    joinReason?: boolean;
    note?: boolean;
    reviewedBy?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type JoinRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "status" | "email" | "phone" | "name" | "degree" | "speciality" | "username" | "hospitalName" | "slug" | "division" | "district" | "thana" | "addressLine" | "foundUs" | "joinReason" | "note" | "reviewedBy" | "reviewedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["joinRequest"]>;
export type $JoinRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JoinRequest";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.JoinRequestType;
        status: $Enums.JoinRequestStatus;
        email: string;
        phone: string;
        name: string | null;
        degree: string | null;
        speciality: string | null;
        username: string | null;
        hospitalName: string | null;
        slug: string | null;
        division: string | null;
        district: string | null;
        thana: string | null;
        addressLine: string | null;
        foundUs: string | null;
        joinReason: string | null;
        note: string | null;
        reviewedBy: string | null;
        reviewedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["joinRequest"]>;
    composites: {};
};
export type JoinRequestGetPayload<S extends boolean | null | undefined | JoinRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload, S>;
export type JoinRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JoinRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JoinRequestCountAggregateInputType | true;
};
export interface JoinRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JoinRequest'];
        meta: {
            name: 'JoinRequest';
        };
    };
    /**
     * Find zero or one JoinRequest that matches the filter.
     * @param {JoinRequestFindUniqueArgs} args - Arguments to find a JoinRequest
     * @example
     * // Get one JoinRequest
     * const joinRequest = await prisma.joinRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JoinRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, JoinRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JoinRequestClient<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one JoinRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JoinRequestFindUniqueOrThrowArgs} args - Arguments to find a JoinRequest
     * @example
     * // Get one JoinRequest
     * const joinRequest = await prisma.joinRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JoinRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JoinRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JoinRequestClient<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first JoinRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestFindFirstArgs} args - Arguments to find a JoinRequest
     * @example
     * // Get one JoinRequest
     * const joinRequest = await prisma.joinRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JoinRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, JoinRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__JoinRequestClient<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first JoinRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestFindFirstOrThrowArgs} args - Arguments to find a JoinRequest
     * @example
     * // Get one JoinRequest
     * const joinRequest = await prisma.joinRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JoinRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JoinRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JoinRequestClient<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more JoinRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JoinRequests
     * const joinRequests = await prisma.joinRequest.findMany()
     *
     * // Get first 10 JoinRequests
     * const joinRequests = await prisma.joinRequest.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const joinRequestWithIdOnly = await prisma.joinRequest.findMany({ select: { id: true } })
     *
     */
    findMany<T extends JoinRequestFindManyArgs>(args?: Prisma.SelectSubset<T, JoinRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a JoinRequest.
     * @param {JoinRequestCreateArgs} args - Arguments to create a JoinRequest.
     * @example
     * // Create one JoinRequest
     * const JoinRequest = await prisma.joinRequest.create({
     *   data: {
     *     // ... data to create a JoinRequest
     *   }
     * })
     *
     */
    create<T extends JoinRequestCreateArgs>(args: Prisma.SelectSubset<T, JoinRequestCreateArgs<ExtArgs>>): Prisma.Prisma__JoinRequestClient<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many JoinRequests.
     * @param {JoinRequestCreateManyArgs} args - Arguments to create many JoinRequests.
     * @example
     * // Create many JoinRequests
     * const joinRequest = await prisma.joinRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends JoinRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, JoinRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many JoinRequests and returns the data saved in the database.
     * @param {JoinRequestCreateManyAndReturnArgs} args - Arguments to create many JoinRequests.
     * @example
     * // Create many JoinRequests
     * const joinRequest = await prisma.joinRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many JoinRequests and only return the `id`
     * const joinRequestWithIdOnly = await prisma.joinRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends JoinRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, JoinRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a JoinRequest.
     * @param {JoinRequestDeleteArgs} args - Arguments to delete one JoinRequest.
     * @example
     * // Delete one JoinRequest
     * const JoinRequest = await prisma.joinRequest.delete({
     *   where: {
     *     // ... filter to delete one JoinRequest
     *   }
     * })
     *
     */
    delete<T extends JoinRequestDeleteArgs>(args: Prisma.SelectSubset<T, JoinRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__JoinRequestClient<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one JoinRequest.
     * @param {JoinRequestUpdateArgs} args - Arguments to update one JoinRequest.
     * @example
     * // Update one JoinRequest
     * const joinRequest = await prisma.joinRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends JoinRequestUpdateArgs>(args: Prisma.SelectSubset<T, JoinRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__JoinRequestClient<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more JoinRequests.
     * @param {JoinRequestDeleteManyArgs} args - Arguments to filter JoinRequests to delete.
     * @example
     * // Delete a few JoinRequests
     * const { count } = await prisma.joinRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends JoinRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, JoinRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more JoinRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JoinRequests
     * const joinRequest = await prisma.joinRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends JoinRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, JoinRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more JoinRequests and returns the data updated in the database.
     * @param {JoinRequestUpdateManyAndReturnArgs} args - Arguments to update many JoinRequests.
     * @example
     * // Update many JoinRequests
     * const joinRequest = await prisma.joinRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more JoinRequests and only return the `id`
     * const joinRequestWithIdOnly = await prisma.joinRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends JoinRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, JoinRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one JoinRequest.
     * @param {JoinRequestUpsertArgs} args - Arguments to update or create a JoinRequest.
     * @example
     * // Update or create a JoinRequest
     * const joinRequest = await prisma.joinRequest.upsert({
     *   create: {
     *     // ... data to create a JoinRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JoinRequest we want to update
     *   }
     * })
     */
    upsert<T extends JoinRequestUpsertArgs>(args: Prisma.SelectSubset<T, JoinRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__JoinRequestClient<runtime.Types.Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of JoinRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestCountArgs} args - Arguments to filter JoinRequests to count.
     * @example
     * // Count the number of JoinRequests
     * const count = await prisma.joinRequest.count({
     *   where: {
     *     // ... the filter for the JoinRequests we want to count
     *   }
     * })
    **/
    count<T extends JoinRequestCountArgs>(args?: Prisma.Subset<T, JoinRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JoinRequestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a JoinRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JoinRequestAggregateArgs>(args: Prisma.Subset<T, JoinRequestAggregateArgs>): Prisma.PrismaPromise<GetJoinRequestAggregateType<T>>;
    /**
     * Group by JoinRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestGroupByArgs} args - Group by arguments.
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
    groupBy<T extends JoinRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JoinRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: JoinRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JoinRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJoinRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the JoinRequest model
     */
    readonly fields: JoinRequestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for JoinRequest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__JoinRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the JoinRequest model
 */
export interface JoinRequestFieldRefs {
    readonly id: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly type: Prisma.FieldRef<"JoinRequest", 'JoinRequestType'>;
    readonly status: Prisma.FieldRef<"JoinRequest", 'JoinRequestStatus'>;
    readonly email: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly phone: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly name: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly degree: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly speciality: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly username: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly hospitalName: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly slug: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly division: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly district: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly thana: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly addressLine: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly foundUs: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly joinReason: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly note: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly reviewedBy: Prisma.FieldRef<"JoinRequest", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"JoinRequest", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"JoinRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"JoinRequest", 'DateTime'>;
}
/**
 * JoinRequest findUnique
 */
export type JoinRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * Filter, which JoinRequest to fetch.
     */
    where: Prisma.JoinRequestWhereUniqueInput;
};
/**
 * JoinRequest findUniqueOrThrow
 */
export type JoinRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * Filter, which JoinRequest to fetch.
     */
    where: Prisma.JoinRequestWhereUniqueInput;
};
/**
 * JoinRequest findFirst
 */
export type JoinRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * Filter, which JoinRequest to fetch.
     */
    where?: Prisma.JoinRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of JoinRequests to fetch.
     */
    orderBy?: Prisma.JoinRequestOrderByWithRelationInput | Prisma.JoinRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for JoinRequests.
     */
    cursor?: Prisma.JoinRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` JoinRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` JoinRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of JoinRequests.
     */
    distinct?: Prisma.JoinRequestScalarFieldEnum | Prisma.JoinRequestScalarFieldEnum[];
};
/**
 * JoinRequest findFirstOrThrow
 */
export type JoinRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * Filter, which JoinRequest to fetch.
     */
    where?: Prisma.JoinRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of JoinRequests to fetch.
     */
    orderBy?: Prisma.JoinRequestOrderByWithRelationInput | Prisma.JoinRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for JoinRequests.
     */
    cursor?: Prisma.JoinRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` JoinRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` JoinRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of JoinRequests.
     */
    distinct?: Prisma.JoinRequestScalarFieldEnum | Prisma.JoinRequestScalarFieldEnum[];
};
/**
 * JoinRequest findMany
 */
export type JoinRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * Filter, which JoinRequests to fetch.
     */
    where?: Prisma.JoinRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of JoinRequests to fetch.
     */
    orderBy?: Prisma.JoinRequestOrderByWithRelationInput | Prisma.JoinRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing JoinRequests.
     */
    cursor?: Prisma.JoinRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` JoinRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` JoinRequests.
     */
    skip?: number;
    distinct?: Prisma.JoinRequestScalarFieldEnum | Prisma.JoinRequestScalarFieldEnum[];
};
/**
 * JoinRequest create
 */
export type JoinRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * The data needed to create a JoinRequest.
     */
    data: Prisma.XOR<Prisma.JoinRequestCreateInput, Prisma.JoinRequestUncheckedCreateInput>;
};
/**
 * JoinRequest createMany
 */
export type JoinRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many JoinRequests.
     */
    data: Prisma.JoinRequestCreateManyInput | Prisma.JoinRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * JoinRequest createManyAndReturn
 */
export type JoinRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * The data used to create many JoinRequests.
     */
    data: Prisma.JoinRequestCreateManyInput | Prisma.JoinRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * JoinRequest update
 */
export type JoinRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * The data needed to update a JoinRequest.
     */
    data: Prisma.XOR<Prisma.JoinRequestUpdateInput, Prisma.JoinRequestUncheckedUpdateInput>;
    /**
     * Choose, which JoinRequest to update.
     */
    where: Prisma.JoinRequestWhereUniqueInput;
};
/**
 * JoinRequest updateMany
 */
export type JoinRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update JoinRequests.
     */
    data: Prisma.XOR<Prisma.JoinRequestUpdateManyMutationInput, Prisma.JoinRequestUncheckedUpdateManyInput>;
    /**
     * Filter which JoinRequests to update
     */
    where?: Prisma.JoinRequestWhereInput;
    /**
     * Limit how many JoinRequests to update.
     */
    limit?: number;
};
/**
 * JoinRequest updateManyAndReturn
 */
export type JoinRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * The data used to update JoinRequests.
     */
    data: Prisma.XOR<Prisma.JoinRequestUpdateManyMutationInput, Prisma.JoinRequestUncheckedUpdateManyInput>;
    /**
     * Filter which JoinRequests to update
     */
    where?: Prisma.JoinRequestWhereInput;
    /**
     * Limit how many JoinRequests to update.
     */
    limit?: number;
};
/**
 * JoinRequest upsert
 */
export type JoinRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * The filter to search for the JoinRequest to update in case it exists.
     */
    where: Prisma.JoinRequestWhereUniqueInput;
    /**
     * In case the JoinRequest found by the `where` argument doesn't exist, create a new JoinRequest with this data.
     */
    create: Prisma.XOR<Prisma.JoinRequestCreateInput, Prisma.JoinRequestUncheckedCreateInput>;
    /**
     * In case the JoinRequest was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.JoinRequestUpdateInput, Prisma.JoinRequestUncheckedUpdateInput>;
};
/**
 * JoinRequest delete
 */
export type JoinRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
    /**
     * Filter which JoinRequest to delete.
     */
    where: Prisma.JoinRequestWhereUniqueInput;
};
/**
 * JoinRequest deleteMany
 */
export type JoinRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which JoinRequests to delete
     */
    where?: Prisma.JoinRequestWhereInput;
    /**
     * Limit how many JoinRequests to delete.
     */
    limit?: number;
};
/**
 * JoinRequest without action
 */
export type JoinRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: Prisma.JoinRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: Prisma.JoinRequestOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=JoinRequest.d.ts.map