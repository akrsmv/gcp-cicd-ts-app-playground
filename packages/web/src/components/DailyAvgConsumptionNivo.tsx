import { ResponsiveLine } from '@nivo/line'
import { useEffect, useState } from 'react'
import { ContentStyled1, NivoContainerStyled } from '../components/layout/Theme'
import { useHover } from '../hooks/useHover'
import { usePriceAndUsageMergedStore } from '../stores/PriceAndUsageMergedStore'

export const DailyAvgConsumptionNivo = (props: any) => {
    const [data, setData] = useState([{ id: "Last 60 hours AVG usage", data: [{ "x": '0', "y": 0 }] }])

    useEffect(() => usePriceAndUsageMergedStore.subscribe(
        state => state.daily_avg.usage,
        avg_usage => {
            setData([
                {
                    id: "Last 60 hours AVG usage", // 5*12 hours = 60 (this component registers for 12h average time series)
                    data: avg_usage.map(d => {
                        // @ts-ignore TODO define td interface for data type, and remove ts-ignore
                        return { x: new Date(d.timestamp).toLocaleTimeString(), y: d.value }
                    })
                }])
        }
    ), [])
    
    // for our info panel, register globally if this element is hovered
    const [hoverRef, isHovered] = useHover<HTMLDivElement>()
    return (
        <ContentStyled1 ref={hoverRef}>
            <NivoContainerStyled >
                {/* @ts-ignore */}
                <ResponsiveLine
                    colors={{ scheme: 'set2' }}
                    borderColor={{ theme: 'background' }}
                    data={data}
                    margin={{ top: 35, right: 35, bottom: 35, left: 35 }}
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
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'top-left',
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
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </NivoContainerStyled>
        </ContentStyled1>
    )
}