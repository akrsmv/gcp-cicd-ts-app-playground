import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { GCT_API } from '../ApiEndpointsProvider'

export type LoadDataParams = {
    count: number, type: "d" | "m" | "y"
}

export interface PriceDataState {
    load: (params: LoadDataParams) => Promise<void>,
    data: []
}

const newData = async (params: LoadDataParams) => {
    const { count, type } = params
    const res = await fetch(`${GCT_API}/prices?${type}=${count}`)
    return await res.json()
}

export const usePriceStore = create<PriceDataState>()(
    devtools(
        persist(
            // subscribeWithSelector(
                (set) =>
                ({
                    load: async (params: LoadDataParams) =>
                        set(Object.assign({}, { data: await newData(params) }), true),
                    data: []
                })
                // )
                ,
            {
                name: 'gctapp-price-data',
            }
        )
    )
)