import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ServedAppointment
 *
 */
export type ServedAppointmentModel = runtime.Types.Result.DefaultSelection<Prisma.$ServedAppointmentPayload>;
export type AggregateServedAppointment = {
    _count: ServedAppointmentCountAggregateOutputType | null;
    _avg: ServedAppointmentAvgAggregateOutputType | null;
    _sum: ServedAppointmentSumAggregateOutputType | null;
    _min: ServedAppointmentMinAggregateOutputType | null;
    _max: ServedAppointmentMaxAggregateOutputType | null;
};
export type ServedAppointmentAvgAggregateOutputType = {
    serial: number | null;
    collectionAmount: number | null;
    paymentAmount: number | null;
};
export type ServedAppointmentSumAggregateOutputType = {
    serial: number | null;
    collectionAmount: number | null;
    paymentAmount: number | null;
};
export type ServedAppointmentMinAggregateOutputType = {
    id: string | null;
    appointmentId: string | null;
    doctorId: string | null;
    doctorName: string | null;
    hospitalId: string | null;
    patientName: string | null;
    patientType: string | null;
    contactPhone: string | null;
    appointmentDate: Date | null;
    serial: number | null;
    chamberId: string | null;
    chamberName: string | null;
    bookingType: $Enums.BookingType | null;
    collectionAmount: number | null;
    paymentAmount: number | null;
    servedBy: string | null;
    servedAt: Date | null;
    createdBy: string | null;
    createdByName: string | null;
    createdAt: Date | null;
};
export type ServedAppointmentMaxAggregateOutputType = {
    id: string | null;
    appointmentId: string | null;
    doctorId: string | null;
    doctorName: string | null;
    hospitalId: string | null;
    patientName: string | null;
    patientType: string | null;
    contactPhone: string | null;
    appointmentDate: Date | null;
    serial: number | null;
    chamberId: string | null;
    chamberName: string | null;
    bookingType: $Enums.BookingType | null;
    collectionAmount: number | null;
    paymentAmount: number | null;
    servedBy: string | null;
    servedAt: Date | null;
    createdBy: string | null;
    createdByName: string | null;
    createdAt: Date | null;
};
export type ServedAppointmentCountAggregateOutputType = {
    id: number;
    appointmentId: number;
    doctorId: number;
    doctorName: number;
    hospitalId: number;
    patientName: number;
    patientType: number;
    contactPhone: number;
    appointmentDate: number;
    serial: number;
    chamberId: number;
    chamberName: number;
    bookingType: number;
    collectionAmount: number;
    paymentAmount: number;
    servedBy: number;
    servedAt: number;
    createdBy: number;
    createdByName: number;
    createdAt: number;
    _all: number;
};
export type ServedAppointmentAvgAggregateInputType = {
    serial?: true;
    collectionAmount?: true;
    paymentAmount?: true;
};
export type ServedAppointmentSumAggregateInputType = {
    serial?: true;
    collectionAmount?: true;
    paymentAmount?: true;
};
export type ServedAppointmentMinAggregateInputType = {
    id?: true;
    appointmentId?: true;
    doctorId?: true;
    doctorName?: true;
    hospitalId?: true;
    patientName?: true;
    patientType?: true;
    contactPhone?: true;
    appointmentDate?: true;
    serial?: true;
    chamberId?: true;
    chamberName?: true;
    bookingType?: true;
    collectionAmount?: true;
    paymentAmount?: true;
    servedBy?: true;
    servedAt?: true;
    createdBy?: true;
    createdByName?: true;
    createdAt?: true;
};
export type ServedAppointmentMaxAggregateInputType = {
    id?: true;
    appointmentId?: true;
    doctorId?: true;
    doctorName?: true;
    hospitalId?: true;
    patientName?: true;
    patientType?: true;
    contactPhone?: true;
    appointmentDate?: true;
    serial?: true;
    chamberId?: true;
    chamberName?: true;
    bookingType?: true;
    collectionAmount?: true;
    paymentAmount?: true;
    servedBy?: true;
    servedAt?: true;
    createdBy?: true;
    createdByName?: true;
    createdAt?: true;
};
export type ServedAppointmentCountAggregateInputType = {
    id?: true;
    appointmentId?: true;
    doctorId?: true;
    doctorName?: true;
    hospitalId?: true;
    patientName?: true;
    patientType?: true;
    contactPhone?: true;
    appointmentDate?: true;
    serial?: true;
    chamberId?: true;
    chamberName?: true;
    bookingType?: true;
    collectionAmount?: true;
    paymentAmount?: true;
    servedBy?: true;
    servedAt?: true;
    createdBy?: true;
    createdByName?: true;
    createdAt?: true;
    _all?: true;
};
export type ServedAppointmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ServedAppointment to aggregate.
     */
    where?: Prisma.ServedAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ServedAppointments to fetch.
     */
    orderBy?: Prisma.ServedAppointmentOrderByWithRelationInput | Prisma.ServedAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ServedAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ServedAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ServedAppointments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ServedAppointments
    **/
    _count?: true | ServedAppointmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ServedAppointmentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ServedAppointmentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ServedAppointmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ServedAppointmentMaxAggregateInputType;
};
export type GetServedAppointmentAggregateType<T extends ServedAppointmentAggregateArgs> = {
    [P in keyof T & keyof AggregateServedAppointment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateServedAppointment[P]> : Prisma.GetScalarType<T[P], AggregateServedAppointment[P]>;
};
export type ServedAppointmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServedAppointmentWhereInput;
    orderBy?: Prisma.ServedAppointmentOrderByWithAggregationInput | Prisma.ServedAppointmentOrderByWithAggregationInput[];
    by: Prisma.ServedAppointmentScalarFieldEnum[] | Prisma.ServedAppointmentScalarFieldEnum;
    having?: Prisma.ServedAppointmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ServedAppointmentCountAggregateInputType | true;
    _avg?: ServedAppointmentAvgAggregateInputType;
    _sum?: ServedAppointmentSumAggregateInputType;
    _min?: ServedAppointmentMinAggregateInputType;
    _max?: ServedAppointmentMaxAggregateInputType;
};
export type ServedAppointmentGroupByOutputType = {
    id: string;
    appointmentId: string;
    doctorId: string;
    doctorName: string | null;
    hospitalId: string | null;
    patientName: string;
    patientType: string;
    contactPhone: string;
    appointmentDate: Date;
    serial: number;
    chamberId: string | null;
    chamberName: string | null;
    bookingType: $Enums.BookingType;
    collectionAmount: number | null;
    paymentAmount: number | null;
    servedBy: string;
    servedAt: Date;
    createdBy: string | null;
    createdByName: string | null;
    createdAt: Date;
    _count: ServedAppointmentCountAggregateOutputType | null;
    _avg: ServedAppointmentAvgAggregateOutputType | null;
    _sum: ServedAppointmentSumAggregateOutputType | null;
    _min: ServedAppointmentMinAggregateOutputType | null;
    _max: ServedAppointmentMaxAggregateOutputType | null;
};
type GetServedAppointmentGroupByPayload<T extends ServedAppointmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ServedAppointmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ServedAppointmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ServedAppointmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ServedAppointmentGroupByOutputType[P]>;
}>>;
export type ServedAppointmentWhereInput = {
    AND?: Prisma.ServedAppointmentWhereInput | Prisma.ServedAppointmentWhereInput[];
    OR?: Prisma.ServedAppointmentWhereInput[];
    NOT?: Prisma.ServedAppointmentWhereInput | Prisma.ServedAppointmentWhereInput[];
    id?: Prisma.StringFilter<"ServedAppointment"> | string;
    appointmentId?: Prisma.StringFilter<"ServedAppointment"> | string;
    doctorId?: Prisma.StringFilter<"ServedAppointment"> | string;
    doctorName?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    patientName?: Prisma.StringFilter<"ServedAppointment"> | string;
    patientType?: Prisma.StringFilter<"ServedAppointment"> | string;
    contactPhone?: Prisma.StringFilter<"ServedAppointment"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"ServedAppointment"> | Date | string;
    serial?: Prisma.IntFilter<"ServedAppointment"> | number;
    chamberId?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    bookingType?: Prisma.EnumBookingTypeFilter<"ServedAppointment"> | $Enums.BookingType;
    collectionAmount?: Prisma.FloatNullableFilter<"ServedAppointment"> | number | null;
    paymentAmount?: Prisma.FloatNullableFilter<"ServedAppointment"> | number | null;
    servedBy?: Prisma.StringFilter<"ServedAppointment"> | string;
    servedAt?: Prisma.DateTimeFilter<"ServedAppointment"> | Date | string;
    createdBy?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    createdByName?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ServedAppointment"> | Date | string;
    hospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
};
export type ServedAppointmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    chamberId?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberName?: Prisma.SortOrderInput | Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    servedBy?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdByName?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    hospital?: Prisma.HospitalOrderByWithRelationInput;
};
export type ServedAppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    appointmentId?: string;
    AND?: Prisma.ServedAppointmentWhereInput | Prisma.ServedAppointmentWhereInput[];
    OR?: Prisma.ServedAppointmentWhereInput[];
    NOT?: Prisma.ServedAppointmentWhereInput | Prisma.ServedAppointmentWhereInput[];
    doctorId?: Prisma.StringFilter<"ServedAppointment"> | string;
    doctorName?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    patientName?: Prisma.StringFilter<"ServedAppointment"> | string;
    patientType?: Prisma.StringFilter<"ServedAppointment"> | string;
    contactPhone?: Prisma.StringFilter<"ServedAppointment"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"ServedAppointment"> | Date | string;
    serial?: Prisma.IntFilter<"ServedAppointment"> | number;
    chamberId?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    bookingType?: Prisma.EnumBookingTypeFilter<"ServedAppointment"> | $Enums.BookingType;
    collectionAmount?: Prisma.FloatNullableFilter<"ServedAppointment"> | number | null;
    paymentAmount?: Prisma.FloatNullableFilter<"ServedAppointment"> | number | null;
    servedBy?: Prisma.StringFilter<"ServedAppointment"> | string;
    servedAt?: Prisma.DateTimeFilter<"ServedAppointment"> | Date | string;
    createdBy?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    createdByName?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ServedAppointment"> | Date | string;
    hospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
}, "id" | "appointmentId">;
export type ServedAppointmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospitalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    chamberId?: Prisma.SortOrderInput | Prisma.SortOrder;
    chamberName?: Prisma.SortOrderInput | Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    servedBy?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdByName?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ServedAppointmentCountOrderByAggregateInput;
    _avg?: Prisma.ServedAppointmentAvgOrderByAggregateInput;
    _max?: Prisma.ServedAppointmentMaxOrderByAggregateInput;
    _min?: Prisma.ServedAppointmentMinOrderByAggregateInput;
    _sum?: Prisma.ServedAppointmentSumOrderByAggregateInput;
};
export type ServedAppointmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.ServedAppointmentScalarWhereWithAggregatesInput | Prisma.ServedAppointmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.ServedAppointmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ServedAppointmentScalarWhereWithAggregatesInput | Prisma.ServedAppointmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ServedAppointment"> | string;
    appointmentId?: Prisma.StringWithAggregatesFilter<"ServedAppointment"> | string;
    doctorId?: Prisma.StringWithAggregatesFilter<"ServedAppointment"> | string;
    doctorName?: Prisma.StringNullableWithAggregatesFilter<"ServedAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableWithAggregatesFilter<"ServedAppointment"> | string | null;
    patientName?: Prisma.StringWithAggregatesFilter<"ServedAppointment"> | string;
    patientType?: Prisma.StringWithAggregatesFilter<"ServedAppointment"> | string;
    contactPhone?: Prisma.StringWithAggregatesFilter<"ServedAppointment"> | string;
    appointmentDate?: Prisma.DateTimeWithAggregatesFilter<"ServedAppointment"> | Date | string;
    serial?: Prisma.IntWithAggregatesFilter<"ServedAppointment"> | number;
    chamberId?: Prisma.StringNullableWithAggregatesFilter<"ServedAppointment"> | string | null;
    chamberName?: Prisma.StringNullableWithAggregatesFilter<"ServedAppointment"> | string | null;
    bookingType?: Prisma.EnumBookingTypeWithAggregatesFilter<"ServedAppointment"> | $Enums.BookingType;
    collectionAmount?: Prisma.FloatNullableWithAggregatesFilter<"ServedAppointment"> | number | null;
    paymentAmount?: Prisma.FloatNullableWithAggregatesFilter<"ServedAppointment"> | number | null;
    servedBy?: Prisma.StringWithAggregatesFilter<"ServedAppointment"> | string;
    servedAt?: Prisma.DateTimeWithAggregatesFilter<"ServedAppointment"> | Date | string;
    createdBy?: Prisma.StringNullableWithAggregatesFilter<"ServedAppointment"> | string | null;
    createdByName?: Prisma.StringNullableWithAggregatesFilter<"ServedAppointment"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ServedAppointment"> | Date | string;
};
export type ServedAppointmentCreateInput = {
    id?: string;
    appointmentId: string;
    doctorId: string;
    doctorName?: string | null;
    patientName: string;
    patientType?: string;
    contactPhone: string;
    appointmentDate: Date | string;
    serial?: number;
    chamberId?: string | null;
    chamberName?: string | null;
    bookingType?: $Enums.BookingType;
    collectionAmount?: number | null;
    paymentAmount?: number | null;
    servedBy: string;
    servedAt?: Date | string;
    createdBy?: string | null;
    createdByName?: string | null;
    createdAt?: Date | string;
    hospital?: Prisma.HospitalCreateNestedOneWithoutServedAppointmentsInput;
};
export type ServedAppointmentUncheckedCreateInput = {
    id?: string;
    appointmentId: string;
    doctorId: string;
    doctorName?: string | null;
    hospitalId?: string | null;
    patientName: string;
    patientType?: string;
    contactPhone: string;
    appointmentDate: Date | string;
    serial?: number;
    chamberId?: string | null;
    chamberName?: string | null;
    bookingType?: $Enums.BookingType;
    collectionAmount?: number | null;
    paymentAmount?: number | null;
    servedBy: string;
    servedAt?: Date | string;
    createdBy?: string | null;
    createdByName?: string | null;
    createdAt?: Date | string;
};
export type ServedAppointmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    servedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hospital?: Prisma.HospitalUpdateOneWithoutServedAppointmentsNestedInput;
};
export type ServedAppointmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    servedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServedAppointmentCreateManyInput = {
    id?: string;
    appointmentId: string;
    doctorId: string;
    doctorName?: string | null;
    hospitalId?: string | null;
    patientName: string;
    patientType?: string;
    contactPhone: string;
    appointmentDate: Date | string;
    serial?: number;
    chamberId?: string | null;
    chamberName?: string | null;
    bookingType?: $Enums.BookingType;
    collectionAmount?: number | null;
    paymentAmount?: number | null;
    servedBy: string;
    servedAt?: Date | string;
    createdBy?: string | null;
    createdByName?: string | null;
    createdAt?: Date | string;
};
export type ServedAppointmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    servedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServedAppointmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospitalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    servedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServedAppointmentListRelationFilter = {
    every?: Prisma.ServedAppointmentWhereInput;
    some?: Prisma.ServedAppointmentWhereInput;
    none?: Prisma.ServedAppointmentWhereInput;
};
export type ServedAppointmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ServedAppointmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    chamberId?: Prisma.SortOrder;
    chamberName?: Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
    servedBy?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdByName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ServedAppointmentAvgOrderByAggregateInput = {
    serial?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
};
export type ServedAppointmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    chamberId?: Prisma.SortOrder;
    chamberName?: Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
    servedBy?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdByName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ServedAppointmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    appointmentId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    doctorName?: Prisma.SortOrder;
    hospitalId?: Prisma.SortOrder;
    patientName?: Prisma.SortOrder;
    patientType?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    appointmentDate?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    chamberId?: Prisma.SortOrder;
    chamberName?: Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
    servedBy?: Prisma.SortOrder;
    servedAt?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdByName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ServedAppointmentSumOrderByAggregateInput = {
    serial?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
};
export type ServedAppointmentCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.ServedAppointmentCreateWithoutHospitalInput, Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.ServedAppointmentCreateWithoutHospitalInput[] | Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ServedAppointmentCreateOrConnectWithoutHospitalInput | Prisma.ServedAppointmentCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.ServedAppointmentCreateManyHospitalInputEnvelope;
    connect?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
};
export type ServedAppointmentUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.ServedAppointmentCreateWithoutHospitalInput, Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.ServedAppointmentCreateWithoutHospitalInput[] | Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ServedAppointmentCreateOrConnectWithoutHospitalInput | Prisma.ServedAppointmentCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.ServedAppointmentCreateManyHospitalInputEnvelope;
    connect?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
};
export type ServedAppointmentUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.ServedAppointmentCreateWithoutHospitalInput, Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.ServedAppointmentCreateWithoutHospitalInput[] | Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ServedAppointmentCreateOrConnectWithoutHospitalInput | Prisma.ServedAppointmentCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.ServedAppointmentUpsertWithWhereUniqueWithoutHospitalInput | Prisma.ServedAppointmentUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.ServedAppointmentCreateManyHospitalInputEnvelope;
    set?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
    disconnect?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
    delete?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
    connect?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
    update?: Prisma.ServedAppointmentUpdateWithWhereUniqueWithoutHospitalInput | Prisma.ServedAppointmentUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.ServedAppointmentUpdateManyWithWhereWithoutHospitalInput | Prisma.ServedAppointmentUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.ServedAppointmentScalarWhereInput | Prisma.ServedAppointmentScalarWhereInput[];
};
export type ServedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.ServedAppointmentCreateWithoutHospitalInput, Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.ServedAppointmentCreateWithoutHospitalInput[] | Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ServedAppointmentCreateOrConnectWithoutHospitalInput | Prisma.ServedAppointmentCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.ServedAppointmentUpsertWithWhereUniqueWithoutHospitalInput | Prisma.ServedAppointmentUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.ServedAppointmentCreateManyHospitalInputEnvelope;
    set?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
    disconnect?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
    delete?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
    connect?: Prisma.ServedAppointmentWhereUniqueInput | Prisma.ServedAppointmentWhereUniqueInput[];
    update?: Prisma.ServedAppointmentUpdateWithWhereUniqueWithoutHospitalInput | Prisma.ServedAppointmentUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.ServedAppointmentUpdateManyWithWhereWithoutHospitalInput | Prisma.ServedAppointmentUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.ServedAppointmentScalarWhereInput | Prisma.ServedAppointmentScalarWhereInput[];
};
export type ServedAppointmentCreateWithoutHospitalInput = {
    id?: string;
    appointmentId: string;
    doctorId: string;
    doctorName?: string | null;
    patientName: string;
    patientType?: string;
    contactPhone: string;
    appointmentDate: Date | string;
    serial?: number;
    chamberId?: string | null;
    chamberName?: string | null;
    bookingType?: $Enums.BookingType;
    collectionAmount?: number | null;
    paymentAmount?: number | null;
    servedBy: string;
    servedAt?: Date | string;
    createdBy?: string | null;
    createdByName?: string | null;
    createdAt?: Date | string;
};
export type ServedAppointmentUncheckedCreateWithoutHospitalInput = {
    id?: string;
    appointmentId: string;
    doctorId: string;
    doctorName?: string | null;
    patientName: string;
    patientType?: string;
    contactPhone: string;
    appointmentDate: Date | string;
    serial?: number;
    chamberId?: string | null;
    chamberName?: string | null;
    bookingType?: $Enums.BookingType;
    collectionAmount?: number | null;
    paymentAmount?: number | null;
    servedBy: string;
    servedAt?: Date | string;
    createdBy?: string | null;
    createdByName?: string | null;
    createdAt?: Date | string;
};
export type ServedAppointmentCreateOrConnectWithoutHospitalInput = {
    where: Prisma.ServedAppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServedAppointmentCreateWithoutHospitalInput, Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput>;
};
export type ServedAppointmentCreateManyHospitalInputEnvelope = {
    data: Prisma.ServedAppointmentCreateManyHospitalInput | Prisma.ServedAppointmentCreateManyHospitalInput[];
    skipDuplicates?: boolean;
};
export type ServedAppointmentUpsertWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.ServedAppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ServedAppointmentUpdateWithoutHospitalInput, Prisma.ServedAppointmentUncheckedUpdateWithoutHospitalInput>;
    create: Prisma.XOR<Prisma.ServedAppointmentCreateWithoutHospitalInput, Prisma.ServedAppointmentUncheckedCreateWithoutHospitalInput>;
};
export type ServedAppointmentUpdateWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.ServedAppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ServedAppointmentUpdateWithoutHospitalInput, Prisma.ServedAppointmentUncheckedUpdateWithoutHospitalInput>;
};
export type ServedAppointmentUpdateManyWithWhereWithoutHospitalInput = {
    where: Prisma.ServedAppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.ServedAppointmentUpdateManyMutationInput, Prisma.ServedAppointmentUncheckedUpdateManyWithoutHospitalInput>;
};
export type ServedAppointmentScalarWhereInput = {
    AND?: Prisma.ServedAppointmentScalarWhereInput | Prisma.ServedAppointmentScalarWhereInput[];
    OR?: Prisma.ServedAppointmentScalarWhereInput[];
    NOT?: Prisma.ServedAppointmentScalarWhereInput | Prisma.ServedAppointmentScalarWhereInput[];
    id?: Prisma.StringFilter<"ServedAppointment"> | string;
    appointmentId?: Prisma.StringFilter<"ServedAppointment"> | string;
    doctorId?: Prisma.StringFilter<"ServedAppointment"> | string;
    doctorName?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    patientName?: Prisma.StringFilter<"ServedAppointment"> | string;
    patientType?: Prisma.StringFilter<"ServedAppointment"> | string;
    contactPhone?: Prisma.StringFilter<"ServedAppointment"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"ServedAppointment"> | Date | string;
    serial?: Prisma.IntFilter<"ServedAppointment"> | number;
    chamberId?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    bookingType?: Prisma.EnumBookingTypeFilter<"ServedAppointment"> | $Enums.BookingType;
    collectionAmount?: Prisma.FloatNullableFilter<"ServedAppointment"> | number | null;
    paymentAmount?: Prisma.FloatNullableFilter<"ServedAppointment"> | number | null;
    servedBy?: Prisma.StringFilter<"ServedAppointment"> | string;
    servedAt?: Prisma.DateTimeFilter<"ServedAppointment"> | Date | string;
    createdBy?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    createdByName?: Prisma.StringNullableFilter<"ServedAppointment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ServedAppointment"> | Date | string;
};
export type ServedAppointmentCreateManyHospitalInput = {
    id?: string;
    appointmentId: string;
    doctorId: string;
    doctorName?: string | null;
    patientName: string;
    patientType?: string;
    contactPhone: string;
    appointmentDate: Date | string;
    serial?: number;
    chamberId?: string | null;
    chamberName?: string | null;
    bookingType?: $Enums.BookingType;
    collectionAmount?: number | null;
    paymentAmount?: number | null;
    servedBy: string;
    servedAt?: Date | string;
    createdBy?: string | null;
    createdByName?: string | null;
    createdAt?: Date | string;
};
export type ServedAppointmentUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    servedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServedAppointmentUncheckedUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    servedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServedAppointmentUncheckedUpdateManyWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorId?: Prisma.StringFieldUpdateOperationsInput | string;
    doctorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patientName?: Prisma.StringFieldUpdateOperationsInput | string;
    patientType?: Prisma.StringFieldUpdateOperationsInput | string;
    contactPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    appointmentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    chamberId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chamberName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    servedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    servedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServedAppointmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    appointmentId?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    hospitalId?: boolean;
    patientName?: boolean;
    patientType?: boolean;
    contactPhone?: boolean;
    appointmentDate?: boolean;
    serial?: boolean;
    chamberId?: boolean;
    chamberName?: boolean;
    bookingType?: boolean;
    collectionAmount?: boolean;
    paymentAmount?: boolean;
    servedBy?: boolean;
    servedAt?: boolean;
    createdBy?: boolean;
    createdByName?: boolean;
    createdAt?: boolean;
    hospital?: boolean | Prisma.ServedAppointment$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["servedAppointment"]>;
export type ServedAppointmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    appointmentId?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    hospitalId?: boolean;
    patientName?: boolean;
    patientType?: boolean;
    contactPhone?: boolean;
    appointmentDate?: boolean;
    serial?: boolean;
    chamberId?: boolean;
    chamberName?: boolean;
    bookingType?: boolean;
    collectionAmount?: boolean;
    paymentAmount?: boolean;
    servedBy?: boolean;
    servedAt?: boolean;
    createdBy?: boolean;
    createdByName?: boolean;
    createdAt?: boolean;
    hospital?: boolean | Prisma.ServedAppointment$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["servedAppointment"]>;
export type ServedAppointmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    appointmentId?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    hospitalId?: boolean;
    patientName?: boolean;
    patientType?: boolean;
    contactPhone?: boolean;
    appointmentDate?: boolean;
    serial?: boolean;
    chamberId?: boolean;
    chamberName?: boolean;
    bookingType?: boolean;
    collectionAmount?: boolean;
    paymentAmount?: boolean;
    servedBy?: boolean;
    servedAt?: boolean;
    createdBy?: boolean;
    createdByName?: boolean;
    createdAt?: boolean;
    hospital?: boolean | Prisma.ServedAppointment$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["servedAppointment"]>;
export type ServedAppointmentSelectScalar = {
    id?: boolean;
    appointmentId?: boolean;
    doctorId?: boolean;
    doctorName?: boolean;
    hospitalId?: boolean;
    patientName?: boolean;
    patientType?: boolean;
    contactPhone?: boolean;
    appointmentDate?: boolean;
    serial?: boolean;
    chamberId?: boolean;
    chamberName?: boolean;
    bookingType?: boolean;
    collectionAmount?: boolean;
    paymentAmount?: boolean;
    servedBy?: boolean;
    servedAt?: boolean;
    createdBy?: boolean;
    createdByName?: boolean;
    createdAt?: boolean;
};
export type ServedAppointmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "appointmentId" | "doctorId" | "doctorName" | "hospitalId" | "patientName" | "patientType" | "contactPhone" | "appointmentDate" | "serial" | "chamberId" | "chamberName" | "bookingType" | "collectionAmount" | "paymentAmount" | "servedBy" | "servedAt" | "createdBy" | "createdByName" | "createdAt", ExtArgs["result"]["servedAppointment"]>;
export type ServedAppointmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hospital?: boolean | Prisma.ServedAppointment$hospitalArgs<ExtArgs>;
};
export type ServedAppointmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hospital?: boolean | Prisma.ServedAppointment$hospitalArgs<ExtArgs>;
};
export type ServedAppointmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hospital?: boolean | Prisma.ServedAppointment$hospitalArgs<ExtArgs>;
};
export type $ServedAppointmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ServedAppointment";
    objects: {
        hospital: Prisma.$HospitalPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        appointmentId: string;
        doctorId: string;
        doctorName: string | null;
        hospitalId: string | null;
        patientName: string;
        patientType: string;
        contactPhone: string;
        appointmentDate: Date;
        serial: number;
        chamberId: string | null;
        chamberName: string | null;
        bookingType: $Enums.BookingType;
        collectionAmount: number | null;
        paymentAmount: number | null;
        servedBy: string;
        servedAt: Date;
        createdBy: string | null;
        createdByName: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["servedAppointment"]>;
    composites: {};
};
export type ServedAppointmentGetPayload<S extends boolean | null | undefined | ServedAppointmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload, S>;
export type ServedAppointmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ServedAppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ServedAppointmentCountAggregateInputType | true;
};
export interface ServedAppointmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ServedAppointment'];
        meta: {
            name: 'ServedAppointment';
        };
    };
    /**
     * Find zero or one ServedAppointment that matches the filter.
     * @param {ServedAppointmentFindUniqueArgs} args - Arguments to find a ServedAppointment
     * @example
     * // Get one ServedAppointment
     * const servedAppointment = await prisma.servedAppointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServedAppointmentFindUniqueArgs>(args: Prisma.SelectSubset<T, ServedAppointmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ServedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ServedAppointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServedAppointmentFindUniqueOrThrowArgs} args - Arguments to find a ServedAppointment
     * @example
     * // Get one ServedAppointment
     * const servedAppointment = await prisma.servedAppointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServedAppointmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ServedAppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ServedAppointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServedAppointmentFindFirstArgs} args - Arguments to find a ServedAppointment
     * @example
     * // Get one ServedAppointment
     * const servedAppointment = await prisma.servedAppointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServedAppointmentFindFirstArgs>(args?: Prisma.SelectSubset<T, ServedAppointmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__ServedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ServedAppointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServedAppointmentFindFirstOrThrowArgs} args - Arguments to find a ServedAppointment
     * @example
     * // Get one ServedAppointment
     * const servedAppointment = await prisma.servedAppointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServedAppointmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ServedAppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ServedAppointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServedAppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServedAppointments
     * const servedAppointments = await prisma.servedAppointment.findMany()
     *
     * // Get first 10 ServedAppointments
     * const servedAppointments = await prisma.servedAppointment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const servedAppointmentWithIdOnly = await prisma.servedAppointment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ServedAppointmentFindManyArgs>(args?: Prisma.SelectSubset<T, ServedAppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ServedAppointment.
     * @param {ServedAppointmentCreateArgs} args - Arguments to create a ServedAppointment.
     * @example
     * // Create one ServedAppointment
     * const ServedAppointment = await prisma.servedAppointment.create({
     *   data: {
     *     // ... data to create a ServedAppointment
     *   }
     * })
     *
     */
    create<T extends ServedAppointmentCreateArgs>(args: Prisma.SelectSubset<T, ServedAppointmentCreateArgs<ExtArgs>>): Prisma.Prisma__ServedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ServedAppointments.
     * @param {ServedAppointmentCreateManyArgs} args - Arguments to create many ServedAppointments.
     * @example
     * // Create many ServedAppointments
     * const servedAppointment = await prisma.servedAppointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ServedAppointmentCreateManyArgs>(args?: Prisma.SelectSubset<T, ServedAppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ServedAppointments and returns the data saved in the database.
     * @param {ServedAppointmentCreateManyAndReturnArgs} args - Arguments to create many ServedAppointments.
     * @example
     * // Create many ServedAppointments
     * const servedAppointment = await prisma.servedAppointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ServedAppointments and only return the `id`
     * const servedAppointmentWithIdOnly = await prisma.servedAppointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ServedAppointmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ServedAppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ServedAppointment.
     * @param {ServedAppointmentDeleteArgs} args - Arguments to delete one ServedAppointment.
     * @example
     * // Delete one ServedAppointment
     * const ServedAppointment = await prisma.servedAppointment.delete({
     *   where: {
     *     // ... filter to delete one ServedAppointment
     *   }
     * })
     *
     */
    delete<T extends ServedAppointmentDeleteArgs>(args: Prisma.SelectSubset<T, ServedAppointmentDeleteArgs<ExtArgs>>): Prisma.Prisma__ServedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ServedAppointment.
     * @param {ServedAppointmentUpdateArgs} args - Arguments to update one ServedAppointment.
     * @example
     * // Update one ServedAppointment
     * const servedAppointment = await prisma.servedAppointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ServedAppointmentUpdateArgs>(args: Prisma.SelectSubset<T, ServedAppointmentUpdateArgs<ExtArgs>>): Prisma.Prisma__ServedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ServedAppointments.
     * @param {ServedAppointmentDeleteManyArgs} args - Arguments to filter ServedAppointments to delete.
     * @example
     * // Delete a few ServedAppointments
     * const { count } = await prisma.servedAppointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ServedAppointmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, ServedAppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ServedAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServedAppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServedAppointments
     * const servedAppointment = await prisma.servedAppointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ServedAppointmentUpdateManyArgs>(args: Prisma.SelectSubset<T, ServedAppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ServedAppointments and returns the data updated in the database.
     * @param {ServedAppointmentUpdateManyAndReturnArgs} args - Arguments to update many ServedAppointments.
     * @example
     * // Update many ServedAppointments
     * const servedAppointment = await prisma.servedAppointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ServedAppointments and only return the `id`
     * const servedAppointmentWithIdOnly = await prisma.servedAppointment.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServedAppointmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ServedAppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ServedAppointment.
     * @param {ServedAppointmentUpsertArgs} args - Arguments to update or create a ServedAppointment.
     * @example
     * // Update or create a ServedAppointment
     * const servedAppointment = await prisma.servedAppointment.upsert({
     *   create: {
     *     // ... data to create a ServedAppointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServedAppointment we want to update
     *   }
     * })
     */
    upsert<T extends ServedAppointmentUpsertArgs>(args: Prisma.SelectSubset<T, ServedAppointmentUpsertArgs<ExtArgs>>): Prisma.Prisma__ServedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ServedAppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ServedAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServedAppointmentCountArgs} args - Arguments to filter ServedAppointments to count.
     * @example
     * // Count the number of ServedAppointments
     * const count = await prisma.servedAppointment.count({
     *   where: {
     *     // ... the filter for the ServedAppointments we want to count
     *   }
     * })
    **/
    count<T extends ServedAppointmentCountArgs>(args?: Prisma.Subset<T, ServedAppointmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ServedAppointmentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ServedAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServedAppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServedAppointmentAggregateArgs>(args: Prisma.Subset<T, ServedAppointmentAggregateArgs>): Prisma.PrismaPromise<GetServedAppointmentAggregateType<T>>;
    /**
     * Group by ServedAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServedAppointmentGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ServedAppointmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ServedAppointmentGroupByArgs['orderBy'];
    } : {
        orderBy?: ServedAppointmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ServedAppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServedAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ServedAppointment model
     */
    readonly fields: ServedAppointmentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ServedAppointment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ServedAppointmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    hospital<T extends Prisma.ServedAppointment$hospitalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServedAppointment$hospitalArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ServedAppointment model
 */
export interface ServedAppointmentFieldRefs {
    readonly id: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly appointmentId: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly doctorId: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly doctorName: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly hospitalId: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly patientName: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly patientType: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly contactPhone: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly appointmentDate: Prisma.FieldRef<"ServedAppointment", 'DateTime'>;
    readonly serial: Prisma.FieldRef<"ServedAppointment", 'Int'>;
    readonly chamberId: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly chamberName: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly bookingType: Prisma.FieldRef<"ServedAppointment", 'BookingType'>;
    readonly collectionAmount: Prisma.FieldRef<"ServedAppointment", 'Float'>;
    readonly paymentAmount: Prisma.FieldRef<"ServedAppointment", 'Float'>;
    readonly servedBy: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly servedAt: Prisma.FieldRef<"ServedAppointment", 'DateTime'>;
    readonly createdBy: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly createdByName: Prisma.FieldRef<"ServedAppointment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ServedAppointment", 'DateTime'>;
}
/**
 * ServedAppointment findUnique
 */
export type ServedAppointmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ServedAppointment to fetch.
     */
    where: Prisma.ServedAppointmentWhereUniqueInput;
};
/**
 * ServedAppointment findUniqueOrThrow
 */
export type ServedAppointmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ServedAppointment to fetch.
     */
    where: Prisma.ServedAppointmentWhereUniqueInput;
};
/**
 * ServedAppointment findFirst
 */
export type ServedAppointmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ServedAppointment to fetch.
     */
    where?: Prisma.ServedAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ServedAppointments to fetch.
     */
    orderBy?: Prisma.ServedAppointmentOrderByWithRelationInput | Prisma.ServedAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ServedAppointments.
     */
    cursor?: Prisma.ServedAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ServedAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ServedAppointments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ServedAppointments.
     */
    distinct?: Prisma.ServedAppointmentScalarFieldEnum | Prisma.ServedAppointmentScalarFieldEnum[];
};
/**
 * ServedAppointment findFirstOrThrow
 */
export type ServedAppointmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ServedAppointment to fetch.
     */
    where?: Prisma.ServedAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ServedAppointments to fetch.
     */
    orderBy?: Prisma.ServedAppointmentOrderByWithRelationInput | Prisma.ServedAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ServedAppointments.
     */
    cursor?: Prisma.ServedAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ServedAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ServedAppointments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ServedAppointments.
     */
    distinct?: Prisma.ServedAppointmentScalarFieldEnum | Prisma.ServedAppointmentScalarFieldEnum[];
};
/**
 * ServedAppointment findMany
 */
export type ServedAppointmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ServedAppointments to fetch.
     */
    where?: Prisma.ServedAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ServedAppointments to fetch.
     */
    orderBy?: Prisma.ServedAppointmentOrderByWithRelationInput | Prisma.ServedAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ServedAppointments.
     */
    cursor?: Prisma.ServedAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ServedAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ServedAppointments.
     */
    skip?: number;
    distinct?: Prisma.ServedAppointmentScalarFieldEnum | Prisma.ServedAppointmentScalarFieldEnum[];
};
/**
 * ServedAppointment create
 */
export type ServedAppointmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a ServedAppointment.
     */
    data: Prisma.XOR<Prisma.ServedAppointmentCreateInput, Prisma.ServedAppointmentUncheckedCreateInput>;
};
/**
 * ServedAppointment createMany
 */
export type ServedAppointmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServedAppointments.
     */
    data: Prisma.ServedAppointmentCreateManyInput | Prisma.ServedAppointmentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ServedAppointment createManyAndReturn
 */
export type ServedAppointmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServedAppointment
     */
    select?: Prisma.ServedAppointmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ServedAppointment
     */
    omit?: Prisma.ServedAppointmentOmit<ExtArgs> | null;
    /**
     * The data used to create many ServedAppointments.
     */
    data: Prisma.ServedAppointmentCreateManyInput | Prisma.ServedAppointmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ServedAppointmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ServedAppointment update
 */
export type ServedAppointmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a ServedAppointment.
     */
    data: Prisma.XOR<Prisma.ServedAppointmentUpdateInput, Prisma.ServedAppointmentUncheckedUpdateInput>;
    /**
     * Choose, which ServedAppointment to update.
     */
    where: Prisma.ServedAppointmentWhereUniqueInput;
};
/**
 * ServedAppointment updateMany
 */
export type ServedAppointmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ServedAppointments.
     */
    data: Prisma.XOR<Prisma.ServedAppointmentUpdateManyMutationInput, Prisma.ServedAppointmentUncheckedUpdateManyInput>;
    /**
     * Filter which ServedAppointments to update
     */
    where?: Prisma.ServedAppointmentWhereInput;
    /**
     * Limit how many ServedAppointments to update.
     */
    limit?: number;
};
/**
 * ServedAppointment updateManyAndReturn
 */
export type ServedAppointmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServedAppointment
     */
    select?: Prisma.ServedAppointmentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ServedAppointment
     */
    omit?: Prisma.ServedAppointmentOmit<ExtArgs> | null;
    /**
     * The data used to update ServedAppointments.
     */
    data: Prisma.XOR<Prisma.ServedAppointmentUpdateManyMutationInput, Prisma.ServedAppointmentUncheckedUpdateManyInput>;
    /**
     * Filter which ServedAppointments to update
     */
    where?: Prisma.ServedAppointmentWhereInput;
    /**
     * Limit how many ServedAppointments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ServedAppointmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ServedAppointment upsert
 */
export type ServedAppointmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the ServedAppointment to update in case it exists.
     */
    where: Prisma.ServedAppointmentWhereUniqueInput;
    /**
     * In case the ServedAppointment found by the `where` argument doesn't exist, create a new ServedAppointment with this data.
     */
    create: Prisma.XOR<Prisma.ServedAppointmentCreateInput, Prisma.ServedAppointmentUncheckedCreateInput>;
    /**
     * In case the ServedAppointment was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ServedAppointmentUpdateInput, Prisma.ServedAppointmentUncheckedUpdateInput>;
};
/**
 * ServedAppointment delete
 */
export type ServedAppointmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which ServedAppointment to delete.
     */
    where: Prisma.ServedAppointmentWhereUniqueInput;
};
/**
 * ServedAppointment deleteMany
 */
export type ServedAppointmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ServedAppointments to delete
     */
    where?: Prisma.ServedAppointmentWhereInput;
    /**
     * Limit how many ServedAppointments to delete.
     */
    limit?: number;
};
/**
 * ServedAppointment.hospital
 */
export type ServedAppointment$hospitalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * ServedAppointment without action
 */
export type ServedAppointmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=ServedAppointment.d.ts.map