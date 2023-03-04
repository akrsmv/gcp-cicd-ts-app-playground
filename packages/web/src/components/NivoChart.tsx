// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'
import { NivoContainerStyled } from '../components-layout/Theme'

const data = [
    {
        "id": "japan",
        "color": "hsl(299, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 195
            },
            {
                "x": "helicopter",
                "y": 105
            },
            {
                "x": "boat",
                "y": 99
            },
            {
                "x": "train",
                "y": 83
            },
            {
                "x": "subway",
                "y": 52
            },
            {
                "x": "bus",
                "y": 63
            },
            {
                "x": "car",
                "y": 274
            },
            {
                "x": "moto",
                "y": 290
            },
            {
                "x": "bicycle",
                "y": 103
            },
            {
                "x": "horse",
                "y": 150
            },
            {
                "x": "skateboard",
                "y": 62
            },
            {
                "x": "others",
                "y": 231
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(93, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 170
            },
            {
                "x": "helicopter",
                "y": 204
            },
            {
                "x": "boat",
                "y": 95
            },
            {
                "x": "train",
                "y": 133
            },
            {
                "x": "subway",
                "y": 47
            },
            {
                "x": "bus",
                "y": 167
            },
            {
                "x": "car",
                "y": 224
            },
            {
                "x": "moto",
                "y": 59
            },
            {
                "x": "bicycle",
                "y": 268
            },
            {
                "x": "horse",
                "y": 222
            },
            {
                "x": "skateboard",
                "y": 95
            },
            {
                "x": "others",
                "y": 147
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(262, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 77
            },
            {
                "x": "helicopter",
                "y": 25
            },
            {
                "x": "boat",
                "y": 174
            },
            {
                "x": "train",
                "y": 255
            },
            {
                "x": "subway",
                "y": 229
            },
            {
                "x": "bus",
                "y": 246
            },
            {
                "x": "car",
                "y": 36
            },
            {
                "x": "moto",
                "y": 153
            },
            {
                "x": "bicycle",
                "y": 98
            },
            {
                "x": "horse",
                "y": 49
            },
            {
                "x": "skateboard",
                "y": 32
            },
            {
                "x": "others",
                "y": 59
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(256, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 58
            },
            {
                "x": "helicopter",
                "y": 100
            },
            {
                "x": "boat",
                "y": 69
            },
            {
                "x": "train",
                "y": 296
            },
            {
                "x": "subway",
                "y": 107
            },
            {
                "x": "bus",
                "y": 119
            },
            {
                "x": "car",
                "y": 218
            },
            {
                "x": "moto",
                "y": 28
            },
            {
                "x": "bicycle",
                "y": 6
            },
            {
                "x": "horse",
                "y": 242
            },
            {
                "x": "skateboard",
                "y": 61
            },
            {
                "x": "others",
                "y": 191
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(276, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 118
            },
            {
                "x": "helicopter",
                "y": 78
            },
            {
                "x": "boat",
                "y": 171
            },
            {
                "x": "train",
                "y": 233
            },
            {
                "x": "subway",
                "y": 148
            },
            {
                "x": "bus",
                "y": 214
            },
            {
                "x": "car",
                "y": 290
            },
            {
                "x": "moto",
                "y": 80
            },
            {
                "x": "bicycle",
                "y": 192
            },
            {
                "x": "horse",
                "y": 216
            },
            {
                "x": "skateboard",
                "y": 198
            },
            {
                "x": "others",
                "y": 169
            }
        ]
    }
]

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const ElecticityChart = (props: any) => (
    <NivoContainerStyled>
        {/* @ts-ignore */}
        <ResponsiveLine
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
                legend: 'transportation',
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
)