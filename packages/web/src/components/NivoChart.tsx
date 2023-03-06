// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'
import { useEffect, useState } from 'react'
import { NivoContainerStyled } from '../components-layout/Theme'
import { usePriceAndUsageMergedStore } from '../stores/PriceAndUsageMergedStore'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const ElecticityChart = (props: any) => {
    // make sure you rerender when any of the stores used is updated update
    const priceAndUsageMergedStore = usePriceAndUsageMergedStore()
    const initialData = [{ id: "El.Price", data: [{ x: "A", y: 123 }] }]
    const [data, setData] = useState([{ id: "El.Price", data: initialData }])

    useEffect(() => usePriceAndUsageMergedStore.subscribe(
        state => {
            console.log("rendm: ", state)
            setData([
                {
                    id: "El.Price",
                    // @ts-ignore
                    data: state.data.prices.map(d => ({ x: new Date(d.timestamp).toLocaleString(), y: d.value }))
                }])
        }
    ), [])
    // pull necessary utilities from global model
    // const loadData = useCallback((loadDataParams: LoadDataParams) => priceStore.load(loadDataParams), [priceStore])

    // defend against no data in store (for some reason!? TODO)
    // useEffect(() => {
    //     if (!priceStore.data.length) {
    //         loadData({periodCount:1, periodType:'d'})
    //     }
    // },[])

    // const [priceData, setPricedata] = useState<{ id: string, data: { x: string, y: any }[] }[]>([{ id: "El. Price", data: priceStore.data }])//[{id:"El. Price", data: []}]
    // /**
    //  * @param year 
    //  * @param month 
    //  * @returns The total number of days in a particular month
    //  */
    // const getDaysInMonth = (year: number, month: number) => {
    //     return new Date(year, month, 0).getDate();
    // }
    // /**
    //  * @param year 
    //  * @param month 
    //  * @returns The total number of days in a particular month
    //  */
    //     const getDaysInYear = (year: number) => {
    //         let sumdays = 0
    //         for (let i = 1; i <= 12; i ++) {
    //             sumdays += new Date(year, i, 0).getDate();
    //         }
    //         return sumdays
    //     }
    // useEffect(() => usePriceStore.subscribe(
    //     state => {
    //         console.log("refreshiin ", state.data)

    // const totalDays = state.data.length / 24

    // const chartMappedData = state.data.map(d => {
    //     // @ts-ignore       
    //     // const pointDate = new Date(Number(d.time + '000'))
    //     // const isoDate = pointDate.toISOString()
    //     // const ampm = pointDate.toLocaleTimeString().slice(-2)
    //     // const hours = isoDate.slice(11, 13)
    //     // const days = isoDate.slice(8, 10)
    //     // const month = isoDate.slice(5, 7)
    //     // const year = isoDate.slice(0, 4)

    //     // let xAxis = hours + ampm
    //     // if (totalDays > 24 && totalDays <= getDaysInMonth(Number(year), Number(month))) {
    //     //     xAxis = days + "," + xAxis
    //     // }
    //     // if (totalDays > getDaysInMonth(Number(year), Number(month)) && totalDays <= getDaysInYear(Number(year))) {
    //     //     xAxis = month + "," + days + "," + xAxis
    //     // }
    //     // if (totalDays > getDaysInYear(Number(year))) {
    //     //     xAxis = year + "," + month + "," + days + "," + xAxis
    //     // }

    //     // const 
    //     // @ts-ignore    //new Date(Number(d.time + '000')).toISOString().slice(11, 15)    
    //     return { x: new Date(Number(d.time + '000')).toISOString(), y: d.value }
    // })
    // console.log("CLIENT DATA", chartMappedData)
    // setPricedata([{ id: "El. Price", data: state.data }])
    //     }
    // ), [])

    return (

        <NivoContainerStyled>
            {/* @ts-ignore */}
            <ResponsiveLine
                colors={{ scheme: 'set2' }}
                borderColor={{ theme: 'background' }}
                data={data}
                margin={{ top: 50, right: 180, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                // useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        // effects: [
                        //     {
                        //         on: 'hover',
                        //         style: {
                        //             itemBackground: 'rgba(0, 0, 0, .03)',
                        //             itemOpacity: 1
                        //         }
                        //     }
                        // ]
                    }
                ]}
            />
        </NivoContainerStyled>
    )
}