import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model PendingAppointment
 *
 */
export type PendingAppointmentModel = runtime.Types.Result.DefaultSelection<Prisma.$PendingAppointmentPayload>;
export type AggregatePendingAppointment = {
    _count: PendingAppointmentCountAggregateOutputType | null;
    _avg: PendingAppointmentAvgAggregateOutputType | null;
    _sum: PendingAppointmentSumAggregateOutputType | null;
    _min: PendingAppointmentMinAggregateOutputType | null;
    _max: PendingAppointmentMaxAggregateOutputType | null;
};
export type PendingAppointmentAvgAggregateOutputType = {
    patientAge: number | null;
    patientWeight: number | null;
};
export type PendingAppointmentSumAggregateOutputType = {
    patientAge: number | null;
    patientWeight: number | null;
};
export type PendingAppointmentMinAggregateOutputType = {
    id: string | null;
    phoneNumber: string | null;
    doctorId: string | null;
    doctorName: string | null;
    hospitalId: string | null;
    hospitalName: string | null;
    problem: string | null;
    appointmentDate: Date | null;
    dayLabel: string | null;
    chamberId: string | null;
    chamberName: string | null;
    patientName: string | null;
    patientType: string | null;
    patientAge: number | null;
    patientWeight: number | null;
    patientArea: string | null;
    contactPhone: string | null;
    source: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PendingAppointmentMaxAggregateOutputType = {
    id: string | null;
    phoneNumber: string | null;
    doctorId: string | null;
    doctorName: string | null;
    hospitalId: string | null;
    hospitalName: string | null;
    problem: string | null;
    appointmentDate: Date | null;
    dayLabel: string | null;
    chamberId: string | null;
    chamberName: string | null;
    patientName: string | null;
    patientType: string | null;
    patientAge: number | null;
    patientWeight: number | null;
    patientArea: string | null;
    contactPhone: string | null;
    source: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PendingAppointmentCountAggregateOutputType = {
    id: number;
    phoneNumber: number;
    doctorId: number;
    doctorName: number;
    hospitalId: number;
    hospitalName: number;
    problem: number;
    appointmentDate: number;
    dayLabel: number;
    chamberId: number;
    chamberName: number;
    patientName: number;
    patientType: number;
    patientAge: number;
    patientWeight: number;
    patientArea: number;
    contactPhone: number;
    source: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PendingAppointmentAvgAggregateInputType = {
    patientAge?: true;
    patientWeight?: true;
};
export type PendingAppointmentSumAggregateInputType = {
    patientAge?: true;
    patientWeight?: true;
};
export type PendingAppointmentMinAggregateInputType = {
    id?: true;
    phoneNumber?: true;
    doctorId?: true;
    doctorName?: true;
    hospitalId?: true;
    hospitalName?: true;
    problem?: true;
    appointmentDate?: true;
    dayLabel?: true;
    chamberId?: true;
    chamberName?: true;
    patientName?: true;
    patientType?: true;
    patientAge?: true;
    patientWeight?: true;
    patientArea?: true;
    contactPhone?: true;
    source?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PendingAppointmentMaxAggregateInputType = {
    id?: true;
    phoneNumber?: true;
    doctorId?: true;
    doctorName?: true;
    hospitalId?: true;
    hospitalName?: true;
    problem?: true;
    appointmentDate?: true;
    dayLabel?: true;
    chamberId?: true;
    chamberName?: true;
    patientName?: true;
    patientType?: true;
    patientAge?: true;
    patientWeight?: true;
    patientArea?: true;
    contactPhone?: true;
    source?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PendingAppointmentCountAggregateInputType = {
    id?: true;
    phoneNumber?: true;
    doctorId?: true;
    doctorName?: true;
    hospitalId?: true;
    hospitalName?: true;
    problem?: true;
    appointmentDate?: true;
    dayLabel?: true;
    chamberId?: true;
    chamberName?: true;
    patientName?: true;
    patientType?: true;
    patientAge?: true;
    patientWeight?: true;
    patientArea?: true;
    contactPhone?: true;
    source?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PendingAppointmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PendingAppointment to aggregate.
     */
    where?: Prisma.PendingAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PendingAppointments to fetch.
     */
    orderBy?: Prisma.PendingAppointmentOrderByWithRelationInput | Prisma.PendingAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PendingAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PendingAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PendingAppointments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PendingAppointments
    **/
    _count?: true | PendingAppointmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PendingAppointmentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PendingAppointmentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PendingAppointmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PendingAppointmentMaxAggregateInputType;
};
export type GetPendingAppointmentAggregateType<T extends PendingAppointmentAggregateArgs> = {
    [P in keyof T & keyof AggregatePendingAppointment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePendingAppointment[P]> : Prisma.GetScalarType<T[P], AggregatePendingAppointment[P]>;
};
export type PendingAppointmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PendingAppointmentWhereInput;
    orderBy?: Prisma.PendingAppointmentOrderByWithAggregationInput | Prisma.PendingAppointmentOrderByWithAggregationInput[];
    by: Prisma.PendingAppointmentScalarFieldEnum[] | Prisma.PendingAppointmentScalarFieldEnum;
    having?: Prisma.PendingAppointmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PendingAppointmentCountAggregateInputType | true;
    _avg?: PendingAppointmentAvgAggregateInputType;
    _sum?: PendingAppointmentSumAggregateInputType;
    _min?: PendingAppointmentMinAggregateInputType;
    _max?: PendingAppointmentMaxAggregateInputType;
};
export type PendingAppointmentGroupByOutputType = {
    id: string;
    phoneNumber: string;
    doctorId: string;
    doctorName: string | null;
    hospitalId: string | null;
    hospitalName: string | null;
    problem: string;
    appointmentDate: Date;
    dayLabel: string | null;
    chamberId: string | null;
    chamberName: string | null;
    patientName: string;
    patientType: string;
    patientAge: number | null;
    patientWeight: number | null;
    patientArea: string | null;
    contactPhone: string;
    source: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PendingAppointmentCountAggregateOutputType | null;
    _avg: PendingAppointmentAvgAggregateOutputType | null;
    _sum: PendingAppointmentSumAggregateOutputType | null;
    _min: PendingAppointmentMinAggregateOutputType | null;
    _max: PendingAppointmentMaxAggregateOutputType | null;
};
type GetPendingAppointmentGroupByPayload<T extends PendingAppointmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PendingAppointmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PendingAppointmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PendingAppointmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PendingAppointmentGroupByOutputType[P]>;
}>>;
export type PendingAppointmentWhereInput = {
    AND?: Prisma.PendingAppointmentWhereInput | Prisma.PendingAppointmentWhereInput[];
    OR?: Prisma.PendingAppointmentWhereInput[];
    NOT?: Prisma.PendingAppointmentWhereInput | Prisma.PendingAppointmentWhereInput[];
    id?: Prisma.StringFilter<"PendingAppointment"> | string;
    phoneNumber?: Prisma.StringFilter<"PendingAppointment"> | string;
    doctorId?: Prisma.StringFilter<"PendingAppointment"> | string;
    doctorName?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    hospitalName?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    problem?: Prisma.StringFilter<"PendingAppointment"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"PendingAppointment"> | Date | string;
    dayLabel?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    chamberId?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    patientName?: Prisma.StringFilter<"PendingAppointment"> | string;
    patientType?: Prisma.StringFilter<"PendingAppointment"> | string;
    patientAge?: Prisma.IntNullableFilter<"PendingAppointment"> | number | null;
    patientWeight?: Prisma.FloatNullableFilter<"PendingAppointment"> | number | null;
    patientArea?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    contactPhone?: Prisma.StringFilter<"PendingAppointment"> | string;
    source?: Prisma.StringFilter<"PendingAppointment"> | string;
    status?: Prisma.StringFilter<"PendingAppointment"> | string;
    createdAt?: Prisma.DateTimeFilter<"PendingAppointment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PendingAppointment"> | Date | string;
    doctor?: Prisma.XOR<Prisma.DoctorScalarRelationFilter, Prisma.DoctorWhereInput>;
    hospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
    confirmedAppointments?: Prisma.ConfirmedAppointmentListRelationFilter;
};
export type PendingAppointmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalName?: Prisma.SortOrderInput | Prisma.SortOrder;
    problem?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    dayLabel?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberId?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberName?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    patientAge?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientWeight?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientArea?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    doctor?: Prisma.DoctorOrderByWithRelationInput;
    hospital?: Prisma.HospitalOrderByWithRelationInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentOrderByRelationAggregateInput;
};
export type PendingAppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PendingAppointmentWhereInput | Prisma.PendingAppointmentWhereInput[];
    OR?: Prisma.PendingAppointmentWhereInput[];
    NOT?: Prisma.PendingAppointmentWhereInput | Prisma.PendingAppointmentWhereInput[];
    phoneNumber?: Prisma.StringFilter<"PendingAppointment"> | string;
    doctorId?: Prisma.StringFilter<"PendingAppointment"> | string;
    doctorName?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    hospitalName?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    problem?: Prisma.StringFilter<"PendingAppointment"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"PendingAppointment"> | Date | string;
    dayLabel?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    chamberId?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    patientName?: Prisma.StringFilter<"PendingAppointment"> | string;
    patientType?: Prisma.StringFilter<"PendingAppointment"> | string;
    patientAge?: Prisma.IntNullableFilter<"PendingAppointment"> | number | null;
    patientWeight?: Prisma.FloatNullableFilter<"PendingAppointment"> | number | null;
    patientArea?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    contactPhone?: Prisma.StringFilter<"PendingAppointment"> | string;
    source?: Prisma.StringFilter<"PendingAppointment"> | string;
    status?: Prisma.StringFilter<"PendingAppointment"> | string;
    createdAt?: Prisma.DateTimeFilter<"PendingAppointment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PendingAppointment"> | Date | string;
    doctor?: Prisma.XOR<Prisma.DoctorScalarRelationFilter, Prisma.DoctorWhereInput>;
    hospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
    confirmedAppointments?: Prisma.ConfirmedAppointmentListRelationFilter;
}, "id">;
export type PendingAppointmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalName?: Prisma.SortOrderInput | Prisma.SortOrder;
    problem?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    dayLabel?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberId?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberName?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    patientAge?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientWeight?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientArea?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PendingAppointmentCountOrderByAggregateInput;
    _avg?: Prisma.PendingAppointmentAvgOrderByAggregateInput;
    _max?: Prisma.PendingAppointmentMaxOrderByAggregateInput;
    _min?: Prisma.PendingAppointmentMinOrderByAggregateInput;
    _sum?: Prisma.PendingAppointmentSumOrderByAggregateInput;
};
export type PendingAppointmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.PendingAppointmentScalarWhereWithAggregatesInput | Prisma.PendingAppointmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.PendingAppointmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PendingAppointmentScalarWhereWithAggregatesInput | Prisma.PendingAppointmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PendingAppointment"> | string;
    phoneNumber?: Prisma.StringWithAggregatesFilter<"PendingAppointment"> | string;
    doctorId?: Prisma.StringWithAggregatesFilter<"PendingAppointment"> | string;
    doctorName?: Prisma.StringNullableWithAggregatesFilter<"PendingAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableWithAggregatesFilter<"PendingAppointment"> | string | null;
    hospitalName?: Prisma.StringNullableWithAggregatesFilter<"PendingAppointment"> | string | null;
    problem?: Prisma.StringWithAggregatesFilter<"PendingAppointment"> | string;
    appointmentDate?: Prisma.DateTimeWithAggregatesFilter<"PendingAppointment"> | Date | string;
    dayLabel?: Prisma.StringNullableWithAggregatesFilter<"PendingAppointment"> | string | null;
    chamberId?: Prisma.StringNullableWithAggregatesFilter<"PendingAppointment"> | string | null;
    chamberName?: Prisma.StringNullableWithAggregatesFilter<"PendingAppointment"> | string | null;
    patientName?: Prisma.StringWithAggregatesFilter<"PendingAppointment"> | string;
    patientType?: Prisma.StringWithAggregatesFilter<"PendingAppointment"> | string;
    patientAge?: Prisma.IntNullableWithAggregatesFilter<"PendingAppointment"> | number | null;
    patientWeight?: Prisma.FloatNullableWithAggregatesFilter<"PendingAppointment"> | number | null;
    patientArea?: Prisma.StringNullableWithAggregatesFilter<"PendingAppointment"> | string | null;
    contactPhone?: Prisma.StringWithAggregatesFilter<"PendingAppointment"> | string;
    source?: Prisma.StringWithAggregatesFilter<"PendingAppointment"> | string;
    status?: Prisma.StringWithAggregatesFilter<"PendingAppointment"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PendingAppointment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PendingAppointment"> | Date | string;
};
export type PendingAppointmentCreateInput = {
    id?: string;
    phoneNumber?: string;
    doctorName?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    doctor: Prisma.DoctorCreateNestedOneWithoutPendingAppointmentsInput;
    hospital?: Prisma.HospitalCreateNestedOneWithoutPendingAppointmentsInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutPendingAppointmentInput;
};
export type PendingAppointmentUncheckedCreateInput = {
    id?: string;
    phoneNumber?: string;
    doctorId: string;
    doctorName?: string | null;
    hospitalId?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutPendingAppointmentInput;
};
export type PendingAppointmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorUpdateOneRequiredWithoutPendingAppointmentsNestedInput;
    hospital?: Prisma.HospitalUpdateOneWithoutPendingAppointmentsNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutPendingAppointmentNestedInput;
};
export type PendingAppointmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutPendingAppointmentNestedInput;
};
export type PendingAppointmentCreateManyInput = {
    id?: string;
    phoneNumber?: string;
    doctorId: string;
    doctorName?: string | null;
    hospitalId?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PendingAppointmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PendingAppointmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PendingAppointmentListRelationFilter = {
    every?: Prisma.PendingAppointmentWhereInput;
    some?: Prisma.PendingAppointmentWhereInput;
    none?: Prisma.PendingAppointmentWhereInput;
};
export type PendingAppointmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PendingAppointmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    hospitalName?: Prisma.SortOrder;
    problem?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    dayLabel?: Prisma.SortOrder;
    chamberId?: Prisma.SortOrder;
    chamberName?: Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    patientAge?: Prisma.SortOrder;
    patientWeight?: Prisma.SortOrder;
    patientArea?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PendingAppointmentAvgOrderByAggregateInput = {
    patientAge?: Prisma.SortOrder;
    patientWeight?: Prisma.SortOrder;
};
export type PendingAppointmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    hospitalName?: Prisma.SortOrder;
    problem?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    dayLabel?: Prisma.SortOrder;
    chamberId?: Prisma.SortOrder;
    chamberName?: Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    patientAge?: Prisma.SortOrder;
    patientWeight?: Prisma.SortOrder;
    patientArea?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PendingAppointmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    hospitalName?: Prisma.SortOrder;
    problem?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    dayLabel?: Prisma.SortOrder;
    chamberId?: Prisma.SortOrder;
    chamberName?: Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    patientAge?: Prisma.SortOrder;
    patientWeight?: Prisma.SortOrder;
    patientArea?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PendingAppointmentSumOrderByAggregateInput = {
    patientAge?: Prisma.SortOrder;
    patientWeight?: Prisma.SortOrder;
};
export type PendingAppointmentNullableScalarRelationFilter = {
    is?: Prisma.PendingAppointmentWhereInput | null;
    isNot?: Prisma.PendingAppointmentWhereInput | null;
};
export type PendingAppointmentCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutDoctorInput, Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput> | Prisma.PendingAppointmentCreateWithoutDoctorInput[] | Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutDoctorInput | Prisma.PendingAppointmentCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.PendingAppointmentCreateManyDoctorInputEnvelope;
    connect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
};
export type PendingAppointmentUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutDoctorInput, Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput> | Prisma.PendingAppointmentCreateWithoutDoctorInput[] | Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutDoctorInput | Prisma.PendingAppointmentCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.PendingAppointmentCreateManyDoctorInputEnvelope;
    connect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
};
export type PendingAppointmentUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutDoctorInput, Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput> | Prisma.PendingAppointmentCreateWithoutDoctorInput[] | Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutDoctorInput | Prisma.PendingAppointmentCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.PendingAppointmentUpsertWithWhereUniqueWithoutDoctorInput | Prisma.PendingAppointmentUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.PendingAppointmentCreateManyDoctorInputEnvelope;
    set?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    disconnect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    delete?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    connect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    update?: Prisma.PendingAppointmentUpdateWithWhereUniqueWithoutDoctorInput | Prisma.PendingAppointmentUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.PendingAppointmentUpdateManyWithWhereWithoutDoctorInput | Prisma.PendingAppointmentUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.PendingAppointmentScalarWhereInput | Prisma.PendingAppointmentScalarWhereInput[];
};
export type PendingAppointmentUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutDoctorInput, Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput> | Prisma.PendingAppointmentCreateWithoutDoctorInput[] | Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutDoctorInput | Prisma.PendingAppointmentCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.PendingAppointmentUpsertWithWhereUniqueWithoutDoctorInput | Prisma.PendingAppointmentUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.PendingAppointmentCreateManyDoctorInputEnvelope;
    set?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    disconnect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    delete?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    connect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    update?: Prisma.PendingAppointmentUpdateWithWhereUniqueWithoutDoctorInput | Prisma.PendingAppointmentUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.PendingAppointmentUpdateManyWithWhereWithoutDoctorInput | Prisma.PendingAppointmentUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.PendingAppointmentScalarWhereInput | Prisma.PendingAppointmentScalarWhereInput[];
};
export type PendingAppointmentCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutHospitalInput, Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.PendingAppointmentCreateWithoutHospitalInput[] | Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutHospitalInput | Prisma.PendingAppointmentCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.PendingAppointmentCreateManyHospitalInputEnvelope;
    connect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
};
export type PendingAppointmentUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutHospitalInput, Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.PendingAppointmentCreateWithoutHospitalInput[] | Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutHospitalInput | Prisma.PendingAppointmentCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.PendingAppointmentCreateManyHospitalInputEnvelope;
    connect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
};
export type PendingAppointmentUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutHospitalInput, Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.PendingAppointmentCreateWithoutHospitalInput[] | Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutHospitalInput | Prisma.PendingAppointmentCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.PendingAppointmentUpsertWithWhereUniqueWithoutHospitalInput | Prisma.PendingAppointmentUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.PendingAppointmentCreateManyHospitalInputEnvelope;
    set?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    disconnect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    delete?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    connect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    update?: Prisma.PendingAppointmentUpdateWithWhereUniqueWithoutHospitalInput | Prisma.PendingAppointmentUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.PendingAppointmentUpdateManyWithWhereWithoutHospitalInput | Prisma.PendingAppointmentUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.PendingAppointmentScalarWhereInput | Prisma.PendingAppointmentScalarWhereInput[];
};
export type PendingAppointmentUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutHospitalInput, Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.PendingAppointmentCreateWithoutHospitalInput[] | Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutHospitalInput | Prisma.PendingAppointmentCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.PendingAppointmentUpsertWithWhereUniqueWithoutHospitalInput | Prisma.PendingAppointmentUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.PendingAppointmentCreateManyHospitalInputEnvelope;
    set?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    disconnect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    delete?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    connect?: Prisma.PendingAppointmentWhereUniqueInput | Prisma.PendingAppointmentWhereUniqueInput[];
    update?: Prisma.PendingAppointmentUpdateWithWhereUniqueWithoutHospitalInput | Prisma.PendingAppointmentUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.PendingAppointmentUpdateManyWithWhereWithoutHospitalInput | Prisma.PendingAppointmentUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.PendingAppointmentScalarWhereInput | Prisma.PendingAppointmentScalarWhereInput[];
};
export type PendingAppointmentCreateNestedOneWithoutConfirmedAppointmentsInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutConfirmedAppointmentsInput, Prisma.PendingAppointmentUncheckedCreateWithoutConfirmedAppointmentsInput>;
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutConfirmedAppointmentsInput;
    connect?: Prisma.PendingAppointmentWhereUniqueInput;
};
export type PendingAppointmentUpdateOneWithoutConfirmedAppointmentsNestedInput = {
    create?: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutConfirmedAppointmentsInput, Prisma.PendingAppointmentUncheckedCreateWithoutConfirmedAppointmentsInput>;
    connectOrCreate?: Prisma.PendingAppointmentCreateOrConnectWithoutConfirmedAppointmentsInput;
    upsert?: Prisma.PendingAppointmentUpsertWithoutConfirmedAppointmentsInput;
    disconnect?: Prisma.PendingAppointmentWhereInput | boolean;
    delete?: Prisma.PendingAppointmentWhereInput | boolean;
    connect?: Prisma.PendingAppointmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PendingAppointmentUpdateToOneWithWhereWithoutConfirmedAppointmentsInput, Prisma.PendingAppointmentUpdateWithoutConfirmedAppointmentsInput>, Prisma.PendingAppointmentUncheckedUpdateWithoutConfirmedAppointmentsInput>;
};
export type PendingAppointmentCreateWithoutDoctorInput = {
    id?: string;
    phoneNumber?: string;
    doctorName?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    hospital?: Prisma.HospitalCreateNestedOneWithoutPendingAppointmentsInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutPendingAppointmentInput;
};
export type PendingAppointmentUncheckedCreateWithoutDoctorInput = {
    id?: string;
    phoneNumber?: string;
    doctorName?: string | null;
    hospitalId?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutPendingAppointmentInput;
};
export type PendingAppointmentCreateOrConnectWithoutDoctorInput = {
    where: Prisma.PendingAppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutDoctorInput, Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput>;
};
export type PendingAppointmentCreateManyDoctorInputEnvelope = {
    data: Prisma.PendingAppointmentCreateManyDoctorInput | Prisma.PendingAppointmentCreateManyDoctorInput[];
    skipDuplicates?: boolean;
};
export type PendingAppointmentUpsertWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.PendingAppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PendingAppointmentUpdateWithoutDoctorInput, Prisma.PendingAppointmentUncheckedUpdateWithoutDoctorInput>;
    create: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutDoctorInput, Prisma.PendingAppointmentUncheckedCreateWithoutDoctorInput>;
};
export type PendingAppointmentUpdateWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.PendingAppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PendingAppointmentUpdateWithoutDoctorInput, Prisma.PendingAppointmentUncheckedUpdateWithoutDoctorInput>;
};
export type PendingAppointmentUpdateManyWithWhereWithoutDoctorInput = {
    where: Prisma.PendingAppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.PendingAppointmentUpdateManyMutationInput, Prisma.PendingAppointmentUncheckedUpdateManyWithoutDoctorInput>;
};
export type PendingAppointmentScalarWhereInput = {
    AND?: Prisma.PendingAppointmentScalarWhereInput | Prisma.PendingAppointmentScalarWhereInput[];
    OR?: Prisma.PendingAppointmentScalarWhereInput[];
    NOT?: Prisma.PendingAppointmentScalarWhereInput | Prisma.PendingAppointmentScalarWhereInput[];
    id?: Prisma.StringFilter<"PendingAppointment"> | string;
    phoneNumber?: Prisma.StringFilter<"PendingAppointment"> | string;
    doctorId?: Prisma.StringFilter<"PendingAppointment"> | string;
    doctorName?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    hospitalName?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    problem?: Prisma.StringFilter<"PendingAppointment"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"PendingAppointment"> | Date | string;
    dayLabel?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    chamberId?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    patientName?: Prisma.StringFilter<"PendingAppointment"> | string;
    patientType?: Prisma.StringFilter<"PendingAppointment"> | string;
    patientAge?: Prisma.IntNullableFilter<"PendingAppointment"> | number | null;
    patientWeight?: Prisma.FloatNullableFilter<"PendingAppointment"> | number | null;
    patientArea?: Prisma.StringNullableFilter<"PendingAppointment"> | string | null;
    contactPhone?: Prisma.StringFilter<"PendingAppointment"> | string;
    source?: Prisma.StringFilter<"PendingAppointment"> | string;
    status?: Prisma.StringFilter<"PendingAppointment"> | string;
    createdAt?: Prisma.DateTimeFilter<"PendingAppointment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PendingAppointment"> | Date | string;
};
export type PendingAppointmentCreateWithoutHospitalInput = {
    id?: string;
    phoneNumber?: string;
    doctorName?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    doctor: Prisma.DoctorCreateNestedOneWithoutPendingAppointmentsInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentCreateNestedManyWithoutPendingAppointmentInput;
};
export type PendingAppointmentUncheckedCreateWithoutHospitalInput = {
    id?: string;
    phoneNumber?: string;
    doctorId: string;
    doctorName?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedCreateNestedManyWithoutPendingAppointmentInput;
};
export type PendingAppointmentCreateOrConnectWithoutHospitalInput = {
    where: Prisma.PendingAppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutHospitalInput, Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput>;
};
export type PendingAppointmentCreateManyHospitalInputEnvelope = {
    data: Prisma.PendingAppointmentCreateManyHospitalInput | Prisma.PendingAppointmentCreateManyHospitalInput[];
    skipDuplicates?: boolean;
};
export type PendingAppointmentUpsertWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.PendingAppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PendingAppointmentUpdateWithoutHospitalInput, Prisma.PendingAppointmentUncheckedUpdateWithoutHospitalInput>;
    create: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutHospitalInput, Prisma.PendingAppointmentUncheckedCreateWithoutHospitalInput>;
};
export type PendingAppointmentUpdateWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.PendingAppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PendingAppointmentUpdateWithoutHospitalInput, Prisma.PendingAppointmentUncheckedUpdateWithoutHospitalInput>;
};
export type PendingAppointmentUpdateManyWithWhereWithoutHospitalInput = {
    where: Prisma.PendingAppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.PendingAppointmentUpdateManyMutationInput, Prisma.PendingAppointmentUncheckedUpdateManyWithoutHospitalInput>;
};
export type PendingAppointmentCreateWithoutConfirmedAppointmentsInput = {
    id?: string;
    phoneNumber?: string;
    doctorName?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    doctor: Prisma.DoctorCreateNestedOneWithoutPendingAppointmentsInput;
    hospital?: Prisma.HospitalCreateNestedOneWithoutPendingAppointmentsInput;
};
export type PendingAppointmentUncheckedCreateWithoutConfirmedAppointmentsInput = {
    id?: string;
    phoneNumber?: string;
    doctorId: string;
    doctorName?: string | null;
    hospitalId?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PendingAppointmentCreateOrConnectWithoutConfirmedAppointmentsInput = {
    where: Prisma.PendingAppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutConfirmedAppointmentsInput, Prisma.PendingAppointmentUncheckedCreateWithoutConfirmedAppointmentsInput>;
};
export type PendingAppointmentUpsertWithoutConfirmedAppointmentsInput = {
    update: Prisma.XOR<Prisma.PendingAppointmentUpdateWithoutConfirmedAppointmentsInput, Prisma.PendingAppointmentUncheckedUpdateWithoutConfirmedAppointmentsInput>;
    create: Prisma.XOR<Prisma.PendingAppointmentCreateWithoutConfirmedAppointmentsInput, Prisma.PendingAppointmentUncheckedCreateWithoutConfirmedAppointmentsInput>;
    where?: Prisma.PendingAppointmentWhereInput;
};
export type PendingAppointmentUpdateToOneWithWhereWithoutConfirmedAppointmentsInput = {
    where?: Prisma.PendingAppointmentWhereInput;
    data: Prisma.XOR<Prisma.PendingAppointmentUpdateWithoutConfirmedAppointmentsInput, Prisma.PendingAppointmentUncheckedUpdateWithoutConfirmedAppointmentsInput>;
};
export type PendingAppointmentUpdateWithoutConfirmedAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorUpdateOneRequiredWithoutPendingAppointmentsNestedInput;
    hospital?: Prisma.HospitalUpdateOneWithoutPendingAppointmentsNestedInput;
};
export type PendingAppointmentUncheckedUpdateWithoutConfirmedAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PendingAppointmentCreateManyDoctorInput = {
    id?: string;
    phoneNumber?: string;
    doctorName?: string | null;
    hospitalId?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PendingAppointmentUpdateWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hospital?: Prisma.HospitalUpdateOneWithoutPendingAppointmentsNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutPendingAppointmentNestedInput;
};
export type PendingAppointmentUncheckedUpdateWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutPendingAppointmentNestedInput;
};
export type PendingAppointmentUncheckedUpdateManyWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PendingAppointmentCreateManyHospitalInput = {
    id?: string;
    phoneNumber?: string;
    doctorId: string;
    doctorName?: string | null;
    hospitalName?: string | null;
    problem: string;
    appointmentDate: Date | string;
    dayLabel?: string | null;
    chamberId?: string | null;
    chamberName?: string | null;
    patientName: string;
    patientType?: string;
    patientAge?: number | null;
    patientWeight?: number | null;
    patientArea?: string | null;
    contactPhone: string;
    source?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PendingAppointmentUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorUpdateOneRequiredWithoutPendingAppointmentsNestedInput;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUpdateManyWithoutPendingAppointmentNestedInput;
};
export type PendingAppointmentUncheckedUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    confirmedAppointments?: Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutPendingAppointmentNestedInput;
};
export type PendingAppointmentUncheckedUpdateManyWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dayLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    patientAge?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    patientWeight?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    patientArea?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type PendingAppointmentCountOutputType
 */
export type PendingAppointmentCountOutputType = {
    confirmedAppointments: number;
};
export type PendingAppointmentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    confirmedAppointments?: boolean | PendingAppointmentCountOutputTypeCountConfirmedAppointmentsArgs;
};
/**
 * PendingAppointmentCountOutputType without action
 */
export type PendingAppointmentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAppointmentCountOutputType
     */
    select?: Prisma.PendingAppointmentCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * PendingAppointmentCountOutputType without action
 */
export type PendingAppointmentCountOutputTypeCountConfirmedAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConfirmedAppointmentWhereInput;
};
export type PendingAppointmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    phoneNumber?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    hospitalId?: boolean;
    hospitalName?: boolean;
    problem?: boolean;
    appointmentDate?: boolean;
    dayLabel?: boolean;
    chamberId?: boolean;
    chamberName?: boolean;
    patientName?: boolean;
    patientType?: boolean;
    patientAge?: boolean;
    patientWeight?: boolean;
    patientArea?: boolean;
    contactPhone?: boolean;
    source?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.PendingAppointment$hospitalArgs<ExtArgs>;
    confirmedAppointments?: boolean | Prisma.PendingAppointment$confirmedAppointmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.PendingAppointmentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pendingAppointment"]>;
export type PendingAppointmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    phoneNumber?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    hospitalId?: boolean;
    hospitalName?: boolean;
    problem?: boolean;
    appointmentDate?: boolean;
    dayLabel?: boolean;
    chamberId?: boolean;
    chamberName?: boolean;
    patientName?: boolean;
    patientType?: boolean;
    patientAge?: boolean;
    patientWeight?: boolean;
    patientArea?: boolean;
    contactPhone?: boolean;
    source?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.PendingAppointment$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["pendingAppointment"]>;
export type PendingAppointmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    phoneNumber?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    hospitalId?: boolean;
    hospitalName?: boolean;
    problem?: boolean;
    appointmentDate?: boolean;
    dayLabel?: boolean;
    chamberId?: boolean;
    chamberName?: boolean;
    patientName?: boolean;
    patientType?: boolean;
    patientAge?: boolean;
    patientWeight?: boolean;
    patientArea?: boolean;
    contactPhone?: boolean;
    source?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.PendingAppointment$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["pendingAppointment"]>;
export type PendingAppointmentSelectScalar = {
    id?: boolean;
    phoneNumber?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    hospitalId?: boolean;
    hospitalName?: boolean;
    problem?: boolean;
    appointmentDate?: boolean;
    dayLabel?: boolean;
    chamberId?: boolean;
    chamberName?: boolean;
    patientName?: boolean;
    patientType?: boolean;
    patientAge?: boolean;
    patientWeight?: boolean;
    patientArea?: boolean;
    contactPhone?: boolean;
    source?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PendingAppointmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "phoneNumber" | "doctorId" | "doctorName" | "hospitalId" | "hospitalName" | "problem" | "appointmentDate" | "dayLabel" | "chamberId" | "chamberName" | "patientName" | "patientType" | "patientAge" | "patientWeight" | "patientArea" | "contactPhone" | "source" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["pendingAppointment"]>;
export type PendingAppointmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.PendingAppointment$hospitalArgs<ExtArgs>;
    confirmedAppointments?: boolean | Prisma.PendingAppointment$confirmedAppointmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.PendingAppointmentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PendingAppointmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.PendingAppointment$hospitalArgs<ExtArgs>;
};
export type PendingAppointmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.PendingAppointment$hospitalArgs<ExtArgs>;
};
export type $PendingAppointmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PendingAppointment";
    objects: {
        doctor: Prisma.$DoctorPayload<ExtArgs>;
        hospital: Prisma.$HospitalPayload<ExtArgs> | null;
        confirmedAppointments: Prisma.$ConfirmedAppointmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        phoneNumber: string;
        doctorId: string;
        doctorName: string | null;
        hospitalId: string | null;
        hospitalName: string | null;
        problem: string;
        appointmentDate: Date;
        dayLabel: string | null;
        chamberId: string | null;
        chamberName: string | null;
        patientName: string;
        patientType: string;
        patientAge: number | null;
        patientWeight: number | null;
        patientArea: string | null;
        contactPhone: string;
        source: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["pendingAppointment"]>;
    composites: {};
};
export type PendingAppointmentGetPayload<S extends boolean | null | undefined | PendingAppointmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload, S>;
export type PendingAppointmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PendingAppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PendingAppointmentCountAggregateInputType | true;
};
export interface PendingAppointmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PendingAppointment'];
        meta: {
            name: 'PendingAppointment';
        };
    };
    /**
     * Find zero or one PendingAppointment that matches the filter.
     * @param {PendingAppointmentFindUniqueArgs} args - Arguments to find a PendingAppointment
     * @example
     * // Get one PendingAppointment
     * const pendingAppointment = await prisma.pendingAppointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendingAppointmentFindUniqueArgs>(args: Prisma.SelectSubset<T, PendingAppointmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PendingAppointmentClient<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PendingAppointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PendingAppointmentFindUniqueOrThrowArgs} args - Arguments to find a PendingAppointment
     * @example
     * // Get one PendingAppointment
     * const pendingAppointment = await prisma.pendingAppointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendingAppointmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PendingAppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PendingAppointmentClient<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PendingAppointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingAppointmentFindFirstArgs} args - Arguments to find a PendingAppointment
     * @example
     * // Get one PendingAppointment
     * const pendingAppointment = await prisma.pendingAppointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendingAppointmentFindFirstArgs>(args?: Prisma.SelectSubset<T, PendingAppointmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__PendingAppointmentClient<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PendingAppointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingAppointmentFindFirstOrThrowArgs} args - Arguments to find a PendingAppointment
     * @example
     * // Get one PendingAppointment
     * const pendingAppointment = await prisma.pendingAppointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendingAppointmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PendingAppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PendingAppointmentClient<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PendingAppointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingAppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PendingAppointments
     * const pendingAppointments = await prisma.pendingAppointment.findMany()
     *
     * // Get first 10 PendingAppointments
     * const pendingAppointments = await prisma.pendingAppointment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const pendingAppointmentWithIdOnly = await prisma.pendingAppointment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PendingAppointmentFindManyArgs>(args?: Prisma.SelectSubset<T, PendingAppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PendingAppointment.
     * @param {PendingAppointmentCreateArgs} args - Arguments to create a PendingAppointment.
     * @example
     * // Create one PendingAppointment
     * const PendingAppointment = await prisma.pendingAppointment.create({
     *   data: {
     *     // ... data to create a PendingAppointment
     *   }
     * })
     *
     */
    create<T extends PendingAppointmentCreateArgs>(args: Prisma.SelectSubset<T, PendingAppointmentCreateArgs<ExtArgs>>): Prisma.Prisma__PendingAppointmentClient<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PendingAppointments.
     * @param {PendingAppointmentCreateManyArgs} args - Arguments to create many PendingAppointments.
     * @example
     * // Create many PendingAppointments
     * const pendingAppointment = await prisma.pendingAppointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PendingAppointmentCreateManyArgs>(args?: Prisma.SelectSubset<T, PendingAppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PendingAppointments and returns the data saved in the database.
     * @param {PendingAppointmentCreateManyAndReturnArgs} args - Arguments to create many PendingAppointments.
     * @example
     * // Create many PendingAppointments
     * const pendingAppointment = await prisma.pendingAppointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PendingAppointments and only return the `id`
     * const pendingAppointmentWithIdOnly = await prisma.pendingAppointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PendingAppointmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PendingAppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PendingAppointment.
     * @param {PendingAppointmentDeleteArgs} args - Arguments to delete one PendingAppointment.
     * @example
     * // Delete one PendingAppointment
     * const PendingAppointment = await prisma.pendingAppointment.delete({
     *   where: {
     *     // ... filter to delete one PendingAppointment
     *   }
     * })
     *
     */
    delete<T extends PendingAppointmentDeleteArgs>(args: Prisma.SelectSubset<T, PendingAppointmentDeleteArgs<ExtArgs>>): Prisma.Prisma__PendingAppointmentClient<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PendingAppointment.
     * @param {PendingAppointmentUpdateArgs} args - Arguments to update one PendingAppointment.
     * @example
     * // Update one PendingAppointment
     * const pendingAppointment = await prisma.pendingAppointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PendingAppointmentUpdateArgs>(args: Prisma.SelectSubset<T, PendingAppointmentUpdateArgs<ExtArgs>>): Prisma.Prisma__PendingAppointmentClient<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PendingAppointments.
     * @param {PendingAppointmentDeleteManyArgs} args - Arguments to filter PendingAppointments to delete.
     * @example
     * // Delete a few PendingAppointments
     * const { count } = await prisma.pendingAppointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PendingAppointmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, PendingAppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PendingAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingAppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PendingAppointments
     * const pendingAppointment = await prisma.pendingAppointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PendingAppointmentUpdateManyArgs>(args: Prisma.SelectSubset<T, PendingAppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PendingAppointments and returns the data updated in the database.
     * @param {PendingAppointmentUpdateManyAndReturnArgs} args - Arguments to update many PendingAppointments.
     * @example
     * // Update many PendingAppointments
     * const pendingAppointment = await prisma.pendingAppointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PendingAppointments and only return the `id`
     * const pendingAppointmentWithIdOnly = await prisma.pendingAppointment.updateManyAndReturn({
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
    updateManyAndReturn<T extends PendingAppointmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PendingAppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PendingAppointment.
     * @param {PendingAppointmentUpsertArgs} args - Arguments to update or create a PendingAppointment.
     * @example
     * // Update or create a PendingAppointment
     * const pendingAppointment = await prisma.pendingAppointment.upsert({
     *   create: {
     *     // ... data to create a PendingAppointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PendingAppointment we want to update
     *   }
     * })
     */
    upsert<T extends PendingAppointmentUpsertArgs>(args: Prisma.SelectSubset<T, PendingAppointmentUpsertArgs<ExtArgs>>): Prisma.Prisma__PendingAppointmentClient<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PendingAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingAppointmentCountArgs} args - Arguments to filter PendingAppointments to count.
     * @example
     * // Count the number of PendingAppointments
     * const count = await prisma.pendingAppointment.count({
     *   where: {
     *     // ... the filter for the PendingAppointments we want to count
     *   }
     * })
    **/
    count<T extends PendingAppointmentCountArgs>(args?: Prisma.Subset<T, PendingAppointmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PendingAppointmentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PendingAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingAppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PendingAppointmentAggregateArgs>(args: Prisma.Subset<T, PendingAppointmentAggregateArgs>): Prisma.PrismaPromise<GetPendingAppointmentAggregateType<T>>;
    /**
     * Group by PendingAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingAppointmentGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PendingAppointmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PendingAppointmentGroupByArgs['orderBy'];
    } : {
        orderBy?: PendingAppointmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PendingAppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendingAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PendingAppointment model
     */
    readonly fields: PendingAppointmentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PendingAppointment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PendingAppointmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    doctor<T extends Prisma.DoctorDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DoctorDefaultArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    hospital<T extends Prisma.PendingAppointment$hospitalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PendingAppointment$hospitalArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    confirmedAppointments<T extends Prisma.PendingAppointment$confirmedAppointmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PendingAppointment$confirmedAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the PendingAppointment model
 */
export interface PendingAppointmentFieldRefs {
    readonly id: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly phoneNumber: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly doctorId: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly doctorName: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly hospitalId: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly hospitalName: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly problem: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly appointmentDate: Prisma.FieldRef<"PendingAppointment", 'DateTime'>;
    readonly dayLabel: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly chamberId: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly chamberName: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly patientName: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly patientType: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly patientAge: Prisma.FieldRef<"PendingAppointment", 'Int'>;
    readonly patientWeight: Prisma.FieldRef<"PendingAppointment", 'Float'>;
    readonly patientArea: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly contactPhone: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly source: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly status: Prisma.FieldRef<"PendingAppointment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PendingAppointment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PendingAppointment", 'DateTime'>;
}
/**
 * PendingAppointment findUnique
 */
export type PendingAppointmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PendingAppointment to fetch.
     */
    where: Prisma.PendingAppointmentWhereUniqueInput;
};
/**
 * PendingAppointment findUniqueOrThrow
 */
export type PendingAppointmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PendingAppointment to fetch.
     */
    where: Prisma.PendingAppointmentWhereUniqueInput;
};
/**
 * PendingAppointment findFirst
 */
export type PendingAppointmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PendingAppointment to fetch.
     */
    where?: Prisma.PendingAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PendingAppointments to fetch.
     */
    orderBy?: Prisma.PendingAppointmentOrderByWithRelationInput | Prisma.PendingAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PendingAppointments.
     */
    cursor?: Prisma.PendingAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PendingAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PendingAppointments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PendingAppointments.
     */
    distinct?: Prisma.PendingAppointmentScalarFieldEnum | Prisma.PendingAppointmentScalarFieldEnum[];
};
/**
 * PendingAppointment findFirstOrThrow
 */
export type PendingAppointmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PendingAppointment to fetch.
     */
    where?: Prisma.PendingAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PendingAppointments to fetch.
     */
    orderBy?: Prisma.PendingAppointmentOrderByWithRelationInput | Prisma.PendingAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PendingAppointments.
     */
    cursor?: Prisma.PendingAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PendingAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PendingAppointments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PendingAppointments.
     */
    distinct?: Prisma.PendingAppointmentScalarFieldEnum | Prisma.PendingAppointmentScalarFieldEnum[];
};
/**
 * PendingAppointment findMany
 */
export type PendingAppointmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PendingAppointments to fetch.
     */
    where?: Prisma.PendingAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PendingAppointments to fetch.
     */
    orderBy?: Prisma.PendingAppointmentOrderByWithRelationInput | Prisma.PendingAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PendingAppointments.
     */
    cursor?: Prisma.PendingAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PendingAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PendingAppointments.
     */
    skip?: number;
    distinct?: Prisma.PendingAppointmentScalarFieldEnum | Prisma.PendingAppointmentScalarFieldEnum[];
};
/**
 * PendingAppointment create
 */
export type PendingAppointmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a PendingAppointment.
     */
    data: Prisma.XOR<Prisma.PendingAppointmentCreateInput, Prisma.PendingAppointmentUncheckedCreateInput>;
};
/**
 * PendingAppointment createMany
 */
export type PendingAppointmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PendingAppointments.
     */
    data: Prisma.PendingAppointmentCreateManyInput | Prisma.PendingAppointmentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PendingAppointment createManyAndReturn
 */
export type PendingAppointmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAppointment
     */
    select?: Prisma.PendingAppointmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PendingAppointment
     */
    omit?: Prisma.PendingAppointmentOmit<ExtArgs> | null;
    /**
     * The data used to create many PendingAppointments.
     */
    data: Prisma.PendingAppointmentCreateManyInput | Prisma.PendingAppointmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PendingAppointmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PendingAppointment update
 */
export type PendingAppointmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a PendingAppointment.
     */
    data: Prisma.XOR<Prisma.PendingAppointmentUpdateInput, Prisma.PendingAppointmentUncheckedUpdateInput>;
    /**
     * Choose, which PendingAppointment to update.
     */
    where: Prisma.PendingAppointmentWhereUniqueInput;
};
/**
 * PendingAppointment updateMany
 */
export type PendingAppointmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PendingAppointments.
     */
    data: Prisma.XOR<Prisma.PendingAppointmentUpdateManyMutationInput, Prisma.PendingAppointmentUncheckedUpdateManyInput>;
    /**
     * Filter which PendingAppointments to update
     */
    where?: Prisma.PendingAppointmentWhereInput;
    /**
     * Limit how many PendingAppointments to update.
     */
    limit?: number;
};
/**
 * PendingAppointment updateManyAndReturn
 */
export type PendingAppointmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAppointment
     */
    select?: Prisma.PendingAppointmentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PendingAppointment
     */
    omit?: Prisma.PendingAppointmentOmit<ExtArgs> | null;
    /**
     * The data used to update PendingAppointments.
     */
    data: Prisma.XOR<Prisma.PendingAppointmentUpdateManyMutationInput, Prisma.PendingAppointmentUncheckedUpdateManyInput>;
    /**
     * Filter which PendingAppointments to update
     */
    where?: Prisma.PendingAppointmentWhereInput;
    /**
     * Limit how many PendingAppointments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PendingAppointmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PendingAppointment upsert
 */
export type PendingAppointmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the PendingAppointment to update in case it exists.
     */
    where: Prisma.PendingAppointmentWhereUniqueInput;
    /**
     * In case the PendingAppointment found by the `where` argument doesn't exist, create a new PendingAppointment with this data.
     */
    create: Prisma.XOR<Prisma.PendingAppointmentCreateInput, Prisma.PendingAppointmentUncheckedCreateInput>;
    /**
     * In case the PendingAppointment was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PendingAppointmentUpdateInput, Prisma.PendingAppointmentUncheckedUpdateInput>;
};
/**
 * PendingAppointment delete
 */
export type PendingAppointmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which PendingAppointment to delete.
     */
    where: Prisma.PendingAppointmentWhereUniqueInput;
};
/**
 * PendingAppointment deleteMany
 */
export type PendingAppointmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PendingAppointments to delete
     */
    where?: Prisma.PendingAppointmentWhereInput;
    /**
     * Limit how many PendingAppointments to delete.
     */
    limit?: number;
};
/**
 * PendingAppointment.hospital
 */
export type PendingAppointment$hospitalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * PendingAppointment.confirmedAppointments
 */
export type PendingAppointment$confirmedAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * PendingAppointment without action
 */
export type PendingAppointmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=PendingAppointment.d.ts.map