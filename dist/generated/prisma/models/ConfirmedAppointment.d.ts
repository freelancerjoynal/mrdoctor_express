import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ConfirmedAppointment
 *
 */
export type ConfirmedAppointmentModel = runtime.Types.Result.DefaultSelection<Prisma.$ConfirmedAppointmentPayload>;
export type AggregateConfirmedAppointment = {
    _count: ConfirmedAppointmentCountAggregateOutputType | null;
    _avg: ConfirmedAppointmentAvgAggregateOutputType | null;
    _sum: ConfirmedAppointmentSumAggregateOutputType | null;
    _min: ConfirmedAppointmentMinAggregateOutputType | null;
    _max: ConfirmedAppointmentMaxAggregateOutputType | null;
};
export type ConfirmedAppointmentAvgAggregateOutputType = {
    patientAge: number | null;
    patientWeight: number | null;
    serial: number | null;
    collectionAmount: number | null;
    paymentAmount: number | null;
};
export type ConfirmedAppointmentSumAggregateOutputType = {
    patientAge: number | null;
    patientWeight: number | null;
    serial: number | null;
    collectionAmount: number | null;
    paymentAmount: number | null;
};
export type ConfirmedAppointmentMinAggregateOutputType = {
    id: string | null;
    pendingAppointmentId: string | null;
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
    createdBy: string | null;
    createdByName: string | null;
    bookingType: $Enums.BookingType | null;
    serial: number | null;
    collectionAmount: number | null;
    transactionId: string | null;
    orderId: string | null;
    paymentUserId: string | null;
    paymentAmount: number | null;
    currency: string | null;
    paymentStatus: $Enums.PaymentStatus | null;
    paymentMethod: string | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConfirmedAppointmentMaxAggregateOutputType = {
    id: string | null;
    pendingAppointmentId: string | null;
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
    createdBy: string | null;
    createdByName: string | null;
    bookingType: $Enums.BookingType | null;
    serial: number | null;
    collectionAmount: number | null;
    transactionId: string | null;
    orderId: string | null;
    paymentUserId: string | null;
    paymentAmount: number | null;
    currency: string | null;
    paymentStatus: $Enums.PaymentStatus | null;
    paymentMethod: string | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConfirmedAppointmentCountAggregateOutputType = {
    id: number;
    pendingAppointmentId: number;
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
    createdBy: number;
    createdByName: number;
    bookingType: number;
    serial: number;
    collectionAmount: number;
    transactionId: number;
    orderId: number;
    paymentUserId: number;
    paymentAmount: number;
    currency: number;
    paymentStatus: number;
    paymentMethod: number;
    gatewayResponse: number;
    paidAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ConfirmedAppointmentAvgAggregateInputType = {
    patientAge?: true;
    patientWeight?: true;
    serial?: true;
    collectionAmount?: true;
    paymentAmount?: true;
};
export type ConfirmedAppointmentSumAggregateInputType = {
    patientAge?: true;
    patientWeight?: true;
    serial?: true;
    collectionAmount?: true;
    paymentAmount?: true;
};
export type ConfirmedAppointmentMinAggregateInputType = {
    id?: true;
    pendingAppointmentId?: true;
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
    createdBy?: true;
    createdByName?: true;
    bookingType?: true;
    serial?: true;
    collectionAmount?: true;
    transactionId?: true;
    orderId?: true;
    paymentUserId?: true;
    paymentAmount?: true;
    currency?: true;
    paymentStatus?: true;
    paymentMethod?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConfirmedAppointmentMaxAggregateInputType = {
    id?: true;
    pendingAppointmentId?: true;
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
    createdBy?: true;
    createdByName?: true;
    bookingType?: true;
    serial?: true;
    collectionAmount?: true;
    transactionId?: true;
    orderId?: true;
    paymentUserId?: true;
    paymentAmount?: true;
    currency?: true;
    paymentStatus?: true;
    paymentMethod?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConfirmedAppointmentCountAggregateInputType = {
    id?: true;
    pendingAppointmentId?: true;
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
    createdBy?: true;
    createdByName?: true;
    bookingType?: true;
    serial?: true;
    collectionAmount?: true;
    transactionId?: true;
    orderId?: true;
    paymentUserId?: true;
    paymentAmount?: true;
    currency?: true;
    paymentStatus?: true;
    paymentMethod?: true;
    gatewayResponse?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ConfirmedAppointmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ConfirmedAppointment to aggregate.
     */
    where?: Prisma.ConfirmedAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConfirmedAppointments to fetch.
     */
    orderBy?: Prisma.ConfirmedAppointmentOrderByWithRelationInput | Prisma.ConfirmedAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ConfirmedAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConfirmedAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConfirmedAppointments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ConfirmedAppointments
    **/
    _count?: true | ConfirmedAppointmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ConfirmedAppointmentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ConfirmedAppointmentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ConfirmedAppointmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ConfirmedAppointmentMaxAggregateInputType;
};
export type GetConfirmedAppointmentAggregateType<T extends ConfirmedAppointmentAggregateArgs> = {
    [P in keyof T & keyof AggregateConfirmedAppointment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConfirmedAppointment[P]> : Prisma.GetScalarType<T[P], AggregateConfirmedAppointment[P]>;
};
export type ConfirmedAppointmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConfirmedAppointmentWhereInput;
    orderBy?: Prisma.ConfirmedAppointmentOrderByWithAggregationInput | Prisma.ConfirmedAppointmentOrderByWithAggregationInput[];
    by: Prisma.ConfirmedAppointmentScalarFieldEnum[] | Prisma.ConfirmedAppointmentScalarFieldEnum;
    having?: Prisma.ConfirmedAppointmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConfirmedAppointmentCountAggregateInputType | true;
    _avg?: ConfirmedAppointmentAvgAggregateInputType;
    _sum?: ConfirmedAppointmentSumAggregateInputType;
    _min?: ConfirmedAppointmentMinAggregateInputType;
    _max?: ConfirmedAppointmentMaxAggregateInputType;
};
export type ConfirmedAppointmentGroupByOutputType = {
    id: string;
    pendingAppointmentId: string | null;
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
    createdBy: string | null;
    createdByName: string | null;
    bookingType: $Enums.BookingType;
    serial: number;
    collectionAmount: number | null;
    transactionId: string | null;
    orderId: string | null;
    paymentUserId: string | null;
    paymentAmount: number | null;
    currency: string;
    paymentStatus: $Enums.PaymentStatus | null;
    paymentMethod: string | null;
    gatewayResponse: runtime.JsonValue | null;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ConfirmedAppointmentCountAggregateOutputType | null;
    _avg: ConfirmedAppointmentAvgAggregateOutputType | null;
    _sum: ConfirmedAppointmentSumAggregateOutputType | null;
    _min: ConfirmedAppointmentMinAggregateOutputType | null;
    _max: ConfirmedAppointmentMaxAggregateOutputType | null;
};
type GetConfirmedAppointmentGroupByPayload<T extends ConfirmedAppointmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConfirmedAppointmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConfirmedAppointmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConfirmedAppointmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConfirmedAppointmentGroupByOutputType[P]>;
}>>;
export type ConfirmedAppointmentWhereInput = {
    AND?: Prisma.ConfirmedAppointmentWhereInput | Prisma.ConfirmedAppointmentWhereInput[];
    OR?: Prisma.ConfirmedAppointmentWhereInput[];
    NOT?: Prisma.ConfirmedAppointmentWhereInput | Prisma.ConfirmedAppointmentWhereInput[];
    id?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    pendingAppointmentId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    phoneNumber?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    doctorId?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    doctorName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    hospitalName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    problem?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"ConfirmedAppointment"> | Date | string;
    dayLabel?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    chamberId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    patientName?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    patientType?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    patientAge?: Prisma.IntNullableFilter<"ConfirmedAppointment"> | number | null;
    patientWeight?: Prisma.FloatNullableFilter<"ConfirmedAppointment"> | number | null;
    patientArea?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    contactPhone?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    source?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    status?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    createdBy?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    createdByName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    bookingType?: Prisma.EnumBookingTypeFilter<"ConfirmedAppointment"> | $Enums.BookingType;
    serial?: Prisma.IntFilter<"ConfirmedAppointment"> | number;
    collectionAmount?: Prisma.FloatNullableFilter<"ConfirmedAppointment"> | number | null;
    transactionId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    orderId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    paymentUserId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    paymentAmount?: Prisma.FloatNullableFilter<"ConfirmedAppointment"> | number | null;
    currency?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    paymentStatus?: Prisma.EnumPaymentStatusNullableFilter<"ConfirmedAppointment"> | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    gatewayResponse?: Prisma.JsonNullableFilter<"ConfirmedAppointment">;
    paidAt?: Prisma.DateTimeNullableFilter<"ConfirmedAppointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ConfirmedAppointment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ConfirmedAppointment"> | Date | string;
    pendingAppointment?: Prisma.XOR<Prisma.PendingAppointmentNullableScalarRelationFilter, Prisma.PendingAppointmentWhereInput> | null;
    doctor?: Prisma.XOR<Prisma.DoctorScalarRelationFilter, Prisma.DoctorWhereInput>;
    hospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
};
export type ConfirmedAppointmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    pendingAppointmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
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
    createdBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdByName?: Prisma.SortOrderInput | Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    transactionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrderInput | Prisma.SortOrder;
    gatewayResponse?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pendingAppointment?: Prisma.PendingAppointmentOrderByWithRelationInput;
    doctor?: Prisma.DoctorOrderByWithRelationInput;
    hospital?: Prisma.HospitalOrderByWithRelationInput;
};
export type ConfirmedAppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    transactionId?: string;
    orderId?: string;
    doctorId_appointmentDate_serial?: Prisma.ConfirmedAppointmentDoctorIdAppointmentDateSerialCompoundUniqueInput;
    AND?: Prisma.ConfirmedAppointmentWhereInput | Prisma.ConfirmedAppointmentWhereInput[];
    OR?: Prisma.ConfirmedAppointmentWhereInput[];
    NOT?: Prisma.ConfirmedAppointmentWhereInput | Prisma.ConfirmedAppointmentWhereInput[];
    pendingAppointmentId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    phoneNumber?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    doctorId?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    doctorName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    hospitalName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    problem?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"ConfirmedAppointment"> | Date | string;
    dayLabel?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    chamberId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    patientName?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    patientType?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    patientAge?: Prisma.IntNullableFilter<"ConfirmedAppointment"> | number | null;
    patientWeight?: Prisma.FloatNullableFilter<"ConfirmedAppointment"> | number | null;
    patientArea?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    contactPhone?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    source?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    status?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    createdBy?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    createdByName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    bookingType?: Prisma.EnumBookingTypeFilter<"ConfirmedAppointment"> | $Enums.BookingType;
    serial?: Prisma.IntFilter<"ConfirmedAppointment"> | number;
    collectionAmount?: Prisma.FloatNullableFilter<"ConfirmedAppointment"> | number | null;
    paymentUserId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    paymentAmount?: Prisma.FloatNullableFilter<"ConfirmedAppointment"> | number | null;
    currency?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    paymentStatus?: Prisma.EnumPaymentStatusNullableFilter<"ConfirmedAppointment"> | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    gatewayResponse?: Prisma.JsonNullableFilter<"ConfirmedAppointment">;
    paidAt?: Prisma.DateTimeNullableFilter<"ConfirmedAppointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ConfirmedAppointment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ConfirmedAppointment"> | Date | string;
    pendingAppointment?: Prisma.XOR<Prisma.PendingAppointmentNullableScalarRelationFilter, Prisma.PendingAppointmentWhereInput> | null;
    doctor?: Prisma.XOR<Prisma.DoctorScalarRelationFilter, Prisma.DoctorWhereInput>;
    hospital?: Prisma.XOR<Prisma.HospitalNullableScalarRelationFilter, Prisma.HospitalWhereInput> | null;
}, "id" | "transactionId" | "orderId" | "doctorId_appointmentDate_serial">;
export type ConfirmedAppointmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    pendingAppointmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
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
    createdBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdByName?: Prisma.SortOrderInput | Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    transactionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrderInput | Prisma.SortOrder;
    gatewayResponse?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ConfirmedAppointmentCountOrderByAggregateInput;
    _avg?: Prisma.ConfirmedAppointmentAvgOrderByAggregateInput;
    _max?: Prisma.ConfirmedAppointmentMaxOrderByAggregateInput;
    _min?: Prisma.ConfirmedAppointmentMinOrderByAggregateInput;
    _sum?: Prisma.ConfirmedAppointmentSumOrderByAggregateInput;
};
export type ConfirmedAppointmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConfirmedAppointmentScalarWhereWithAggregatesInput | Prisma.ConfirmedAppointmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConfirmedAppointmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConfirmedAppointmentScalarWhereWithAggregatesInput | Prisma.ConfirmedAppointmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    pendingAppointmentId?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    phoneNumber?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    doctorId?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    doctorName?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    hospitalName?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    problem?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    appointmentDate?: Prisma.DateTimeWithAggregatesFilter<"ConfirmedAppointment"> | Date | string;
    dayLabel?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    chamberId?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    chamberName?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    patientName?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    patientType?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    patientAge?: Prisma.IntNullableWithAggregatesFilter<"ConfirmedAppointment"> | number | null;
    patientWeight?: Prisma.FloatNullableWithAggregatesFilter<"ConfirmedAppointment"> | number | null;
    patientArea?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    contactPhone?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    source?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    status?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    createdBy?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    createdByName?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    bookingType?: Prisma.EnumBookingTypeWithAggregatesFilter<"ConfirmedAppointment"> | $Enums.BookingType;
    serial?: Prisma.IntWithAggregatesFilter<"ConfirmedAppointment"> | number;
    collectionAmount?: Prisma.FloatNullableWithAggregatesFilter<"ConfirmedAppointment"> | number | null;
    transactionId?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    orderId?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    paymentUserId?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    paymentAmount?: Prisma.FloatNullableWithAggregatesFilter<"ConfirmedAppointment"> | number | null;
    currency?: Prisma.StringWithAggregatesFilter<"ConfirmedAppointment"> | string;
    paymentStatus?: Prisma.EnumPaymentStatusNullableWithAggregatesFilter<"ConfirmedAppointment"> | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.StringNullableWithAggregatesFilter<"ConfirmedAppointment"> | string | null;
    gatewayResponse?: Prisma.JsonNullableWithAggregatesFilter<"ConfirmedAppointment">;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ConfirmedAppointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ConfirmedAppointment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ConfirmedAppointment"> | Date | string;
};
export type ConfirmedAppointmentCreateInput = {
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pendingAppointment?: Prisma.PendingAppointmentCreateNestedOneWithoutConfirmedAppointmentsInput;
    doctor: Prisma.DoctorCreateNestedOneWithoutConfirmedAppointmentsInput;
    hospital?: Prisma.HospitalCreateNestedOneWithoutConfirmedAppointmentsInput;
};
export type ConfirmedAppointmentUncheckedCreateInput = {
    id?: string;
    pendingAppointmentId?: string | null;
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConfirmedAppointmentUpdateInput = {
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pendingAppointment?: Prisma.PendingAppointmentUpdateOneWithoutConfirmedAppointmentsNestedInput;
    doctor?: Prisma.DoctorUpdateOneRequiredWithoutConfirmedAppointmentsNestedInput;
    hospital?: Prisma.HospitalUpdateOneWithoutConfirmedAppointmentsNestedInput;
};
export type ConfirmedAppointmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingAppointmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConfirmedAppointmentCreateManyInput = {
    id?: string;
    pendingAppointmentId?: string | null;
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConfirmedAppointmentUpdateManyMutationInput = {
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConfirmedAppointmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingAppointmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConfirmedAppointmentListRelationFilter = {
    every?: Prisma.ConfirmedAppointmentWhereInput;
    some?: Prisma.ConfirmedAppointmentWhereInput;
    none?: Prisma.ConfirmedAppointmentWhereInput;
};
export type ConfirmedAppointmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConfirmedAppointmentDoctorIdAppointmentDateSerialCompoundUniqueInput = {
    doctorId: string;
    appointmentDate: Date | string;
    serial: number;
};
export type ConfirmedAppointmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pendingAppointmentId?: Prisma.SortOrder;
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
    createdBy?: Prisma.SortOrder;
    createdByName?: Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    paymentUserId?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    gatewayResponse?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConfirmedAppointmentAvgOrderByAggregateInput = {
    patientAge?: Prisma.SortOrder;
    patientWeight?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
};
export type ConfirmedAppointmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pendingAppointmentId?: Prisma.SortOrder;
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
    createdBy?: Prisma.SortOrder;
    createdByName?: Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    paymentUserId?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConfirmedAppointmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pendingAppointmentId?: Prisma.SortOrder;
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
    createdBy?: Prisma.SortOrder;
    createdByName?: Prisma.SortOrder;
    bookingType?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    paymentUserId?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConfirmedAppointmentSumOrderByAggregateInput = {
    patientAge?: Prisma.SortOrder;
    patientWeight?: Prisma.SortOrder;
    serial?: Prisma.SortOrder;
    collectionAmount?: Prisma.SortOrder;
    paymentAmount?: Prisma.SortOrder;
};
export type ConfirmedAppointmentCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutDoctorInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput> | Prisma.ConfirmedAppointmentCreateWithoutDoctorInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutDoctorInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyDoctorInputEnvelope;
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
};
export type ConfirmedAppointmentUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutDoctorInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput> | Prisma.ConfirmedAppointmentCreateWithoutDoctorInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutDoctorInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyDoctorInputEnvelope;
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
};
export type ConfirmedAppointmentUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutDoctorInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput> | Prisma.ConfirmedAppointmentCreateWithoutDoctorInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutDoctorInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutDoctorInput | Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyDoctorInputEnvelope;
    set?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    disconnect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    delete?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    update?: Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutDoctorInput | Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutDoctorInput | Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.ConfirmedAppointmentScalarWhereInput | Prisma.ConfirmedAppointmentScalarWhereInput[];
};
export type ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutDoctorInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput> | Prisma.ConfirmedAppointmentCreateWithoutDoctorInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutDoctorInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutDoctorInput | Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyDoctorInputEnvelope;
    set?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    disconnect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    delete?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    update?: Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutDoctorInput | Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutDoctorInput | Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.ConfirmedAppointmentScalarWhereInput | Prisma.ConfirmedAppointmentScalarWhereInput[];
};
export type ConfirmedAppointmentCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutHospitalInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.ConfirmedAppointmentCreateWithoutHospitalInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutHospitalInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyHospitalInputEnvelope;
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
};
export type ConfirmedAppointmentUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutHospitalInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.ConfirmedAppointmentCreateWithoutHospitalInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutHospitalInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutHospitalInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyHospitalInputEnvelope;
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
};
export type ConfirmedAppointmentUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutHospitalInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.ConfirmedAppointmentCreateWithoutHospitalInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutHospitalInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutHospitalInput | Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyHospitalInputEnvelope;
    set?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    disconnect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    delete?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    update?: Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutHospitalInput | Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutHospitalInput | Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.ConfirmedAppointmentScalarWhereInput | Prisma.ConfirmedAppointmentScalarWhereInput[];
};
export type ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutHospitalInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput> | Prisma.ConfirmedAppointmentCreateWithoutHospitalInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutHospitalInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutHospitalInput[];
    upsert?: Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutHospitalInput | Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutHospitalInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyHospitalInputEnvelope;
    set?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    disconnect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    delete?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    update?: Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutHospitalInput | Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutHospitalInput[];
    updateMany?: Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutHospitalInput | Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutHospitalInput[];
    deleteMany?: Prisma.ConfirmedAppointmentScalarWhereInput | Prisma.ConfirmedAppointmentScalarWhereInput[];
};
export type ConfirmedAppointmentCreateNestedManyWithoutPendingAppointmentInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput> | Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutPendingAppointmentInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyPendingAppointmentInputEnvelope;
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
};
export type ConfirmedAppointmentUncheckedCreateNestedManyWithoutPendingAppointmentInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput> | Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutPendingAppointmentInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyPendingAppointmentInputEnvelope;
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
};
export type ConfirmedAppointmentUpdateManyWithoutPendingAppointmentNestedInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput> | Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutPendingAppointmentInput[];
    upsert?: Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutPendingAppointmentInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyPendingAppointmentInputEnvelope;
    set?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    disconnect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    delete?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    update?: Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutPendingAppointmentInput[];
    updateMany?: Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutPendingAppointmentInput[];
    deleteMany?: Prisma.ConfirmedAppointmentScalarWhereInput | Prisma.ConfirmedAppointmentScalarWhereInput[];
};
export type ConfirmedAppointmentUncheckedUpdateManyWithoutPendingAppointmentNestedInput = {
    create?: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput> | Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput[] | Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput[];
    connectOrCreate?: Prisma.ConfirmedAppointmentCreateOrConnectWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentCreateOrConnectWithoutPendingAppointmentInput[];
    upsert?: Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentUpsertWithWhereUniqueWithoutPendingAppointmentInput[];
    createMany?: Prisma.ConfirmedAppointmentCreateManyPendingAppointmentInputEnvelope;
    set?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    disconnect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    delete?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    connect?: Prisma.ConfirmedAppointmentWhereUniqueInput | Prisma.ConfirmedAppointmentWhereUniqueInput[];
    update?: Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentUpdateWithWhereUniqueWithoutPendingAppointmentInput[];
    updateMany?: Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutPendingAppointmentInput | Prisma.ConfirmedAppointmentUpdateManyWithWhereWithoutPendingAppointmentInput[];
    deleteMany?: Prisma.ConfirmedAppointmentScalarWhereInput | Prisma.ConfirmedAppointmentScalarWhereInput[];
};
export type EnumBookingTypeFieldUpdateOperationsInput = {
    set?: $Enums.BookingType;
};
export type NullableEnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus | null;
};
export type ConfirmedAppointmentCreateWithoutDoctorInput = {
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pendingAppointment?: Prisma.PendingAppointmentCreateNestedOneWithoutConfirmedAppointmentsInput;
    hospital?: Prisma.HospitalCreateNestedOneWithoutConfirmedAppointmentsInput;
};
export type ConfirmedAppointmentUncheckedCreateWithoutDoctorInput = {
    id?: string;
    pendingAppointmentId?: string | null;
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConfirmedAppointmentCreateOrConnectWithoutDoctorInput = {
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutDoctorInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput>;
};
export type ConfirmedAppointmentCreateManyDoctorInputEnvelope = {
    data: Prisma.ConfirmedAppointmentCreateManyDoctorInput | Prisma.ConfirmedAppointmentCreateManyDoctorInput[];
    skipDuplicates?: boolean;
};
export type ConfirmedAppointmentUpsertWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateWithoutDoctorInput, Prisma.ConfirmedAppointmentUncheckedUpdateWithoutDoctorInput>;
    create: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutDoctorInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutDoctorInput>;
};
export type ConfirmedAppointmentUpdateWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateWithoutDoctorInput, Prisma.ConfirmedAppointmentUncheckedUpdateWithoutDoctorInput>;
};
export type ConfirmedAppointmentUpdateManyWithWhereWithoutDoctorInput = {
    where: Prisma.ConfirmedAppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateManyMutationInput, Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorInput>;
};
export type ConfirmedAppointmentScalarWhereInput = {
    AND?: Prisma.ConfirmedAppointmentScalarWhereInput | Prisma.ConfirmedAppointmentScalarWhereInput[];
    OR?: Prisma.ConfirmedAppointmentScalarWhereInput[];
    NOT?: Prisma.ConfirmedAppointmentScalarWhereInput | Prisma.ConfirmedAppointmentScalarWhereInput[];
    id?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    pendingAppointmentId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    phoneNumber?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    doctorId?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    doctorName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    hospitalId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    hospitalName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    problem?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    appointmentDate?: Prisma.DateTimeFilter<"ConfirmedAppointment"> | Date | string;
    dayLabel?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    chamberId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    chamberName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    patientName?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    patientType?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    patientAge?: Prisma.IntNullableFilter<"ConfirmedAppointment"> | number | null;
    patientWeight?: Prisma.FloatNullableFilter<"ConfirmedAppointment"> | number | null;
    patientArea?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    contactPhone?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    source?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    status?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    createdBy?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    createdByName?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    bookingType?: Prisma.EnumBookingTypeFilter<"ConfirmedAppointment"> | $Enums.BookingType;
    serial?: Prisma.IntFilter<"ConfirmedAppointment"> | number;
    collectionAmount?: Prisma.FloatNullableFilter<"ConfirmedAppointment"> | number | null;
    transactionId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    orderId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    paymentUserId?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    paymentAmount?: Prisma.FloatNullableFilter<"ConfirmedAppointment"> | number | null;
    currency?: Prisma.StringFilter<"ConfirmedAppointment"> | string;
    paymentStatus?: Prisma.EnumPaymentStatusNullableFilter<"ConfirmedAppointment"> | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.StringNullableFilter<"ConfirmedAppointment"> | string | null;
    gatewayResponse?: Prisma.JsonNullableFilter<"ConfirmedAppointment">;
    paidAt?: Prisma.DateTimeNullableFilter<"ConfirmedAppointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ConfirmedAppointment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ConfirmedAppointment"> | Date | string;
};
export type ConfirmedAppointmentCreateWithoutHospitalInput = {
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pendingAppointment?: Prisma.PendingAppointmentCreateNestedOneWithoutConfirmedAppointmentsInput;
    doctor: Prisma.DoctorCreateNestedOneWithoutConfirmedAppointmentsInput;
};
export type ConfirmedAppointmentUncheckedCreateWithoutHospitalInput = {
    id?: string;
    pendingAppointmentId?: string | null;
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConfirmedAppointmentCreateOrConnectWithoutHospitalInput = {
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutHospitalInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput>;
};
export type ConfirmedAppointmentCreateManyHospitalInputEnvelope = {
    data: Prisma.ConfirmedAppointmentCreateManyHospitalInput | Prisma.ConfirmedAppointmentCreateManyHospitalInput[];
    skipDuplicates?: boolean;
};
export type ConfirmedAppointmentUpsertWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateWithoutHospitalInput, Prisma.ConfirmedAppointmentUncheckedUpdateWithoutHospitalInput>;
    create: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutHospitalInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutHospitalInput>;
};
export type ConfirmedAppointmentUpdateWithWhereUniqueWithoutHospitalInput = {
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateWithoutHospitalInput, Prisma.ConfirmedAppointmentUncheckedUpdateWithoutHospitalInput>;
};
export type ConfirmedAppointmentUpdateManyWithWhereWithoutHospitalInput = {
    where: Prisma.ConfirmedAppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateManyMutationInput, Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalInput>;
};
export type ConfirmedAppointmentCreateWithoutPendingAppointmentInput = {
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    doctor: Prisma.DoctorCreateNestedOneWithoutConfirmedAppointmentsInput;
    hospital?: Prisma.HospitalCreateNestedOneWithoutConfirmedAppointmentsInput;
};
export type ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput = {
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConfirmedAppointmentCreateOrConnectWithoutPendingAppointmentInput = {
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput>;
};
export type ConfirmedAppointmentCreateManyPendingAppointmentInputEnvelope = {
    data: Prisma.ConfirmedAppointmentCreateManyPendingAppointmentInput | Prisma.ConfirmedAppointmentCreateManyPendingAppointmentInput[];
    skipDuplicates?: boolean;
};
export type ConfirmedAppointmentUpsertWithWhereUniqueWithoutPendingAppointmentInput = {
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateWithoutPendingAppointmentInput, Prisma.ConfirmedAppointmentUncheckedUpdateWithoutPendingAppointmentInput>;
    create: Prisma.XOR<Prisma.ConfirmedAppointmentCreateWithoutPendingAppointmentInput, Prisma.ConfirmedAppointmentUncheckedCreateWithoutPendingAppointmentInput>;
};
export type ConfirmedAppointmentUpdateWithWhereUniqueWithoutPendingAppointmentInput = {
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateWithoutPendingAppointmentInput, Prisma.ConfirmedAppointmentUncheckedUpdateWithoutPendingAppointmentInput>;
};
export type ConfirmedAppointmentUpdateManyWithWhereWithoutPendingAppointmentInput = {
    where: Prisma.ConfirmedAppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateManyMutationInput, Prisma.ConfirmedAppointmentUncheckedUpdateManyWithoutPendingAppointmentInput>;
};
export type ConfirmedAppointmentCreateManyDoctorInput = {
    id?: string;
    pendingAppointmentId?: string | null;
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConfirmedAppointmentUpdateWithoutDoctorInput = {
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pendingAppointment?: Prisma.PendingAppointmentUpdateOneWithoutConfirmedAppointmentsNestedInput;
    hospital?: Prisma.HospitalUpdateOneWithoutConfirmedAppointmentsNestedInput;
};
export type ConfirmedAppointmentUncheckedUpdateWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingAppointmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConfirmedAppointmentUncheckedUpdateManyWithoutDoctorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingAppointmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConfirmedAppointmentCreateManyHospitalInput = {
    id?: string;
    pendingAppointmentId?: string | null;
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConfirmedAppointmentUpdateWithoutHospitalInput = {
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pendingAppointment?: Prisma.PendingAppointmentUpdateOneWithoutConfirmedAppointmentsNestedInput;
    doctor?: Prisma.DoctorUpdateOneRequiredWithoutConfirmedAppointmentsNestedInput;
};
export type ConfirmedAppointmentUncheckedUpdateWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingAppointmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConfirmedAppointmentUncheckedUpdateManyWithoutHospitalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingAppointmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConfirmedAppointmentCreateManyPendingAppointmentInput = {
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
    createdBy?: string | null;
    createdByName?: string | null;
    bookingType?: $Enums.BookingType;
    serial?: number;
    collectionAmount?: number | null;
    transactionId?: string | null;
    orderId?: string | null;
    paymentUserId?: string | null;
    paymentAmount?: number | null;
    currency?: string;
    paymentStatus?: $Enums.PaymentStatus | null;
    paymentMethod?: string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConfirmedAppointmentUpdateWithoutPendingAppointmentInput = {
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorUpdateOneRequiredWithoutConfirmedAppointmentsNestedInput;
    hospital?: Prisma.HospitalUpdateOneWithoutConfirmedAppointmentsNestedInput;
};
export type ConfirmedAppointmentUncheckedUpdateWithoutPendingAppointmentInput = {
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConfirmedAppointmentUncheckedUpdateManyWithoutPendingAppointmentInput = {
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
    createdBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdByName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingType?: Prisma.EnumBookingTypeFieldUpdateOperationsInput | $Enums.BookingType;
    serial?: Prisma.IntFieldUpdateOperationsInput | number;
    collectionAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentStatus?: Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus | null;
    paymentMethod?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gatewayResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConfirmedAppointmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pendingAppointmentId?: boolean;
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
    createdBy?: boolean;
    createdByName?: boolean;
    bookingType?: boolean;
    serial?: boolean;
    collectionAmount?: boolean;
    transactionId?: boolean;
    orderId?: boolean;
    paymentUserId?: boolean;
    paymentAmount?: boolean;
    currency?: boolean;
    paymentStatus?: boolean;
    paymentMethod?: boolean;
    gatewayResponse?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pendingAppointment?: boolean | Prisma.ConfirmedAppointment$pendingAppointmentArgs<ExtArgs>;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.ConfirmedAppointment$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["confirmedAppointment"]>;
export type ConfirmedAppointmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pendingAppointmentId?: boolean;
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
    createdBy?: boolean;
    createdByName?: boolean;
    bookingType?: boolean;
    serial?: boolean;
    collectionAmount?: boolean;
    transactionId?: boolean;
    orderId?: boolean;
    paymentUserId?: boolean;
    paymentAmount?: boolean;
    currency?: boolean;
    paymentStatus?: boolean;
    paymentMethod?: boolean;
    gatewayResponse?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pendingAppointment?: boolean | Prisma.ConfirmedAppointment$pendingAppointmentArgs<ExtArgs>;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.ConfirmedAppointment$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["confirmedAppointment"]>;
export type ConfirmedAppointmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pendingAppointmentId?: boolean;
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
    createdBy?: boolean;
    createdByName?: boolean;
    bookingType?: boolean;
    serial?: boolean;
    collectionAmount?: boolean;
    transactionId?: boolean;
    orderId?: boolean;
    paymentUserId?: boolean;
    paymentAmount?: boolean;
    currency?: boolean;
    paymentStatus?: boolean;
    paymentMethod?: boolean;
    gatewayResponse?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pendingAppointment?: boolean | Prisma.ConfirmedAppointment$pendingAppointmentArgs<ExtArgs>;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.ConfirmedAppointment$hospitalArgs<ExtArgs>;
}, ExtArgs["result"]["confirmedAppointment"]>;
export type ConfirmedAppointmentSelectScalar = {
    id?: boolean;
    pendingAppointmentId?: boolean;
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
    createdBy?: boolean;
    createdByName?: boolean;
    bookingType?: boolean;
    serial?: boolean;
    collectionAmount?: boolean;
    transactionId?: boolean;
    orderId?: boolean;
    paymentUserId?: boolean;
    paymentAmount?: boolean;
    currency?: boolean;
    paymentStatus?: boolean;
    paymentMethod?: boolean;
    gatewayResponse?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ConfirmedAppointmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "pendingAppointmentId" | "phoneNumber" | "doctorId" | "doctorName" | "hospitalId" | "hospitalName" | "problem" | "appointmentDate" | "dayLabel" | "chamberId" | "chamberName" | "patientName" | "patientType" | "patientAge" | "patientWeight" | "patientArea" | "contactPhone" | "source" | "status" | "createdBy" | "createdByName" | "bookingType" | "serial" | "collectionAmount" | "transactionId" | "orderId" | "paymentUserId" | "paymentAmount" | "currency" | "paymentStatus" | "paymentMethod" | "gatewayResponse" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["confirmedAppointment"]>;
export type ConfirmedAppointmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pendingAppointment?: boolean | Prisma.ConfirmedAppointment$pendingAppointmentArgs<ExtArgs>;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.ConfirmedAppointment$hospitalArgs<ExtArgs>;
};
export type ConfirmedAppointmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pendingAppointment?: boolean | Prisma.ConfirmedAppointment$pendingAppointmentArgs<ExtArgs>;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.ConfirmedAppointment$hospitalArgs<ExtArgs>;
};
export type ConfirmedAppointmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pendingAppointment?: boolean | Prisma.ConfirmedAppointment$pendingAppointmentArgs<ExtArgs>;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    hospital?: boolean | Prisma.ConfirmedAppointment$hospitalArgs<ExtArgs>;
};
export type $ConfirmedAppointmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ConfirmedAppointment";
    objects: {
        pendingAppointment: Prisma.$PendingAppointmentPayload<ExtArgs> | null;
        doctor: Prisma.$DoctorPayload<ExtArgs>;
        hospital: Prisma.$HospitalPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        pendingAppointmentId: string | null;
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
        createdBy: string | null;
        createdByName: string | null;
        bookingType: $Enums.BookingType;
        serial: number;
        collectionAmount: number | null;
        transactionId: string | null;
        orderId: string | null;
        paymentUserId: string | null;
        paymentAmount: number | null;
        currency: string;
        paymentStatus: $Enums.PaymentStatus | null;
        paymentMethod: string | null;
        gatewayResponse: runtime.JsonValue | null;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["confirmedAppointment"]>;
    composites: {};
};
export type ConfirmedAppointmentGetPayload<S extends boolean | null | undefined | ConfirmedAppointmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload, S>;
export type ConfirmedAppointmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConfirmedAppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConfirmedAppointmentCountAggregateInputType | true;
};
export interface ConfirmedAppointmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ConfirmedAppointment'];
        meta: {
            name: 'ConfirmedAppointment';
        };
    };
    /**
     * Find zero or one ConfirmedAppointment that matches the filter.
     * @param {ConfirmedAppointmentFindUniqueArgs} args - Arguments to find a ConfirmedAppointment
     * @example
     * // Get one ConfirmedAppointment
     * const confirmedAppointment = await prisma.confirmedAppointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfirmedAppointmentFindUniqueArgs>(args: Prisma.SelectSubset<T, ConfirmedAppointmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConfirmedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ConfirmedAppointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConfirmedAppointmentFindUniqueOrThrowArgs} args - Arguments to find a ConfirmedAppointment
     * @example
     * // Get one ConfirmedAppointment
     * const confirmedAppointment = await prisma.confirmedAppointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfirmedAppointmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConfirmedAppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConfirmedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ConfirmedAppointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmedAppointmentFindFirstArgs} args - Arguments to find a ConfirmedAppointment
     * @example
     * // Get one ConfirmedAppointment
     * const confirmedAppointment = await prisma.confirmedAppointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfirmedAppointmentFindFirstArgs>(args?: Prisma.SelectSubset<T, ConfirmedAppointmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConfirmedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ConfirmedAppointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmedAppointmentFindFirstOrThrowArgs} args - Arguments to find a ConfirmedAppointment
     * @example
     * // Get one ConfirmedAppointment
     * const confirmedAppointment = await prisma.confirmedAppointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfirmedAppointmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConfirmedAppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConfirmedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ConfirmedAppointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmedAppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConfirmedAppointments
     * const confirmedAppointments = await prisma.confirmedAppointment.findMany()
     *
     * // Get first 10 ConfirmedAppointments
     * const confirmedAppointments = await prisma.confirmedAppointment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const confirmedAppointmentWithIdOnly = await prisma.confirmedAppointment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ConfirmedAppointmentFindManyArgs>(args?: Prisma.SelectSubset<T, ConfirmedAppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ConfirmedAppointment.
     * @param {ConfirmedAppointmentCreateArgs} args - Arguments to create a ConfirmedAppointment.
     * @example
     * // Create one ConfirmedAppointment
     * const ConfirmedAppointment = await prisma.confirmedAppointment.create({
     *   data: {
     *     // ... data to create a ConfirmedAppointment
     *   }
     * })
     *
     */
    create<T extends ConfirmedAppointmentCreateArgs>(args: Prisma.SelectSubset<T, ConfirmedAppointmentCreateArgs<ExtArgs>>): Prisma.Prisma__ConfirmedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ConfirmedAppointments.
     * @param {ConfirmedAppointmentCreateManyArgs} args - Arguments to create many ConfirmedAppointments.
     * @example
     * // Create many ConfirmedAppointments
     * const confirmedAppointment = await prisma.confirmedAppointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ConfirmedAppointmentCreateManyArgs>(args?: Prisma.SelectSubset<T, ConfirmedAppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ConfirmedAppointments and returns the data saved in the database.
     * @param {ConfirmedAppointmentCreateManyAndReturnArgs} args - Arguments to create many ConfirmedAppointments.
     * @example
     * // Create many ConfirmedAppointments
     * const confirmedAppointment = await prisma.confirmedAppointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ConfirmedAppointments and only return the `id`
     * const confirmedAppointmentWithIdOnly = await prisma.confirmedAppointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ConfirmedAppointmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConfirmedAppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ConfirmedAppointment.
     * @param {ConfirmedAppointmentDeleteArgs} args - Arguments to delete one ConfirmedAppointment.
     * @example
     * // Delete one ConfirmedAppointment
     * const ConfirmedAppointment = await prisma.confirmedAppointment.delete({
     *   where: {
     *     // ... filter to delete one ConfirmedAppointment
     *   }
     * })
     *
     */
    delete<T extends ConfirmedAppointmentDeleteArgs>(args: Prisma.SelectSubset<T, ConfirmedAppointmentDeleteArgs<ExtArgs>>): Prisma.Prisma__ConfirmedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ConfirmedAppointment.
     * @param {ConfirmedAppointmentUpdateArgs} args - Arguments to update one ConfirmedAppointment.
     * @example
     * // Update one ConfirmedAppointment
     * const confirmedAppointment = await prisma.confirmedAppointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ConfirmedAppointmentUpdateArgs>(args: Prisma.SelectSubset<T, ConfirmedAppointmentUpdateArgs<ExtArgs>>): Prisma.Prisma__ConfirmedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ConfirmedAppointments.
     * @param {ConfirmedAppointmentDeleteManyArgs} args - Arguments to filter ConfirmedAppointments to delete.
     * @example
     * // Delete a few ConfirmedAppointments
     * const { count } = await prisma.confirmedAppointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ConfirmedAppointmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConfirmedAppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ConfirmedAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmedAppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConfirmedAppointments
     * const confirmedAppointment = await prisma.confirmedAppointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ConfirmedAppointmentUpdateManyArgs>(args: Prisma.SelectSubset<T, ConfirmedAppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ConfirmedAppointments and returns the data updated in the database.
     * @param {ConfirmedAppointmentUpdateManyAndReturnArgs} args - Arguments to update many ConfirmedAppointments.
     * @example
     * // Update many ConfirmedAppointments
     * const confirmedAppointment = await prisma.confirmedAppointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ConfirmedAppointments and only return the `id`
     * const confirmedAppointmentWithIdOnly = await prisma.confirmedAppointment.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConfirmedAppointmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConfirmedAppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ConfirmedAppointment.
     * @param {ConfirmedAppointmentUpsertArgs} args - Arguments to update or create a ConfirmedAppointment.
     * @example
     * // Update or create a ConfirmedAppointment
     * const confirmedAppointment = await prisma.confirmedAppointment.upsert({
     *   create: {
     *     // ... data to create a ConfirmedAppointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConfirmedAppointment we want to update
     *   }
     * })
     */
    upsert<T extends ConfirmedAppointmentUpsertArgs>(args: Prisma.SelectSubset<T, ConfirmedAppointmentUpsertArgs<ExtArgs>>): Prisma.Prisma__ConfirmedAppointmentClient<runtime.Types.Result.GetResult<Prisma.$ConfirmedAppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ConfirmedAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmedAppointmentCountArgs} args - Arguments to filter ConfirmedAppointments to count.
     * @example
     * // Count the number of ConfirmedAppointments
     * const count = await prisma.confirmedAppointment.count({
     *   where: {
     *     // ... the filter for the ConfirmedAppointments we want to count
     *   }
     * })
    **/
    count<T extends ConfirmedAppointmentCountArgs>(args?: Prisma.Subset<T, ConfirmedAppointmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConfirmedAppointmentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ConfirmedAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmedAppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConfirmedAppointmentAggregateArgs>(args: Prisma.Subset<T, ConfirmedAppointmentAggregateArgs>): Prisma.PrismaPromise<GetConfirmedAppointmentAggregateType<T>>;
    /**
     * Group by ConfirmedAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmedAppointmentGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ConfirmedAppointmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConfirmedAppointmentGroupByArgs['orderBy'];
    } : {
        orderBy?: ConfirmedAppointmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConfirmedAppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfirmedAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ConfirmedAppointment model
     */
    readonly fields: ConfirmedAppointmentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ConfirmedAppointment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ConfirmedAppointmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pendingAppointment<T extends Prisma.ConfirmedAppointment$pendingAppointmentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConfirmedAppointment$pendingAppointmentArgs<ExtArgs>>): Prisma.Prisma__PendingAppointmentClient<runtime.Types.Result.GetResult<Prisma.$PendingAppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    doctor<T extends Prisma.DoctorDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DoctorDefaultArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    hospital<T extends Prisma.ConfirmedAppointment$hospitalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConfirmedAppointment$hospitalArgs<ExtArgs>>): Prisma.Prisma__HospitalClient<runtime.Types.Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ConfirmedAppointment model
 */
export interface ConfirmedAppointmentFieldRefs {
    readonly id: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly pendingAppointmentId: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly phoneNumber: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly doctorId: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly doctorName: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly hospitalId: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly hospitalName: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly problem: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly appointmentDate: Prisma.FieldRef<"ConfirmedAppointment", 'DateTime'>;
    readonly dayLabel: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly chamberId: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly chamberName: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly patientName: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly patientType: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly patientAge: Prisma.FieldRef<"ConfirmedAppointment", 'Int'>;
    readonly patientWeight: Prisma.FieldRef<"ConfirmedAppointment", 'Float'>;
    readonly patientArea: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly contactPhone: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly source: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly status: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly createdBy: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly createdByName: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly bookingType: Prisma.FieldRef<"ConfirmedAppointment", 'BookingType'>;
    readonly serial: Prisma.FieldRef<"ConfirmedAppointment", 'Int'>;
    readonly collectionAmount: Prisma.FieldRef<"ConfirmedAppointment", 'Float'>;
    readonly transactionId: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly orderId: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly paymentUserId: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly paymentAmount: Prisma.FieldRef<"ConfirmedAppointment", 'Float'>;
    readonly currency: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly paymentStatus: Prisma.FieldRef<"ConfirmedAppointment", 'PaymentStatus'>;
    readonly paymentMethod: Prisma.FieldRef<"ConfirmedAppointment", 'String'>;
    readonly gatewayResponse: Prisma.FieldRef<"ConfirmedAppointment", 'Json'>;
    readonly paidAt: Prisma.FieldRef<"ConfirmedAppointment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ConfirmedAppointment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ConfirmedAppointment", 'DateTime'>;
}
/**
 * ConfirmedAppointment findUnique
 */
export type ConfirmedAppointmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConfirmedAppointment to fetch.
     */
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
};
/**
 * ConfirmedAppointment findUniqueOrThrow
 */
export type ConfirmedAppointmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConfirmedAppointment to fetch.
     */
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
};
/**
 * ConfirmedAppointment findFirst
 */
export type ConfirmedAppointmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConfirmedAppointment to fetch.
     */
    where?: Prisma.ConfirmedAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConfirmedAppointments to fetch.
     */
    orderBy?: Prisma.ConfirmedAppointmentOrderByWithRelationInput | Prisma.ConfirmedAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ConfirmedAppointments.
     */
    cursor?: Prisma.ConfirmedAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConfirmedAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConfirmedAppointments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ConfirmedAppointments.
     */
    distinct?: Prisma.ConfirmedAppointmentScalarFieldEnum | Prisma.ConfirmedAppointmentScalarFieldEnum[];
};
/**
 * ConfirmedAppointment findFirstOrThrow
 */
export type ConfirmedAppointmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConfirmedAppointment to fetch.
     */
    where?: Prisma.ConfirmedAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConfirmedAppointments to fetch.
     */
    orderBy?: Prisma.ConfirmedAppointmentOrderByWithRelationInput | Prisma.ConfirmedAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ConfirmedAppointments.
     */
    cursor?: Prisma.ConfirmedAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConfirmedAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConfirmedAppointments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ConfirmedAppointments.
     */
    distinct?: Prisma.ConfirmedAppointmentScalarFieldEnum | Prisma.ConfirmedAppointmentScalarFieldEnum[];
};
/**
 * ConfirmedAppointment findMany
 */
export type ConfirmedAppointmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConfirmedAppointments to fetch.
     */
    where?: Prisma.ConfirmedAppointmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConfirmedAppointments to fetch.
     */
    orderBy?: Prisma.ConfirmedAppointmentOrderByWithRelationInput | Prisma.ConfirmedAppointmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ConfirmedAppointments.
     */
    cursor?: Prisma.ConfirmedAppointmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConfirmedAppointments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConfirmedAppointments.
     */
    skip?: number;
    distinct?: Prisma.ConfirmedAppointmentScalarFieldEnum | Prisma.ConfirmedAppointmentScalarFieldEnum[];
};
/**
 * ConfirmedAppointment create
 */
export type ConfirmedAppointmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a ConfirmedAppointment.
     */
    data: Prisma.XOR<Prisma.ConfirmedAppointmentCreateInput, Prisma.ConfirmedAppointmentUncheckedCreateInput>;
};
/**
 * ConfirmedAppointment createMany
 */
export type ConfirmedAppointmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConfirmedAppointments.
     */
    data: Prisma.ConfirmedAppointmentCreateManyInput | Prisma.ConfirmedAppointmentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ConfirmedAppointment createManyAndReturn
 */
export type ConfirmedAppointmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfirmedAppointment
     */
    select?: Prisma.ConfirmedAppointmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ConfirmedAppointment
     */
    omit?: Prisma.ConfirmedAppointmentOmit<ExtArgs> | null;
    /**
     * The data used to create many ConfirmedAppointments.
     */
    data: Prisma.ConfirmedAppointmentCreateManyInput | Prisma.ConfirmedAppointmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ConfirmedAppointmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ConfirmedAppointment update
 */
export type ConfirmedAppointmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a ConfirmedAppointment.
     */
    data: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateInput, Prisma.ConfirmedAppointmentUncheckedUpdateInput>;
    /**
     * Choose, which ConfirmedAppointment to update.
     */
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
};
/**
 * ConfirmedAppointment updateMany
 */
export type ConfirmedAppointmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ConfirmedAppointments.
     */
    data: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateManyMutationInput, Prisma.ConfirmedAppointmentUncheckedUpdateManyInput>;
    /**
     * Filter which ConfirmedAppointments to update
     */
    where?: Prisma.ConfirmedAppointmentWhereInput;
    /**
     * Limit how many ConfirmedAppointments to update.
     */
    limit?: number;
};
/**
 * ConfirmedAppointment updateManyAndReturn
 */
export type ConfirmedAppointmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfirmedAppointment
     */
    select?: Prisma.ConfirmedAppointmentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ConfirmedAppointment
     */
    omit?: Prisma.ConfirmedAppointmentOmit<ExtArgs> | null;
    /**
     * The data used to update ConfirmedAppointments.
     */
    data: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateManyMutationInput, Prisma.ConfirmedAppointmentUncheckedUpdateManyInput>;
    /**
     * Filter which ConfirmedAppointments to update
     */
    where?: Prisma.ConfirmedAppointmentWhereInput;
    /**
     * Limit how many ConfirmedAppointments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ConfirmedAppointmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ConfirmedAppointment upsert
 */
export type ConfirmedAppointmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the ConfirmedAppointment to update in case it exists.
     */
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
    /**
     * In case the ConfirmedAppointment found by the `where` argument doesn't exist, create a new ConfirmedAppointment with this data.
     */
    create: Prisma.XOR<Prisma.ConfirmedAppointmentCreateInput, Prisma.ConfirmedAppointmentUncheckedCreateInput>;
    /**
     * In case the ConfirmedAppointment was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ConfirmedAppointmentUpdateInput, Prisma.ConfirmedAppointmentUncheckedUpdateInput>;
};
/**
 * ConfirmedAppointment delete
 */
export type ConfirmedAppointmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which ConfirmedAppointment to delete.
     */
    where: Prisma.ConfirmedAppointmentWhereUniqueInput;
};
/**
 * ConfirmedAppointment deleteMany
 */
export type ConfirmedAppointmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ConfirmedAppointments to delete
     */
    where?: Prisma.ConfirmedAppointmentWhereInput;
    /**
     * Limit how many ConfirmedAppointments to delete.
     */
    limit?: number;
};
/**
 * ConfirmedAppointment.pendingAppointment
 */
export type ConfirmedAppointment$pendingAppointmentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * ConfirmedAppointment.hospital
 */
export type ConfirmedAppointment$hospitalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * ConfirmedAppointment without action
 */
export type ConfirmedAppointmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=ConfirmedAppointment.d.ts.map