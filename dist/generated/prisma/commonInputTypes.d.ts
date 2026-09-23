import type * as runtime from "@prisma/client/runtime/client";
import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type EnumJoinRequestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestType | Prisma.EnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.JoinRequestType[] | Prisma.ListEnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JoinRequestType[] | Prisma.ListEnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJoinRequestTypeFilter<$PrismaModel> | $Enums.JoinRequestType;
};
export type EnumJoinRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestStatus | Prisma.EnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.JoinRequestStatus[] | Prisma.ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JoinRequestStatus[] | Prisma.ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJoinRequestStatusFilter<$PrismaModel> | $Enums.JoinRequestStatus;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type EnumJoinRequestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestType | Prisma.EnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.JoinRequestType[] | Prisma.ListEnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JoinRequestType[] | Prisma.ListEnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJoinRequestTypeWithAggregatesFilter<$PrismaModel> | $Enums.JoinRequestType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumJoinRequestTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumJoinRequestTypeFilter<$PrismaModel>;
};
export type EnumJoinRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestStatus | Prisma.EnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.JoinRequestStatus[] | Prisma.ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JoinRequestStatus[] | Prisma.ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJoinRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.JoinRequestStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumJoinRequestStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumJoinRequestStatusFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | Prisma.EnumGenderFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type EnumDoctorStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DoctorStatus | Prisma.EnumDoctorStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DoctorStatus[] | Prisma.ListEnumDoctorStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DoctorStatus[] | Prisma.ListEnumDoctorStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDoctorStatusFilter<$PrismaModel> | $Enums.DoctorStatus;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | Prisma.EnumGenderFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGenderNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGenderNullableFilter<$PrismaModel>;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type EnumDoctorStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DoctorStatus | Prisma.EnumDoctorStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DoctorStatus[] | Prisma.ListEnumDoctorStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DoctorStatus[] | Prisma.ListEnumDoctorStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDoctorStatusWithAggregatesFilter<$PrismaModel> | $Enums.DoctorStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDoctorStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDoctorStatusFilter<$PrismaModel>;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type EnumHospitalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.HospitalStatus | Prisma.EnumHospitalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.HospitalStatus[] | Prisma.ListEnumHospitalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HospitalStatus[] | Prisma.ListEnumHospitalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHospitalStatusFilter<$PrismaModel> | $Enums.HospitalStatus;
};
export type EnumHospitalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HospitalStatus | Prisma.EnumHospitalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.HospitalStatus[] | Prisma.ListEnumHospitalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HospitalStatus[] | Prisma.ListEnumHospitalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHospitalStatusWithAggregatesFilter<$PrismaModel> | $Enums.HospitalStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumHospitalStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumHospitalStatusFilter<$PrismaModel>;
};
export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type FloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
};
export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type EnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | Prisma.EnumDayOfWeekFieldRefInput<$PrismaModel>;
    in?: $Enums.DayOfWeek[] | Prisma.ListEnumDayOfWeekFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DayOfWeek[] | Prisma.ListEnumDayOfWeekFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek;
};
export type EnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | Prisma.EnumDayOfWeekFieldRefInput<$PrismaModel>;
    in?: $Enums.DayOfWeek[] | Prisma.ListEnumDayOfWeekFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DayOfWeek[] | Prisma.ListEnumDayOfWeekFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDayOfWeekFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDayOfWeekFilter<$PrismaModel>;
};
export type EnumBookingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | Prisma.EnumBookingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel> | $Enums.BookingType;
};
export type EnumPaymentStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumPaymentStatusNullableFilter<$PrismaModel> | $Enums.PaymentStatus | null;
};
export type EnumBookingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | Prisma.EnumBookingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingTypeWithAggregatesFilter<$PrismaModel> | $Enums.BookingType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel>;
};
export type EnumPaymentStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumPaymentStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentStatusNullableFilter<$PrismaModel>;
};
export type JsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>, Required<JsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;
export type JsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type JsonWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonFilter<$PrismaModel>;
};
export type EnumBlogAuthorTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogAuthorType | Prisma.EnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BlogAuthorType[] | Prisma.ListEnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BlogAuthorType[] | Prisma.ListEnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBlogAuthorTypeFilter<$PrismaModel> | $Enums.BlogAuthorType;
};
export type EnumBlogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogStatus | Prisma.EnumBlogStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BlogStatus[] | Prisma.ListEnumBlogStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BlogStatus[] | Prisma.ListEnumBlogStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBlogStatusFilter<$PrismaModel> | $Enums.BlogStatus;
};
export type EnumBlogAuthorTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogAuthorType | Prisma.EnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BlogAuthorType[] | Prisma.ListEnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BlogAuthorType[] | Prisma.ListEnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBlogAuthorTypeWithAggregatesFilter<$PrismaModel> | $Enums.BlogAuthorType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBlogAuthorTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBlogAuthorTypeFilter<$PrismaModel>;
};
export type EnumBlogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogStatus | Prisma.EnumBlogStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BlogStatus[] | Prisma.ListEnumBlogStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BlogStatus[] | Prisma.ListEnumBlogStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBlogStatusWithAggregatesFilter<$PrismaModel> | $Enums.BlogStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBlogStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBlogStatusFilter<$PrismaModel>;
};
export type EnumSeoPageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SeoPageType | Prisma.EnumSeoPageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SeoPageType[] | Prisma.ListEnumSeoPageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeoPageType[] | Prisma.ListEnumSeoPageTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeoPageTypeFilter<$PrismaModel> | $Enums.SeoPageType;
};
export type EnumSeoPageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SeoPageType | Prisma.EnumSeoPageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SeoPageType[] | Prisma.ListEnumSeoPageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeoPageType[] | Prisma.ListEnumSeoPageTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeoPageTypeWithAggregatesFilter<$PrismaModel> | $Enums.SeoPageType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeoPageTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeoPageTypeFilter<$PrismaModel>;
};
export type EnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus;
};
export type EnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedEnumJoinRequestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestType | Prisma.EnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.JoinRequestType[] | Prisma.ListEnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JoinRequestType[] | Prisma.ListEnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJoinRequestTypeFilter<$PrismaModel> | $Enums.JoinRequestType;
};
export type NestedEnumJoinRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestStatus | Prisma.EnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.JoinRequestStatus[] | Prisma.ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JoinRequestStatus[] | Prisma.ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJoinRequestStatusFilter<$PrismaModel> | $Enums.JoinRequestStatus;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedEnumJoinRequestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestType | Prisma.EnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.JoinRequestType[] | Prisma.ListEnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JoinRequestType[] | Prisma.ListEnumJoinRequestTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJoinRequestTypeWithAggregatesFilter<$PrismaModel> | $Enums.JoinRequestType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumJoinRequestTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumJoinRequestTypeFilter<$PrismaModel>;
};
export type NestedEnumJoinRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestStatus | Prisma.EnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.JoinRequestStatus[] | Prisma.ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.JoinRequestStatus[] | Prisma.ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumJoinRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.JoinRequestStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumJoinRequestStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumJoinRequestStatusFilter<$PrismaModel>;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | Prisma.EnumGenderFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null;
};
export type NestedEnumDoctorStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DoctorStatus | Prisma.EnumDoctorStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DoctorStatus[] | Prisma.ListEnumDoctorStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DoctorStatus[] | Prisma.ListEnumDoctorStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDoctorStatusFilter<$PrismaModel> | $Enums.DoctorStatus;
};
export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | Prisma.EnumGenderFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGenderNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGenderNullableFilter<$PrismaModel>;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumDoctorStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DoctorStatus | Prisma.EnumDoctorStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DoctorStatus[] | Prisma.ListEnumDoctorStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DoctorStatus[] | Prisma.ListEnumDoctorStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDoctorStatusWithAggregatesFilter<$PrismaModel> | $Enums.DoctorStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDoctorStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDoctorStatusFilter<$PrismaModel>;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedEnumHospitalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.HospitalStatus | Prisma.EnumHospitalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.HospitalStatus[] | Prisma.ListEnumHospitalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HospitalStatus[] | Prisma.ListEnumHospitalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHospitalStatusFilter<$PrismaModel> | $Enums.HospitalStatus;
};
export type NestedEnumHospitalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HospitalStatus | Prisma.EnumHospitalStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.HospitalStatus[] | Prisma.ListEnumHospitalStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HospitalStatus[] | Prisma.ListEnumHospitalStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHospitalStatusWithAggregatesFilter<$PrismaModel> | $Enums.HospitalStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumHospitalStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumHospitalStatusFilter<$PrismaModel>;
};
export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
};
export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type NestedEnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | Prisma.EnumDayOfWeekFieldRefInput<$PrismaModel>;
    in?: $Enums.DayOfWeek[] | Prisma.ListEnumDayOfWeekFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DayOfWeek[] | Prisma.ListEnumDayOfWeekFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek;
};
export type NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | Prisma.EnumDayOfWeekFieldRefInput<$PrismaModel>;
    in?: $Enums.DayOfWeek[] | Prisma.ListEnumDayOfWeekFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DayOfWeek[] | Prisma.ListEnumDayOfWeekFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDayOfWeekFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDayOfWeekFilter<$PrismaModel>;
};
export type NestedEnumBookingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | Prisma.EnumBookingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel> | $Enums.BookingType;
};
export type NestedEnumPaymentStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumPaymentStatusNullableFilter<$PrismaModel> | $Enums.PaymentStatus | null;
};
export type NestedEnumBookingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingType | Prisma.EnumBookingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingType[] | Prisma.ListEnumBookingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingTypeWithAggregatesFilter<$PrismaModel> | $Enums.BookingType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingTypeFilter<$PrismaModel>;
};
export type NestedEnumPaymentStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumPaymentStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentStatusNullableFilter<$PrismaModel>;
};
export type NestedJsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedEnumBlogAuthorTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogAuthorType | Prisma.EnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BlogAuthorType[] | Prisma.ListEnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BlogAuthorType[] | Prisma.ListEnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBlogAuthorTypeFilter<$PrismaModel> | $Enums.BlogAuthorType;
};
export type NestedEnumBlogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogStatus | Prisma.EnumBlogStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BlogStatus[] | Prisma.ListEnumBlogStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BlogStatus[] | Prisma.ListEnumBlogStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBlogStatusFilter<$PrismaModel> | $Enums.BlogStatus;
};
export type NestedEnumBlogAuthorTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogAuthorType | Prisma.EnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.BlogAuthorType[] | Prisma.ListEnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BlogAuthorType[] | Prisma.ListEnumBlogAuthorTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBlogAuthorTypeWithAggregatesFilter<$PrismaModel> | $Enums.BlogAuthorType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBlogAuthorTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBlogAuthorTypeFilter<$PrismaModel>;
};
export type NestedEnumBlogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogStatus | Prisma.EnumBlogStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BlogStatus[] | Prisma.ListEnumBlogStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BlogStatus[] | Prisma.ListEnumBlogStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBlogStatusWithAggregatesFilter<$PrismaModel> | $Enums.BlogStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBlogStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBlogStatusFilter<$PrismaModel>;
};
export type NestedEnumSeoPageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SeoPageType | Prisma.EnumSeoPageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SeoPageType[] | Prisma.ListEnumSeoPageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeoPageType[] | Prisma.ListEnumSeoPageTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeoPageTypeFilter<$PrismaModel> | $Enums.SeoPageType;
};
export type NestedEnumSeoPageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SeoPageType | Prisma.EnumSeoPageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SeoPageType[] | Prisma.ListEnumSeoPageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeoPageType[] | Prisma.ListEnumSeoPageTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeoPageTypeWithAggregatesFilter<$PrismaModel> | $Enums.SeoPageType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeoPageTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeoPageTypeFilter<$PrismaModel>;
};
export type NestedEnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus;
};
export type NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
};
//# sourceMappingURL=commonInputTypes.d.ts.map