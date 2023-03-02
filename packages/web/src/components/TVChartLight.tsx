import { createChart, ColorType } from 'lightweight-charts'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LoadDataParams, usePriceStore } from '../stores/PricesDataStore'

export const TVChartLight = (props: any) => {
    const {
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props
    const priceStore = usePriceStore()

    const [data, setData] = useState(priceStore.data)


    // make sure you rerender when store updates
    useEffect(() => usePriceStore.subscribe(
        state => setData(state.data)
    ), []
    )

    const chartContainerRef = useRef<HTMLDivElement>(null)
        // const a: TimeScaleOptions
    useEffect(
        () => {
            if (!chartContainerRef?.current) {
                return () => { }
            }
            const { current } = chartContainerRef

            const handleResize = () => {
                chart.applyOptions({ width: current.clientWidth })
            }

            const chart = createChart(current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                timeScale: {
                    lockVisibleTimeRangeOnResize: true,
                    // timeVisible: true
                }
                // width: current.clientWidth,
                // height: 300
                // handleScale: true
            })
            chart.timeScale().fitContent()

            const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor })

            //@ts-ignore Ts type cnfused it cannot accept number values, while the lib is supporting it 
            newSeries.setData(data)

            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)

                chart.remove()
            }
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    )

    const loadData = useCallback((params: LoadDataParams) => priceStore.load(params), [])

    return (
        <div ref={chartContainerRef}>
            <button onClick={async () => await loadData({ count: 1, type: "d" })}>day ago</button>
            <button onClick={async () => await loadData({ count: 2, type: "d" })}>2 days ago</button>
            <button onClick={async () => await loadData({ count: 1, type: "m" })}>1 month ago</button>
            <button onClick={async () => await loadData({ count: 2, type: "y" })}>2 years ago</button>
            {/* <GCTContainerFullSpace> */}
                {/* <div ref={chartContainerRef} /> */}
            {/* </GCTContainerFullSpace> */}
        </div>
    )
}