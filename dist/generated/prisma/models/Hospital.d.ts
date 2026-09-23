import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Hospital
 *
 */
export type HospitalModel = runtime.Types.Result.DefaultSelection<Prisma.$HospitalPayload>;
export type AggregateHospital = {
    _count: HospitalCountAggregateOutputType | null;
    _avg: HospitalAvgAggregateOutputType | null;
    _sum: HospitalSumAggregateOutputType | null;
    _min: HospitalMinAggregateOutputType | null;
    _max: HospitalMaxAggregateOutputType | null;
};
export type HospitalAvgAggregateOutputType = {
    establishedYear: number | null;
    creditBalance: number | null;
};
export type HospitalSumAggregateOutputType = {
    establishedYear: number | null;
    creditBalance: number | null;
};
export type HospitalMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    name_en: string | null;
    slug: string | null;
    templateName: string | null;
    division: string | null;
    division_en: string | null;
    district: string | null;
    district_en: string | null;
    thana: string | null;
    thana_en: string | null;
    addressLine: string | null;
    addressLine_en: string | null;
    phone: string | null;
    establishedYear: number | null;
    status: $Enums.HospitalStatus | null;
    creditBalance: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HospitalMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    name_en: string | null;
    slug: string | null;
    templateName: string | null;
    division: string | null;
    division_en: string | null;
    district: string | null;
    district_en: string | null;
    thana: string | null;
    thana_en: string | null;
    addressLine: string | null;
    addressLine_en: string | null;
    phone: string | null;
    establishedYear: number | null;
    status: $Enums.HospitalStatus | null;
    creditBalance: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HospitalCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    name_en: number;
    slug: number;
    templateName: number;
    division: number;
    division_en: number;
    district: number;
    district_en: number;
    thana: number;
    thana_en: number;
    addressLine: number;
    addressLine_en: number;
    phone: number;
    establishedYear: number;
    status: number;
    creditBalance: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type HospitalAvgAggregateInputType = {
    establishedYear?: true;
    creditBalance?: true;
};
export type HospitalSumAggregateInputType = {
    establishedYear?: true;
    creditBalance?: true;
};
export type HospitalMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    name_en?: true;
    slug?: true;
    templateName?: true;
    division?: true;
    division_en?: true;
    district?: true;
    district_en?: true;
    thana?: true;
    thana_en?: true;
    addressLine?: true;
    addressLine_en?: true;
    phone?: true;
    establishedYear?: true;
    status?: true;
    creditBalance?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HospitalMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    name_en?: true;
    slug?: true;
    templateName?: true;
    division?: true;
    division_en?: true;
    district?: true;
    district_en?: true;
    thana?: true;
    thana_en?: true;
    addressLine?: true;
    addressLine_en?: true;
    phone?: true;
    establishedYear?: true;
    status?: true;
    creditBalance?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HospitalCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    name_en?: true;
    slug?: true;
    templateName?: true;
    division?: true;
    division_en?: true;
    district?: true;
    district_en?: true;
    thana?: true;
    thana_en?: true;
    addressLine?: true;
    addressLine_en?: true;
    phone?: true;
    establishedYear?: true;
    status?: true;
    creditBalance?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type HospitalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Hospital to aggregate.
     */
    where?: Prisma.HospitalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: Prisma.HospitalOrderByWithRelationInput | Prisma.HospitalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.HospitalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Hospitals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Hospitals
    **/
    _count?: true | HospitalCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: HospitalAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: HospitalSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: HospitalMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: HospitalMaxAggregateInputType;
};
export type GetHospitalAggregateType<T extends HospitalAggregateArgs> = {
    [P in keyof T & keyof AggregateHospital]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHospital[P]> : Prisma.GetScalarType<T[P], AggregateHospital[P]>;
};
export type HospitalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HospitalWhereInput;
    orderBy?: Prisma.HospitalOrderByWithAggregationInput | Prisma.HospitalOrderByWithAggregationInput[];
    by: Prisma.HospitalScalarFieldEnum[] | Prisma.HospitalScalarFieldEnum;
    having?: Prisma.HospitalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HospitalCountAggregateInputType | true;
    _avg?: HospitalAvgAggregateInputType;
    _sum?: HospitalSumAggregateInputType;
    _min?: HospitalMinAggregateInputType;
    _max?: HospitalMaxAggregateInputType;
};
export type HospitalGroupByOutputType = {
    id: string;
    userId: string | null;
    name: string;
    name_en: string | null;
    slug: string;
    templateName: string;
    division: string;
    division_en: string | null;
    district: string;
    district_en: string | null;
    thana: string;
    thana_en: string | null;
    addressLine: string | null;
    addressLine_en: string | null;
    phone: string | null;
    establishedYear: number | null;
    status: $Enums.HospitalStatus;
    creditBalance: number;
    createdAt: Date;
    updatedAt: Date;
    _count: HospitalCountAggregateOutputType | null;
    _avg: HospitalAvgAggregateOutputType | null;
    _sum: HospitalSumAggregateOutputType | null;
    _min: HospitalMinAggregateOutputType | null;
    _max: HospitalMaxAggregateOutputType | null;
};
type GetHospitalGroupByPayload<T extends HospitalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HospitalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HospitalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HospitalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HospitalGroupByOutputType[P]>;
}>>;
export type HospitalWhereInput = {
    AND?: Prisma.HospitalWhereInput | Prisma.HospitalWhereInput[];
    OR?: Prisma.HospitalWhereInput[];
    NOT?: Prisma.HospitalWhereInput | Prisma.HospitalWhereInput[];
    id?: Prisma.StringFilter<"Hospital"> | string;
    userId?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    name?: Prisma.StringFilter<"Hospital"> | string;
    name_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    slug?: Prisma.StringFilter<"Hospital"> | string;
    templateName?: Prisma.StringFilter<"Hospital"> | string;
    division?: Prisma.StringFilter<"Hospital"> | string;
    division_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    district?: Prisma.StringFilter<"Hospital"> | string;
    district_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    thana?: Prisma.StringFilter<"Hospital"> | string;
    thana_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    addressLine?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    addressLine_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    phone?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    establishedYear?: Prisma.IntNullableFilter<"Hospital"> | number | null;
    status?: Prisma.EnumHospitalStatusFilter<"Hospital"> | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFilter<"Hospital"> | number;
    createdAt?: Prisma.DateTimeFilter<"Hospital"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Hospital"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    creditLedger?: Prisma.CreditLedgerListRelationFilter;
    chambers?: Prisma.ChamberListRelationFilter;
    schedules?: Prisma.DoctorScheduleListRelationFilter;
    blogs?: Prisma.BlogListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
    pendingAppointments?: Prisma.PendingAppointmentListRelationFilter;
    confirmedAppointments?: Prisma.ConfirmedAppointmentListRelationFilter;
    servedAppointments?: Prisma.ServedAppointmentListRelationFilter;
    payouts?: Prisma.HospitalPayoutListRelationFilter;
    onlineDays?: Prisma.HospitalOnlineDayListRelationFilter;
    staffMembers?: Prisma.UserListRelationFilter;
};
export type HospitalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    division_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrder;
    district_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    thana_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    establishedYear?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    creditLedger?: Prisma.CreditLedgerOrderByRelationAggregateInput;
    chambers?: Prisma.ChamberOrderByRelationAggregateInput;
    schedules?: Prisma.DoctorScheduleOrderByRelationAggregateInput;
    blogs?: Prisma.BlogOrderByRelationAggregateInput;
    reviews?: Prisma.ReviewOrderByRelationAggregateInput;
    pendingAppointments?: Prisma.PendingAppointmentOrderByRelationAggregateInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentOrderByRelationAggregateInput;
    servedAppointments?: Prisma.ServedAppointmentOrderByRelationAggregateInput;
    payouts?: Prisma.HospitalPayoutOrderByRelationAggregateInput;
    onlineDays?: Prisma.HospitalOnlineDayOrderByRelationAggregateInput;
    staffMembers?: Prisma.UserOrderByRelationAggregateInput;
};
export type HospitalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    slug?: string;
    AND?: Prisma.HospitalWhereInput | Prisma.HospitalWhereInput[];
    OR?: Prisma.HospitalWhereInput[];
    NOT?: Prisma.HospitalWhereInput | Prisma.HospitalWhereInput[];
    name?: Prisma.StringFilter<"Hospital"> | string;
    name_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    templateName?: Prisma.StringFilter<"Hospital"> | string;
    division?: Prisma.StringFilter<"Hospital"> | string;
    division_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    district?: Prisma.StringFilter<"Hospital"> | string;
    district_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    thana?: Prisma.StringFilter<"Hospital"> | string;
    thana_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    addressLine?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    addressLine_en?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    phone?: Prisma.StringNullableFilter<"Hospital"> | string | null;
    establishedYear?: Prisma.IntNullableFilter<"Hospital"> | number | null;
    status?: Prisma.EnumHospitalStatusFilter<"Hospital"> | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFilter<"Hospital"> | number;
    createdAt?: Prisma.DateTimeFilter<"Hospital"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Hospital"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    creditLedger?: Prisma.CreditLedgerListRelationFilter;
    chambers?: Prisma.ChamberListRelationFilter;
    schedules?: Prisma.DoctorScheduleListRelationFilter;
    blogs?: Prisma.BlogListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
    pendingAppointments?: Prisma.PendingAppointmentListRelationFilter;
    confirmedAppointments?: Prisma.ConfirmedAppointmentListRelationFilter;
    servedAppointments?: Prisma.ServedAppointmentListRelationFilter;
    payouts?: Prisma.HospitalPayoutListRelationFilter;
    onlineDays?: Prisma.HospitalOnlineDayListRelationFilter;
    staffMembers?: Prisma.UserListRelationFilter;
}, "id" | "userId" | "slug">;
export type HospitalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    division_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrder;
    district_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    thana_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    establishedYear?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.HospitalCountOrderByAggregateInput;
    _avg?: Prisma.HospitalAvgOrderByAggregateInput;
    _max?: Prisma.HospitalMaxOrderByAggregateInput;
    _min?: Prisma.HospitalMinOrderByAggregateInput;
    _sum?: Prisma.HospitalSumOrderByAggregateInput;
};
export type HospitalScalarWhereWithAggregatesInput = {
    AND?: Prisma.HospitalScalarWhereWithAggregatesInput | Prisma.HospitalScalarWhereWithAggregatesInput[];
    OR?: Prisma.HospitalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HospitalScalarWhereWithAggregatesInput | Prisma.HospitalScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Hospital"> | string;
    userId?: Prisma.StringNullableWithAggregatesFilter<"Hospital"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"Hospital"> | string;
    name_en?: Prisma.StringNullableWithAggregatesFilter<"Hospital"> | string | null;
    slug?: Prisma.StringWithAggregatesFilter<"Hospital"> | string;
    templateName?: Prisma.StringWithAggregatesFilter<"Hospital"> | string;
    division?: Prisma.StringWithAggregatesFilter<"Hospital"> | string;
    division_en?: Prisma.StringNullableWithAggregatesFilter<"Hospital"> | string | null;
    district?: Prisma.StringWithAggregatesFilter<"Hospital"> | string;
    district_en?: Prisma.StringNullableWithAggregatesFilter<"Hospital"> | string | null;
    thana?: Prisma.StringWithAggregatesFilter<"Hospital"> | string;
    thana_en?: Prisma.StringNullableWithAggregatesFilter<"Hospital"> | string | null;
    addressLine?: Prisma.StringNullableWithAggregatesFilter<"Hospital"> | string | null;
    addressLine_en?: Prisma.StringNullableWithAggregatesFilter<"Hospital"> | string | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Hospital"> | string | null;
    establishedYear?: Prisma.IntNullableWithAggregatesFilter<"Hospital"> | number | null;
    status?: Prisma.EnumHospitalStatusWithAggregatesFilter<"Hospital"> | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntWithAggregatesFilter<"Hospital"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Hospital"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Hospital"> | Date | string;
};
export type HospitalCreateInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateManyInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HospitalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HospitalNullableScalarRelationFilter = {
    is?: Prisma.HospitalWhereInput | null;
    isNot?: Prisma.HospitalWhereInput | null;
};
export type HospitalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    division_en?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    district_en?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    thana_en?: Prisma.SortOrder;
    addressLine?: Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    establishedYear?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HospitalAvgOrderByAggregateInput = {
    establishedYear?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
};
export type HospitalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    division_en?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    district_en?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    thana_en?: Prisma.SortOrder;
    addressLine?: Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    establishedYear?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HospitalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    division_en?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    district_en?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    thana_en?: Prisma.SortOrder;
    addressLine?: Prisma.SortOrder;
    addressLine_en?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    establishedYear?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HospitalSumOrderByAggregateInput = {
    establishedYear?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
};
export type HospitalScalarRelationFilter = {
    is?: Prisma.HospitalWhereInput;
    isNot?: Prisma.HospitalWhereInput;
};
export type HospitalCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutUserInput, Prisma.HospitalUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutUserInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalCreateNestedOneWithoutStaffMembersInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutStaffMembersInput, Prisma.HospitalUncheckedCreateWithoutStaffMembersInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutStaffMembersInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutUserInput, Prisma.HospitalUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutUserInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutUserInput, Prisma.HospitalUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutUserInput;
    upsert?: Prisma.HospitalUpsertWithoutUserInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutUserInput, Prisma.HospitalUpdateWithoutUserInput>, Prisma.HospitalUncheckedUpdateWithoutUserInput>;
};
export type HospitalUpdateOneWithoutStaffMembersNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutStaffMembersInput, Prisma.HospitalUncheckedCreateWithoutStaffMembersInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutStaffMembersInput;
    upsert?: Prisma.HospitalUpsertWithoutStaffMembersInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutStaffMembersInput, Prisma.HospitalUpdateWithoutStaffMembersInput>, Prisma.HospitalUncheckedUpdateWithoutStaffMembersInput>;
};
export type HospitalUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutUserInput, Prisma.HospitalUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutUserInput;
    upsert?: Prisma.HospitalUpsertWithoutUserInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutUserInput, Prisma.HospitalUpdateWithoutUserInput>, Prisma.HospitalUncheckedUpdateWithoutUserInput>;
};
export type EnumHospitalStatusFieldUpdateOperationsInput = {
    set?: $Enums.HospitalStatus;
};
export type HospitalCreateNestedOneWithoutCreditLedgerInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutCreditLedgerInput, Prisma.HospitalUncheckedCreateWithoutCreditLedgerInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutCreditLedgerInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneWithoutCreditLedgerNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutCreditLedgerInput, Prisma.HospitalUncheckedCreateWithoutCreditLedgerInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutCreditLedgerInput;
    upsert?: Prisma.HospitalUpsertWithoutCreditLedgerInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutCreditLedgerInput, Prisma.HospitalUpdateWithoutCreditLedgerInput>, Prisma.HospitalUncheckedUpdateWithoutCreditLedgerInput>;
};
export type HospitalCreateNestedOneWithoutChambersInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutChambersInput, Prisma.HospitalUncheckedCreateWithoutChambersInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutChambersInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneWithoutChambersNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutChambersInput, Prisma.HospitalUncheckedCreateWithoutChambersInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutChambersInput;
    upsert?: Prisma.HospitalUpsertWithoutChambersInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutChambersInput, Prisma.HospitalUpdateWithoutChambersInput>, Prisma.HospitalUncheckedUpdateWithoutChambersInput>;
};
export type HospitalCreateNestedOneWithoutSchedulesInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutSchedulesInput, Prisma.HospitalUncheckedCreateWithoutSchedulesInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutSchedulesInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneWithoutSchedulesNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutSchedulesInput, Prisma.HospitalUncheckedCreateWithoutSchedulesInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutSchedulesInput;
    upsert?: Prisma.HospitalUpsertWithoutSchedulesInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutSchedulesInput, Prisma.HospitalUpdateWithoutSchedulesInput>, Prisma.HospitalUncheckedUpdateWithoutSchedulesInput>;
};
export type HospitalCreateNestedOneWithoutPendingAppointmentsInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutPendingAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutPendingAppointmentsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutPendingAppointmentsInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneWithoutPendingAppointmentsNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutPendingAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutPendingAppointmentsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutPendingAppointmentsInput;
    upsert?: Prisma.HospitalUpsertWithoutPendingAppointmentsInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutPendingAppointmentsInput, Prisma.HospitalUpdateWithoutPendingAppointmentsInput>, Prisma.HospitalUncheckedUpdateWithoutPendingAppointmentsInput>;
};
export type HospitalCreateNestedOneWithoutConfirmedAppointmentsInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutConfirmedAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutConfirmedAppointmentsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutConfirmedAppointmentsInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneWithoutConfirmedAppointmentsNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutConfirmedAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutConfirmedAppointmentsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutConfirmedAppointmentsInput;
    upsert?: Prisma.HospitalUpsertWithoutConfirmedAppointmentsInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutConfirmedAppointmentsInput, Prisma.HospitalUpdateWithoutConfirmedAppointmentsInput>, Prisma.HospitalUncheckedUpdateWithoutConfirmedAppointmentsInput>;
};
export type HospitalCreateNestedOneWithoutServedAppointmentsInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutServedAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutServedAppointmentsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutServedAppointmentsInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneWithoutServedAppointmentsNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutServedAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutServedAppointmentsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutServedAppointmentsInput;
    upsert?: Prisma.HospitalUpsertWithoutServedAppointmentsInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutServedAppointmentsInput, Prisma.HospitalUpdateWithoutServedAppointmentsInput>, Prisma.HospitalUncheckedUpdateWithoutServedAppointmentsInput>;
};
export type HospitalCreateNestedOneWithoutOnlineDaysInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutOnlineDaysInput, Prisma.HospitalUncheckedCreateWithoutOnlineDaysInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutOnlineDaysInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneRequiredWithoutOnlineDaysNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutOnlineDaysInput, Prisma.HospitalUncheckedCreateWithoutOnlineDaysInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutOnlineDaysInput;
    upsert?: Prisma.HospitalUpsertWithoutOnlineDaysInput;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutOnlineDaysInput, Prisma.HospitalUpdateWithoutOnlineDaysInput>, Prisma.HospitalUncheckedUpdateWithoutOnlineDaysInput>;
};
export type HospitalCreateNestedOneWithoutPayoutsInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutPayoutsInput, Prisma.HospitalUncheckedCreateWithoutPayoutsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutPayoutsInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneRequiredWithoutPayoutsNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutPayoutsInput, Prisma.HospitalUncheckedCreateWithoutPayoutsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutPayoutsInput;
    upsert?: Prisma.HospitalUpsertWithoutPayoutsInput;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutPayoutsInput, Prisma.HospitalUpdateWithoutPayoutsInput>, Prisma.HospitalUncheckedUpdateWithoutPayoutsInput>;
};
export type HospitalCreateNestedOneWithoutBlogsInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutBlogsInput, Prisma.HospitalUncheckedCreateWithoutBlogsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutBlogsInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneWithoutBlogsNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutBlogsInput, Prisma.HospitalUncheckedCreateWithoutBlogsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutBlogsInput;
    upsert?: Prisma.HospitalUpsertWithoutBlogsInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutBlogsInput, Prisma.HospitalUpdateWithoutBlogsInput>, Prisma.HospitalUncheckedUpdateWithoutBlogsInput>;
};
export type HospitalCreateNestedOneWithoutReviewsInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutReviewsInput, Prisma.HospitalUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutReviewsInput;
    connect?: Prisma.HospitalWhereUniqueInput;
};
export type HospitalUpdateOneWithoutReviewsNestedInput = {
    create?: Prisma.XOR<Prisma.HospitalCreateWithoutReviewsInput, Prisma.HospitalUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.HospitalCreateOrConnectWithoutReviewsInput;
    upsert?: Prisma.HospitalUpsertWithoutReviewsInput;
    disconnect?: Prisma.HospitalWhereInput | boolean;
    delete?: Prisma.HospitalWhereInput | boolean;
    connect?: Prisma.HospitalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HospitalUpdateToOneWithWhereWithoutReviewsInput, Prisma.HospitalUpdateWithoutReviewsInput>, Prisma.HospitalUncheckedUpdateWithoutReviewsInput>;
};
export type HospitalCreateWithoutUserInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutUserInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutUserInput, Prisma.HospitalUncheckedCreateWithoutUserInput>;
};
export type HospitalCreateWithoutStaffMembersInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
};
export type HospitalUncheckedCreateWithoutStaffMembersInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
};
export type HospitalCreateOrConnectWithoutStaffMembersInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutStaffMembersInput, Prisma.HospitalUncheckedCreateWithoutStaffMembersInput>;
};
export type HospitalUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutUserInput, Prisma.HospitalUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutUserInput, Prisma.HospitalUncheckedCreateWithoutUserInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutUserInput, Prisma.HospitalUncheckedUpdateWithoutUserInput>;
};
export type HospitalUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUpsertWithoutStaffMembersInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutStaffMembersInput, Prisma.HospitalUncheckedUpdateWithoutStaffMembersInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutStaffMembersInput, Prisma.HospitalUncheckedCreateWithoutStaffMembersInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutStaffMembersInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutStaffMembersInput, Prisma.HospitalUncheckedUpdateWithoutStaffMembersInput>;
};
export type HospitalUpdateWithoutStaffMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutStaffMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
};
export type HospitalCreateWithoutCreditLedgerInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutCreditLedgerInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutCreditLedgerInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutCreditLedgerInput, Prisma.HospitalUncheckedCreateWithoutCreditLedgerInput>;
};
export type HospitalUpsertWithoutCreditLedgerInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutCreditLedgerInput, Prisma.HospitalUncheckedUpdateWithoutCreditLedgerInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutCreditLedgerInput, Prisma.HospitalUncheckedCreateWithoutCreditLedgerInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutCreditLedgerInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutCreditLedgerInput, Prisma.HospitalUncheckedUpdateWithoutCreditLedgerInput>;
};
export type HospitalUpdateWithoutCreditLedgerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutCreditLedgerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateWithoutChambersInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutChambersInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutChambersInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutChambersInput, Prisma.HospitalUncheckedCreateWithoutChambersInput>;
};
export type HospitalUpsertWithoutChambersInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutChambersInput, Prisma.HospitalUncheckedUpdateWithoutChambersInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutChambersInput, Prisma.HospitalUncheckedCreateWithoutChambersInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutChambersInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutChambersInput, Prisma.HospitalUncheckedUpdateWithoutChambersInput>;
};
export type HospitalUpdateWithoutChambersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutChambersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateWithoutSchedulesInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutSchedulesInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutSchedulesInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutSchedulesInput, Prisma.HospitalUncheckedCreateWithoutSchedulesInput>;
};
export type HospitalUpsertWithoutSchedulesInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutSchedulesInput, Prisma.HospitalUncheckedUpdateWithoutSchedulesInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutSchedulesInput, Prisma.HospitalUncheckedCreateWithoutSchedulesInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutSchedulesInput, Prisma.HospitalUncheckedUpdateWithoutSchedulesInput>;
};
export type HospitalUpdateWithoutSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateWithoutPendingAppointmentsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutPendingAppointmentsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutPendingAppointmentsInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutPendingAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutPendingAppointmentsInput>;
};
export type HospitalUpsertWithoutPendingAppointmentsInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutPendingAppointmentsInput, Prisma.HospitalUncheckedUpdateWithoutPendingAppointmentsInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutPendingAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutPendingAppointmentsInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutPendingAppointmentsInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutPendingAppointmentsInput, Prisma.HospitalUncheckedUpdateWithoutPendingAppointmentsInput>;
};
export type HospitalUpdateWithoutPendingAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutPendingAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateWithoutConfirmedAppointmentsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutConfirmedAppointmentsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutConfirmedAppointmentsInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutConfirmedAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutConfirmedAppointmentsInput>;
};
export type HospitalUpsertWithoutConfirmedAppointmentsInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutConfirmedAppointmentsInput, Prisma.HospitalUncheckedUpdateWithoutConfirmedAppointmentsInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutConfirmedAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutConfirmedAppointmentsInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutConfirmedAppointmentsInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutConfirmedAppointmentsInput, Prisma.HospitalUncheckedUpdateWithoutConfirmedAppointmentsInput>;
};
export type HospitalUpdateWithoutConfirmedAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutConfirmedAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateWithoutServedAppointmentsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutServedAppointmentsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutServedAppointmentsInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutServedAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutServedAppointmentsInput>;
};
export type HospitalUpsertWithoutServedAppointmentsInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutServedAppointmentsInput, Prisma.HospitalUncheckedUpdateWithoutServedAppointmentsInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutServedAppointmentsInput, Prisma.HospitalUncheckedCreateWithoutServedAppointmentsInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutServedAppointmentsInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutServedAppointmentsInput, Prisma.HospitalUncheckedUpdateWithoutServedAppointmentsInput>;
};
export type HospitalUpdateWithoutServedAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutServedAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateWithoutOnlineDaysInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutOnlineDaysInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutOnlineDaysInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutOnlineDaysInput, Prisma.HospitalUncheckedCreateWithoutOnlineDaysInput>;
};
export type HospitalUpsertWithoutOnlineDaysInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutOnlineDaysInput, Prisma.HospitalUncheckedUpdateWithoutOnlineDaysInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutOnlineDaysInput, Prisma.HospitalUncheckedCreateWithoutOnlineDaysInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutOnlineDaysInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutOnlineDaysInput, Prisma.HospitalUncheckedUpdateWithoutOnlineDaysInput>;
};
export type HospitalUpdateWithoutOnlineDaysInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutOnlineDaysInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateWithoutPayoutsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutPayoutsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutPayoutsInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutPayoutsInput, Prisma.HospitalUncheckedCreateWithoutPayoutsInput>;
};
export type HospitalUpsertWithoutPayoutsInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutPayoutsInput, Prisma.HospitalUncheckedUpdateWithoutPayoutsInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutPayoutsInput, Prisma.HospitalUncheckedCreateWithoutPayoutsInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutPayoutsInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutPayoutsInput, Prisma.HospitalUncheckedUpdateWithoutPayoutsInput>;
};
export type HospitalUpdateWithoutPayoutsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutPayoutsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateWithoutBlogsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutBlogsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutBlogsInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutBlogsInput, Prisma.HospitalUncheckedCreateWithoutBlogsInput>;
};
export type HospitalUpsertWithoutBlogsInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutBlogsInput, Prisma.HospitalUncheckedUpdateWithoutBlogsInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutBlogsInput, Prisma.HospitalUncheckedCreateWithoutBlogsInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutBlogsInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutBlogsInput, Prisma.HospitalUncheckedUpdateWithoutBlogsInput>;
};
export type HospitalUpdateWithoutBlogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutBlogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalCreateWithoutReviewsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHospitalProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalUncheckedCreateWithoutReviewsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    slug: string;
    templateName?: string;
    division: string;
    division_en?: string | null;
    district: string;
    district_en?: string | null;
    thana: string;
    thana_en?: string | null;
    addressLine?: string | null;
    addressLine_en?: string | null;
    phone?: string | null;
    establishedYear?: number | null;
    status?: $Enums.HospitalStatus;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutHospitalInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutHospitalInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutHospitalInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutHospitalInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput;
    payouts?: Prisma.HospitalPayoutUncheckedCreateNestedManyWithoutHospitalInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedCreateNestedManyWithoutHospitalInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffHospitalInput;
};
export type HospitalCreateOrConnectWithoutReviewsInput = {
    where: Prisma.HospitalWhereUniqueInput;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutReviewsInput, Prisma.HospitalUncheckedCreateWithoutReviewsInput>;
};
export type HospitalUpsertWithoutReviewsInput = {
    update: Prisma.XOR<Prisma.HospitalUpdateWithoutReviewsInput, Prisma.HospitalUncheckedUpdateWithoutReviewsInput>;
    create: Prisma.XOR<Prisma.HospitalCreateWithoutReviewsInput, Prisma.HospitalUncheckedCreateWithoutReviewsInput>;
    where?: Prisma.HospitalWhereInput;
};
export type HospitalUpdateToOneWithWhereWithoutReviewsInput = {
    where?: Prisma.HospitalWhereInput;
    data: Prisma.XOR<Prisma.HospitalUpdateWithoutReviewsInput, Prisma.HospitalUncheckedUpdateWithoutReviewsInput>;
};
export type HospitalUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHospitalProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffHospitalNestedInput;
};
export type HospitalUncheckedUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.StringFieldUpdateOperationsInput | string;
    division_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    district_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.StringFieldUpdateOperationsInput | string;
    thana_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressLine_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    establishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumHospitalStatusFieldUpdateOperationsInput | $Enums.HospitalStatus;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutHospitalNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutHospitalNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutHospitalNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutHospitalNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    servedAppointments?: Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput;
    payouts?: Prisma.HospitalPayoutUncheckedUpdateManyWithoutHospitalNestedInput;
    onlineDays?: Prisma.HospitalOnlineDayUncheckedUpdateManyWithoutHospitalNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffHospitalNestedInput;
};
/**
 * Count Type HospitalCountOutputType
 */
export type HospitalCountOutputType = {
    creditLedger: number;
    chambers: number;
    schedules: number;
    blogs: number;
    reviews: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    servedAppointments: number;
    payouts: number;
    onlineDays: number;
    staffMembers: number;
};
export type HospitalCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    creditLedger?: boolean | HospitalCountOutputTypeCountCreditLedgerArgs;
    chambers?: boolean | HospitalCountOutputTypeCountChambersArgs;
    schedules?: boolean | HospitalCountOutputTypeCountSchedulesArgs;
    blogs?: boolean | HospitalCountOutputTypeCountBlogsArgs;
    reviews?: boolean | HospitalCountOutputTypeCountReviewsArgs;
    pendingAppointments?: boolean | HospitalCountOutputTypeCountPendingAppointmentsArgs;
    confirmedAppointments?: boolean | HospitalCountOutputTypeCountConfirmedAppointmentsArgs;
    servedAppointments?: boolean | HospitalCountOutputTypeCountServedAppointmentsArgs;
    payouts?: boolean | HospitalCountOutputTypeCountPayoutsArgs;
    onlineDays?: boolean | HospitalCountOutputTypeCountOnlineDaysArgs;
    staffMembers?: boolean | HospitalCountOutputTypeCountStaffMembersArgs;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalCountOutputType
     */
    select?: Prisma.HospitalCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountCreditLedgerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditLedgerWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountChambersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChamberWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountSchedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DoctorScheduleWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountBlogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlogWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountReviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountPendingAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PendingAppointmentWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountConfirmedAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConfirmedAppointmentWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountServedAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServedAppointmentWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountPayoutsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HospitalPayoutWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountOnlineDaysArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HospitalOnlineDayWhereInput;
};
/**
 * HospitalCountOutputType without action
 */
export type HospitalCountOutputTypeCountStaffMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type HospitalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    name_en?: boolean;
    slug?: boolean;
    templateName?: boolean;
    division?: boolean;
    division_en?: boolean;
    district?: boolean;
    district_en?: boolean;
    thana?: boolean;
    thana_en?: boolean;
    addressLine?: boolean;
    addressLine_en?: boolean;
    phone?: boolean;
    establishedYear?: boolean;
    status?: boolean;
    creditBalance?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.Hospital$userArgs<ExtArgs>;
    creditLedger?: boolean | Prisma.Hospital$creditLedgerArgs<ExtArgs>;
    chambers?: boolean | Prisma.Hospital$chambersArgs<ExtArgs>;
    schedules?: boolean | Prisma.Hospital$schedulesArgs<ExtArgs>;
    blogs?: boolean | Prisma.Hospital$blogsArgs<ExtArgs>;
    reviews?: boolean | Prisma.Hospital$reviewsArgs<ExtArgs>;
    pendingAppointments?: boolean | Prisma.Hospital$pendingAppointmentsArgs<ExtArgs>;
    confirmedAppointments?: boolean | Prisma.Hospital$confirmedAppointmentsArgs<ExtArgs>;
    servedAppointments?: boolean | Prisma.Hospital$servedAppointmentsArgs<ExtArgs>;
    payouts?: boolean | Prisma.Hospital$payoutsArgs<ExtArgs>;
    onlineDays?: boolean | Prisma.Hospital$onlineDaysArgs<ExtArgs>;
    staffMembers?: boolean | Prisma.Hospital$staffMembersArgs<ExtArgs>;
    _count?: boolean | Prisma.HospitalCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hospital"]>;
export type HospitalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    name_en?: boolean;
    slug?: boolean;
    templateName?: boolean;
    division?: boolean;
    division_en?: boolean;
    district?: boolean;
    district_en?: boolean;
    thana?: boolean;
    thana_en?: boolean;
    addressLine?: boolean;
    addressLine_en?: boolean;
    phone?: boolean;
    establishedYear?: boolean;
    status?: boolean;
    creditBalance?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.Hospital$userArgs<ExtArgs>;
}, ExtArgs["result"]["hospital"]>;
export type HospitalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    name_en?: boolean;
    slug?: boolean;
    templateName?: boolean;
    division?: boolean;
    division_en?: boolean;
    district?: boolean;
    district_en?: boolean;
    thana?: boolean;
    thana_en?: boolean;
    addressLine?: boolean;
    addressLine_en?: boolean;
    phone?: boolean;
    establishedYear?: boolean;
    status?: boolean;
    creditBalance?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.Hospital$userArgs<ExtArgs>;
}, ExtArgs["result"]["hospital"]>;
export type HospitalSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    name_en?: boolean;
    slug?: boolean;
    templateName?: boolean;
    division?: boolean;
    division_en?: boolean;
    district?: boolean;
    district_en?: boolean;
    thana?: boolean;
    thana_en?: boolean;
    addressLine?: boolean;
    addressLine_en?: boolean;
    phone?: boolean;
    establishedYear?: boolean;
    status?: boolean;
    creditBalance?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type HospitalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "name_en" | "slug" | "templateName" | "division" | "division_en" | "district" | "district_en" | "thana" | "thana_en" | "addressLine" | "addressLine_en" | "phone" | "establishedYear" | "status" | "creditBalance" | "createdAt" | "updatedAt", ExtArgs["result"]["hospital"]>;
export type HospitalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.Hospital$userArgs<ExtArgs>;
    creditLedger?: boolean | Prisma.Hospital$creditLedgerArgs<ExtArgs>;
    chambers?: boolean | Prisma.Hospital$chambersArgs<ExtArgs>;
    schedules?: boolean | Prisma.Hospital$schedulesArgs<ExtArgs>;
    blogs?: boolean | Prisma.Hospital$blogsArgs<ExtArgs>;
    reviews?: boolean | Prisma.Hospital$reviewsArgs<ExtArgs>;
    pendingAppointments?: boolean | Prisma.Hospital$pendingAppointmentsArgs<ExtArgs>;
    confirmedAppointments?: boolean | Prisma.Hospital$confirmedAppointmentsArgs<ExtArgs>;
    servedAppointments?: boolean | Prisma.Hospital$servedAppointmentsArgs<ExtArgs>;
    payouts?: boolean | Prisma.Hospital$payoutsArgs<ExtArgs>;
    onlineDays?: boolean | Prisma.Hospital$onlineDaysArgs<ExtArgs>;
    staffMembers?: boolean | Prisma.Hospital$staffMembersArgs<ExtArgs>;
    _count?: boolean | Prisma.HospitalCountOutputTypeDefaultArgs<ExtArgs>;
};
export type HospitalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.Hospital$userArgs<ExtArgs>;
};
export type HospitalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.Hospital$userArgs<ExtArgs>;
};
export type $HospitalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Hospital";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
        creditLedger: Prisma.$CreditLedgerPayload<ExtArgs>[];
        chambers: Prisma.$ChamberPayload<ExtArgs>[];
        schedules: Prisma.$DoctorSchedulePayload<ExtArgs>[];
        blogs: Prisma.$BlogPayload<ExtArgs>[];
        reviews: Prisma.$ReviewPayload<ExtArgs>[];
        pendingAppointments: Prisma.$PendingAppointmentPayload<ExtArgs>[];
        confirmedAppointments: Prisma.$ConfirmedAppointmentPayload<ExtArgs>[];
        servedAppointments: Prisma.$ServedAppointmentPayload<ExtArgs>[];
        payouts: Prisma.$HospitalPayoutPayload<ExtArgs>[];
        onlineDays: Prisma.$HospitalOnlineDayPayload<ExtArgs>[];
        staffMembers: Prisma.$UserPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string | null;
        name: string;
        name_en: string | null;
        slug: string;
        templateName: string;
        division: string;
        division_en: string | null;
        district: string;
        district_en: string | null;
        thana: string;
        thana_en: string | null;
        addressLine: string | null;
        addressLine_en: string | null;
        phone: string | null;
        establishedYear: number | null;
        status: $Enums.HospitalStatus;
        creditBalance: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["hospital"]>;
    composites: {};
};
export type HospitalGetPayload<S extends boolean | null | undefined | HospitalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HospitalPayload, S>;
export type HospitalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HospitalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HospitalCountAggregateInputType | true;
};
export interface HospitalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Hospital'];
        meta: {
            name: 'Hospital';
        };
    };
    /**
     * Find zero or one Hospital that matches the filter.
     * @param {HospitalFindUniqueArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalFindUniqueArgs>(args: Prisma.SelectSubset<T, HospitalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Hospital that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalFindUniqueOrThrowArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HospitalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Hospital that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindFirstArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalFindFirstArgs>(args?: Prisma.SelectSubset<T, HospitalFindFirstArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Hospital that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindFirstOrThrowArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HospitalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Hospitals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hospitals
     * const hospitals = await prisma.hospital.findMany()
     *
     * // Get first 10 Hospitals
     * const hospitals = await prisma.hospital.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const hospitalWithIdOnly = await prisma.hospital.findMany({ select: { id: true } })
     *
     */
    findMany<T extends HospitalFindManyArgs>(args?: Prisma.SelectSubset<T, HospitalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Hospital.
     * @param {HospitalCreateArgs} args - Arguments to create a Hospital.
     * @example
     * // Create one Hospital
     * const Hospital = await prisma.hospital.create({
     *   data: {
     *     // ... data to create a Hospital
     *   }
     * })
     *
     */
    create<T extends HospitalCreateArgs>(args: Prisma.SelectSubset<T, HospitalCreateArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Hospitals.
     * @param {HospitalCreateManyArgs} args - Arguments to create many Hospitals.
     * @example
     * // Create many Hospitals
     * const hospital = await prisma.hospital.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HospitalCreateManyArgs>(args?: Prisma.SelectSubset<T, HospitalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Hospitals and returns the data saved in the database.
     * @param {HospitalCreateManyAndReturnArgs} args - Arguments to create many Hospitals.
     * @example
     * // Create many Hospitals
     * const hospital = await prisma.hospital.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Hospitals and only return the `id`
     * const hospitalWithIdOnly = await prisma.hospital.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends HospitalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HospitalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Hospital.
     * @param {HospitalDeleteArgs} args - Arguments to delete one Hospital.
     * @example
     * // Delete one Hospital
     * const Hospital = await prisma.hospital.delete({
     *   where: {
     *     // ... filter to delete one Hospital
     *   }
     * })
     *
     */
    delete<T extends HospitalDeleteArgs>(args: Prisma.SelectSubset<T, HospitalDeleteArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Hospital.
     * @param {HospitalUpdateArgs} args - Arguments to update one Hospital.
     * @example
     * // Update one Hospital
     * const hospital = await prisma.hospital.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HospitalUpdateArgs>(args: Prisma.SelectSubset<T, HospitalUpdateArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Hospitals.
     * @param {HospitalDeleteManyArgs} args - Arguments to filter Hospitals to delete.
     * @example
     * // Delete a few Hospitals
     * const { count } = await prisma.hospital.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HospitalDeleteManyArgs>(args?: Prisma.SelectSubset<T, HospitalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Hospitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hospitals
     * const hospital = await prisma.hospital.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HospitalUpdateManyArgs>(args: Prisma.SelectSubset<T, HospitalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Hospitals and returns the data updated in the database.
     * @param {HospitalUpdateManyAndReturnArgs} args - Arguments to update many Hospitals.
     * @example
     * // Update many Hospitals
     * const hospital = await prisma.hospital.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Hospitals and only return the `id`
     * const hospitalWithIdOnly = await prisma.hospital.updateManyAndReturn({
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
    updateManyAndReturn<T extends HospitalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HospitalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Hospital.
     * @param {HospitalUpsertArgs} args - Arguments to update or create a Hospital.
     * @example
     * // Update or create a Hospital
     * const hospital = await prisma.hospital.upsert({
     *   create: {
     *     // ... data to create a Hospital
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hospital we want to update
     *   }
     * })
     */
    upsert<T extends HospitalUpsertArgs>(args: Prisma.SelectSubset<T, HospitalUpsertArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Hospitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalCountArgs} args - Arguments to filter Hospitals to count.
     * @example
     * // Count the number of Hospitals
     * const count = await prisma.hospital.count({
     *   where: {
     *     // ... the filter for the Hospitals we want to count
     *   }
     * })
    **/
    count<T extends HospitalCountArgs>(args?: Prisma.Subset<T, HospitalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HospitalCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Hospital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HospitalAggregateArgs>(args: Prisma.Subset<T, HospitalAggregateArgs>): Prisma.PrismaPromise<GetHospitalAggregateType<T>>;
    /**
     * Group by Hospital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalGroupByArgs} args - Group by arguments.
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
    groupBy<T extends HospitalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HospitalGroupByArgs['orderBy'];
    } : {
        orderBy?: HospitalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HospitalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Hospital model
     */
    readonly fields: HospitalFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Hospital.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__HospitalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.Hospital$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    creditLedger<T extends Prisma.Hospital$creditLedgerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$creditLedgerArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditLedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    chambers<T extends Prisma.Hospital$chambersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$chambersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    schedules<T extends Prisma.Hospital$schedulesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    blogs<T extends Prisma.Hospital$blogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$blogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviews<T extends Prisma.Hospital$reviewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pendingAppointments<T extends Prisma.Hospital$pendingAppointmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$pendingAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    confirmedAppointments<T extends Prisma.Hospital$confirmedAppointmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$confirmedAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    servedAppointments<T extends Prisma.Hospital$servedAppointmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$servedAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    payouts<T extends Prisma.Hospital$payoutsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$payoutsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalPayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    onlineDays<T extends Prisma.Hospital$onlineDaysArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$onlineDaysArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HospitalOnlineDayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    staffMembers<T extends Prisma.Hospital$staffMembersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hospital$staffMembersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Hospital model
 */
export interface HospitalFieldRefs {
    readonly id: Prisma.FieldRef<"Hospital", 'String'>;
    readonly userId: Prisma.FieldRef<"Hospital", 'String'>;
    readonly name: Prisma.FieldRef<"Hospital", 'String'>;
    readonly name_en: Prisma.FieldRef<"Hospital", 'String'>;
    readonly slug: Prisma.FieldRef<"Hospital", 'String'>;
    readonly templateName: Prisma.FieldRef<"Hospital", 'String'>;
    readonly division: Prisma.FieldRef<"Hospital", 'String'>;
    readonly division_en: Prisma.FieldRef<"Hospital", 'String'>;
    readonly district: Prisma.FieldRef<"Hospital", 'String'>;
    readonly district_en: Prisma.FieldRef<"Hospital", 'String'>;
    readonly thana: Prisma.FieldRef<"Hospital", 'String'>;
    readonly thana_en: Prisma.FieldRef<"Hospital", 'String'>;
    readonly addressLine: Prisma.FieldRef<"Hospital", 'String'>;
    readonly addressLine_en: Prisma.FieldRef<"Hospital", 'String'>;
    readonly phone: Prisma.FieldRef<"Hospital", 'String'>;
    readonly establishedYear: Prisma.FieldRef<"Hospital", 'Int'>;
    readonly status: Prisma.FieldRef<"Hospital", 'HospitalStatus'>;
    readonly creditBalance: Prisma.FieldRef<"Hospital", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Hospital", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Hospital", 'DateTime'>;
}
/**
 * Hospital findUnique
 */
export type HospitalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Hospital to fetch.
     */
    where: Prisma.HospitalWhereUniqueInput;
};
/**
 * Hospital findUniqueOrThrow
 */
export type HospitalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Hospital to fetch.
     */
    where: Prisma.HospitalWhereUniqueInput;
};
/**
 * Hospital findFirst
 */
export type HospitalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Hospital to fetch.
     */
    where?: Prisma.HospitalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: Prisma.HospitalOrderByWithRelationInput | Prisma.HospitalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Hospitals.
     */
    cursor?: Prisma.HospitalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Hospitals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Hospitals.
     */
    distinct?: Prisma.HospitalScalarFieldEnum | Prisma.HospitalScalarFieldEnum[];
};
/**
 * Hospital findFirstOrThrow
 */
export type HospitalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Hospital to fetch.
     */
    where?: Prisma.HospitalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: Prisma.HospitalOrderByWithRelationInput | Prisma.HospitalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Hospitals.
     */
    cursor?: Prisma.HospitalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Hospitals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Hospitals.
     */
    distinct?: Prisma.HospitalScalarFieldEnum | Prisma.HospitalScalarFieldEnum[];
};
/**
 * Hospital findMany
 */
export type HospitalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Hospitals to fetch.
     */
    where?: Prisma.HospitalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: Prisma.HospitalOrderByWithRelationInput | Prisma.HospitalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Hospitals.
     */
    cursor?: Prisma.HospitalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Hospitals.
     */
    skip?: number;
    distinct?: Prisma.HospitalScalarFieldEnum | Prisma.HospitalScalarFieldEnum[];
};
/**
 * Hospital create
 */
export type HospitalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Hospital.
     */
    data: Prisma.XOR<Prisma.HospitalCreateInput, Prisma.HospitalUncheckedCreateInput>;
};
/**
 * Hospital createMany
 */
export type HospitalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hospitals.
     */
    data: Prisma.HospitalCreateManyInput | Prisma.HospitalCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Hospital createManyAndReturn
 */
export type HospitalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: Prisma.HospitalSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Hospital
     */
    omit?: Prisma.HospitalOmit<ExtArgs> | null;
    /**
     * The data used to create many Hospitals.
     */
    data: Prisma.HospitalCreateManyInput | Prisma.HospitalCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Hospital update
 */
export type HospitalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Hospital.
     */
    data: Prisma.XOR<Prisma.HospitalUpdateInput, Prisma.HospitalUncheckedUpdateInput>;
    /**
     * Choose, which Hospital to update.
     */
    where: Prisma.HospitalWhereUniqueInput;
};
/**
 * Hospital updateMany
 */
export type HospitalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Hospitals.
     */
    data: Prisma.XOR<Prisma.HospitalUpdateManyMutationInput, Prisma.HospitalUncheckedUpdateManyInput>;
    /**
     * Filter which Hospitals to update
     */
    where?: Prisma.HospitalWhereInput;
    /**
     * Limit how many Hospitals to update.
     */
    limit?: number;
};
/**
 * Hospital updateManyAndReturn
 */
export type HospitalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: Prisma.HospitalSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Hospital
     */
    omit?: Prisma.HospitalOmit<ExtArgs> | null;
    /**
     * The data used to update Hospitals.
     */
    data: Prisma.XOR<Prisma.HospitalUpdateManyMutationInput, Prisma.HospitalUncheckedUpdateManyInput>;
    /**
     * Filter which Hospitals to update
     */
    where?: Prisma.HospitalWhereInput;
    /**
     * Limit how many Hospitals to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HospitalIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Hospital upsert
 */
export type HospitalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Hospital to update in case it exists.
     */
    where: Prisma.HospitalWhereUniqueInput;
    /**
     * In case the Hospital found by the `where` argument doesn't exist, create a new Hospital with this data.
     */
    create: Prisma.XOR<Prisma.HospitalCreateInput, Prisma.HospitalUncheckedCreateInput>;
    /**
     * In case the Hospital was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.HospitalUpdateInput, Prisma.HospitalUncheckedUpdateInput>;
};
/**
 * Hospital delete
 */
export type HospitalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Hospital to delete.
     */
    where: Prisma.HospitalWhereUniqueInput;
};
/**
 * Hospital deleteMany
 */
export type HospitalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Hospitals to delete
     */
    where?: Prisma.HospitalWhereInput;
    /**
     * Limit how many Hospitals to delete.
     */
    limit?: number;
};
/**
 * Hospital.user
 */
export type Hospital$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Hospital.creditLedger
 */
export type Hospital$creditLedgerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLedger
     */
    select?: Prisma.CreditLedgerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CreditLedger
     */
    omit?: Prisma.CreditLedgerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CreditLedgerInclude<ExtArgs> | null;
    where?: Prisma.CreditLedgerWhereInput;
    orderBy?: Prisma.CreditLedgerOrderByWithRelationInput | Prisma.CreditLedgerOrderByWithRelationInput[];
    cursor?: Prisma.CreditLedgerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditLedgerScalarFieldEnum | Prisma.CreditLedgerScalarFieldEnum[];
};
/**
 * Hospital.chambers
 */
export type Hospital$chambersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.ChamberWhereInput;
    orderBy?: Prisma.ChamberOrderByWithRelationInput | Prisma.ChamberOrderByWithRelationInput[];
    cursor?: Prisma.ChamberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChamberScalarFieldEnum | Prisma.ChamberScalarFieldEnum[];
};
/**
 * Hospital.schedules
 */
export type Hospital$schedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Hospital.blogs
 */
export type Hospital$blogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: Prisma.BlogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Blog
     */
    omit?: Prisma.BlogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BlogInclude<ExtArgs> | null;
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithRelationInput | Prisma.BlogOrderByWithRelationInput[];
    cursor?: Prisma.BlogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlogScalarFieldEnum | Prisma.BlogScalarFieldEnum[];
};
/**
 * Hospital.reviews
 */
export type Hospital$reviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
/**
 * Hospital.pendingAppointments
 */
export type Hospital$pendingAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAppointment
     */
    select?: Prisma.PendingAppointmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PendingAppointment
     */
    omit?: Prisma.PendingAppointmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PendingAppointmentInclude<ExtArgs> | null;
    where?: Prisma.PendingAppointmentWhereInput;
    orderBy?: Prisma.PendingAppointmentOrderByWithRelationInput | Prisma.PendingAppointmentOrderByWithRelationInput[];
    cursor?: Prisma.PendingAppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PendingAppointmentScalarFieldEnum | Prisma.PendingAppointmentScalarFieldEnum[];
};
/**
 * Hospital.confirmedAppointments
 */
export type Hospital$confirmedAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfirmedAppointment
     */
    select?: Prisma.ConfirmedAppointmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConfirmedAppointment
     */
    omit?: Prisma.ConfirmedAppointmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ConfirmedAppointmentInclude<ExtArgs> | null;
    where?: Prisma.ConfirmedAppointmentWhereInput;
    orderBy?: Prisma.ConfirmedAppointmentOrderByWithRelationInput | Prisma.ConfirmedAppointmentOrderByWithRelationInput[];
    cursor?: Prisma.ConfirmedAppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConfirmedAppointmentScalarFieldEnum | Prisma.ConfirmedAppointmentScalarFieldEnum[];
};
/**
 * Hospital.servedAppointments
 */
export type Hospital$servedAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServedAppointment
     */
    select?: Prisma.ServedAppointmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ServedAppointment
     */
    omit?: Prisma.ServedAppointmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ServedAppointmentInclude<ExtArgs> | null;
    where?: Prisma.ServedAppointmentWhereInput;
    orderBy?: Prisma.ServedAppointmentOrderByWithRelationInput | Prisma.ServedAppointmentOrderByWithRelationInput[];
    cursor?: Prisma.ServedAppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServedAppointmentScalarFieldEnum | Prisma.ServedAppointmentScalarFieldEnum[];
};
/**
 * Hospital.payouts
 */
export type Hospital$payoutsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.HospitalPayoutWhereInput;
    orderBy?: Prisma.HospitalPayoutOrderByWithRelationInput | Prisma.HospitalPayoutOrderByWithRelationInput[];
    cursor?: Prisma.HospitalPayoutWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HospitalPayoutScalarFieldEnum | Prisma.HospitalPayoutScalarFieldEnum[];
};
/**
 * Hospital.onlineDays
 */
export type Hospital$onlineDaysArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.HospitalOnlineDayWhereInput;
    orderBy?: Prisma.HospitalOnlineDayOrderByWithRelationInput | Prisma.HospitalOnlineDayOrderByWithRelationInput[];
    cursor?: Prisma.HospitalOnlineDayWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HospitalOnlineDayScalarFieldEnum | Prisma.HospitalOnlineDayScalarFieldEnum[];
};
/**
 * Hospital.staffMembers
 */
export type Hospital$staffMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * Hospital without action
 */
export type HospitalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Hospital.d.ts.map