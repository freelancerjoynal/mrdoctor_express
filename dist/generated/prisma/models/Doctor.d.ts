import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Doctor
 *
 */
export type DoctorModel = runtime.Types.Result.DefaultSelection<Prisma.$DoctorPayload>;
export type AggregateDoctor = {
    _count: DoctorCountAggregateOutputType | null;
    _avg: DoctorAvgAggregateOutputType | null;
    _sum: DoctorSumAggregateOutputType | null;
    _min: DoctorMinAggregateOutputType | null;
    _max: DoctorMaxAggregateOutputType | null;
};
export type DoctorAvgAggregateOutputType = {
    startedYear: number | null;
    liveCurrentSerial: number | null;
    creditBalance: number | null;
};
export type DoctorSumAggregateOutputType = {
    startedYear: number | null;
    liveCurrentSerial: number | null;
    creditBalance: number | null;
};
export type DoctorMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    name_en: string | null;
    degree: string | null;
    degree_en: string | null;
    speciality: string | null;
    speciality_en: string | null;
    tagline: string | null;
    tagline_en: string | null;
    bio: string | null;
    bio_en: string | null;
    phone: string | null;
    whatsappNumber: string | null;
    whatsappAccessToken: string | null;
    whatsappId: string | null;
    email: string | null;
    username: string | null;
    templateName: string | null;
    profilePicture: string | null;
    businessCardImage: string | null;
    bannerCardImage: string | null;
    gender: $Enums.Gender | null;
    religion: string | null;
    startedYear: number | null;
    bmdcNumber: string | null;
    status: $Enums.DoctorStatus | null;
    serialLive: boolean | null;
    liveCurrentSerial: number | null;
    liveUpdatedAt: Date | null;
    liveBreakReason: string | null;
    liveBreakUntil: Date | null;
    creditBalance: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DoctorMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    name_en: string | null;
    degree: string | null;
    degree_en: string | null;
    speciality: string | null;
    speciality_en: string | null;
    tagline: string | null;
    tagline_en: string | null;
    bio: string | null;
    bio_en: string | null;
    phone: string | null;
    whatsappNumber: string | null;
    whatsappAccessToken: string | null;
    whatsappId: string | null;
    email: string | null;
    username: string | null;
    templateName: string | null;
    profilePicture: string | null;
    businessCardImage: string | null;
    bannerCardImage: string | null;
    gender: $Enums.Gender | null;
    religion: string | null;
    startedYear: number | null;
    bmdcNumber: string | null;
    status: $Enums.DoctorStatus | null;
    serialLive: boolean | null;
    liveCurrentSerial: number | null;
    liveUpdatedAt: Date | null;
    liveBreakReason: string | null;
    liveBreakUntil: Date | null;
    creditBalance: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DoctorCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    name_en: number;
    degree: number;
    degree_en: number;
    speciality: number;
    speciality_en: number;
    tagline: number;
    tagline_en: number;
    bio: number;
    bio_en: number;
    phone: number;
    whatsappNumber: number;
    whatsappAccessToken: number;
    whatsappId: number;
    email: number;
    username: number;
    templateName: number;
    profilePicture: number;
    businessCardImage: number;
    bannerCardImage: number;
    gender: number;
    religion: number;
    startedYear: number;
    bmdcNumber: number;
    status: number;
    serialLive: number;
    liveCurrentSerial: number;
    liveUpdatedAt: number;
    liveSkippedAt: number;
    liveBreakReason: number;
    liveBreakUntil: number;
    creditBalance: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DoctorAvgAggregateInputType = {
    startedYear?: true;
    liveCurrentSerial?: true;
    creditBalance?: true;
};
export type DoctorSumAggregateInputType = {
    startedYear?: true;
    liveCurrentSerial?: true;
    creditBalance?: true;
};
export type DoctorMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    name_en?: true;
    degree?: true;
    degree_en?: true;
    speciality?: true;
    speciality_en?: true;
    tagline?: true;
    tagline_en?: true;
    bio?: true;
    bio_en?: true;
    phone?: true;
    whatsappNumber?: true;
    whatsappAccessToken?: true;
    whatsappId?: true;
    email?: true;
    username?: true;
    templateName?: true;
    profilePicture?: true;
    businessCardImage?: true;
    bannerCardImage?: true;
    gender?: true;
    religion?: true;
    startedYear?: true;
    bmdcNumber?: true;
    status?: true;
    serialLive?: true;
    liveCurrentSerial?: true;
    liveUpdatedAt?: true;
    liveBreakReason?: true;
    liveBreakUntil?: true;
    creditBalance?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DoctorMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    name_en?: true;
    degree?: true;
    degree_en?: true;
    speciality?: true;
    speciality_en?: true;
    tagline?: true;
    tagline_en?: true;
    bio?: true;
    bio_en?: true;
    phone?: true;
    whatsappNumber?: true;
    whatsappAccessToken?: true;
    whatsappId?: true;
    email?: true;
    username?: true;
    templateName?: true;
    profilePicture?: true;
    businessCardImage?: true;
    bannerCardImage?: true;
    gender?: true;
    religion?: true;
    startedYear?: true;
    bmdcNumber?: true;
    status?: true;
    serialLive?: true;
    liveCurrentSerial?: true;
    liveUpdatedAt?: true;
    liveBreakReason?: true;
    liveBreakUntil?: true;
    creditBalance?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DoctorCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    name_en?: true;
    degree?: true;
    degree_en?: true;
    speciality?: true;
    speciality_en?: true;
    tagline?: true;
    tagline_en?: true;
    bio?: true;
    bio_en?: true;
    phone?: true;
    whatsappNumber?: true;
    whatsappAccessToken?: true;
    whatsappId?: true;
    email?: true;
    username?: true;
    templateName?: true;
    profilePicture?: true;
    businessCardImage?: true;
    bannerCardImage?: true;
    gender?: true;
    religion?: true;
    startedYear?: true;
    bmdcNumber?: true;
    status?: true;
    serialLive?: true;
    liveCurrentSerial?: true;
    liveUpdatedAt?: true;
    liveSkippedAt?: true;
    liveBreakReason?: true;
    liveBreakUntil?: true;
    creditBalance?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DoctorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Doctor to aggregate.
     */
    where?: Prisma.DoctorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Doctors to fetch.
     */
    orderBy?: Prisma.DoctorOrderByWithRelationInput | Prisma.DoctorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DoctorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Doctors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Doctors
    **/
    _count?: true | DoctorCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DoctorAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DoctorSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DoctorMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DoctorMaxAggregateInputType;
};
export type GetDoctorAggregateType<T extends DoctorAggregateArgs> = {
    [P in keyof T & keyof AggregateDoctor]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDoctor[P]> : Prisma.GetScalarType<T[P], AggregateDoctor[P]>;
};
export type DoctorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DoctorWhereInput;
    orderBy?: Prisma.DoctorOrderByWithAggregationInput | Prisma.DoctorOrderByWithAggregationInput[];
    by: Prisma.DoctorScalarFieldEnum[] | Prisma.DoctorScalarFieldEnum;
    having?: Prisma.DoctorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DoctorCountAggregateInputType | true;
    _avg?: DoctorAvgAggregateInputType;
    _sum?: DoctorSumAggregateInputType;
    _min?: DoctorMinAggregateInputType;
    _max?: DoctorMaxAggregateInputType;
};
export type DoctorGroupByOutputType = {
    id: string;
    userId: string | null;
    name: string;
    name_en: string | null;
    degree: string;
    degree_en: string | null;
    speciality: string;
    speciality_en: string | null;
    tagline: string | null;
    tagline_en: string | null;
    bio: string | null;
    bio_en: string | null;
    phone: string;
    whatsappNumber: string | null;
    whatsappAccessToken: string | null;
    whatsappId: string | null;
    email: string | null;
    username: string;
    templateName: string;
    profilePicture: string | null;
    businessCardImage: string | null;
    bannerCardImage: string | null;
    gender: $Enums.Gender | null;
    religion: string | null;
    startedYear: number | null;
    bmdcNumber: string | null;
    status: $Enums.DoctorStatus;
    serialLive: boolean;
    liveCurrentSerial: number | null;
    liveUpdatedAt: Date | null;
    liveSkippedAt: runtime.JsonValue | null;
    liveBreakReason: string | null;
    liveBreakUntil: Date | null;
    creditBalance: number;
    createdAt: Date;
    updatedAt: Date;
    _count: DoctorCountAggregateOutputType | null;
    _avg: DoctorAvgAggregateOutputType | null;
    _sum: DoctorSumAggregateOutputType | null;
    _min: DoctorMinAggregateOutputType | null;
    _max: DoctorMaxAggregateOutputType | null;
};
type GetDoctorGroupByPayload<T extends DoctorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DoctorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DoctorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DoctorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DoctorGroupByOutputType[P]>;
}>>;
export type DoctorWhereInput = {
    AND?: Prisma.DoctorWhereInput | Prisma.DoctorWhereInput[];
    OR?: Prisma.DoctorWhereInput[];
    NOT?: Prisma.DoctorWhereInput | Prisma.DoctorWhereInput[];
    id?: Prisma.StringFilter<"Doctor"> | string;
    userId?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    name?: Prisma.StringFilter<"Doctor"> | string;
    name_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    degree?: Prisma.StringFilter<"Doctor"> | string;
    degree_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    speciality?: Prisma.StringFilter<"Doctor"> | string;
    speciality_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    tagline?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    tagline_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    bio?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    bio_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    phone?: Prisma.StringFilter<"Doctor"> | string;
    whatsappNumber?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    whatsappAccessToken?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    whatsappId?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    email?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    username?: Prisma.StringFilter<"Doctor"> | string;
    templateName?: Prisma.StringFilter<"Doctor"> | string;
    profilePicture?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    businessCardImage?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    bannerCardImage?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    gender?: Prisma.EnumGenderNullableFilter<"Doctor"> | $Enums.Gender | null;
    religion?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    startedYear?: Prisma.IntNullableFilter<"Doctor"> | number | null;
    bmdcNumber?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    status?: Prisma.EnumDoctorStatusFilter<"Doctor"> | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFilter<"Doctor"> | boolean;
    liveCurrentSerial?: Prisma.IntNullableFilter<"Doctor"> | number | null;
    liveUpdatedAt?: Prisma.DateTimeNullableFilter<"Doctor"> | Date | string | null;
    liveSkippedAt?: Prisma.JsonNullableFilter<"Doctor">;
    liveBreakReason?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    liveBreakUntil?: Prisma.DateTimeNullableFilter<"Doctor"> | Date | string | null;
    creditBalance?: Prisma.IntFilter<"Doctor"> | number;
    createdAt?: Prisma.DateTimeFilter<"Doctor"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Doctor"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    creditLedger?: Prisma.CreditLedgerListRelationFilter;
    chambers?: Prisma.ChamberListRelationFilter;
    schedules?: Prisma.DoctorScheduleListRelationFilter;
    pendingAppointments?: Prisma.PendingAppointmentListRelationFilter;
    confirmedAppointments?: Prisma.ConfirmedAppointmentListRelationFilter;
    staffMembers?: Prisma.UserListRelationFilter;
    information?: Prisma.XOR<Prisma.DoctorInformationNullableScalarRelationFilter, Prisma.DoctorInformationWhereInput> | null;
    blogs?: Prisma.BlogListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
};
export type DoctorOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    degree_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    speciality?: Prisma.SortOrder;
    speciality_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    tagline?: Prisma.SortOrderInput | Prisma.SortOrder;
    tagline_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    bio_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    whatsappNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    whatsappAccessToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    whatsappId?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    username?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    profilePicture?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessCardImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    bannerCardImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    gender?: Prisma.SortOrderInput | Prisma.SortOrder;
    religion?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedYear?: Prisma.SortOrderInput | Prisma.SortOrder;
    bmdcNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serialLive?: Prisma.SortOrder;
    liveCurrentSerial?: Prisma.SortOrderInput | Prisma.SortOrder;
    liveUpdatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    liveSkippedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    liveBreakReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    liveBreakUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    creditLedger?: Prisma.CreditLedgerOrderByRelationAggregateInput;
    chambers?: Prisma.ChamberOrderByRelationAggregateInput;
    schedules?: Prisma.DoctorScheduleOrderByRelationAggregateInput;
    pendingAppointments?: Prisma.PendingAppointmentOrderByRelationAggregateInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentOrderByRelationAggregateInput;
    staffMembers?: Prisma.UserOrderByRelationAggregateInput;
    information?: Prisma.DoctorInformationOrderByWithRelationInput;
    blogs?: Prisma.BlogOrderByRelationAggregateInput;
    reviews?: Prisma.ReviewOrderByRelationAggregateInput;
};
export type DoctorWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    email?: string;
    username?: string;
    AND?: Prisma.DoctorWhereInput | Prisma.DoctorWhereInput[];
    OR?: Prisma.DoctorWhereInput[];
    NOT?: Prisma.DoctorWhereInput | Prisma.DoctorWhereInput[];
    name?: Prisma.StringFilter<"Doctor"> | string;
    name_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    degree?: Prisma.StringFilter<"Doctor"> | string;
    degree_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    speciality?: Prisma.StringFilter<"Doctor"> | string;
    speciality_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    tagline?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    tagline_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    bio?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    bio_en?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    phone?: Prisma.StringFilter<"Doctor"> | string;
    whatsappNumber?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    whatsappAccessToken?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    whatsappId?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    templateName?: Prisma.StringFilter<"Doctor"> | string;
    profilePicture?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    businessCardImage?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    bannerCardImage?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    gender?: Prisma.EnumGenderNullableFilter<"Doctor"> | $Enums.Gender | null;
    religion?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    startedYear?: Prisma.IntNullableFilter<"Doctor"> | number | null;
    bmdcNumber?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    status?: Prisma.EnumDoctorStatusFilter<"Doctor"> | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFilter<"Doctor"> | boolean;
    liveCurrentSerial?: Prisma.IntNullableFilter<"Doctor"> | number | null;
    liveUpdatedAt?: Prisma.DateTimeNullableFilter<"Doctor"> | Date | string | null;
    liveSkippedAt?: Prisma.JsonNullableFilter<"Doctor">;
    liveBreakReason?: Prisma.StringNullableFilter<"Doctor"> | string | null;
    liveBreakUntil?: Prisma.DateTimeNullableFilter<"Doctor"> | Date | string | null;
    creditBalance?: Prisma.IntFilter<"Doctor"> | number;
    createdAt?: Prisma.DateTimeFilter<"Doctor"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Doctor"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    creditLedger?: Prisma.CreditLedgerListRelationFilter;
    chambers?: Prisma.ChamberListRelationFilter;
    schedules?: Prisma.DoctorScheduleListRelationFilter;
    pendingAppointments?: Prisma.PendingAppointmentListRelationFilter;
    confirmedAppointments?: Prisma.ConfirmedAppointmentListRelationFilter;
    staffMembers?: Prisma.UserListRelationFilter;
    information?: Prisma.XOR<Prisma.DoctorInformationNullableScalarRelationFilter, Prisma.DoctorInformationWhereInput> | null;
    blogs?: Prisma.BlogListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
}, "id" | "userId" | "email" | "username">;
export type DoctorOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    degree_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    speciality?: Prisma.SortOrder;
    speciality_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    tagline?: Prisma.SortOrderInput | Prisma.SortOrder;
    tagline_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    bio_en?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    whatsappNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    whatsappAccessToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    whatsappId?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    username?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    profilePicture?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessCardImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    bannerCardImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    gender?: Prisma.SortOrderInput | Prisma.SortOrder;
    religion?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedYear?: Prisma.SortOrderInput | Prisma.SortOrder;
    bmdcNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serialLive?: Prisma.SortOrder;
    liveCurrentSerial?: Prisma.SortOrderInput | Prisma.SortOrder;
    liveUpdatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    liveSkippedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    liveBreakReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    liveBreakUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DoctorCountOrderByAggregateInput;
    _avg?: Prisma.DoctorAvgOrderByAggregateInput;
    _max?: Prisma.DoctorMaxOrderByAggregateInput;
    _min?: Prisma.DoctorMinOrderByAggregateInput;
    _sum?: Prisma.DoctorSumOrderByAggregateInput;
};
export type DoctorScalarWhereWithAggregatesInput = {
    AND?: Prisma.DoctorScalarWhereWithAggregatesInput | Prisma.DoctorScalarWhereWithAggregatesInput[];
    OR?: Prisma.DoctorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DoctorScalarWhereWithAggregatesInput | Prisma.DoctorScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Doctor"> | string;
    userId?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"Doctor"> | string;
    name_en?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    degree?: Prisma.StringWithAggregatesFilter<"Doctor"> | string;
    degree_en?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    speciality?: Prisma.StringWithAggregatesFilter<"Doctor"> | string;
    speciality_en?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    tagline?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    tagline_en?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    bio?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    bio_en?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    phone?: Prisma.StringWithAggregatesFilter<"Doctor"> | string;
    whatsappNumber?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    whatsappAccessToken?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    whatsappId?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    username?: Prisma.StringWithAggregatesFilter<"Doctor"> | string;
    templateName?: Prisma.StringWithAggregatesFilter<"Doctor"> | string;
    profilePicture?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    businessCardImage?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    bannerCardImage?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    gender?: Prisma.EnumGenderNullableWithAggregatesFilter<"Doctor"> | $Enums.Gender | null;
    religion?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    startedYear?: Prisma.IntNullableWithAggregatesFilter<"Doctor"> | number | null;
    bmdcNumber?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    status?: Prisma.EnumDoctorStatusWithAggregatesFilter<"Doctor"> | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolWithAggregatesFilter<"Doctor"> | boolean;
    liveCurrentSerial?: Prisma.IntNullableWithAggregatesFilter<"Doctor"> | number | null;
    liveUpdatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Doctor"> | Date | string | null;
    liveSkippedAt?: Prisma.JsonNullableWithAggregatesFilter<"Doctor">;
    liveBreakReason?: Prisma.StringNullableWithAggregatesFilter<"Doctor"> | string | null;
    liveBreakUntil?: Prisma.DateTimeNullableWithAggregatesFilter<"Doctor"> | Date | string | null;
    creditBalance?: Prisma.IntWithAggregatesFilter<"Doctor"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Doctor"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Doctor"> | Date | string;
};
export type DoctorCreateInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorCreateManyInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DoctorUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DoctorNullableScalarRelationFilter = {
    is?: Prisma.DoctorWhereInput | null;
    isNot?: Prisma.DoctorWhereInput | null;
};
export type DoctorCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    degree_en?: Prisma.SortOrder;
    speciality?: Prisma.SortOrder;
    speciality_en?: Prisma.SortOrder;
    tagline?: Prisma.SortOrder;
    tagline_en?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    bio_en?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    whatsappNumber?: Prisma.SortOrder;
    whatsappAccessToken?: Prisma.SortOrder;
    whatsappId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    profilePicture?: Prisma.SortOrder;
    businessCardImage?: Prisma.SortOrder;
    bannerCardImage?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    religion?: Prisma.SortOrder;
    startedYear?: Prisma.SortOrder;
    bmdcNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serialLive?: Prisma.SortOrder;
    liveCurrentSerial?: Prisma.SortOrder;
    liveUpdatedAt?: Prisma.SortOrder;
    liveSkippedAt?: Prisma.SortOrder;
    liveBreakReason?: Prisma.SortOrder;
    liveBreakUntil?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorAvgOrderByAggregateInput = {
    startedYear?: Prisma.SortOrder;
    liveCurrentSerial?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
};
export type DoctorMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    degree_en?: Prisma.SortOrder;
    speciality?: Prisma.SortOrder;
    speciality_en?: Prisma.SortOrder;
    tagline?: Prisma.SortOrder;
    tagline_en?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    bio_en?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    whatsappNumber?: Prisma.SortOrder;
    whatsappAccessToken?: Prisma.SortOrder;
    whatsappId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    profilePicture?: Prisma.SortOrder;
    businessCardImage?: Prisma.SortOrder;
    bannerCardImage?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    religion?: Prisma.SortOrder;
    startedYear?: Prisma.SortOrder;
    bmdcNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serialLive?: Prisma.SortOrder;
    liveCurrentSerial?: Prisma.SortOrder;
    liveUpdatedAt?: Prisma.SortOrder;
    liveBreakReason?: Prisma.SortOrder;
    liveBreakUntil?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    name_en?: Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    degree_en?: Prisma.SortOrder;
    speciality?: Prisma.SortOrder;
    speciality_en?: Prisma.SortOrder;
    tagline?: Prisma.SortOrder;
    tagline_en?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    bio_en?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    whatsappNumber?: Prisma.SortOrder;
    whatsappAccessToken?: Prisma.SortOrder;
    whatsappId?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    templateName?: Prisma.SortOrder;
    profilePicture?: Prisma.SortOrder;
    businessCardImage?: Prisma.SortOrder;
    bannerCardImage?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    religion?: Prisma.SortOrder;
    startedYear?: Prisma.SortOrder;
    bmdcNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serialLive?: Prisma.SortOrder;
    liveCurrentSerial?: Prisma.SortOrder;
    liveUpdatedAt?: Prisma.SortOrder;
    liveBreakReason?: Prisma.SortOrder;
    liveBreakUntil?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DoctorSumOrderByAggregateInput = {
    startedYear?: Prisma.SortOrder;
    liveCurrentSerial?: Prisma.SortOrder;
    creditBalance?: Prisma.SortOrder;
};
export type DoctorScalarRelationFilter = {
    is?: Prisma.DoctorWhereInput;
    isNot?: Prisma.DoctorWhereInput;
};
export type DoctorCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutUserInput, Prisma.DoctorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutUserInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorCreateNestedOneWithoutStaffMembersInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutStaffMembersInput, Prisma.DoctorUncheckedCreateWithoutStaffMembersInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutStaffMembersInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutUserInput, Prisma.DoctorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutUserInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutUserInput, Prisma.DoctorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutUserInput;
    upsert?: Prisma.DoctorUpsertWithoutUserInput;
    disconnect?: Prisma.DoctorWhereInput | boolean;
    delete?: Prisma.DoctorWhereInput | boolean;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutUserInput, Prisma.DoctorUpdateWithoutUserInput>, Prisma.DoctorUncheckedUpdateWithoutUserInput>;
};
export type DoctorUpdateOneWithoutStaffMembersNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutStaffMembersInput, Prisma.DoctorUncheckedCreateWithoutStaffMembersInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutStaffMembersInput;
    upsert?: Prisma.DoctorUpsertWithoutStaffMembersInput;
    disconnect?: Prisma.DoctorWhereInput | boolean;
    delete?: Prisma.DoctorWhereInput | boolean;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutStaffMembersInput, Prisma.DoctorUpdateWithoutStaffMembersInput>, Prisma.DoctorUncheckedUpdateWithoutStaffMembersInput>;
};
export type DoctorUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutUserInput, Prisma.DoctorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutUserInput;
    upsert?: Prisma.DoctorUpsertWithoutUserInput;
    disconnect?: Prisma.DoctorWhereInput | boolean;
    delete?: Prisma.DoctorWhereInput | boolean;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutUserInput, Prisma.DoctorUpdateWithoutUserInput>, Prisma.DoctorUncheckedUpdateWithoutUserInput>;
};
export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumDoctorStatusFieldUpdateOperationsInput = {
    set?: $Enums.DoctorStatus;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DoctorCreateNestedOneWithoutCreditLedgerInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutCreditLedgerInput, Prisma.DoctorUncheckedCreateWithoutCreditLedgerInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutCreditLedgerInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUpdateOneWithoutCreditLedgerNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutCreditLedgerInput, Prisma.DoctorUncheckedCreateWithoutCreditLedgerInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutCreditLedgerInput;
    upsert?: Prisma.DoctorUpsertWithoutCreditLedgerInput;
    disconnect?: Prisma.DoctorWhereInput | boolean;
    delete?: Prisma.DoctorWhereInput | boolean;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutCreditLedgerInput, Prisma.DoctorUpdateWithoutCreditLedgerInput>, Prisma.DoctorUncheckedUpdateWithoutCreditLedgerInput>;
};
export type DoctorCreateNestedOneWithoutChambersInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutChambersInput, Prisma.DoctorUncheckedCreateWithoutChambersInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutChambersInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUpdateOneWithoutChambersNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutChambersInput, Prisma.DoctorUncheckedCreateWithoutChambersInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutChambersInput;
    upsert?: Prisma.DoctorUpsertWithoutChambersInput;
    disconnect?: Prisma.DoctorWhereInput | boolean;
    delete?: Prisma.DoctorWhereInput | boolean;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutChambersInput, Prisma.DoctorUpdateWithoutChambersInput>, Prisma.DoctorUncheckedUpdateWithoutChambersInput>;
};
export type DoctorCreateNestedOneWithoutSchedulesInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutSchedulesInput, Prisma.DoctorUncheckedCreateWithoutSchedulesInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutSchedulesInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutSchedulesInput, Prisma.DoctorUncheckedCreateWithoutSchedulesInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutSchedulesInput;
    upsert?: Prisma.DoctorUpsertWithoutSchedulesInput;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutSchedulesInput, Prisma.DoctorUpdateWithoutSchedulesInput>, Prisma.DoctorUncheckedUpdateWithoutSchedulesInput>;
};
export type DoctorCreateNestedOneWithoutPendingAppointmentsInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutPendingAppointmentsInput, Prisma.DoctorUncheckedCreateWithoutPendingAppointmentsInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutPendingAppointmentsInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUpdateOneRequiredWithoutPendingAppointmentsNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutPendingAppointmentsInput, Prisma.DoctorUncheckedCreateWithoutPendingAppointmentsInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutPendingAppointmentsInput;
    upsert?: Prisma.DoctorUpsertWithoutPendingAppointmentsInput;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutPendingAppointmentsInput, Prisma.DoctorUpdateWithoutPendingAppointmentsInput>, Prisma.DoctorUncheckedUpdateWithoutPendingAppointmentsInput>;
};
export type DoctorCreateNestedOneWithoutConfirmedAppointmentsInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutConfirmedAppointmentsInput, Prisma.DoctorUncheckedCreateWithoutConfirmedAppointmentsInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutConfirmedAppointmentsInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUpdateOneRequiredWithoutConfirmedAppointmentsNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutConfirmedAppointmentsInput, Prisma.DoctorUncheckedCreateWithoutConfirmedAppointmentsInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutConfirmedAppointmentsInput;
    upsert?: Prisma.DoctorUpsertWithoutConfirmedAppointmentsInput;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutConfirmedAppointmentsInput, Prisma.DoctorUpdateWithoutConfirmedAppointmentsInput>, Prisma.DoctorUncheckedUpdateWithoutConfirmedAppointmentsInput>;
};
export type DoctorCreateNestedOneWithoutInformationInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutInformationInput, Prisma.DoctorUncheckedCreateWithoutInformationInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutInformationInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUpdateOneRequiredWithoutInformationNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutInformationInput, Prisma.DoctorUncheckedCreateWithoutInformationInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutInformationInput;
    upsert?: Prisma.DoctorUpsertWithoutInformationInput;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutInformationInput, Prisma.DoctorUpdateWithoutInformationInput>, Prisma.DoctorUncheckedUpdateWithoutInformationInput>;
};
export type DoctorCreateNestedOneWithoutBlogsInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutBlogsInput, Prisma.DoctorUncheckedCreateWithoutBlogsInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutBlogsInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUpdateOneWithoutBlogsNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutBlogsInput, Prisma.DoctorUncheckedCreateWithoutBlogsInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutBlogsInput;
    upsert?: Prisma.DoctorUpsertWithoutBlogsInput;
    disconnect?: Prisma.DoctorWhereInput | boolean;
    delete?: Prisma.DoctorWhereInput | boolean;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutBlogsInput, Prisma.DoctorUpdateWithoutBlogsInput>, Prisma.DoctorUncheckedUpdateWithoutBlogsInput>;
};
export type DoctorCreateNestedOneWithoutReviewsInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutReviewsInput, Prisma.DoctorUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutReviewsInput;
    connect?: Prisma.DoctorWhereUniqueInput;
};
export type DoctorUpdateOneWithoutReviewsNestedInput = {
    create?: Prisma.XOR<Prisma.DoctorCreateWithoutReviewsInput, Prisma.DoctorUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.DoctorCreateOrConnectWithoutReviewsInput;
    upsert?: Prisma.DoctorUpsertWithoutReviewsInput;
    disconnect?: Prisma.DoctorWhereInput | boolean;
    delete?: Prisma.DoctorWhereInput | boolean;
    connect?: Prisma.DoctorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DoctorUpdateToOneWithWhereWithoutReviewsInput, Prisma.DoctorUpdateWithoutReviewsInput>, Prisma.DoctorUncheckedUpdateWithoutReviewsInput>;
};
export type DoctorCreateWithoutUserInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutUserInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutUserInput, Prisma.DoctorUncheckedCreateWithoutUserInput>;
};
export type DoctorCreateWithoutStaffMembersInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutStaffMembersInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutStaffMembersInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutStaffMembersInput, Prisma.DoctorUncheckedCreateWithoutStaffMembersInput>;
};
export type DoctorUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutUserInput, Prisma.DoctorUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutUserInput, Prisma.DoctorUncheckedCreateWithoutUserInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutUserInput, Prisma.DoctorUncheckedUpdateWithoutUserInput>;
};
export type DoctorUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUpsertWithoutStaffMembersInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutStaffMembersInput, Prisma.DoctorUncheckedUpdateWithoutStaffMembersInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutStaffMembersInput, Prisma.DoctorUncheckedCreateWithoutStaffMembersInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutStaffMembersInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutStaffMembersInput, Prisma.DoctorUncheckedUpdateWithoutStaffMembersInput>;
};
export type DoctorUpdateWithoutStaffMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutStaffMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorCreateWithoutCreditLedgerInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutCreditLedgerInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutCreditLedgerInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutCreditLedgerInput, Prisma.DoctorUncheckedCreateWithoutCreditLedgerInput>;
};
export type DoctorUpsertWithoutCreditLedgerInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutCreditLedgerInput, Prisma.DoctorUncheckedUpdateWithoutCreditLedgerInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutCreditLedgerInput, Prisma.DoctorUncheckedCreateWithoutCreditLedgerInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutCreditLedgerInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutCreditLedgerInput, Prisma.DoctorUncheckedUpdateWithoutCreditLedgerInput>;
};
export type DoctorUpdateWithoutCreditLedgerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutCreditLedgerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorCreateWithoutChambersInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutChambersInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutChambersInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutChambersInput, Prisma.DoctorUncheckedCreateWithoutChambersInput>;
};
export type DoctorUpsertWithoutChambersInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutChambersInput, Prisma.DoctorUncheckedUpdateWithoutChambersInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutChambersInput, Prisma.DoctorUncheckedCreateWithoutChambersInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutChambersInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutChambersInput, Prisma.DoctorUncheckedUpdateWithoutChambersInput>;
};
export type DoctorUpdateWithoutChambersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutChambersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorCreateWithoutSchedulesInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutSchedulesInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutSchedulesInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutSchedulesInput, Prisma.DoctorUncheckedCreateWithoutSchedulesInput>;
};
export type DoctorUpsertWithoutSchedulesInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutSchedulesInput, Prisma.DoctorUncheckedUpdateWithoutSchedulesInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutSchedulesInput, Prisma.DoctorUncheckedCreateWithoutSchedulesInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutSchedulesInput, Prisma.DoctorUncheckedUpdateWithoutSchedulesInput>;
};
export type DoctorUpdateWithoutSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutSchedulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorCreateWithoutPendingAppointmentsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutPendingAppointmentsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutPendingAppointmentsInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutPendingAppointmentsInput, Prisma.DoctorUncheckedCreateWithoutPendingAppointmentsInput>;
};
export type DoctorUpsertWithoutPendingAppointmentsInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutPendingAppointmentsInput, Prisma.DoctorUncheckedUpdateWithoutPendingAppointmentsInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutPendingAppointmentsInput, Prisma.DoctorUncheckedCreateWithoutPendingAppointmentsInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutPendingAppointmentsInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutPendingAppointmentsInput, Prisma.DoctorUncheckedUpdateWithoutPendingAppointmentsInput>;
};
export type DoctorUpdateWithoutPendingAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutPendingAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorCreateWithoutConfirmedAppointmentsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutConfirmedAppointmentsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutConfirmedAppointmentsInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutConfirmedAppointmentsInput, Prisma.DoctorUncheckedCreateWithoutConfirmedAppointmentsInput>;
};
export type DoctorUpsertWithoutConfirmedAppointmentsInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutConfirmedAppointmentsInput, Prisma.DoctorUncheckedUpdateWithoutConfirmedAppointmentsInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutConfirmedAppointmentsInput, Prisma.DoctorUncheckedCreateWithoutConfirmedAppointmentsInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutConfirmedAppointmentsInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutConfirmedAppointmentsInput, Prisma.DoctorUncheckedUpdateWithoutConfirmedAppointmentsInput>;
};
export type DoctorUpdateWithoutConfirmedAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutConfirmedAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorCreateWithoutInformationInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutInformationInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutInformationInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutInformationInput, Prisma.DoctorUncheckedCreateWithoutInformationInput>;
};
export type DoctorUpsertWithoutInformationInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutInformationInput, Prisma.DoctorUncheckedUpdateWithoutInformationInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutInformationInput, Prisma.DoctorUncheckedCreateWithoutInformationInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutInformationInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutInformationInput, Prisma.DoctorUncheckedUpdateWithoutInformationInput>;
};
export type DoctorUpdateWithoutInformationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutInformationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorCreateWithoutBlogsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutBlogsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutBlogsInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutBlogsInput, Prisma.DoctorUncheckedCreateWithoutBlogsInput>;
};
export type DoctorUpsertWithoutBlogsInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutBlogsInput, Prisma.DoctorUncheckedUpdateWithoutBlogsInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutBlogsInput, Prisma.DoctorUncheckedCreateWithoutBlogsInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutBlogsInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutBlogsInput, Prisma.DoctorUncheckedUpdateWithoutBlogsInput>;
};
export type DoctorUpdateWithoutBlogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutBlogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutDoctorNestedInput;
};
export type DoctorCreateWithoutReviewsInput = {
    id?: string;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutDoctorProfileInput;
    creditLedger?: Prisma.CreditLedgerCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogCreateNestedManyWithoutDoctorInput;
};
export type DoctorUncheckedCreateWithoutReviewsInput = {
    id?: string;
    userId?: string | null;
    name: string;
    name_en?: string | null;
    degree: string;
    degree_en?: string | null;
    speciality: string;
    speciality_en?: string | null;
    tagline?: string | null;
    tagline_en?: string | null;
    bio?: string | null;
    bio_en?: string | null;
    phone: string;
    whatsappNumber?: string | null;
    whatsappAccessToken?: string | null;
    whatsappId?: string | null;
    email?: string | null;
    username: string;
    templateName?: string;
    profilePicture?: string | null;
    businessCardImage?: string | null;
    bannerCardImage?: string | null;
    gender?: $Enums.Gender | null;
    religion?: string | null;
    startedYear?: number | null;
    bmdcNumber?: string | null;
    status?: $Enums.DoctorStatus;
    serialLive?: boolean;
    liveCurrentSerial?: number | null;
    liveUpdatedAt?: Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: string | null;
    liveBreakUntil?: Date | string | null;
    creditBalance?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedCreateNestedManyWithoutDoctorInput;
    chambers?: Prisma.ChamberUncheckedCreateNestedManyWithoutDoctorInput;
    schedules?: Prisma.DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput;
    staffMembers?: Prisma.UserUncheckedCreateNestedManyWithoutStaffDoctorInput;
    information?: Prisma.DoctorInformationUncheckedCreateNestedOneWithoutDoctorInput;
    blogs?: Prisma.BlogUncheckedCreateNestedManyWithoutDoctorInput;
};
export type DoctorCreateOrConnectWithoutReviewsInput = {
    where: Prisma.DoctorWhereUniqueInput;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutReviewsInput, Prisma.DoctorUncheckedCreateWithoutReviewsInput>;
};
export type DoctorUpsertWithoutReviewsInput = {
    update: Prisma.XOR<Prisma.DoctorUpdateWithoutReviewsInput, Prisma.DoctorUncheckedUpdateWithoutReviewsInput>;
    create: Prisma.XOR<Prisma.DoctorCreateWithoutReviewsInput, Prisma.DoctorUncheckedCreateWithoutReviewsInput>;
    where?: Prisma.DoctorWhereInput;
};
export type DoctorUpdateToOneWithWhereWithoutReviewsInput = {
    where?: Prisma.DoctorWhereInput;
    data: Prisma.XOR<Prisma.DoctorUpdateWithoutReviewsInput, Prisma.DoctorUncheckedUpdateWithoutReviewsInput>;
};
export type DoctorUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutDoctorProfileNestedInput;
    creditLedger?: Prisma.CreditLedgerUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUpdateManyWithoutDoctorNestedInput;
};
export type DoctorUncheckedUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    name_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.StringFieldUpdateOperationsInput | string;
    degree_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    speciality?: Prisma.StringFieldUpdateOperationsInput | string;
    speciality_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tagline_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bio_en?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    whatsappNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappAccessToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    whatsappId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    templateName?: Prisma.StringFieldUpdateOperationsInput | string;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bannerCardImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null;
    religion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    bmdcNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumDoctorStatusFieldUpdateOperationsInput | $Enums.DoctorStatus;
    serialLive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    liveCurrentSerial?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    liveUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    liveSkippedAt?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    liveBreakReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    liveBreakUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    creditBalance?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    creditLedger?: Prisma.CreditLedgerUncheckedUpdateManyWithoutDoctorNestedInput;
    chambers?: Prisma.ChamberUncheckedUpdateManyWithoutDoctorNestedInput;
    schedules?: Prisma.DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput;
    pendingAppointments?: Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput;
    staffMembers?: Prisma.UserUncheckedUpdateManyWithoutStaffDoctorNestedInput;
    information?: Prisma.DoctorInformationUncheckedUpdateOneWithoutDoctorNestedInput;
    blogs?: Prisma.BlogUncheckedUpdateManyWithoutDoctorNestedInput;
};
/**
 * Count Type DoctorCountOutputType
 */
export type DoctorCountOutputType = {
    creditLedger: number;
    chambers: number;
    schedules: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    staffMembers: number;
    blogs: number;
    reviews: number;
};
export type DoctorCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    creditLedger?: boolean | DoctorCountOutputTypeCountCreditLedgerArgs;
    chambers?: boolean | DoctorCountOutputTypeCountChambersArgs;
    schedules?: boolean | DoctorCountOutputTypeCountSchedulesArgs;
    pendingAppointments?: boolean | DoctorCountOutputTypeCountPendingAppointmentsArgs;
    confirmedAppointments?: boolean | DoctorCountOutputTypeCountConfirmedAppointmentsArgs;
    staffMembers?: boolean | DoctorCountOutputTypeCountStaffMembersArgs;
    blogs?: boolean | DoctorCountOutputTypeCountBlogsArgs;
    reviews?: boolean | DoctorCountOutputTypeCountReviewsArgs;
};
/**
 * DoctorCountOutputType without action
 */
export type DoctorCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorCountOutputType
     */
    select?: Prisma.DoctorCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * DoctorCountOutputType without action
 */
export type DoctorCountOutputTypeCountCreditLedgerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditLedgerWhereInput;
};
/**
 * DoctorCountOutputType without action
 */
export type DoctorCountOutputTypeCountChambersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChamberWhereInput;
};
/**
 * DoctorCountOutputType without action
 */
export type DoctorCountOutputTypeCountSchedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DoctorScheduleWhereInput;
};
/**
 * DoctorCountOutputType without action
 */
export type DoctorCountOutputTypeCountPendingAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PendingAppointmentWhereInput;
};
/**
 * DoctorCountOutputType without action
 */
export type DoctorCountOutputTypeCountConfirmedAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConfirmedAppointmentWhereInput;
};
/**
 * DoctorCountOutputType without action
 */
export type DoctorCountOutputTypeCountStaffMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
/**
 * DoctorCountOutputType without action
 */
export type DoctorCountOutputTypeCountBlogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlogWhereInput;
};
/**
 * DoctorCountOutputType without action
 */
export type DoctorCountOutputTypeCountReviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
};
export type DoctorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    name_en?: boolean;
    degree?: boolean;
    degree_en?: boolean;
    speciality?: boolean;
    speciality_en?: boolean;
    tagline?: boolean;
    tagline_en?: boolean;
    bio?: boolean;
    bio_en?: boolean;
    phone?: boolean;
    whatsappNumber?: boolean;
    whatsappAccessToken?: boolean;
    whatsappId?: boolean;
    email?: boolean;
    username?: boolean;
    templateName?: boolean;
    profilePicture?: boolean;
    businessCardImage?: boolean;
    bannerCardImage?: boolean;
    gender?: boolean;
    religion?: boolean;
    startedYear?: boolean;
    bmdcNumber?: boolean;
    status?: boolean;
    serialLive?: boolean;
    liveCurrentSerial?: boolean;
    liveUpdatedAt?: boolean;
    liveSkippedAt?: boolean;
    liveBreakReason?: boolean;
    liveBreakUntil?: boolean;
    creditBalance?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.Doctor$userArgs<ExtArgs>;
    creditLedger?: boolean | Prisma.Doctor$creditLedgerArgs<ExtArgs>;
    chambers?: boolean | Prisma.Doctor$chambersArgs<ExtArgs>;
    schedules?: boolean | Prisma.Doctor$schedulesArgs<ExtArgs>;
    pendingAppointments?: boolean | Prisma.Doctor$pendingAppointmentsArgs<ExtArgs>;
    confirmedAppointments?: boolean | Prisma.Doctor$confirmedAppointmentsArgs<ExtArgs>;
    staffMembers?: boolean | Prisma.Doctor$staffMembersArgs<ExtArgs>;
    information?: boolean | Prisma.Doctor$informationArgs<ExtArgs>;
    blogs?: boolean | Prisma.Doctor$blogsArgs<ExtArgs>;
    reviews?: boolean | Prisma.Doctor$reviewsArgs<ExtArgs>;
    _count?: boolean | Prisma.DoctorCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["doctor"]>;
export type DoctorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    name_en?: boolean;
    degree?: boolean;
    degree_en?: boolean;
    speciality?: boolean;
    speciality_en?: boolean;
    tagline?: boolean;
    tagline_en?: boolean;
    bio?: boolean;
    bio_en?: boolean;
    phone?: boolean;
    whatsappNumber?: boolean;
    whatsappAccessToken?: boolean;
    whatsappId?: boolean;
    email?: boolean;
    username?: boolean;
    templateName?: boolean;
    profilePicture?: boolean;
    businessCardImage?: boolean;
    bannerCardImage?: boolean;
    gender?: boolean;
    religion?: boolean;
    startedYear?: boolean;
    bmdcNumber?: boolean;
    status?: boolean;
    serialLive?: boolean;
    liveCurrentSerial?: boolean;
    liveUpdatedAt?: boolean;
    liveSkippedAt?: boolean;
    liveBreakReason?: boolean;
    liveBreakUntil?: boolean;
    creditBalance?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.Doctor$userArgs<ExtArgs>;
}, ExtArgs["result"]["doctor"]>;
export type DoctorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    name_en?: boolean;
    degree?: boolean;
    degree_en?: boolean;
    speciality?: boolean;
    speciality_en?: boolean;
    tagline?: boolean;
    tagline_en?: boolean;
    bio?: boolean;
    bio_en?: boolean;
    phone?: boolean;
    whatsappNumber?: boolean;
    whatsappAccessToken?: boolean;
    whatsappId?: boolean;
    email?: boolean;
    username?: boolean;
    templateName?: boolean;
    profilePicture?: boolean;
    businessCardImage?: boolean;
    bannerCardImage?: boolean;
    gender?: boolean;
    religion?: boolean;
    startedYear?: boolean;
    bmdcNumber?: boolean;
    status?: boolean;
    serialLive?: boolean;
    liveCurrentSerial?: boolean;
    liveUpdatedAt?: boolean;
    liveSkippedAt?: boolean;
    liveBreakReason?: boolean;
    liveBreakUntil?: boolean;
    creditBalance?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.Doctor$userArgs<ExtArgs>;
}, ExtArgs["result"]["doctor"]>;
export type DoctorSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    name_en?: boolean;
    degree?: boolean;
    degree_en?: boolean;
    speciality?: boolean;
    speciality_en?: boolean;
    tagline?: boolean;
    tagline_en?: boolean;
    bio?: boolean;
    bio_en?: boolean;
    phone?: boolean;
    whatsappNumber?: boolean;
    whatsappAccessToken?: boolean;
    whatsappId?: boolean;
    email?: boolean;
    username?: boolean;
    templateName?: boolean;
    profilePicture?: boolean;
    businessCardImage?: boolean;
    bannerCardImage?: boolean;
    gender?: boolean;
    religion?: boolean;
    startedYear?: boolean;
    bmdcNumber?: boolean;
    status?: boolean;
    serialLive?: boolean;
    liveCurrentSerial?: boolean;
    liveUpdatedAt?: boolean;
    liveSkippedAt?: boolean;
    liveBreakReason?: boolean;
    liveBreakUntil?: boolean;
    creditBalance?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DoctorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "name_en" | "degree" | "degree_en" | "speciality" | "speciality_en" | "tagline" | "tagline_en" | "bio" | "bio_en" | "phone" | "whatsappNumber" | "whatsappAccessToken" | "whatsappId" | "email" | "username" | "templateName" | "profilePicture" | "businessCardImage" | "bannerCardImage" | "gender" | "religion" | "startedYear" | "bmdcNumber" | "status" | "serialLive" | "liveCurrentSerial" | "liveUpdatedAt" | "liveSkippedAt" | "liveBreakReason" | "liveBreakUntil" | "creditBalance" | "createdAt" | "updatedAt", ExtArgs["result"]["doctor"]>;
export type DoctorInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.Doctor$userArgs<ExtArgs>;
    creditLedger?: boolean | Prisma.Doctor$creditLedgerArgs<ExtArgs>;
    chambers?: boolean | Prisma.Doctor$chambersArgs<ExtArgs>;
    schedules?: boolean | Prisma.Doctor$schedulesArgs<ExtArgs>;
    pendingAppointments?: boolean | Prisma.Doctor$pendingAppointmentsArgs<ExtArgs>;
    confirmedAppointments?: boolean | Prisma.Doctor$confirmedAppointmentsArgs<ExtArgs>;
    staffMembers?: boolean | Prisma.Doctor$staffMembersArgs<ExtArgs>;
    information?: boolean | Prisma.Doctor$informationArgs<ExtArgs>;
    blogs?: boolean | Prisma.Doctor$blogsArgs<ExtArgs>;
    reviews?: boolean | Prisma.Doctor$reviewsArgs<ExtArgs>;
    _count?: boolean | Prisma.DoctorCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DoctorIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.Doctor$userArgs<ExtArgs>;
};
export type DoctorIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.Doctor$userArgs<ExtArgs>;
};
export type $DoctorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Doctor";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
        creditLedger: Prisma.$CreditLedgerPayload<ExtArgs>[];
        chambers: Prisma.$ChamberPayload<ExtArgs>[];
        schedules: Prisma.$DoctorSchedulePayload<ExtArgs>[];
        pendingAppointments: Prisma.$PendingAppointmentPayload<ExtArgs>[];
        confirmedAppointments: Prisma.$ConfirmedAppointmentPayload<ExtArgs>[];
        staffMembers: Prisma.$UserPayload<ExtArgs>[];
        information: Prisma.$DoctorInformationPayload<ExtArgs> | null;
        blogs: Prisma.$BlogPayload<ExtArgs>[];
        reviews: Prisma.$ReviewPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string | null;
        name: string;
        name_en: string | null;
        degree: string;
        degree_en: string | null;
        speciality: string;
        speciality_en: string | null;
        tagline: string | null;
        tagline_en: string | null;
        bio: string | null;
        bio_en: string | null;
        phone: string;
        whatsappNumber: string | null;
        whatsappAccessToken: string | null;
        whatsappId: string | null;
        email: string | null;
        username: string;
        templateName: string;
        profilePicture: string | null;
        businessCardImage: string | null;
        bannerCardImage: string | null;
        gender: $Enums.Gender | null;
        religion: string | null;
        startedYear: number | null;
        bmdcNumber: string | null;
        status: $Enums.DoctorStatus;
        serialLive: boolean;
        liveCurrentSerial: number | null;
        liveUpdatedAt: Date | null;
        liveSkippedAt: runtime.JsonValue | null;
        liveBreakReason: string | null;
        liveBreakUntil: Date | null;
        creditBalance: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["doctor"]>;
    composites: {};
};
export type DoctorGetPayload<S extends boolean | null | undefined | DoctorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DoctorPayload, S>;
export type DoctorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DoctorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DoctorCountAggregateInputType | true;
};
export interface DoctorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Doctor'];
        meta: {
            name: 'Doctor';
        };
    };
    /**
     * Find zero or one Doctor that matches the filter.
     * @param {DoctorFindUniqueArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorFindUniqueArgs>(args: Prisma.SelectSubset<T, DoctorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Doctor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorFindUniqueOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DoctorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Doctor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorFindFirstArgs>(args?: Prisma.SelectSubset<T, DoctorFindFirstArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Doctor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DoctorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Doctors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doctors
     * const doctors = await prisma.doctor.findMany()
     *
     * // Get first 10 Doctors
     * const doctors = await prisma.doctor.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const doctorWithIdOnly = await prisma.doctor.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DoctorFindManyArgs>(args?: Prisma.SelectSubset<T, DoctorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Doctor.
     * @param {DoctorCreateArgs} args - Arguments to create a Doctor.
     * @example
     * // Create one Doctor
     * const Doctor = await prisma.doctor.create({
     *   data: {
     *     // ... data to create a Doctor
     *   }
     * })
     *
     */
    create<T extends DoctorCreateArgs>(args: Prisma.SelectSubset<T, DoctorCreateArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Doctors.
     * @param {DoctorCreateManyArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DoctorCreateManyArgs>(args?: Prisma.SelectSubset<T, DoctorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Doctors and returns the data saved in the database.
     * @param {DoctorCreateManyAndReturnArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DoctorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DoctorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Doctor.
     * @param {DoctorDeleteArgs} args - Arguments to delete one Doctor.
     * @example
     * // Delete one Doctor
     * const Doctor = await prisma.doctor.delete({
     *   where: {
     *     // ... filter to delete one Doctor
     *   }
     * })
     *
     */
    delete<T extends DoctorDeleteArgs>(args: Prisma.SelectSubset<T, DoctorDeleteArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Doctor.
     * @param {DoctorUpdateArgs} args - Arguments to update one Doctor.
     * @example
     * // Update one Doctor
     * const doctor = await prisma.doctor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DoctorUpdateArgs>(args: Prisma.SelectSubset<T, DoctorUpdateArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Doctors.
     * @param {DoctorDeleteManyArgs} args - Arguments to filter Doctors to delete.
     * @example
     * // Delete a few Doctors
     * const { count } = await prisma.doctor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DoctorDeleteManyArgs>(args?: Prisma.SelectSubset<T, DoctorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DoctorUpdateManyArgs>(args: Prisma.SelectSubset<T, DoctorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Doctors and returns the data updated in the database.
     * @param {DoctorUpdateManyAndReturnArgs} args - Arguments to update many Doctors.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.updateManyAndReturn({
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
    updateManyAndReturn<T extends DoctorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DoctorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Doctor.
     * @param {DoctorUpsertArgs} args - Arguments to update or create a Doctor.
     * @example
     * // Update or create a Doctor
     * const doctor = await prisma.doctor.upsert({
     *   create: {
     *     // ... data to create a Doctor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doctor we want to update
     *   }
     * })
     */
    upsert<T extends DoctorUpsertArgs>(args: Prisma.SelectSubset<T, DoctorUpsertArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorCountArgs} args - Arguments to filter Doctors to count.
     * @example
     * // Count the number of Doctors
     * const count = await prisma.doctor.count({
     *   where: {
     *     // ... the filter for the Doctors we want to count
     *   }
     * })
    **/
    count<T extends DoctorCountArgs>(args?: Prisma.Subset<T, DoctorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DoctorCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoctorAggregateArgs>(args: Prisma.Subset<T, DoctorAggregateArgs>): Prisma.PrismaPromise<GetDoctorAggregateType<T>>;
    /**
     * Group by Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DoctorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DoctorGroupByArgs['orderBy'];
    } : {
        orderBy?: DoctorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DoctorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Doctor model
     */
    readonly fields: DoctorFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Doctor.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DoctorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.Doctor$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    creditLedger<T extends Prisma.Doctor$creditLedgerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$creditLedgerArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditLedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    chambers<T extends Prisma.Doctor$chambersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$chambersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChamberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    schedules<T extends Prisma.Doctor$schedulesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pendingAppointments<T extends Prisma.Doctor$pendingAppointmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$pendingAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    confirmedAppointments<T extends Prisma.Doctor$confirmedAppointmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$confirmedAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    staffMembers<T extends Prisma.Doctor$staffMembersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$staffMembersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    information<T extends Prisma.Doctor$informationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$informationArgs<ExtArgs>>): Prisma.Prisma__DoctorInformationClient<runtime.Types.Result.GetResult<Prisma.$DoctorInformationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    blogs<T extends Prisma.Doctor$blogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$blogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviews<T extends Prisma.Doctor$reviewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Doctor$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Doctor model
 */
export interface DoctorFieldRefs {
    readonly id: Prisma.FieldRef<"Doctor", 'String'>;
    readonly userId: Prisma.FieldRef<"Doctor", 'String'>;
    readonly name: Prisma.FieldRef<"Doctor", 'String'>;
    readonly name_en: Prisma.FieldRef<"Doctor", 'String'>;
    readonly degree: Prisma.FieldRef<"Doctor", 'String'>;
    readonly degree_en: Prisma.FieldRef<"Doctor", 'String'>;
    readonly speciality: Prisma.FieldRef<"Doctor", 'String'>;
    readonly speciality_en: Prisma.FieldRef<"Doctor", 'String'>;
    readonly tagline: Prisma.FieldRef<"Doctor", 'String'>;
    readonly tagline_en: Prisma.FieldRef<"Doctor", 'String'>;
    readonly bio: Prisma.FieldRef<"Doctor", 'String'>;
    readonly bio_en: Prisma.FieldRef<"Doctor", 'String'>;
    readonly phone: Prisma.FieldRef<"Doctor", 'String'>;
    readonly whatsappNumber: Prisma.FieldRef<"Doctor", 'String'>;
    readonly whatsappAccessToken: Prisma.FieldRef<"Doctor", 'String'>;
    readonly whatsappId: Prisma.FieldRef<"Doctor", 'String'>;
    readonly email: Prisma.FieldRef<"Doctor", 'String'>;
    readonly username: Prisma.FieldRef<"Doctor", 'String'>;
    readonly templateName: Prisma.FieldRef<"Doctor", 'String'>;
    readonly profilePicture: Prisma.FieldRef<"Doctor", 'String'>;
    readonly businessCardImage: Prisma.FieldRef<"Doctor", 'String'>;
    readonly bannerCardImage: Prisma.FieldRef<"Doctor", 'String'>;
    readonly gender: Prisma.FieldRef<"Doctor", 'Gender'>;
    readonly religion: Prisma.FieldRef<"Doctor", 'String'>;
    readonly startedYear: Prisma.FieldRef<"Doctor", 'Int'>;
    readonly bmdcNumber: Prisma.FieldRef<"Doctor", 'String'>;
    readonly status: Prisma.FieldRef<"Doctor", 'DoctorStatus'>;
    readonly serialLive: Prisma.FieldRef<"Doctor", 'Boolean'>;
    readonly liveCurrentSerial: Prisma.FieldRef<"Doctor", 'Int'>;
    readonly liveUpdatedAt: Prisma.FieldRef<"Doctor", 'DateTime'>;
    readonly liveSkippedAt: Prisma.FieldRef<"Doctor", 'Json'>;
    readonly liveBreakReason: Prisma.FieldRef<"Doctor", 'String'>;
    readonly liveBreakUntil: Prisma.FieldRef<"Doctor", 'DateTime'>;
    readonly creditBalance: Prisma.FieldRef<"Doctor", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Doctor", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Doctor", 'DateTime'>;
}
/**
 * Doctor findUnique
 */
export type DoctorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Doctor to fetch.
     */
    where: Prisma.DoctorWhereUniqueInput;
};
/**
 * Doctor findUniqueOrThrow
 */
export type DoctorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Doctor to fetch.
     */
    where: Prisma.DoctorWhereUniqueInput;
};
/**
 * Doctor findFirst
 */
export type DoctorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Doctor to fetch.
     */
    where?: Prisma.DoctorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Doctors to fetch.
     */
    orderBy?: Prisma.DoctorOrderByWithRelationInput | Prisma.DoctorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Doctors.
     */
    cursor?: Prisma.DoctorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Doctors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Doctors.
     */
    distinct?: Prisma.DoctorScalarFieldEnum | Prisma.DoctorScalarFieldEnum[];
};
/**
 * Doctor findFirstOrThrow
 */
export type DoctorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Doctor to fetch.
     */
    where?: Prisma.DoctorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Doctors to fetch.
     */
    orderBy?: Prisma.DoctorOrderByWithRelationInput | Prisma.DoctorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Doctors.
     */
    cursor?: Prisma.DoctorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Doctors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Doctors.
     */
    distinct?: Prisma.DoctorScalarFieldEnum | Prisma.DoctorScalarFieldEnum[];
};
/**
 * Doctor findMany
 */
export type DoctorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Doctors to fetch.
     */
    where?: Prisma.DoctorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Doctors to fetch.
     */
    orderBy?: Prisma.DoctorOrderByWithRelationInput | Prisma.DoctorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Doctors.
     */
    cursor?: Prisma.DoctorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Doctors.
     */
    skip?: number;
    distinct?: Prisma.DoctorScalarFieldEnum | Prisma.DoctorScalarFieldEnum[];
};
/**
 * Doctor create
 */
export type DoctorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Doctor.
     */
    data: Prisma.XOR<Prisma.DoctorCreateInput, Prisma.DoctorUncheckedCreateInput>;
};
/**
 * Doctor createMany
 */
export type DoctorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doctors.
     */
    data: Prisma.DoctorCreateManyInput | Prisma.DoctorCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Doctor createManyAndReturn
 */
export type DoctorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: Prisma.DoctorSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Doctor
     */
    omit?: Prisma.DoctorOmit<ExtArgs> | null;
    /**
     * The data used to create many Doctors.
     */
    data: Prisma.DoctorCreateManyInput | Prisma.DoctorCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Doctor update
 */
export type DoctorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Doctor.
     */
    data: Prisma.XOR<Prisma.DoctorUpdateInput, Prisma.DoctorUncheckedUpdateInput>;
    /**
     * Choose, which Doctor to update.
     */
    where: Prisma.DoctorWhereUniqueInput;
};
/**
 * Doctor updateMany
 */
export type DoctorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Doctors.
     */
    data: Prisma.XOR<Prisma.DoctorUpdateManyMutationInput, Prisma.DoctorUncheckedUpdateManyInput>;
    /**
     * Filter which Doctors to update
     */
    where?: Prisma.DoctorWhereInput;
    /**
     * Limit how many Doctors to update.
     */
    limit?: number;
};
/**
 * Doctor updateManyAndReturn
 */
export type DoctorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: Prisma.DoctorSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Doctor
     */
    omit?: Prisma.DoctorOmit<ExtArgs> | null;
    /**
     * The data used to update Doctors.
     */
    data: Prisma.XOR<Prisma.DoctorUpdateManyMutationInput, Prisma.DoctorUncheckedUpdateManyInput>;
    /**
     * Filter which Doctors to update
     */
    where?: Prisma.DoctorWhereInput;
    /**
     * Limit how many Doctors to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Doctor upsert
 */
export type DoctorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Doctor to update in case it exists.
     */
    where: Prisma.DoctorWhereUniqueInput;
    /**
     * In case the Doctor found by the `where` argument doesn't exist, create a new Doctor with this data.
     */
    create: Prisma.XOR<Prisma.DoctorCreateInput, Prisma.DoctorUncheckedCreateInput>;
    /**
     * In case the Doctor was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DoctorUpdateInput, Prisma.DoctorUncheckedUpdateInput>;
};
/**
 * Doctor delete
 */
export type DoctorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Doctor to delete.
     */
    where: Prisma.DoctorWhereUniqueInput;
};
/**
 * Doctor deleteMany
 */
export type DoctorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Doctors to delete
     */
    where?: Prisma.DoctorWhereInput;
    /**
     * Limit how many Doctors to delete.
     */
    limit?: number;
};
/**
 * Doctor.user
 */
export type Doctor$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Doctor.creditLedger
 */
export type Doctor$creditLedgerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Doctor.chambers
 */
export type Doctor$chambersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Doctor.schedules
 */
export type Doctor$schedulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Doctor.pendingAppointments
 */
export type Doctor$pendingAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Doctor.confirmedAppointments
 */
export type Doctor$confirmedAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Doctor.staffMembers
 */
export type Doctor$staffMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Doctor.information
 */
export type Doctor$informationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.DoctorInformationWhereInput;
};
/**
 * Doctor.blogs
 */
export type Doctor$blogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Doctor.reviews
 */
export type Doctor$reviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Doctor without action
 */
export type DoctorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Doctor.d.ts.map