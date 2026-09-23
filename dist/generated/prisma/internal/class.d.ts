import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more JoinRequests
   * const joinRequests = await prisma.joinRequest.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more JoinRequests
 * const joinRequests = await prisma.joinRequest.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.joinRequest`: Exposes CRUD operations for the **JoinRequest** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more JoinRequests
  * const joinRequests = await prisma.joinRequest.findMany()
  * ```
  */
    get joinRequest(): Prisma.JoinRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.user`: Exposes CRUD operations for the **User** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Users
      * const users = await prisma.user.findMany()
      * ```
      */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.superAdminProfile`: Exposes CRUD operations for the **SuperAdminProfile** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SuperAdminProfiles
      * const superAdminProfiles = await prisma.superAdminProfile.findMany()
      * ```
      */
    get superAdminProfile(): Prisma.SuperAdminProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.chatSession`: Exposes CRUD operations for the **ChatSession** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ChatSessions
      * const chatSessions = await prisma.chatSession.findMany()
      * ```
      */
    get chatSession(): Prisma.ChatSessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.doctor`: Exposes CRUD operations for the **Doctor** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Doctors
      * const doctors = await prisma.doctor.findMany()
      * ```
      */
    get doctor(): Prisma.DoctorDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.hospital`: Exposes CRUD operations for the **Hospital** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Hospitals
      * const hospitals = await prisma.hospital.findMany()
      * ```
      */
    get hospital(): Prisma.HospitalDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.creditLedger`: Exposes CRUD operations for the **CreditLedger** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CreditLedgers
      * const creditLedgers = await prisma.creditLedger.findMany()
      * ```
      */
    get creditLedger(): Prisma.CreditLedgerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.chamber`: Exposes CRUD operations for the **Chamber** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Chambers
      * const chambers = await prisma.chamber.findMany()
      * ```
      */
    get chamber(): Prisma.ChamberDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.doctorSchedule`: Exposes CRUD operations for the **DoctorSchedule** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DoctorSchedules
      * const doctorSchedules = await prisma.doctorSchedule.findMany()
      * ```
      */
    get doctorSchedule(): Prisma.DoctorScheduleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.pendingAppointment`: Exposes CRUD operations for the **PendingAppointment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PendingAppointments
      * const pendingAppointments = await prisma.pendingAppointment.findMany()
      * ```
      */
    get pendingAppointment(): Prisma.PendingAppointmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.confirmedAppointment`: Exposes CRUD operations for the **ConfirmedAppointment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ConfirmedAppointments
      * const confirmedAppointments = await prisma.confirmedAppointment.findMany()
      * ```
      */
    get confirmedAppointment(): Prisma.ConfirmedAppointmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cancelledAppointmentOnline`: Exposes CRUD operations for the **CancelledAppointmentOnline** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CancelledAppointmentOnlines
      * const cancelledAppointmentOnlines = await prisma.cancelledAppointmentOnline.findMany()
      * ```
      */
    get cancelledAppointmentOnline(): Prisma.CancelledAppointmentOnlineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cancelledAppointmentLocal`: Exposes CRUD operations for the **CancelledAppointmentLocal** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CancelledAppointmentLocals
      * const cancelledAppointmentLocals = await prisma.cancelledAppointmentLocal.findMany()
      * ```
      */
    get cancelledAppointmentLocal(): Prisma.CancelledAppointmentLocalDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.servedAppointment`: Exposes CRUD operations for the **ServedAppointment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ServedAppointments
      * const servedAppointments = await prisma.servedAppointment.findMany()
      * ```
      */
    get servedAppointment(): Prisma.ServedAppointmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.hospitalOnlineDay`: Exposes CRUD operations for the **HospitalOnlineDay** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more HospitalOnlineDays
      * const hospitalOnlineDays = await prisma.hospitalOnlineDay.findMany()
      * ```
      */
    get hospitalOnlineDay(): Prisma.HospitalOnlineDayDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.hospitalPayout`: Exposes CRUD operations for the **HospitalPayout** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more HospitalPayouts
      * const hospitalPayouts = await prisma.hospitalPayout.findMany()
      * ```
      */
    get hospitalPayout(): Prisma.HospitalPayoutDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.doctorInformation`: Exposes CRUD operations for the **DoctorInformation** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DoctorInformations
      * const doctorInformations = await prisma.doctorInformation.findMany()
      * ```
      */
    get doctorInformation(): Prisma.DoctorInformationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.blog`: Exposes CRUD operations for the **Blog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Blogs
      * const blogs = await prisma.blog.findMany()
      * ```
      */
    get blog(): Prisma.BlogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.locationPortalSetting`: Exposes CRUD operations for the **LocationPortalSetting** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more LocationPortalSettings
      * const locationPortalSettings = await prisma.locationPortalSetting.findMany()
      * ```
      */
    get locationPortalSetting(): Prisma.LocationPortalSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.seoSetting`: Exposes CRUD operations for the **SeoSetting** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SeoSettings
      * const seoSettings = await prisma.seoSetting.findMany()
      * ```
      */
    get seoSetting(): Prisma.SeoSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.review`: Exposes CRUD operations for the **Review** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reviews
      * const reviews = await prisma.review.findMany()
      * ```
      */
    get review(): Prisma.ReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.contactMessage`: Exposes CRUD operations for the **ContactMessage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ContactMessages
      * const contactMessages = await prisma.contactMessage.findMany()
      * ```
      */
    get contactMessage(): Prisma.ContactMessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map