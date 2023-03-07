import { toast } from 'react-toastify'
import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { GCT_API } from '../ApiEndpointsProvider'

export type LoadDataParams = {
    periodCount: number, periodType: "d" | "m" | "y"
}

export interface PriceAndUsageDataState {
    load: (params: LoadDataParams) => Promise<void>,
    data: {
        prices: []
        usage: []
    },
    daily_avg: {
        prices: []
        usage: []
    }
}

const newData = async (params: LoadDataParams) => {
    const { periodCount, periodType } = params
    try {
        const resPrice = await fetch(`${GCT_API}/prices/bgn?${periodType}=${periodCount}`)
        const resUsage = await fetch(`${GCT_API}/usage/kwh?${periodType}=${periodCount}`)
        const resPriceAvg = await fetch(`${GCT_API}/prices:daily_avg/bgn?${periodType}=${periodCount}&l=5`)
        const resUsageAvg = await fetch(`${GCT_API}/usage:daily_avg/kwh?${periodType}=${periodCount}&l=5`)
        // @ts-ignore
        return {
            data: { prices: await resPrice.json(), usage: await resUsage.json() },
            daily_avg: { prices: await resPriceAvg.json(), usage: await resUsageAvg.json() }
        }
    } catch (err: any) {
        toast.error(err.message)
        return { data: { prices: [], usage: [] }, daily_avg: { prices: [], usage: [] } }
    }

    // TODO make them in separate try/catches so that we return what we can, i.e not to blow on the first one
    // return Object.assign({},
    //     { data: { prices: pricesResponse } },
    //     { data: { usage: usageResponse } },
    //     { daily_avg: { prices: pricesAvgResponse } },
    //     { daily_avg: { usage: usageAvgResponse } }
    // })
}

export const usePriceAndUsageMergedStore = create<PriceAndUsageDataState>()(
    devtools(
        persist( // TODO even saving to local storage, currently data is always being queried
        // TODO cache queries and check for existance in local storage
            subscribeWithSelector(
                (set) =>
                ({
                    load: async (params: LoadDataParams) => set({ ...await newData(params) }),
                    data: {
                        prices: [],
                        usage: []
                    },
                    daily_avg: {
                        prices: [],
                        usage: []
                    }
                })
            ),
            {
                name: 'gctapp-price-usage-data-merged',
            }
        )
    )
)