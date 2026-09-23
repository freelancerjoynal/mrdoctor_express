import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model LocationPortalSetting
 *
 */
export type LocationPortalSettingModel = runtime.Types.Result.DefaultSelection<Prisma.$LocationPortalSettingPayload>;
export type AggregateLocationPortalSetting = {
    _count: LocationPortalSettingCountAggregateOutputType | null;
    _min: LocationPortalSettingMinAggregateOutputType | null;
    _max: LocationPortalSettingMaxAggregateOutputType | null;
};
export type LocationPortalSettingMinAggregateOutputType = {
    id: string | null;
    slug: string | null;
    division: string | null;
    district: string | null;
    thana: string | null;
    heroImage: string | null;
    headline: string | null;
    subheadline: string | null;
    description: string | null;
    notice: string | null;
    updatedBy: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LocationPortalSettingMaxAggregateOutputType = {
    id: string | null;
    slug: string | null;
    division: string | null;
    district: string | null;
    thana: string | null;
    heroImage: string | null;
    headline: string | null;
    subheadline: string | null;
    description: string | null;
    notice: string | null;
    updatedBy: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LocationPortalSettingCountAggregateOutputType = {
    id: number;
    slug: number;
    division: number;
    district: number;
    thana: number;
    heroImage: number;
    headline: number;
    subheadline: number;
    description: number;
    notice: number;
    updatedBy: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LocationPortalSettingMinAggregateInputType = {
    id?: true;
    slug?: true;
    division?: true;
    district?: true;
    thana?: true;
    heroImage?: true;
    headline?: true;
    subheadline?: true;
    description?: true;
    notice?: true;
    updatedBy?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LocationPortalSettingMaxAggregateInputType = {
    id?: true;
    slug?: true;
    division?: true;
    district?: true;
    thana?: true;
    heroImage?: true;
    headline?: true;
    subheadline?: true;
    description?: true;
    notice?: true;
    updatedBy?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LocationPortalSettingCountAggregateInputType = {
    id?: true;
    slug?: true;
    division?: true;
    district?: true;
    thana?: true;
    heroImage?: true;
    headline?: true;
    subheadline?: true;
    description?: true;
    notice?: true;
    updatedBy?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LocationPortalSettingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which LocationPortalSetting to aggregate.
     */
    where?: Prisma.LocationPortalSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LocationPortalSettings to fetch.
     */
    orderBy?: Prisma.LocationPortalSettingOrderByWithRelationInput | Prisma.LocationPortalSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.LocationPortalSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LocationPortalSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LocationPortalSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned LocationPortalSettings
    **/
    _count?: true | LocationPortalSettingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LocationPortalSettingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LocationPortalSettingMaxAggregateInputType;
};
export type GetLocationPortalSettingAggregateType<T extends LocationPortalSettingAggregateArgs> = {
    [P in keyof T & keyof AggregateLocationPortalSetting]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLocationPortalSetting[P]> : Prisma.GetScalarType<T[P], AggregateLocationPortalSetting[P]>;
};
export type LocationPortalSettingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LocationPortalSettingWhereInput;
    orderBy?: Prisma.LocationPortalSettingOrderByWithAggregationInput | Prisma.LocationPortalSettingOrderByWithAggregationInput[];
    by: Prisma.LocationPortalSettingScalarFieldEnum[] | Prisma.LocationPortalSettingScalarFieldEnum;
    having?: Prisma.LocationPortalSettingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LocationPortalSettingCountAggregateInputType | true;
    _min?: LocationPortalSettingMinAggregateInputType;
    _max?: LocationPortalSettingMaxAggregateInputType;
};
export type LocationPortalSettingGroupByOutputType = {
    id: string;
    slug: string;
    division: string | null;
    district: string | null;
    thana: string | null;
    heroImage: string | null;
    headline: string | null;
    subheadline: string | null;
    description: string | null;
    notice: string | null;
    updatedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: LocationPortalSettingCountAggregateOutputType | null;
    _min: LocationPortalSettingMinAggregateOutputType | null;
    _max: LocationPortalSettingMaxAggregateOutputType | null;
};
type GetLocationPortalSettingGroupByPayload<T extends LocationPortalSettingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LocationPortalSettingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LocationPortalSettingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LocationPortalSettingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LocationPortalSettingGroupByOutputType[P]>;
}>>;
export type LocationPortalSettingWhereInput = {
    AND?: Prisma.LocationPortalSettingWhereInput | Prisma.LocationPortalSettingWhereInput[];
    OR?: Prisma.LocationPortalSettingWhereInput[];
    NOT?: Prisma.LocationPortalSettingWhereInput | Prisma.LocationPortalSettingWhereInput[];
    id?: Prisma.StringFilter<"LocationPortalSetting"> | string;
    slug?: Prisma.StringFilter<"LocationPortalSetting"> | string;
    division?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    district?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    thana?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    heroImage?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    headline?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    subheadline?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    description?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    notice?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    updatedBy?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LocationPortalSetting"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LocationPortalSetting"> | Date | string;
};
export type LocationPortalSettingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana?: Prisma.SortOrderInput | Prisma.SortOrder;
    heroImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    headline?: Prisma.SortOrderInput | Prisma.SortOrder;
    subheadline?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    notice?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LocationPortalSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.LocationPortalSettingWhereInput | Prisma.LocationPortalSettingWhereInput[];
    OR?: Prisma.LocationPortalSettingWhereInput[];
    NOT?: Prisma.LocationPortalSettingWhereInput | Prisma.LocationPortalSettingWhereInput[];
    division?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    district?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    thana?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    heroImage?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    headline?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    subheadline?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    description?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    notice?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    updatedBy?: Prisma.StringNullableFilter<"LocationPortalSetting"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LocationPortalSetting"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LocationPortalSetting"> | Date | string;
}, "id" | "slug">;
export type LocationPortalSettingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    thana?: Prisma.SortOrderInput | Prisma.SortOrder;
    heroImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    headline?: Prisma.SortOrderInput | Prisma.SortOrder;
    subheadline?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    notice?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LocationPortalSettingCountOrderByAggregateInput;
    _max?: Prisma.LocationPortalSettingMaxOrderByAggregateInput;
    _min?: Prisma.LocationPortalSettingMinOrderByAggregateInput;
};
export type LocationPortalSettingScalarWhereWithAggregatesInput = {
    AND?: Prisma.LocationPortalSettingScalarWhereWithAggregatesInput | Prisma.LocationPortalSettingScalarWhereWithAggregatesInput[];
    OR?: Prisma.LocationPortalSettingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LocationPortalSettingScalarWhereWithAggregatesInput | Prisma.LocationPortalSettingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"LocationPortalSetting"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"LocationPortalSetting"> | string;
    division?: Prisma.StringNullableWithAggregatesFilter<"LocationPortalSetting"> | string | null;
    district?: Prisma.StringNullableWithAggregatesFilter<"LocationPortalSetting"> | string | null;
    thana?: Prisma.StringNullableWithAggregatesFilter<"LocationPortalSetting"> | string | null;
    heroImage?: Prisma.StringNullableWithAggregatesFilter<"LocationPortalSetting"> | string | null;
    headline?: Prisma.StringNullableWithAggregatesFilter<"LocationPortalSetting"> | string | null;
    subheadline?: Prisma.StringNullableWithAggregatesFilter<"LocationPortalSetting"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"LocationPortalSetting"> | string | null;
    notice?: Prisma.StringNullableWithAggregatesFilter<"LocationPortalSetting"> | string | null;
    updatedBy?: Prisma.StringNullableWithAggregatesFilter<"LocationPortalSetting"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LocationPortalSetting"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"LocationPortalSetting"> | Date | string;
};
export type LocationPortalSettingCreateInput = {
    id?: string;
    slug: string;
    division?: string | null;
    district?: string | null;
    thana?: string | null;
    heroImage?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    description?: string | null;
    notice?: string | null;
    updatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LocationPortalSettingUncheckedCreateInput = {
    id?: string;
    slug: string;
    division?: string | null;
    district?: string | null;
    thana?: string | null;
    heroImage?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    description?: string | null;
    notice?: string | null;
    updatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LocationPortalSettingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    heroImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subheadline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LocationPortalSettingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    heroImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subheadline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LocationPortalSettingCreateManyInput = {
    id?: string;
    slug: string;
    division?: string | null;
    district?: string | null;
    thana?: string | null;
    heroImage?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    description?: string | null;
    notice?: string | null;
    updatedBy?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LocationPortalSettingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    heroImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subheadline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LocationPortalSettingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thana?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    heroImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    headline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subheadline?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LocationPortalSettingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    heroImage?: Prisma.SortOrder;
    headline?: Prisma.SortOrder;
    subheadline?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    notice?: Prisma.SortOrder;
    updatedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LocationPortalSettingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    heroImage?: Prisma.SortOrder;
    headline?: Prisma.SortOrder;
    subheadline?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    notice?: Prisma.SortOrder;
    updatedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LocationPortalSettingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    thana?: Prisma.SortOrder;
    heroImage?: Prisma.SortOrder;
    headline?: Prisma.SortOrder;
    subheadline?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    notice?: Prisma.SortOrder;
    updatedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LocationPortalSettingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    division?: boolean;
    district?: boolean;
    thana?: boolean;
    heroImage?: boolean;
    headline?: boolean;
    subheadline?: boolean;
    description?: boolean;
    notice?: boolean;
    updatedBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["locationPortalSetting"]>;
export type LocationPortalSettingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    division?: boolean;
    district?: boolean;
    thana?: boolean;
    heroImage?: boolean;
    headline?: boolean;
    subheadline?: boolean;
    description?: boolean;
    notice?: boolean;
    updatedBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["locationPortalSetting"]>;
export type LocationPortalSettingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    division?: boolean;
    district?: boolean;
    thana?: boolean;
    heroImage?: boolean;
    headline?: boolean;
    subheadline?: boolean;
    description?: boolean;
    notice?: boolean;
    updatedBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["locationPortalSetting"]>;
export type LocationPortalSettingSelectScalar = {
    id?: boolean;
    slug?: boolean;
    division?: boolean;
    district?: boolean;
    thana?: boolean;
    heroImage?: boolean;
    headline?: boolean;
    subheadline?: boolean;
    description?: boolean;
    notice?: boolean;
    updatedBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LocationPortalSettingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "slug" | "division" | "district" | "thana" | "heroImage" | "headline" | "subheadline" | "description" | "notice" | "updatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["locationPortalSetting"]>;
export type $LocationPortalSettingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LocationPortalSetting";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        slug: string;
        division: string | null;
        district: string | null;
        thana: string | null;
        heroImage: string | null;
        headline: string | null;
        subheadline: string | null;
        description: string | null;
        notice: string | null;
        updatedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["locationPortalSetting"]>;
    composites: {};
};
export type LocationPortalSettingGetPayload<S extends boolean | null | undefined | LocationPortalSettingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload, S>;
export type LocationPortalSettingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LocationPortalSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LocationPortalSettingCountAggregateInputType | true;
};
export interface LocationPortalSettingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LocationPortalSetting'];
        meta: {
            name: 'LocationPortalSetting';
        };
    };
    /**
     * Find zero or one LocationPortalSetting that matches the filter.
     * @param {LocationPortalSettingFindUniqueArgs} args - Arguments to find a LocationPortalSetting
     * @example
     * // Get one LocationPortalSetting
     * const locationPortalSetting = await prisma.locationPortalSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationPortalSettingFindUniqueArgs>(args: Prisma.SelectSubset<T, LocationPortalSettingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LocationPortalSettingClient<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one LocationPortalSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationPortalSettingFindUniqueOrThrowArgs} args - Arguments to find a LocationPortalSetting
     * @example
     * // Get one LocationPortalSetting
     * const locationPortalSetting = await prisma.locationPortalSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationPortalSettingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LocationPortalSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LocationPortalSettingClient<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LocationPortalSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPortalSettingFindFirstArgs} args - Arguments to find a LocationPortalSetting
     * @example
     * // Get one LocationPortalSetting
     * const locationPortalSetting = await prisma.locationPortalSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationPortalSettingFindFirstArgs>(args?: Prisma.SelectSubset<T, LocationPortalSettingFindFirstArgs<ExtArgs>>): Prisma.Prisma__LocationPortalSettingClient<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LocationPortalSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPortalSettingFindFirstOrThrowArgs} args - Arguments to find a LocationPortalSetting
     * @example
     * // Get one LocationPortalSetting
     * const locationPortalSetting = await prisma.locationPortalSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationPortalSettingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LocationPortalSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LocationPortalSettingClient<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more LocationPortalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPortalSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LocationPortalSettings
     * const locationPortalSettings = await prisma.locationPortalSetting.findMany()
     *
     * // Get first 10 LocationPortalSettings
     * const locationPortalSettings = await prisma.locationPortalSetting.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const locationPortalSettingWithIdOnly = await prisma.locationPortalSetting.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LocationPortalSettingFindManyArgs>(args?: Prisma.SelectSubset<T, LocationPortalSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a LocationPortalSetting.
     * @param {LocationPortalSettingCreateArgs} args - Arguments to create a LocationPortalSetting.
     * @example
     * // Create one LocationPortalSetting
     * const LocationPortalSetting = await prisma.locationPortalSetting.create({
     *   data: {
     *     // ... data to create a LocationPortalSetting
     *   }
     * })
     *
     */
    create<T extends LocationPortalSettingCreateArgs>(args: Prisma.SelectSubset<T, LocationPortalSettingCreateArgs<ExtArgs>>): Prisma.Prisma__LocationPortalSettingClient<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many LocationPortalSettings.
     * @param {LocationPortalSettingCreateManyArgs} args - Arguments to create many LocationPortalSettings.
     * @example
     * // Create many LocationPortalSettings
     * const locationPortalSetting = await prisma.locationPortalSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LocationPortalSettingCreateManyArgs>(args?: Prisma.SelectSubset<T, LocationPortalSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many LocationPortalSettings and returns the data saved in the database.
     * @param {LocationPortalSettingCreateManyAndReturnArgs} args - Arguments to create many LocationPortalSettings.
     * @example
     * // Create many LocationPortalSettings
     * const locationPortalSetting = await prisma.locationPortalSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many LocationPortalSettings and only return the `id`
     * const locationPortalSettingWithIdOnly = await prisma.locationPortalSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LocationPortalSettingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LocationPortalSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a LocationPortalSetting.
     * @param {LocationPortalSettingDeleteArgs} args - Arguments to delete one LocationPortalSetting.
     * @example
     * // Delete one LocationPortalSetting
     * const LocationPortalSetting = await prisma.locationPortalSetting.delete({
     *   where: {
     *     // ... filter to delete one LocationPortalSetting
     *   }
     * })
     *
     */
    delete<T extends LocationPortalSettingDeleteArgs>(args: Prisma.SelectSubset<T, LocationPortalSettingDeleteArgs<ExtArgs>>): Prisma.Prisma__LocationPortalSettingClient<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one LocationPortalSetting.
     * @param {LocationPortalSettingUpdateArgs} args - Arguments to update one LocationPortalSetting.
     * @example
     * // Update one LocationPortalSetting
     * const locationPortalSetting = await prisma.locationPortalSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LocationPortalSettingUpdateArgs>(args: Prisma.SelectSubset<T, LocationPortalSettingUpdateArgs<ExtArgs>>): Prisma.Prisma__LocationPortalSettingClient<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more LocationPortalSettings.
     * @param {LocationPortalSettingDeleteManyArgs} args - Arguments to filter LocationPortalSettings to delete.
     * @example
     * // Delete a few LocationPortalSettings
     * const { count } = await prisma.locationPortalSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LocationPortalSettingDeleteManyArgs>(args?: Prisma.SelectSubset<T, LocationPortalSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LocationPortalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPortalSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LocationPortalSettings
     * const locationPortalSetting = await prisma.locationPortalSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LocationPortalSettingUpdateManyArgs>(args: Prisma.SelectSubset<T, LocationPortalSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LocationPortalSettings and returns the data updated in the database.
     * @param {LocationPortalSettingUpdateManyAndReturnArgs} args - Arguments to update many LocationPortalSettings.
     * @example
     * // Update many LocationPortalSettings
     * const locationPortalSetting = await prisma.locationPortalSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more LocationPortalSettings and only return the `id`
     * const locationPortalSettingWithIdOnly = await prisma.locationPortalSetting.updateManyAndReturn({
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
    updateManyAndReturn<T extends LocationPortalSettingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LocationPortalSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one LocationPortalSetting.
     * @param {LocationPortalSettingUpsertArgs} args - Arguments to update or create a LocationPortalSetting.
     * @example
     * // Update or create a LocationPortalSetting
     * const locationPortalSetting = await prisma.locationPortalSetting.upsert({
     *   create: {
     *     // ... data to create a LocationPortalSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LocationPortalSetting we want to update
     *   }
     * })
     */
    upsert<T extends LocationPortalSettingUpsertArgs>(args: Prisma.SelectSubset<T, LocationPortalSettingUpsertArgs<ExtArgs>>): Prisma.Prisma__LocationPortalSettingClient<runtime.Types.Result.GetResult<Prisma.$LocationPortalSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of LocationPortalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPortalSettingCountArgs} args - Arguments to filter LocationPortalSettings to count.
     * @example
     * // Count the number of LocationPortalSettings
     * const count = await prisma.locationPortalSetting.count({
     *   where: {
     *     // ... the filter for the LocationPortalSettings we want to count
     *   }
     * })
    **/
    count<T extends LocationPortalSettingCountArgs>(args?: Prisma.Subset<T, LocationPortalSettingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LocationPortalSettingCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a LocationPortalSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPortalSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationPortalSettingAggregateArgs>(args: Prisma.Subset<T, LocationPortalSettingAggregateArgs>): Prisma.PrismaPromise<GetLocationPortalSettingAggregateType<T>>;
    /**
     * Group by LocationPortalSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationPortalSettingGroupByArgs} args - Group by arguments.
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
    groupBy<T extends LocationPortalSettingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LocationPortalSettingGroupByArgs['orderBy'];
    } : {
        orderBy?: LocationPortalSettingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LocationPortalSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationPortalSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the LocationPortalSetting model
     */
    readonly fields: LocationPortalSettingFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for LocationPortalSetting.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__LocationPortalSettingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the LocationPortalSetting model
 */
export interface LocationPortalSettingFieldRefs {
    readonly id: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly slug: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly division: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly district: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly thana: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly heroImage: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly headline: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly subheadline: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly description: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly notice: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly updatedBy: Prisma.FieldRef<"LocationPortalSetting", 'String'>;
    readonly createdAt: Prisma.FieldRef<"LocationPortalSetting", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"LocationPortalSetting", 'DateTime'>;
}
/**
 * LocationPortalSetting findUnique
 */
export type LocationPortalSettingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * Filter, which LocationPortalSetting to fetch.
     */
    where: Prisma.LocationPortalSettingWhereUniqueInput;
};
/**
 * LocationPortalSetting findUniqueOrThrow
 */
export type LocationPortalSettingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * Filter, which LocationPortalSetting to fetch.
     */
    where: Prisma.LocationPortalSettingWhereUniqueInput;
};
/**
 * LocationPortalSetting findFirst
 */
export type LocationPortalSettingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * Filter, which LocationPortalSetting to fetch.
     */
    where?: Prisma.LocationPortalSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LocationPortalSettings to fetch.
     */
    orderBy?: Prisma.LocationPortalSettingOrderByWithRelationInput | Prisma.LocationPortalSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for LocationPortalSettings.
     */
    cursor?: Prisma.LocationPortalSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LocationPortalSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LocationPortalSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of LocationPortalSettings.
     */
    distinct?: Prisma.LocationPortalSettingScalarFieldEnum | Prisma.LocationPortalSettingScalarFieldEnum[];
};
/**
 * LocationPortalSetting findFirstOrThrow
 */
export type LocationPortalSettingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * Filter, which LocationPortalSetting to fetch.
     */
    where?: Prisma.LocationPortalSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LocationPortalSettings to fetch.
     */
    orderBy?: Prisma.LocationPortalSettingOrderByWithRelationInput | Prisma.LocationPortalSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for LocationPortalSettings.
     */
    cursor?: Prisma.LocationPortalSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LocationPortalSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LocationPortalSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of LocationPortalSettings.
     */
    distinct?: Prisma.LocationPortalSettingScalarFieldEnum | Prisma.LocationPortalSettingScalarFieldEnum[];
};
/**
 * LocationPortalSetting findMany
 */
export type LocationPortalSettingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * Filter, which LocationPortalSettings to fetch.
     */
    where?: Prisma.LocationPortalSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LocationPortalSettings to fetch.
     */
    orderBy?: Prisma.LocationPortalSettingOrderByWithRelationInput | Prisma.LocationPortalSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing LocationPortalSettings.
     */
    cursor?: Prisma.LocationPortalSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LocationPortalSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LocationPortalSettings.
     */
    skip?: number;
    distinct?: Prisma.LocationPortalSettingScalarFieldEnum | Prisma.LocationPortalSettingScalarFieldEnum[];
};
/**
 * LocationPortalSetting create
 */
export type LocationPortalSettingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * The data needed to create a LocationPortalSetting.
     */
    data: Prisma.XOR<Prisma.LocationPortalSettingCreateInput, Prisma.LocationPortalSettingUncheckedCreateInput>;
};
/**
 * LocationPortalSetting createMany
 */
export type LocationPortalSettingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many LocationPortalSettings.
     */
    data: Prisma.LocationPortalSettingCreateManyInput | Prisma.LocationPortalSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * LocationPortalSetting createManyAndReturn
 */
export type LocationPortalSettingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * The data used to create many LocationPortalSettings.
     */
    data: Prisma.LocationPortalSettingCreateManyInput | Prisma.LocationPortalSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * LocationPortalSetting update
 */
export type LocationPortalSettingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * The data needed to update a LocationPortalSetting.
     */
    data: Prisma.XOR<Prisma.LocationPortalSettingUpdateInput, Prisma.LocationPortalSettingUncheckedUpdateInput>;
    /**
     * Choose, which LocationPortalSetting to update.
     */
    where: Prisma.LocationPortalSettingWhereUniqueInput;
};
/**
 * LocationPortalSetting updateMany
 */
export type LocationPortalSettingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update LocationPortalSettings.
     */
    data: Prisma.XOR<Prisma.LocationPortalSettingUpdateManyMutationInput, Prisma.LocationPortalSettingUncheckedUpdateManyInput>;
    /**
     * Filter which LocationPortalSettings to update
     */
    where?: Prisma.LocationPortalSettingWhereInput;
    /**
     * Limit how many LocationPortalSettings to update.
     */
    limit?: number;
};
/**
 * LocationPortalSetting updateManyAndReturn
 */
export type LocationPortalSettingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * The data used to update LocationPortalSettings.
     */
    data: Prisma.XOR<Prisma.LocationPortalSettingUpdateManyMutationInput, Prisma.LocationPortalSettingUncheckedUpdateManyInput>;
    /**
     * Filter which LocationPortalSettings to update
     */
    where?: Prisma.LocationPortalSettingWhereInput;
    /**
     * Limit how many LocationPortalSettings to update.
     */
    limit?: number;
};
/**
 * LocationPortalSetting upsert
 */
export type LocationPortalSettingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * The filter to search for the LocationPortalSetting to update in case it exists.
     */
    where: Prisma.LocationPortalSettingWhereUniqueInput;
    /**
     * In case the LocationPortalSetting found by the `where` argument doesn't exist, create a new LocationPortalSetting with this data.
     */
    create: Prisma.XOR<Prisma.LocationPortalSettingCreateInput, Prisma.LocationPortalSettingUncheckedCreateInput>;
    /**
     * In case the LocationPortalSetting was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.LocationPortalSettingUpdateInput, Prisma.LocationPortalSettingUncheckedUpdateInput>;
};
/**
 * LocationPortalSetting delete
 */
export type LocationPortalSettingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
    /**
     * Filter which LocationPortalSetting to delete.
     */
    where: Prisma.LocationPortalSettingWhereUniqueInput;
};
/**
 * LocationPortalSetting deleteMany
 */
export type LocationPortalSettingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which LocationPortalSettings to delete
     */
    where?: Prisma.LocationPortalSettingWhereInput;
    /**
     * Limit how many LocationPortalSettings to delete.
     */
    limit?: number;
};
/**
 * LocationPortalSetting without action
 */
export type LocationPortalSettingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationPortalSetting
     */
    select?: Prisma.LocationPortalSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LocationPortalSetting
     */
    omit?: Prisma.LocationPortalSettingOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=LocationPortalSetting.d.ts.map