import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.2.0
 * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly JoinRequest: "JoinRequest";
    readonly User: "User";
    readonly SuperAdminProfile: "SuperAdminProfile";
    readonly ChatSession: "ChatSession";
    readonly Doctor: "Doctor";
    readonly Hospital: "Hospital";
    readonly CreditLedger: "CreditLedger";
    readonly Chamber: "Chamber";
    readonly DoctorSchedule: "DoctorSchedule";
    readonly PendingAppointment: "PendingAppointment";
    readonly ConfirmedAppointment: "ConfirmedAppointment";
    readonly CancelledAppointmentOnline: "CancelledAppointmentOnline";
    readonly CancelledAppointmentLocal: "CancelledAppointmentLocal";
    readonly ServedAppointment: "ServedAppointment";
    readonly HospitalOnlineDay: "HospitalOnlineDay";
    readonly HospitalPayout: "HospitalPayout";
    readonly DoctorInformation: "DoctorInformation";
    readonly Blog: "Blog";
    readonly LocationPortalSetting: "LocationPortalSetting";
    readonly SeoSetting: "SeoSetting";
    readonly Review: "Review";
    readonly ContactMessage: "ContactMessage";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "joinRequest" | "user" | "superAdminProfile" | "chatSession" | "doctor" | "hospital" | "creditLedger" | "chamber" | "doctorSchedule" | "pendingAppointment" | "confirmedAppointment" | "cancelledAppointmentOnline" | "cancelledAppointmentLocal" | "servedAppointment" | "hospitalOnlineDay" | "hospitalPayout" | "doctorInformation" | "blog" | "locationPortalSetting" | "seoSetting" | "review" | "contactMessage";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        JoinRequest: {
            payload: Prisma.$JoinRequestPayload<ExtArgs>;
            fields: Prisma.JoinRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JoinRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JoinRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload>;
                };
                findFirst: {
                    args: Prisma.JoinRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JoinRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload>;
                };
                findMany: {
                    args: Prisma.JoinRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload>[];
                };
                create: {
                    args: Prisma.JoinRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload>;
                };
                createMany: {
                    args: Prisma.JoinRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.JoinRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload>[];
                };
                delete: {
                    args: Prisma.JoinRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload>;
                };
                update: {
                    args: Prisma.JoinRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.JoinRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JoinRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.JoinRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload>[];
                };
                upsert: {
                    args: Prisma.JoinRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JoinRequestPayload>;
                };
                aggregate: {
                    args: Prisma.JoinRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJoinRequest>;
                };
                groupBy: {
                    args: Prisma.JoinRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JoinRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JoinRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JoinRequestCountAggregateOutputType> | number;
                };
            };
        };
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        SuperAdminProfile: {
            payload: Prisma.$SuperAdminProfilePayload<ExtArgs>;
            fields: Prisma.SuperAdminProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SuperAdminProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SuperAdminProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload>;
                };
                findFirst: {
                    args: Prisma.SuperAdminProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SuperAdminProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload>;
                };
                findMany: {
                    args: Prisma.SuperAdminProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload>[];
                };
                create: {
                    args: Prisma.SuperAdminProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload>;
                };
                createMany: {
                    args: Prisma.SuperAdminProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SuperAdminProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload>[];
                };
                delete: {
                    args: Prisma.SuperAdminProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload>;
                };
                update: {
                    args: Prisma.SuperAdminProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.SuperAdminProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SuperAdminProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SuperAdminProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload>[];
                };
                upsert: {
                    args: Prisma.SuperAdminProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SuperAdminProfilePayload>;
                };
                aggregate: {
                    args: Prisma.SuperAdminProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSuperAdminProfile>;
                };
                groupBy: {
                    args: Prisma.SuperAdminProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SuperAdminProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SuperAdminProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SuperAdminProfileCountAggregateOutputType> | number;
                };
            };
        };
        ChatSession: {
            payload: Prisma.$ChatSessionPayload<ExtArgs>;
            fields: Prisma.ChatSessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChatSessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChatSessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload>;
                };
                findFirst: {
                    args: Prisma.ChatSessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChatSessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload>;
                };
                findMany: {
                    args: Prisma.ChatSessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload>[];
                };
                create: {
                    args: Prisma.ChatSessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload>;
                };
                createMany: {
                    args: Prisma.ChatSessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChatSessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload>[];
                };
                delete: {
                    args: Prisma.ChatSessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload>;
                };
                update: {
                    args: Prisma.ChatSessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload>;
                };
                deleteMany: {
                    args: Prisma.ChatSessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChatSessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChatSessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload>[];
                };
                upsert: {
                    args: Prisma.ChatSessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatSessionPayload>;
                };
                aggregate: {
                    args: Prisma.ChatSessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChatSession>;
                };
                groupBy: {
                    args: Prisma.ChatSessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatSessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChatSessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatSessionCountAggregateOutputType> | number;
                };
            };
        };
        Doctor: {
            payload: Prisma.$DoctorPayload<ExtArgs>;
            fields: Prisma.DoctorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DoctorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DoctorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                findFirst: {
                    args: Prisma.DoctorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DoctorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                findMany: {
                    args: Prisma.DoctorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>[];
                };
                create: {
                    args: Prisma.DoctorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                createMany: {
                    args: Prisma.DoctorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DoctorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>[];
                };
                delete: {
                    args: Prisma.DoctorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                update: {
                    args: Prisma.DoctorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                deleteMany: {
                    args: Prisma.DoctorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DoctorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DoctorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>[];
                };
                upsert: {
                    args: Prisma.DoctorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                aggregate: {
                    args: Prisma.DoctorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDoctor>;
                };
                groupBy: {
                    args: Prisma.DoctorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DoctorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DoctorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DoctorCountAggregateOutputType> | number;
                };
            };
        };
        Hospital: {
            payload: Prisma.$HospitalPayload<ExtArgs>;
            fields: Prisma.HospitalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HospitalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HospitalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload>;
                };
                findFirst: {
                    args: Prisma.HospitalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HospitalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload>;
                };
                findMany: {
                    args: Prisma.HospitalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload>[];
                };
                create: {
                    args: Prisma.HospitalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload>;
                };
                createMany: {
                    args: Prisma.HospitalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HospitalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload>[];
                };
                delete: {
                    args: Prisma.HospitalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload>;
                };
                update: {
                    args: Prisma.HospitalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload>;
                };
                deleteMany: {
                    args: Prisma.HospitalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HospitalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HospitalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload>[];
                };
                upsert: {
                    args: Prisma.HospitalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayload>;
                };
                aggregate: {
                    args: Prisma.HospitalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHospital>;
                };
                groupBy: {
                    args: Prisma.HospitalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HospitalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HospitalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HospitalCountAggregateOutputType> | number;
                };
            };
        };
        CreditLedger: {
            payload: Prisma.$CreditLedgerPayload<ExtArgs>;
            fields: Prisma.CreditLedgerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CreditLedgerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CreditLedgerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload>;
                };
                findFirst: {
                    args: Prisma.CreditLedgerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CreditLedgerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload>;
                };
                findMany: {
                    args: Prisma.CreditLedgerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload>[];
                };
                create: {
                    args: Prisma.CreditLedgerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload>;
                };
                createMany: {
                    args: Prisma.CreditLedgerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CreditLedgerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload>[];
                };
                delete: {
                    args: Prisma.CreditLedgerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload>;
                };
                update: {
                    args: Prisma.CreditLedgerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload>;
                };
                deleteMany: {
                    args: Prisma.CreditLedgerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CreditLedgerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CreditLedgerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload>[];
                };
                upsert: {
                    args: Prisma.CreditLedgerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CreditLedgerPayload>;
                };
                aggregate: {
                    args: Prisma.CreditLedgerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCreditLedger>;
                };
                groupBy: {
                    args: Prisma.CreditLedgerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CreditLedgerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CreditLedgerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CreditLedgerCountAggregateOutputType> | number;
                };
            };
        };
        Chamber: {
            payload: Prisma.$ChamberPayload<ExtArgs>;
            fields: Prisma.ChamberFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChamberFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChamberFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload>;
                };
                findFirst: {
                    args: Prisma.ChamberFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChamberFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload>;
                };
                findMany: {
                    args: Prisma.ChamberFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload>[];
                };
                create: {
                    args: Prisma.ChamberCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload>;
                };
                createMany: {
                    args: Prisma.ChamberCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChamberCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload>[];
                };
                delete: {
                    args: Prisma.ChamberDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload>;
                };
                update: {
                    args: Prisma.ChamberUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload>;
                };
                deleteMany: {
                    args: Prisma.ChamberDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChamberUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChamberUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload>[];
                };
                upsert: {
                    args: Prisma.ChamberUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChamberPayload>;
                };
                aggregate: {
                    args: Prisma.ChamberAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChamber>;
                };
                groupBy: {
                    args: Prisma.ChamberGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChamberGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChamberCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChamberCountAggregateOutputType> | number;
                };
            };
        };
        DoctorSchedule: {
            payload: Prisma.$DoctorSchedulePayload<ExtArgs>;
            fields: Prisma.DoctorScheduleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DoctorScheduleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DoctorScheduleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>;
                };
                findFirst: {
                    args: Prisma.DoctorScheduleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DoctorScheduleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>;
                };
                findMany: {
                    args: Prisma.DoctorScheduleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>[];
                };
                create: {
                    args: Prisma.DoctorScheduleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>;
                };
                createMany: {
                    args: Prisma.DoctorScheduleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DoctorScheduleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>[];
                };
                delete: {
                    args: Prisma.DoctorScheduleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>;
                };
                update: {
                    args: Prisma.DoctorScheduleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>;
                };
                deleteMany: {
                    args: Prisma.DoctorScheduleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DoctorScheduleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DoctorScheduleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>[];
                };
                upsert: {
                    args: Prisma.DoctorScheduleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>;
                };
                aggregate: {
                    args: Prisma.DoctorScheduleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDoctorSchedule>;
                };
                groupBy: {
                    args: Prisma.DoctorScheduleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DoctorScheduleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DoctorScheduleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DoctorScheduleCountAggregateOutputType> | number;
                };
            };
        };
        PendingAppointment: {
            payload: Prisma.$PendingAppointmentPayload<ExtArgs>;
            fields: Prisma.PendingAppointmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PendingAppointmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PendingAppointmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload>;
                };
                findFirst: {
                    args: Prisma.PendingAppointmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PendingAppointmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload>;
                };
                findMany: {
                    args: Prisma.PendingAppointmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload>[];
                };
                create: {
                    args: Prisma.PendingAppointmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload>;
                };
                createMany: {
                    args: Prisma.PendingAppointmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PendingAppointmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload>[];
                };
                delete: {
                    args: Prisma.PendingAppointmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload>;
                };
                update: {
                    args: Prisma.PendingAppointmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload>;
                };
                deleteMany: {
                    args: Prisma.PendingAppointmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PendingAppointmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PendingAppointmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload>[];
                };
                upsert: {
                    args: Prisma.PendingAppointmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PendingAppointmentPayload>;
                };
                aggregate: {
                    args: Prisma.PendingAppointmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePendingAppointment>;
                };
                groupBy: {
                    args: Prisma.PendingAppointmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PendingAppointmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PendingAppointmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PendingAppointmentCountAggregateOutputType> | number;
                };
            };
        };
        ConfirmedAppointment: {
            payload: Prisma.$ConfirmedAppointmentPayload<ExtArgs>;
            fields: Prisma.ConfirmedAppointmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConfirmedAppointmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConfirmedAppointmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload>;
                };
                findFirst: {
                    args: Prisma.ConfirmedAppointmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConfirmedAppointmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload>;
                };
                findMany: {
                    args: Prisma.ConfirmedAppointmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload>[];
                };
                create: {
                    args: Prisma.ConfirmedAppointmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload>;
                };
                createMany: {
                    args: Prisma.ConfirmedAppointmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConfirmedAppointmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload>[];
                };
                delete: {
                    args: Prisma.ConfirmedAppointmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload>;
                };
                update: {
                    args: Prisma.ConfirmedAppointmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload>;
                };
                deleteMany: {
                    args: Prisma.ConfirmedAppointmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConfirmedAppointmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConfirmedAppointmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload>[];
                };
                upsert: {
                    args: Prisma.ConfirmedAppointmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfirmedAppointmentPayload>;
                };
                aggregate: {
                    args: Prisma.ConfirmedAppointmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConfirmedAppointment>;
                };
                groupBy: {
                    args: Prisma.ConfirmedAppointmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConfirmedAppointmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConfirmedAppointmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConfirmedAppointmentCountAggregateOutputType> | number;
                };
            };
        };
        CancelledAppointmentOnline: {
            payload: Prisma.$CancelledAppointmentOnlinePayload<ExtArgs>;
            fields: Prisma.CancelledAppointmentOnlineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CancelledAppointmentOnlineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CancelledAppointmentOnlineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload>;
                };
                findFirst: {
                    args: Prisma.CancelledAppointmentOnlineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CancelledAppointmentOnlineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload>;
                };
                findMany: {
                    args: Prisma.CancelledAppointmentOnlineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload>[];
                };
                create: {
                    args: Prisma.CancelledAppointmentOnlineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload>;
                };
                createMany: {
                    args: Prisma.CancelledAppointmentOnlineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CancelledAppointmentOnlineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload>[];
                };
                delete: {
                    args: Prisma.CancelledAppointmentOnlineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload>;
                };
                update: {
                    args: Prisma.CancelledAppointmentOnlineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload>;
                };
                deleteMany: {
                    args: Prisma.CancelledAppointmentOnlineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CancelledAppointmentOnlineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CancelledAppointmentOnlineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload>[];
                };
                upsert: {
                    args: Prisma.CancelledAppointmentOnlineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentOnlinePayload>;
                };
                aggregate: {
                    args: Prisma.CancelledAppointmentOnlineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCancelledAppointmentOnline>;
                };
                groupBy: {
                    args: Prisma.CancelledAppointmentOnlineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CancelledAppointmentOnlineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CancelledAppointmentOnlineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CancelledAppointmentOnlineCountAggregateOutputType> | number;
                };
            };
        };
        CancelledAppointmentLocal: {
            payload: Prisma.$CancelledAppointmentLocalPayload<ExtArgs>;
            fields: Prisma.CancelledAppointmentLocalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CancelledAppointmentLocalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CancelledAppointmentLocalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload>;
                };
                findFirst: {
                    args: Prisma.CancelledAppointmentLocalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CancelledAppointmentLocalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload>;
                };
                findMany: {
                    args: Prisma.CancelledAppointmentLocalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload>[];
                };
                create: {
                    args: Prisma.CancelledAppointmentLocalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload>;
                };
                createMany: {
                    args: Prisma.CancelledAppointmentLocalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CancelledAppointmentLocalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload>[];
                };
                delete: {
                    args: Prisma.CancelledAppointmentLocalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload>;
                };
                update: {
                    args: Prisma.CancelledAppointmentLocalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload>;
                };
                deleteMany: {
                    args: Prisma.CancelledAppointmentLocalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CancelledAppointmentLocalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CancelledAppointmentLocalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload>[];
                };
                upsert: {
                    args: Prisma.CancelledAppointmentLocalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CancelledAppointmentLocalPayload>;
                };
                aggregate: {
                    args: Prisma.CancelledAppointmentLocalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCancelledAppointmentLocal>;
                };
                groupBy: {
                    args: Prisma.CancelledAppointmentLocalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CancelledAppointmentLocalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CancelledAppointmentLocalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CancelledAppointmentLocalCountAggregateOutputType> | number;
                };
            };
        };
        ServedAppointment: {
            payload: Prisma.$ServedAppointmentPayload<ExtArgs>;
            fields: Prisma.ServedAppointmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ServedAppointmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ServedAppointmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload>;
                };
                findFirst: {
                    args: Prisma.ServedAppointmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ServedAppointmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload>;
                };
                findMany: {
                    args: Prisma.ServedAppointmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload>[];
                };
                create: {
                    args: Prisma.ServedAppointmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload>;
                };
                createMany: {
                    args: Prisma.ServedAppointmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ServedAppointmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload>[];
                };
                delete: {
                    args: Prisma.ServedAppointmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload>;
                };
                update: {
                    args: Prisma.ServedAppointmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload>;
                };
                deleteMany: {
                    args: Prisma.ServedAppointmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ServedAppointmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ServedAppointmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload>[];
                };
                upsert: {
                    args: Prisma.ServedAppointmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServedAppointmentPayload>;
                };
                aggregate: {
                    args: Prisma.ServedAppointmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateServedAppointment>;
                };
                groupBy: {
                    args: Prisma.ServedAppointmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServedAppointmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ServedAppointmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServedAppointmentCountAggregateOutputType> | number;
                };
            };
        };
        HospitalOnlineDay: {
            payload: Prisma.$HospitalOnlineDayPayload<ExtArgs>;
            fields: Prisma.HospitalOnlineDayFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HospitalOnlineDayFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HospitalOnlineDayFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload>;
                };
                findFirst: {
                    args: Prisma.HospitalOnlineDayFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HospitalOnlineDayFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload>;
                };
                findMany: {
                    args: Prisma.HospitalOnlineDayFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload>[];
                };
                create: {
                    args: Prisma.HospitalOnlineDayCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload>;
                };
                createMany: {
                    args: Prisma.HospitalOnlineDayCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HospitalOnlineDayCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload>[];
                };
                delete: {
                    args: Prisma.HospitalOnlineDayDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload>;
                };
                update: {
                    args: Prisma.HospitalOnlineDayUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload>;
                };
                deleteMany: {
                    args: Prisma.HospitalOnlineDayDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HospitalOnlineDayUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HospitalOnlineDayUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload>[];
                };
                upsert: {
                    args: Prisma.HospitalOnlineDayUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalOnlineDayPayload>;
                };
                aggregate: {
                    args: Prisma.HospitalOnlineDayAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHospitalOnlineDay>;
                };
                groupBy: {
                    args: Prisma.HospitalOnlineDayGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HospitalOnlineDayGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HospitalOnlineDayCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HospitalOnlineDayCountAggregateOutputType> | number;
                };
            };
        };
        HospitalPayout: {
            payload: Prisma.$HospitalPayoutPayload<ExtArgs>;
            fields: Prisma.HospitalPayoutFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HospitalPayoutFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HospitalPayoutFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload>;
                };
                findFirst: {
                    args: Prisma.HospitalPayoutFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HospitalPayoutFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload>;
                };
                findMany: {
                    args: Prisma.HospitalPayoutFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload>[];
                };
                create: {
                    args: Prisma.HospitalPayoutCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload>;
                };
                createMany: {
                    args: Prisma.HospitalPayoutCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HospitalPayoutCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload>[];
                };
                delete: {
                    args: Prisma.HospitalPayoutDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload>;
                };
                update: {
                    args: Prisma.HospitalPayoutUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload>;
                };
                deleteMany: {
                    args: Prisma.HospitalPayoutDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HospitalPayoutUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HospitalPayoutUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload>[];
                };
                upsert: {
                    args: Prisma.HospitalPayoutUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HospitalPayoutPayload>;
                };
                aggregate: {
                    args: Prisma.HospitalPayoutAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHospitalPayout>;
                };
                groupBy: {
                    args: Prisma.HospitalPayoutGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HospitalPayoutGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HospitalPayoutCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HospitalPayoutCountAggregateOutputType> | number;
                };
            };
        };
        DoctorInformation: {
            payload: Prisma.$DoctorInformationPayload<ExtArgs>;
            fields: Prisma.DoctorInformationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DoctorInformationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DoctorInformationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload>;
                };
                findFirst: {
                    args: Prisma.DoctorInformationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DoctorInformationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload>;
                };
                findMany: {
                    args: Prisma.DoctorInformationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload>[];
                };
                create: {
                    args: Prisma.DoctorInformationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload>;
                };
                createMany: {
                    args: Prisma.DoctorInformationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DoctorInformationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload>[];
                };
                delete: {
                    args: Prisma.DoctorInformationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload>;
                };
                update: {
                    args: Prisma.DoctorInformationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload>;
                };
                deleteMany: {
                    args: Prisma.DoctorInformationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DoctorInformationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DoctorInformationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload>[];
                };
                upsert: {
                    args: Prisma.DoctorInformationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorInformationPayload>;
                };
                aggregate: {
                    args: Prisma.DoctorInformationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDoctorInformation>;
                };
                groupBy: {
                    args: Prisma.DoctorInformationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DoctorInformationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DoctorInformationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DoctorInformationCountAggregateOutputType> | number;
                };
            };
        };
        Blog: {
            payload: Prisma.$BlogPayload<ExtArgs>;
            fields: Prisma.BlogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BlogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BlogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                findFirst: {
                    args: Prisma.BlogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BlogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                findMany: {
                    args: Prisma.BlogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>[];
                };
                create: {
                    args: Prisma.BlogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                createMany: {
                    args: Prisma.BlogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BlogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>[];
                };
                delete: {
                    args: Prisma.BlogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                update: {
                    args: Prisma.BlogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                deleteMany: {
                    args: Prisma.BlogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BlogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BlogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>[];
                };
                upsert: {
                    args: Prisma.BlogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPayload>;
                };
                aggregate: {
                    args: Prisma.BlogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBlog>;
                };
                groupBy: {
                    args: Prisma.BlogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BlogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlogCountAggregateOutputType> | number;
                };
            };
        };
        LocationPortalSetting: {
            payload: Prisma.$LocationPortalSettingPayload<ExtArgs>;
            fields: Prisma.LocationPortalSettingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LocationPortalSettingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LocationPortalSettingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload>;
                };
                findFirst: {
                    args: Prisma.LocationPortalSettingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LocationPortalSettingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload>;
                };
                findMany: {
                    args: Prisma.LocationPortalSettingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload>[];
                };
                create: {
                    args: Prisma.LocationPortalSettingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload>;
                };
                createMany: {
                    args: Prisma.LocationPortalSettingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LocationPortalSettingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload>[];
                };
                delete: {
                    args: Prisma.LocationPortalSettingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload>;
                };
                update: {
                    args: Prisma.LocationPortalSettingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload>;
                };
                deleteMany: {
                    args: Prisma.LocationPortalSettingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LocationPortalSettingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LocationPortalSettingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload>[];
                };
                upsert: {
                    args: Prisma.LocationPortalSettingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPortalSettingPayload>;
                };
                aggregate: {
                    args: Prisma.LocationPortalSettingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLocationPortalSetting>;
                };
                groupBy: {
                    args: Prisma.LocationPortalSettingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LocationPortalSettingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LocationPortalSettingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LocationPortalSettingCountAggregateOutputType> | number;
                };
            };
        };
        SeoSetting: {
            payload: Prisma.$SeoSettingPayload<ExtArgs>;
            fields: Prisma.SeoSettingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SeoSettingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SeoSettingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload>;
                };
                findFirst: {
                    args: Prisma.SeoSettingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SeoSettingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload>;
                };
                findMany: {
                    args: Prisma.SeoSettingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload>[];
                };
                create: {
                    args: Prisma.SeoSettingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload>;
                };
                createMany: {
                    args: Prisma.SeoSettingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SeoSettingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload>[];
                };
                delete: {
                    args: Prisma.SeoSettingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload>;
                };
                update: {
                    args: Prisma.SeoSettingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload>;
                };
                deleteMany: {
                    args: Prisma.SeoSettingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SeoSettingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SeoSettingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload>[];
                };
                upsert: {
                    args: Prisma.SeoSettingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SeoSettingPayload>;
                };
                aggregate: {
                    args: Prisma.SeoSettingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSeoSetting>;
                };
                groupBy: {
                    args: Prisma.SeoSettingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SeoSettingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SeoSettingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SeoSettingCountAggregateOutputType> | number;
                };
            };
        };
        Review: {
            payload: Prisma.$ReviewPayload<ExtArgs>;
            fields: Prisma.ReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                findFirst: {
                    args: Prisma.ReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                findMany: {
                    args: Prisma.ReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                create: {
                    args: Prisma.ReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                createMany: {
                    args: Prisma.ReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                delete: {
                    args: Prisma.ReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                update: {
                    args: Prisma.ReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.ReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                upsert: {
                    args: Prisma.ReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                aggregate: {
                    args: Prisma.ReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReview>;
                };
                groupBy: {
                    args: Prisma.ReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReviewCountAggregateOutputType> | number;
                };
            };
        };
        ContactMessage: {
            payload: Prisma.$ContactMessagePayload<ExtArgs>;
            fields: Prisma.ContactMessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ContactMessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ContactMessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload>;
                };
                findFirst: {
                    args: Prisma.ContactMessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ContactMessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload>;
                };
                findMany: {
                    args: Prisma.ContactMessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload>[];
                };
                create: {
                    args: Prisma.ContactMessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload>;
                };
                createMany: {
                    args: Prisma.ContactMessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ContactMessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload>[];
                };
                delete: {
                    args: Prisma.ContactMessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload>;
                };
                update: {
                    args: Prisma.ContactMessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload>;
                };
                deleteMany: {
                    args: Prisma.ContactMessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ContactMessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ContactMessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload>[];
                };
                upsert: {
                    args: Prisma.ContactMessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContactMessagePayload>;
                };
                aggregate: {
                    args: Prisma.ContactMessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateContactMessage>;
                };
                groupBy: {
                    args: Prisma.ContactMessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContactMessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ContactMessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContactMessageCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const JoinRequestScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly status: "status";
    readonly email: "email";
    readonly phone: "phone";
    readonly name: "name";
    readonly degree: "degree";
    readonly speciality: "speciality";
    readonly username: "username";
    readonly hospitalName: "hospitalName";
    readonly slug: "slug";
    readonly division: "division";
    readonly district: "district";
    readonly thana: "thana";
    readonly addressLine: "addressLine";
    readonly foundUs: "foundUs";
    readonly joinReason: "joinReason";
    readonly note: "note";
    readonly reviewedBy: "reviewedBy";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type JoinRequestScalarFieldEnum = (typeof JoinRequestScalarFieldEnum)[keyof typeof JoinRequestScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly name: "name";
    readonly profilePicture: "profilePicture";
    readonly isVerified: "isVerified";
    readonly otp: "otp";
    readonly otpExpiry: "otpExpiry";
    readonly refreshToken: "refreshToken";
    readonly phone: "phone";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly staffDoctorId: "staffDoctorId";
    readonly staffHospitalId: "staffHospitalId";
    readonly canApprove: "canApprove";
    readonly canManageChambers: "canManageChambers";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SuperAdminProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly permissions: "permissions";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SuperAdminProfileScalarFieldEnum = (typeof SuperAdminProfileScalarFieldEnum)[keyof typeof SuperAdminProfileScalarFieldEnum];
export declare const ChatSessionScalarFieldEnum: {
    readonly id: "id";
    readonly phoneNumber: "phoneNumber";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly targetName: "targetName";
    readonly lastFlow: "lastFlow";
    readonly lastStep: "lastStep";
    readonly updatedAt: "updatedAt";
    readonly createdAt: "createdAt";
};
export type ChatSessionScalarFieldEnum = (typeof ChatSessionScalarFieldEnum)[keyof typeof ChatSessionScalarFieldEnum];
export declare const DoctorScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly name_en: "name_en";
    readonly degree: "degree";
    readonly degree_en: "degree_en";
    readonly speciality: "speciality";
    readonly speciality_en: "speciality_en";
    readonly tagline: "tagline";
    readonly tagline_en: "tagline_en";
    readonly bio: "bio";
    readonly bio_en: "bio_en";
    readonly phone: "phone";
    readonly whatsappNumber: "whatsappNumber";
    readonly whatsappAccessToken: "whatsappAccessToken";
    readonly whatsappId: "whatsappId";
    readonly email: "email";
    readonly username: "username";
    readonly templateName: "templateName";
    readonly profilePicture: "profilePicture";
    readonly gender: "gender";
    readonly religion: "religion";
    readonly startedYear: "startedYear";
    readonly bmdcNumber: "bmdcNumber";
    readonly status: "status";
    readonly serialLive: "serialLive";
    readonly liveCurrentSerial: "liveCurrentSerial";
    readonly liveUpdatedAt: "liveUpdatedAt";
    readonly liveSkippedAt: "liveSkippedAt";
    readonly liveBreakReason: "liveBreakReason";
    readonly liveBreakUntil: "liveBreakUntil";
    readonly creditBalance: "creditBalance";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum];
export declare const HospitalScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly name_en: "name_en";
    readonly slug: "slug";
    readonly templateName: "templateName";
    readonly division: "division";
    readonly division_en: "division_en";
    readonly district: "district";
    readonly district_en: "district_en";
    readonly thana: "thana";
    readonly thana_en: "thana_en";
    readonly addressLine: "addressLine";
    readonly addressLine_en: "addressLine_en";
    readonly phone: "phone";
    readonly establishedYear: "establishedYear";
    readonly status: "status";
    readonly creditBalance: "creditBalance";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type HospitalScalarFieldEnum = (typeof HospitalScalarFieldEnum)[keyof typeof HospitalScalarFieldEnum];
export declare const CreditLedgerScalarFieldEnum: {
    readonly id: "id";
    readonly ownerType: "ownerType";
    readonly doctorId: "doctorId";
    readonly hospitalId: "hospitalId";
    readonly amount: "amount";
    readonly balanceAfter: "balanceAfter";
    readonly kind: "kind";
    readonly refType: "refType";
    readonly refId: "refId";
    readonly note: "note";
    readonly createdBy: "createdBy";
    readonly createdAt: "createdAt";
};
export type CreditLedgerScalarFieldEnum = (typeof CreditLedgerScalarFieldEnum)[keyof typeof CreditLedgerScalarFieldEnum];
export declare const ChamberScalarFieldEnum: {
    readonly id: "id";
    readonly doctorId: "doctorId";
    readonly hospitalId: "hospitalId";
    readonly chamberName: "chamberName";
    readonly chamberName_en: "chamberName_en";
    readonly addressLine: "addressLine";
    readonly addressLine_en: "addressLine_en";
    readonly thana: "thana";
    readonly thana_en: "thana_en";
    readonly district: "district";
    readonly district_en: "district_en";
    readonly division: "division";
    readonly division_en: "division_en";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly newPatientFee: "newPatientFee";
    readonly oldPatientFee: "oldPatientFee";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChamberScalarFieldEnum = (typeof ChamberScalarFieldEnum)[keyof typeof ChamberScalarFieldEnum];
export declare const DoctorScheduleScalarFieldEnum: {
    readonly id: "id";
    readonly doctorId: "doctorId";
    readonly hospitalId: "hospitalId";
    readonly chamberId: "chamberId";
    readonly dayOfWeek: "dayOfWeek";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DoctorScheduleScalarFieldEnum = (typeof DoctorScheduleScalarFieldEnum)[keyof typeof DoctorScheduleScalarFieldEnum];
export declare const PendingAppointmentScalarFieldEnum: {
    readonly id: "id";
    readonly phoneNumber: "phoneNumber";
    readonly doctorId: "doctorId";
    readonly doctorName: "doctorName";
    readonly hospitalId: "hospitalId";
    readonly hospitalName: "hospitalName";
    readonly problem: "problem";
    readonly appointmentDate: "appointmentDate";
    readonly dayLabel: "dayLabel";
    readonly chamberId: "chamberId";
    readonly chamberName: "chamberName";
    readonly patientName: "patientName";
    readonly patientType: "patientType";
    readonly patientAge: "patientAge";
    readonly patientWeight: "patientWeight";
    readonly patientArea: "patientArea";
    readonly contactPhone: "contactPhone";
    readonly source: "source";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PendingAppointmentScalarFieldEnum = (typeof PendingAppointmentScalarFieldEnum)[keyof typeof PendingAppointmentScalarFieldEnum];
export declare const ConfirmedAppointmentScalarFieldEnum: {
    readonly id: "id";
    readonly pendingAppointmentId: "pendingAppointmentId";
    readonly phoneNumber: "phoneNumber";
    readonly doctorId: "doctorId";
    readonly doctorName: "doctorName";
    readonly hospitalId: "hospitalId";
    readonly hospitalName: "hospitalName";
    readonly problem: "problem";
    readonly appointmentDate: "appointmentDate";
    readonly dayLabel: "dayLabel";
    readonly chamberId: "chamberId";
    readonly chamberName: "chamberName";
    readonly patientName: "patientName";
    readonly patientType: "patientType";
    readonly patientAge: "patientAge";
    readonly patientWeight: "patientWeight";
    readonly patientArea: "patientArea";
    readonly contactPhone: "contactPhone";
    readonly source: "source";
    readonly status: "status";
    readonly createdBy: "createdBy";
    readonly createdByName: "createdByName";
    readonly bookingType: "bookingType";
    readonly serial: "serial";
    readonly collectionAmount: "collectionAmount";
    readonly transactionId: "transactionId";
    readonly orderId: "orderId";
    readonly paymentUserId: "paymentUserId";
    readonly paymentAmount: "paymentAmount";
    readonly currency: "currency";
    readonly paymentStatus: "paymentStatus";
    readonly paymentMethod: "paymentMethod";
    readonly gatewayResponse: "gatewayResponse";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConfirmedAppointmentScalarFieldEnum = (typeof ConfirmedAppointmentScalarFieldEnum)[keyof typeof ConfirmedAppointmentScalarFieldEnum];
export declare const CancelledAppointmentOnlineScalarFieldEnum: {
    readonly id: "id";
    readonly appointmentId: "appointmentId";
    readonly doctorId: "doctorId";
    readonly doctorName: "doctorName";
    readonly patientName: "patientName";
    readonly contactPhone: "contactPhone";
    readonly patientType: "patientType";
    readonly appointmentDate: "appointmentDate";
    readonly serial: "serial";
    readonly amount: "amount";
    readonly reason: "reason";
    readonly requestedBy: "requestedBy";
    readonly createdAt: "createdAt";
};
export type CancelledAppointmentOnlineScalarFieldEnum = (typeof CancelledAppointmentOnlineScalarFieldEnum)[keyof typeof CancelledAppointmentOnlineScalarFieldEnum];
export declare const CancelledAppointmentLocalScalarFieldEnum: {
    readonly id: "id";
    readonly appointmentId: "appointmentId";
    readonly doctorId: "doctorId";
    readonly doctorName: "doctorName";
    readonly patientName: "patientName";
    readonly contactPhone: "contactPhone";
    readonly patientType: "patientType";
    readonly appointmentDate: "appointmentDate";
    readonly serial: "serial";
    readonly amount: "amount";
    readonly reason: "reason";
    readonly requestedBy: "requestedBy";
    readonly createdAt: "createdAt";
};
export type CancelledAppointmentLocalScalarFieldEnum = (typeof CancelledAppointmentLocalScalarFieldEnum)[keyof typeof CancelledAppointmentLocalScalarFieldEnum];
export declare const ServedAppointmentScalarFieldEnum: {
    readonly id: "id";
    readonly appointmentId: "appointmentId";
    readonly doctorId: "doctorId";
    readonly doctorName: "doctorName";
    readonly hospitalId: "hospitalId";
    readonly patientName: "patientName";
    readonly patientType: "patientType";
    readonly contactPhone: "contactPhone";
    readonly appointmentDate: "appointmentDate";
    readonly serial: "serial";
    readonly chamberId: "chamberId";
    readonly chamberName: "chamberName";
    readonly bookingType: "bookingType";
    readonly collectionAmount: "collectionAmount";
    readonly paymentAmount: "paymentAmount";
    readonly servedBy: "servedBy";
    readonly servedAt: "servedAt";
    readonly createdBy: "createdBy";
    readonly createdByName: "createdByName";
    readonly createdAt: "createdAt";
};
export type ServedAppointmentScalarFieldEnum = (typeof ServedAppointmentScalarFieldEnum)[keyof typeof ServedAppointmentScalarFieldEnum];
export declare const HospitalOnlineDayScalarFieldEnum: {
    readonly id: "id";
    readonly hospitalId: "hospitalId";
    readonly date: "date";
    readonly kind: "kind";
    readonly onlineTotal: "onlineTotal";
    readonly onlineCount: "onlineCount";
    readonly closedAt: "closedAt";
    readonly createdAt: "createdAt";
};
export type HospitalOnlineDayScalarFieldEnum = (typeof HospitalOnlineDayScalarFieldEnum)[keyof typeof HospitalOnlineDayScalarFieldEnum];
export declare const HospitalPayoutScalarFieldEnum: {
    readonly id: "id";
    readonly hospitalId: "hospitalId";
    readonly amount: "amount";
    readonly method: "method";
    readonly note: "note";
    readonly paidBy: "paidBy";
    readonly paidByName: "paidByName";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
};
export type HospitalPayoutScalarFieldEnum = (typeof HospitalPayoutScalarFieldEnum)[keyof typeof HospitalPayoutScalarFieldEnum];
export declare const DoctorInformationScalarFieldEnum: {
    readonly id: "id";
    readonly doctorId: "doctorId";
    readonly expertise: "expertise";
    readonly expertise_en: "expertise_en";
    readonly timeline: "timeline";
    readonly highlights: "highlights";
    readonly highlights_en: "highlights_en";
    readonly stats: "stats";
    readonly stats_en: "stats_en";
    readonly aboutImage: "aboutImage";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DoctorInformationScalarFieldEnum = (typeof DoctorInformationScalarFieldEnum)[keyof typeof DoctorInformationScalarFieldEnum];
export declare const BlogScalarFieldEnum: {
    readonly id: "id";
    readonly slug: "slug";
    readonly title: "title";
    readonly excerpt: "excerpt";
    readonly content: "content";
    readonly coverImage: "coverImage";
    readonly coverGradient: "coverGradient";
    readonly coverSymbol: "coverSymbol";
    readonly category: "category";
    readonly tags: "tags";
    readonly authorType: "authorType";
    readonly authorName: "authorName";
    readonly authorUserId: "authorUserId";
    readonly doctorId: "doctorId";
    readonly hospitalId: "hospitalId";
    readonly status: "status";
    readonly publishedAt: "publishedAt";
    readonly views: "views";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BlogScalarFieldEnum = (typeof BlogScalarFieldEnum)[keyof typeof BlogScalarFieldEnum];
export declare const LocationPortalSettingScalarFieldEnum: {
    readonly id: "id";
    readonly slug: "slug";
    readonly division: "division";
    readonly district: "district";
    readonly thana: "thana";
    readonly heroImage: "heroImage";
    readonly headline: "headline";
    readonly subheadline: "subheadline";
    readonly description: "description";
    readonly notice: "notice";
    readonly updatedBy: "updatedBy";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LocationPortalSettingScalarFieldEnum = (typeof LocationPortalSettingScalarFieldEnum)[keyof typeof LocationPortalSettingScalarFieldEnum];
export declare const SeoSettingScalarFieldEnum: {
    readonly id: "id";
    readonly pageType: "pageType";
    readonly pageKey: "pageKey";
    readonly title: "title";
    readonly h1: "h1";
    readonly siteName: "siteName";
    readonly description: "description";
    readonly keywords: "keywords";
    readonly ogTitle: "ogTitle";
    readonly ogDescription: "ogDescription";
    readonly ogImage: "ogImage";
    readonly canonicalUrl: "canonicalUrl";
    readonly robots: "robots";
    readonly extraJsonLd: "extraJsonLd";
    readonly updatedBy: "updatedBy";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SeoSettingScalarFieldEnum = (typeof SeoSettingScalarFieldEnum)[keyof typeof SeoSettingScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly rating: "rating";
    readonly reviewerName: "reviewerName";
    readonly reviewerPhone: "reviewerPhone";
    readonly title: "title";
    readonly comment: "comment";
    readonly doctorId: "doctorId";
    readonly hospitalId: "hospitalId";
    readonly status: "status";
    readonly source: "source";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const ContactMessageScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly phone: "phone";
    readonly email: "email";
    readonly topic: "topic";
    readonly subject: "subject";
    readonly message: "message";
    readonly status: "status";
    readonly source: "source";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ContactMessageScalarFieldEnum = (typeof ContactMessageScalarFieldEnum)[keyof typeof ContactMessageScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'JoinRequestType'
 */
export type EnumJoinRequestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JoinRequestType'>;
/**
 * Reference to a field of type 'JoinRequestType[]'
 */
export type ListEnumJoinRequestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JoinRequestType[]'>;
/**
 * Reference to a field of type 'JoinRequestStatus'
 */
export type EnumJoinRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JoinRequestStatus'>;
/**
 * Reference to a field of type 'JoinRequestStatus[]'
 */
export type ListEnumJoinRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JoinRequestStatus[]'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Role'
 */
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
/**
 * Reference to a field of type 'Role[]'
 */
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'Gender'
 */
export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>;
/**
 * Reference to a field of type 'Gender[]'
 */
export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'DoctorStatus'
 */
export type EnumDoctorStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DoctorStatus'>;
/**
 * Reference to a field of type 'DoctorStatus[]'
 */
export type ListEnumDoctorStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DoctorStatus[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'HospitalStatus'
 */
export type EnumHospitalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HospitalStatus'>;
/**
 * Reference to a field of type 'HospitalStatus[]'
 */
export type ListEnumHospitalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HospitalStatus[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Reference to a field of type 'DayOfWeek'
 */
export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>;
/**
 * Reference to a field of type 'DayOfWeek[]'
 */
export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>;
/**
 * Reference to a field of type 'BookingType'
 */
export type EnumBookingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingType'>;
/**
 * Reference to a field of type 'BookingType[]'
 */
export type ListEnumBookingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingType[]'>;
/**
 * Reference to a field of type 'PaymentStatus'
 */
export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>;
/**
 * Reference to a field of type 'PaymentStatus[]'
 */
export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>;
/**
 * Reference to a field of type 'BlogAuthorType'
 */
export type EnumBlogAuthorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogAuthorType'>;
/**
 * Reference to a field of type 'BlogAuthorType[]'
 */
export type ListEnumBlogAuthorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogAuthorType[]'>;
/**
 * Reference to a field of type 'BlogStatus'
 */
export type EnumBlogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogStatus'>;
/**
 * Reference to a field of type 'BlogStatus[]'
 */
export type ListEnumBlogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogStatus[]'>;
/**
 * Reference to a field of type 'SeoPageType'
 */
export type EnumSeoPageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SeoPageType'>;
/**
 * Reference to a field of type 'SeoPageType[]'
 */
export type ListEnumSeoPageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SeoPageType[]'>;
/**
 * Reference to a field of type 'ReviewStatus'
 */
export type EnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus'>;
/**
 * Reference to a field of type 'ReviewStatus[]'
 */
export type ListEnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    joinRequest?: Prisma.JoinRequestOmit;
    user?: Prisma.UserOmit;
    superAdminProfile?: Prisma.SuperAdminProfileOmit;
    chatSession?: Prisma.ChatSessionOmit;
    doctor?: Prisma.DoctorOmit;
    hospital?: Prisma.HospitalOmit;
    creditLedger?: Prisma.CreditLedgerOmit;
    chamber?: Prisma.ChamberOmit;
    doctorSchedule?: Prisma.DoctorScheduleOmit;
    pendingAppointment?: Prisma.PendingAppointmentOmit;
    confirmedAppointment?: Prisma.ConfirmedAppointmentOmit;
    cancelledAppointmentOnline?: Prisma.CancelledAppointmentOnlineOmit;
    cancelledAppointmentLocal?: Prisma.CancelledAppointmentLocalOmit;
    servedAppointment?: Prisma.ServedAppointmentOmit;
    hospitalOnlineDay?: Prisma.HospitalOnlineDayOmit;
    hospitalPayout?: Prisma.HospitalPayoutOmit;
    doctorInformation?: Prisma.DoctorInformationOmit;
    blog?: Prisma.BlogOmit;
    locationPortalSetting?: Prisma.LocationPortalSettingOmit;
    seoSetting?: Prisma.SeoSettingOmit;
    review?: Prisma.ReviewOmit;
    contactMessage?: Prisma.ContactMessageOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map