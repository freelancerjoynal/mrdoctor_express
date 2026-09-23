import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    role: $Enums.Role | null;
    name: string | null;
    profilePicture: string | null;
    isVerified: boolean | null;
    otp: string | null;
    otpExpiry: Date | null;
    refreshToken: string | null;
    phone: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    staffDoctorId: string | null;
    staffHospitalId: string | null;
    canApprove: boolean | null;
    canManageChambers: boolean | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    role: $Enums.Role | null;
    name: string | null;
    profilePicture: string | null;
    isVerified: boolean | null;
    otp: string | null;
    otpExpiry: Date | null;
    refreshToken: string | null;
    phone: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    staffDoctorId: string | null;
    staffHospitalId: string | null;
    canApprove: boolean | null;
    canManageChambers: boolean | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    role: number;
    name: number;
    profilePicture: number;
    isVerified: number;
    otp: number;
    otpExpiry: number;
    refreshToken: number;
    phone: number;
    createdAt: number;
    updatedAt: number;
    staffDoctorId: number;
    staffHospitalId: number;
    canApprove: number;
    canManageChambers: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    role?: true;
    name?: true;
    profilePicture?: true;
    isVerified?: true;
    otp?: true;
    otpExpiry?: true;
    refreshToken?: true;
    phone?: true;
    createdAt?: true;
    updatedAt?: true;
    staffDoctorId?: true;
    staffHospitalId?: true;
    canApprove?: true;
    canManageChambers?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    role?: true;
    name?: true;
    profilePicture?: true;
    isVerified?: true;
    otp?: true;
    otpExpiry?: true;
    refreshToken?: true;
    phone?: true;
    createdAt?: true;
    updatedAt?: true;
    staffDoctorId?: true;
    staffHospitalId?: true;
    canApprove?: true;
    canManageChambers?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    role?: true;
    name?: true;
    profilePicture?: true;
    isVerified?: true;
    otp?: true;
    otpExpiry?: true;
    refreshToken?: true;
    phone?: true;
    createdAt?: true;
    updatedAt?: true;
    staffDoctorId?: true;
    staffHospitalId?: true;
    canApprove?: true;
    canManageChambers?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    password: string;
    role: $Enums.Role;
    name: string | null;
    profilePicture: string | null;
    isVerified: boolean;
    otp: string | null;
    otpExpiry: Date | null;
    refreshToken: string | null;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
    staffDoctorId: string | null;
    staffHospitalId: string | null;
    canApprove: boolean;
    canManageChambers: boolean;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    name?: Prisma.StringNullableFilter<"User"> | string | null;
    profilePicture?: Prisma.StringNullableFilter<"User"> | string | null;
    isVerified?: Prisma.BoolFilter<"User"> | boolean;
    otp?: Prisma.StringNullableFilter<"User"> | string | null;
    otpExpiry?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    refreshToken?: Prisma.StringNullableFilter<"User"> | string | null;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    staffDoctorId?: Prisma.StringNullableFilter<"User"> | string | null;
    staffHospitalId?: Prisma.StringNullableFilter<"User"> | string | null;
    canApprove?: Prisma.BoolFilter<"User"> | boolean;
    canManageChambers?: Prisma.BoolFilter<"User"> | boolean;
    doctorProfile?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
    hospitalProfile?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
    superAdminProfile?: Prisma.XOR<Prisma.SuperAdminProfileNullableScalarRelationFilter, Prisma.SuperAdminProfileWhereInput> | null;
    staffDoctor?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
    staffHospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    profilePicture?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    otp?: Prisma.SortOrderInput | Prisma.SortOrder;
    otpExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    refreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    staffDoctorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    staffHospitalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    canApprove?: Prisma.SortOrder;
    canManageChambers?: Prisma.SortOrder;
    doctorProfile?: Prisma.DoctorOrderByWithRelationInput;
    hospitalProfile?: Prisma.HospitalOrderByWithRelationInput;
    superAdminProfile?: Prisma.SuperAdminProfileOrderByWithRelationInput;
    staffDoctor?: Prisma.DoctorOrderByWithRelationInput;
    staffHospital?: Prisma.HospitalOrderByWithRelationInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    name?: Prisma.StringNullableFilter<"User"> | string | null;
    profilePicture?: Prisma.StringNullableFilter<"User"> | string | null;
    isVerified?: Prisma.BoolFilter<"User"> | boolean;
    otp?: Prisma.StringNullableFilter<"User"> | string | null;
    otpExpiry?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    refreshToken?: Prisma.StringNullableFilter<"User"> | string | null;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    staffDoctorId?: Prisma.StringNullableFilter<"User"> | string | null;
    staffHospitalId?: Prisma.StringNullableFilter<"User"> | string | null;
    canApprove?: Prisma.BoolFilter<"User"> | boolean;
    canManageChambers?: Prisma.BoolFilter<"User"> | boolean;
    doctorProfile?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
    hospitalProfile?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
    superAdminProfile?: Prisma.XOR<Prisma.SuperAdminProfileNullableScalarRelationFilter, Prisma.SuperAdminProfileWhereInput> | null;
    staffDoctor?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
    staffHospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    profilePicture?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    otp?: Prisma.SortOrderInput | Prisma.SortOrder;
    otpExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    refreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    staffDoctorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    staffHospitalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    canApprove?: Prisma.SortOrder;
    canManageChambers?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumRoleWithAggregatesFilter<"User"> | $Enums.Role;
    name?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    profilePicture?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    isVerified?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    otp?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    otpExpiry?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    refreshToken?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    staffDoctorId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    staffHospitalId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    canApprove?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    canManageChambers?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    hospitalProfile?: Prisma.HospitalCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileCreateNestedOneWithoutUserInput;
    staffDoctor?: Prisma.DoctorCreateNestedOneWithoutStaffMembersInput;
    staffHospital?: Prisma.HospitalCreateNestedOneWithoutStaffMembersInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staffDoctorId?: string | null;
    staffHospitalId?: string | null;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    hospitalProfile?: Prisma.HospitalUncheckedCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedCreateNestedOneWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    hospitalProfile?: Prisma.HospitalUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUpdateOneWithoutUserNestedInput;
    staffDoctor?: Prisma.DoctorUpdateOneWithoutStaffMembersNestedInput;
    staffHospital?: Prisma.HospitalUpdateOneWithoutStaffMembersNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staffDoctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    staffHospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    hospitalProfile?: Prisma.HospitalUncheckedUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staffDoctorId?: string | null;
    staffHospitalId?: string | null;
    canApprove?: boolean;
    canManageChambers?: boolean;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staffDoctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    staffHospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    profilePicture?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    otp?: Prisma.SortOrder;
    otpExpiry?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    staffDoctorId?: Prisma.SortOrder;
    staffHospitalId?: Prisma.SortOrder;
    canApprove?: Prisma.SortOrder;
    canManageChambers?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    profilePicture?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    otp?: Prisma.SortOrder;
    otpExpiry?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    staffDoctorId?: Prisma.SortOrder;
    staffHospitalId?: Prisma.SortOrder;
    canApprove?: Prisma.SortOrder;
    canManageChambers?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    profilePicture?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    otp?: Prisma.SortOrder;
    otpExpiry?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    staffDoctorId?: Prisma.SortOrder;
    staffHospitalId?: Prisma.SortOrder;
    canApprove?: Prisma.SortOrder;
    canManageChambers?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type UserListRelationFilter = {
    every?: Prisma.UserWhereInput;
    some?: Prisma.UserWhereInput;
    none?: Prisma.UserWhereInput;
};
export type UserOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type UserCreateNestedOneWithoutSuperAdminProfileInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSuperAdminProfileInput, Prisma.UserUncheckedCreateWithoutSuperAdminProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSuperAdminProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSuperAdminProfileNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSuperAdminProfileInput, Prisma.UserUncheckedCreateWithoutSuperAdminProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSuperAdminProfileInput;
    upsert?: Prisma.UserUpsertWithoutSuperAdminProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSuperAdminProfileInput, Prisma.UserUpdateWithoutSuperAdminProfileInput>, Prisma.UserUncheckedUpdateWithoutSuperAdminProfileInput>;
};
export type UserCreateNestedOneWithoutDoctorProfileInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDoctorProfileInput, Prisma.UserUncheckedCreateWithoutDoctorProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDoctorProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedManyWithoutStaffDoctorInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStaffDoctorInput, Prisma.UserUncheckedCreateWithoutStaffDoctorInput> | Prisma.UserCreateWithoutStaffDoctorInput[] | Prisma.UserUncheckedCreateWithoutStaffDoctorInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStaffDoctorInput | Prisma.UserCreateOrConnectWithoutStaffDoctorInput[];
    createMany?: Prisma.UserCreateManyStaffDoctorInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUncheckedCreateNestedManyWithoutStaffDoctorInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStaffDoctorInput, Prisma.UserUncheckedCreateWithoutStaffDoctorInput> | Prisma.UserCreateWithoutStaffDoctorInput[] | Prisma.UserUncheckedCreateWithoutStaffDoctorInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStaffDoctorInput | Prisma.UserCreateOrConnectWithoutStaffDoctorInput[];
    createMany?: Prisma.UserCreateManyStaffDoctorInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUpdateOneWithoutDoctorProfileNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDoctorProfileInput, Prisma.UserUncheckedCreateWithoutDoctorProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDoctorProfileInput;
    upsert?: Prisma.UserUpsertWithoutDoctorProfileInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDoctorProfileInput, Prisma.UserUpdateWithoutDoctorProfileInput>, Prisma.UserUncheckedUpdateWithoutDoctorProfileInput>;
};
export type UserUpdateManyWithoutStaffDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStaffDoctorInput, Prisma.UserUncheckedCreateWithoutStaffDoctorInput> | Prisma.UserCreateWithoutStaffDoctorInput[] | Prisma.UserUncheckedCreateWithoutStaffDoctorInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStaffDoctorInput | Prisma.UserCreateOrConnectWithoutStaffDoctorInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutStaffDoctorInput | Prisma.UserUpsertWithWhereUniqueWithoutStaffDoctorInput[];
    createMany?: Prisma.UserCreateManyStaffDoctorInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutStaffDoctorInput | Prisma.UserUpdateWithWhereUniqueWithoutStaffDoctorInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutStaffDoctorInput | Prisma.UserUpdateManyWithWhereWithoutStaffDoctorInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserUncheckedUpdateManyWithoutStaffDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStaffDoctorInput, Prisma.UserUncheckedCreateWithoutStaffDoctorInput> | Prisma.UserCreateWithoutStaffDoctorInput[] | Prisma.UserUncheckedCreateWithoutStaffDoctorInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStaffDoctorInput | Prisma.UserCreateOrConnectWithoutStaffDoctorInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutStaffDoctorInput | Prisma.UserUpsertWithWhereUniqueWithoutStaffDoctorInput[];
    createMany?: Prisma.UserCreateManyStaffDoctorInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutStaffDoctorInput | Prisma.UserUpdateWithWhereUniqueWithoutStaffDoctorInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutStaffDoctorInput | Prisma.UserUpdateManyWithWhereWithoutStaffDoctorInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserCreateNestedOneWithoutHospitalProfileInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutHospitalProfileInput, Prisma.UserUncheckedCreateWithoutHospitalProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutHospitalProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedManyWithoutStaffHospitalInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStaffHospitalInput, Prisma.UserUncheckedCreateWithoutStaffHospitalInput> | Prisma.UserCreateWithoutStaffHospitalInput[] | Prisma.UserUncheckedCreateWithoutStaffHospitalInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStaffHospitalInput | Prisma.UserCreateOrConnectWithoutStaffHospitalInput[];
    createMany?: Prisma.UserCreateManyStaffHospitalInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUncheckedCreateNestedManyWithoutStaffHospitalInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStaffHospitalInput, Prisma.UserUncheckedCreateWithoutStaffHospitalInput> | Prisma.UserCreateWithoutStaffHospitalInput[] | Prisma.UserUncheckedCreateWithoutStaffHospitalInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStaffHospitalInput | Prisma.UserCreateOrConnectWithoutStaffHospitalInput[];
    createMany?: Prisma.UserCreateManyStaffHospitalInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUpdateOneWithoutHospitalProfileNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutHospitalProfileInput, Prisma.UserUncheckedCreateWithoutHospitalProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutHospitalProfileInput;
    upsert?: Prisma.UserUpsertWithoutHospitalProfileInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutHospitalProfileInput, Prisma.UserUpdateWithoutHospitalProfileInput>, Prisma.UserUncheckedUpdateWithoutHospitalProfileInput>;
};
export type UserUpdateManyWithoutStaffHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStaffHospitalInput, Prisma.UserUncheckedCreateWithoutStaffHospitalInput> | Prisma.UserCreateWithoutStaffHospitalInput[] | Prisma.UserUncheckedCreateWithoutStaffHospitalInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStaffHospitalInput | Prisma.UserCreateOrConnectWithoutStaffHospitalInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutStaffHospitalInput | Prisma.UserUpsertWithWhereUniqueWithoutStaffHospitalInput[];
    createMany?: Prisma.UserCreateManyStaffHospitalInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutStaffHospitalInput | Prisma.UserUpdateWithWhereUniqueWithoutStaffHospitalInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutStaffHospitalInput | Prisma.UserUpdateManyWithWhereWithoutStaffHospitalInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserUncheckedUpdateManyWithoutStaffHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStaffHospitalInput, Prisma.UserUncheckedCreateWithoutStaffHospitalInput> | Prisma.UserCreateWithoutStaffHospitalInput[] | Prisma.UserUncheckedCreateWithoutStaffHospitalInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStaffHospitalInput | Prisma.UserCreateOrConnectWithoutStaffHospitalInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutStaffHospitalInput | Prisma.UserUpsertWithWhereUniqueWithoutStaffHospitalInput[];
    createMany?: Prisma.UserCreateManyStaffHospitalInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutStaffHospitalInput | Prisma.UserUpdateWithWhereUniqueWithoutStaffHospitalInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutStaffHospitalInput | Prisma.UserUpdateManyWithWhereWithoutStaffHospitalInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserCreateWithoutSuperAdminProfileInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    hospitalProfile?: Prisma.HospitalCreateNestedOneWithoutUserInput;
    staffDoctor?: Prisma.DoctorCreateNestedOneWithoutStaffMembersInput;
    staffHospital?: Prisma.HospitalCreateNestedOneWithoutStaffMembersInput;
};
export type UserUncheckedCreateWithoutSuperAdminProfileInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staffDoctorId?: string | null;
    staffHospitalId?: string | null;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    hospitalProfile?: Prisma.HospitalUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutSuperAdminProfileInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSuperAdminProfileInput, Prisma.UserUncheckedCreateWithoutSuperAdminProfileInput>;
};
export type UserUpsertWithoutSuperAdminProfileInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSuperAdminProfileInput, Prisma.UserUncheckedUpdateWithoutSuperAdminProfileInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSuperAdminProfileInput, Prisma.UserUncheckedCreateWithoutSuperAdminProfileInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSuperAdminProfileInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSuperAdminProfileInput, Prisma.UserUncheckedUpdateWithoutSuperAdminProfileInput>;
};
export type UserUpdateWithoutSuperAdminProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    hospitalProfile?: Prisma.HospitalUpdateOneWithoutUserNestedInput;
    staffDoctor?: Prisma.DoctorUpdateOneWithoutStaffMembersNestedInput;
    staffHospital?: Prisma.HospitalUpdateOneWithoutStaffMembersNestedInput;
};
export type UserUncheckedUpdateWithoutSuperAdminProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staffDoctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    staffHospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    hospitalProfile?: Prisma.HospitalUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutDoctorProfileInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    canApprove?: boolean;
    canManageChambers?: boolean;
    hospitalProfile?: Prisma.HospitalCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileCreateNestedOneWithoutUserInput;
    staffDoctor?: Prisma.DoctorCreateNestedOneWithoutStaffMembersInput;
    staffHospital?: Prisma.HospitalCreateNestedOneWithoutStaffMembersInput;
};
export type UserUncheckedCreateWithoutDoctorProfileInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staffDoctorId?: string | null;
    staffHospitalId?: string | null;
    canApprove?: boolean;
    canManageChambers?: boolean;
    hospitalProfile?: Prisma.HospitalUncheckedCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutDoctorProfileInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDoctorProfileInput, Prisma.UserUncheckedCreateWithoutDoctorProfileInput>;
};
export type UserCreateWithoutStaffDoctorInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    hospitalProfile?: Prisma.HospitalCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileCreateNestedOneWithoutUserInput;
    staffHospital?: Prisma.HospitalCreateNestedOneWithoutStaffMembersInput;
};
export type UserUncheckedCreateWithoutStaffDoctorInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staffHospitalId?: string | null;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    hospitalProfile?: Prisma.HospitalUncheckedCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutStaffDoctorInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutStaffDoctorInput, Prisma.UserUncheckedCreateWithoutStaffDoctorInput>;
};
export type UserCreateManyStaffDoctorInputEnvelope = {
    data: Prisma.UserCreateManyStaffDoctorInput | Prisma.UserCreateManyStaffDoctorInput[];
    skipDuplicates?: boolean;
};
export type UserUpsertWithoutDoctorProfileInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDoctorProfileInput, Prisma.UserUncheckedUpdateWithoutDoctorProfileInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDoctorProfileInput, Prisma.UserUncheckedCreateWithoutDoctorProfileInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDoctorProfileInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDoctorProfileInput, Prisma.UserUncheckedUpdateWithoutDoctorProfileInput>;
};
export type UserUpdateWithoutDoctorProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hospitalProfile?: Prisma.HospitalUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUpdateOneWithoutUserNestedInput;
    staffDoctor?: Prisma.DoctorUpdateOneWithoutStaffMembersNestedInput;
    staffHospital?: Prisma.HospitalUpdateOneWithoutStaffMembersNestedInput;
};
export type UserUncheckedUpdateWithoutDoctorProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staffDoctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    staffHospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hospitalProfile?: Prisma.HospitalUncheckedUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserUpsertWithWhereUniqueWithoutStaffDoctorInput = {
    where: Prisma.UserWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserUpdateWithoutStaffDoctorInput, Prisma.UserUncheckedUpdateWithoutStaffDoctorInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutStaffDoctorInput, Prisma.UserUncheckedCreateWithoutStaffDoctorInput>;
};
export type UserUpdateWithWhereUniqueWithoutStaffDoctorInput = {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutStaffDoctorInput, Prisma.UserUncheckedUpdateWithoutStaffDoctorInput>;
};
export type UserUpdateManyWithWhereWithoutStaffDoctorInput = {
    where: Prisma.UserScalarWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutStaffDoctorInput>;
};
export type UserScalarWhereInput = {
    AND?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    OR?: Prisma.UserScalarWhereInput[];
    NOT?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    name?: Prisma.StringNullableFilter<"User"> | string | null;
    profilePicture?: Prisma.StringNullableFilter<"User"> | string | null;
    isVerified?: Prisma.BoolFilter<"User"> | boolean;
    otp?: Prisma.StringNullableFilter<"User"> | string | null;
    otpExpiry?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    refreshToken?: Prisma.StringNullableFilter<"User"> | string | null;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    staffDoctorId?: Prisma.StringNullableFilter<"User"> | string | null;
    staffHospitalId?: Prisma.StringNullableFilter<"User"> | string | null;
    canApprove?: Prisma.BoolFilter<"User"> | boolean;
    canManageChambers?: Prisma.BoolFilter<"User"> | boolean;
};
export type UserCreateWithoutHospitalProfileInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileCreateNestedOneWithoutUserInput;
    staffDoctor?: Prisma.DoctorCreateNestedOneWithoutStaffMembersInput;
    staffHospital?: Prisma.HospitalCreateNestedOneWithoutStaffMembersInput;
};
export type UserUncheckedCreateWithoutHospitalProfileInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staffDoctorId?: string | null;
    staffHospitalId?: string | null;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutHospitalProfileInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutHospitalProfileInput, Prisma.UserUncheckedCreateWithoutHospitalProfileInput>;
};
export type UserCreateWithoutStaffHospitalInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    hospitalProfile?: Prisma.HospitalCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileCreateNestedOneWithoutUserInput;
    staffDoctor?: Prisma.DoctorCreateNestedOneWithoutStaffMembersInput;
};
export type UserUncheckedCreateWithoutStaffHospitalInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staffDoctorId?: string | null;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    hospitalProfile?: Prisma.HospitalUncheckedCreateNestedOneWithoutUserInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutStaffHospitalInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutStaffHospitalInput, Prisma.UserUncheckedCreateWithoutStaffHospitalInput>;
};
export type UserCreateManyStaffHospitalInputEnvelope = {
    data: Prisma.UserCreateManyStaffHospitalInput | Prisma.UserCreateManyStaffHospitalInput[];
    skipDuplicates?: boolean;
};
export type UserUpsertWithoutHospitalProfileInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutHospitalProfileInput, Prisma.UserUncheckedUpdateWithoutHospitalProfileInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutHospitalProfileInput, Prisma.UserUncheckedCreateWithoutHospitalProfileInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutHospitalProfileInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutHospitalProfileInput, Prisma.UserUncheckedUpdateWithoutHospitalProfileInput>;
};
export type UserUpdateWithoutHospitalProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUpdateOneWithoutUserNestedInput;
    staffDoctor?: Prisma.DoctorUpdateOneWithoutStaffMembersNestedInput;
    staffHospital?: Prisma.HospitalUpdateOneWithoutStaffMembersNestedInput;
};
export type UserUncheckedUpdateWithoutHospitalProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staffDoctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    staffHospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserUpsertWithWhereUniqueWithoutStaffHospitalInput = {
    where: Prisma.UserWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserUpdateWithoutStaffHospitalInput, Prisma.UserUncheckedUpdateWithoutStaffHospitalInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutStaffHospitalInput, Prisma.UserUncheckedCreateWithoutStaffHospitalInput>;
};
export type UserUpdateWithWhereUniqueWithoutStaffHospitalInput = {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutStaffHospitalInput, Prisma.UserUncheckedUpdateWithoutStaffHospitalInput>;
};
export type UserUpdateManyWithWhereWithoutStaffHospitalInput = {
    where: Prisma.UserScalarWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutStaffHospitalInput>;
};
export type UserCreateManyStaffDoctorInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staffHospitalId?: string | null;
    canApprove?: boolean;
    canManageChambers?: boolean;
};
export type UserUpdateWithoutStaffDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    hospitalProfile?: Prisma.HospitalUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUpdateOneWithoutUserNestedInput;
    staffHospital?: Prisma.HospitalUpdateOneWithoutStaffMembersNestedInput;
};
export type UserUncheckedUpdateWithoutStaffDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staffHospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    hospitalProfile?: Prisma.HospitalUncheckedUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateManyWithoutStaffDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staffHospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type UserCreateManyStaffHospitalInput = {
    id?: string;
    email: string;
    password: string;
    role?: $Enums.Role;
    name?: string | null;
    profilePicture?: string | null;
    isVerified?: boolean;
    otp?: string | null;
    otpExpiry?: Date | string | null;
    refreshToken?: string | null;
    phone?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staffDoctorId?: string | null;
    canApprove?: boolean;
    canManageChambers?: boolean;
};
export type UserUpdateWithoutStaffHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    hospitalProfile?: Prisma.HospitalUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUpdateOneWithoutUserNestedInput;
    staffDoctor?: Prisma.DoctorUpdateOneWithoutStaffMembersNestedInput;
};
export type UserUncheckedUpdateWithoutStaffHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staffDoctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    doctorProfile?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    hospitalProfile?: Prisma.HospitalUncheckedUpdateOneWithoutUserNestedInput;
    superAdminProfile?: Prisma.SuperAdminProfileUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateManyWithoutStaffHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePicture?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    otp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otpExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staffDoctorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    canApprove?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canManageChambers?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    name?: boolean;
    profilePicture?: boolean;
    isVerified?: boolean;
    otp?: boolean;
    otpExpiry?: boolean;
    refreshToken?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    staffDoctorId?: boolean;
    staffHospitalId?: boolean;
    canApprove?: boolean;
    canManageChambers?: boolean;
    doctorProfile?: boolean | Prisma.User$doctorProfileArgs<ExtArgs>;
    hospitalProfile?: boolean | Prisma.User$hospitalProfileArgs<ExtArgs>;
    superAdminProfile?: boolean | Prisma.User$superAdminProfileArgs<ExtArgs>;
    staffDoctor?: boolean | Prisma.User$staffDoctorArgs<ExtArgs>;
    staffHospital?: boolean | Prisma.User$staffHospitalArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    name?: boolean;
    profilePicture?: boolean;
    isVerified?: boolean;
    otp?: boolean;
    otpExpiry?: boolean;
    refreshToken?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    staffDoctorId?: boolean;
    staffHospitalId?: boolean;
    canApprove?: boolean;
    canManageChambers?: boolean;
    staffDoctor?: boolean | Prisma.User$staffDoctorArgs<ExtArgs>;
    staffHospital?: boolean | Prisma.User$staffHospitalArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    name?: boolean;
    profilePicture?: boolean;
    isVerified?: boolean;
    otp?: boolean;
    otpExpiry?: boolean;
    refreshToken?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    staffDoctorId?: boolean;
    staffHospitalId?: boolean;
    canApprove?: boolean;
    canManageChambers?: boolean;
    staffDoctor?: boolean | Prisma.User$staffDoctorArgs<ExtArgs>;
    staffHospital?: boolean | Prisma.User$staffHospitalArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    name?: boolean;
    profilePicture?: boolean;
    isVerified?: boolean;
    otp?: boolean;
    otpExpiry?: boolean;
    refreshToken?: boolean;
    phone?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    staffDoctorId?: boolean;
    staffHospitalId?: boolean;
    canApprove?: boolean;
    canManageChambers?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "role" | "name" | "profilePicture" | "isVerified" | "otp" | "otpExpiry" | "refreshToken" | "phone" | "createdAt" | "updatedAt" | "staffDoctorId" | "staffHospitalId" | "canApprove" | "canManageChambers", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctorProfile?: boolean | Prisma.User$doctorProfileArgs<ExtArgs>;
    hospitalProfile?: boolean | Prisma.User$hospitalProfileArgs<ExtArgs>;
    superAdminProfile?: boolean | Prisma.User$superAdminProfileArgs<ExtArgs>;
    staffDoctor?: boolean | Prisma.User$staffDoctorArgs<ExtArgs>;
    staffHospital?: boolean | Prisma.User$staffHospitalArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staffDoctor?: boolean | Prisma.User$staffDoctorArgs<ExtArgs>;
    staffHospital?: boolean | Prisma.User$staffHospitalArgs<ExtArgs>;
};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staffDoctor?: boolean | Prisma.User$staffDoctorArgs<ExtArgs>;
    staffHospital?: boolean | Prisma.User$staffHospitalArgs<ExtArgs>;
};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        doctorProfile: Prisma.$DoctorPayload<ExtArgs> | null;
        hospitalProfile: Prisma.$HospitalPayload<ExtArgs> | null;
        superAdminProfile: Prisma.$SuperAdminProfilePayload<ExtArgs> | null;
        staffDoctor: Prisma.$DoctorPayload<ExtArgs> | null;
        staffHospital: Prisma.$HospitalPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        password: string;
        role: $Enums.Role;
        name: string | null;
        profilePicture: string | null;
        isVerified: boolean;
        otp: string | null;
        otpExpiry: Date | null;
        refreshToken: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        staffDoctorId: string | null;
        staffHospitalId: string | null;
        canApprove: boolean;
        canManageChambers: boolean;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    doctorProfile<T extends Prisma.User$doctorProfileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$doctorProfileArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    hospitalProfile<T extends Prisma.User$hospitalProfileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$hospitalProfileArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    superAdminProfile<T extends Prisma.User$superAdminProfileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$superAdminProfileArgs<ExtArgs>>): Prisma.Prisma__SuperAdminProfileClient<runtime.Types.Result.GetResult<Prisma.$SuperAdminProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    staffDoctor<T extends Prisma.User$staffDoctorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$staffDoctorArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    staffHospital<T extends Prisma.User$staffHospitalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$staffHospitalArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'Role'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly profilePicture: Prisma.FieldRef<"User", 'String'>;
    readonly isVerified: Prisma.FieldRef<"User", 'Boolean'>;
    readonly otp: Prisma.FieldRef<"User", 'String'>;
    readonly otpExpiry: Prisma.FieldRef<"User", 'DateTime'>;
    readonly refreshToken: Prisma.FieldRef<"User", 'String'>;
    readonly phone: Prisma.FieldRef<"User", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly staffDoctorId: Prisma.FieldRef<"User", 'String'>;
    readonly staffHospitalId: Prisma.FieldRef<"User", 'String'>;
    readonly canApprove: Prisma.FieldRef<"User", 'Boolean'>;
    readonly canManageChambers: Prisma.FieldRef<"User", 'Boolean'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.doctorProfile
 */
export type User$doctorProfileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.hospitalProfile
 */
export type User$hospitalProfileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.superAdminProfile
 */
export type User$superAdminProfileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminProfile
     */
    select?: Prisma.SuperAdminProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SuperAdminProfile
     */
    omit?: Prisma.SuperAdminProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SuperAdminProfileInclude<ExtArgs> | null;
    where?: Prisma.SuperAdminProfileWhereInput;
};
/**
 * User.staffDoctor
 */
export type User$staffDoctorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.staffHospital
 */
export type User$staffHospitalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=User.d.ts.map