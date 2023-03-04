import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { GCT_API } from '../ApiEndpointsProvider'

export type LoadDataParams = {
    periodCount: number, periodType: "d" | "m" | "y"
}

export interface PriceDataState {
    load: (params: LoadDataParams) => Promise<void>,
    data: []
}

const newData = async (params: LoadDataParams) => {
    const { periodCount, periodType } = params
    const res = await fetch(`${GCT_API}/prices?${periodType}=${periodCount}&u=bgn`)
    return await res.json()
}

export const usePriceStore = create<PriceDataState>()(
    devtools(
        persist(
            (set) =>
            ({
                load: async (params: LoadDataParams) =>
                    set(Object.assign({}, { data: await newData(params) }), true),
                data: []
            }),
            {
                name: 'gctapp-price-data',
            }
        )
    )
)