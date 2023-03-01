import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type LoadDataParams = {
    count: number, type: "d" | "m" | "y"
}

export interface PriceDataState {
    load: (params: LoadDataParams) => Promise<void>,
    data: []
}

const newData = async (params: LoadDataParams) => {
    const { count, type } = params
    const res = await fetch(`http://localhost:28080/electricity/prices?${type}=${count}`)
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