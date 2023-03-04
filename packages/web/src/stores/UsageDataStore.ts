import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { GCT_API } from '../ApiEndpointsProvider'
import { LoadDataParams } from './PricesDataStore'

interface UsageDataState {
    load: (params: LoadDataParams) => Promise<void>,
    data: []
}

const newData = async (params: LoadDataParams) => {
    const { periodCount, periodType } = params
    const res = await fetch(`${GCT_API}/usage?${periodType}=${periodCount}&u=kwh`)
    return await res.json()
}

export const useUsageStore = create<UsageDataState>()(
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
                name: 'gctapp-usage-data',
            }
        )
    )
)