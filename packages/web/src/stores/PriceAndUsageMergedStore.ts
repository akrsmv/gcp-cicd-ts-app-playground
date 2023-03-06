import { toast } from 'react-toastify'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { GCT_API } from '../ApiEndpointsProvider'

export type LoadDataParams = {
    periodCount: number, periodType: "d" | "m" | "y"
}

export interface PriceAndUsageDataState {
    load: (params: LoadDataParams) => Promise<void>,
    data: {
        prices: []
        usage: []
    }
}

const newData = async (params: LoadDataParams) => {
    const { periodCount, periodType } = params
    try {
        const resPrice = await fetch(`${GCT_API}/prices/bgn?${periodType}=${periodCount}`)
        const resUsage = await fetch(`${GCT_API}/usage/kwh?${periodType}=${periodCount}`)
        // @ts-ignore
        return { data: { prices: await resPrice.json(), usage: await resUsage.json() } }
    } catch (err: any) {
        toast.error(err.message)
        return { data: { prices: [], usage: [] } }
    }
}

export const usePriceAndUsageMergedStore = create<PriceAndUsageDataState>()(
    devtools(
        persist(
            (set) =>
            ({
                load: async (params: LoadDataParams) => set({ ...await newData(params) }),
                data: {
                    prices: [],
                    usage: []
                }
            }),
            {
                name: 'gctapp-price-usage-data-merged',
            }
        )
    )
)