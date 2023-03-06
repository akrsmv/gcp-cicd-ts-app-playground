import { createChart, ColorType } from 'lightweight-charts'
import { useEffect, useRef, useState } from 'react'
import { usePriceAndUsageMergedStore } from '../stores/PriceAndUsageMergedStore'

export const TVChartLight = (props: any) => {
    const {
        colors: {
            backgroundColor = 'white',
            lineColor = 'rgba(86, 171, 227, 0.24)',
            lineColor1 = 'rgba(44, 231, 127, 0.24)',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor1 = 'rgba(44, 231, 127, 0.24)',
            areaBottomColor = 'rgba(86, 171, 227, 0.24)',
        } = {},
    } = props

    const chartOptions = {

        rightPriceScale: {
            visible: true,
        },
        leftPriceScale: {
            visible: true,
        },
        crosshair: {
            mode: 0, // CrosshairMode.Normal
        }
    }

    const priceAndUsageMergedStore = usePriceAndUsageMergedStore()

    const [data, setData] = useState(priceAndUsageMergedStore.data)

    // rerender when store updates
    useEffect(() => usePriceAndUsageMergedStore.subscribe(
        state => setData(state.data)
    ), [])

    const chartContainerRef = useRef<HTMLDivElement>(null)

    useEffect(
        () => {
            if (!chartContainerRef?.current) {
                return () => { }
            }
            const { current } = chartContainerRef

            const handleResize = () => {
                chart.applyOptions(chartOptions)
            }

            const chart = createChart(current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                timeScale: {
                    lockVisibleTimeRangeOnResize: true,
                    timeVisible: true
                },
                handleScale: true,
                handleScroll: true,
            })
            chart.timeScale().fitContent()
            chart.applyOptions(chartOptions)

            // add prices data, if available
            if (Array.isArray(data.prices) && data.prices.length) {
                chart.addAreaSeries(
                    { lineColor, topColor: areaTopColor, bottomColor: areaBottomColor })
                    //@ts-ignore    
                    .setData(data.prices.map(d => ({ time: d.timestamp / 1000, value: d.value })))
            }

            // add usage data, if available
            if (Array.isArray(data.usage) && data.usage.length) {
                chart.addAreaSeries(
                    { lineColor: lineColor1, topColor: areaTopColor, bottomColor: areaBottomColor1, priceScaleId: 'left' })
                    //@ts-ignore    
                    .setData(data.usage.map(d => ({ time: d.timestamp / 1000, value: d.value })))
            }


            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
                chart.remove()
            }
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    )

    return (
        <div id='full-space' ref={chartContainerRef} />
    )
}