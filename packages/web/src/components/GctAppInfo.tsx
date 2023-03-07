import { useEffect, useState } from "react"
import { useHover } from "../hooks/useHover"
import { useWhatIsHoveredStore } from "../stores/HoveredElementStore"

export const hoveredElementsOfInterest = new Map<string, string>(
    [
        ["main-chart", "Both price and usage data are visualized with trading view library. "],
        ["pie-chart", "What energy was consumed during high price hours. We could calculate and push this info realtime"],
        ["avg-usage-chart", "Only 5 days of average data shown. Once usage data is pushed in redis, its daily average is being calculated."],
        ["bar-chart", "Do you have an idea about a chart or component to place here?"],
        ["sse-suggestions", "TODO: Server pushing events(SSE), new price/usage data, any notifications etc."],
        ["dev-side-panel", "For good dev experience - easily generate, test, with different data."],
        ["gct-app-info-panel", "This Panel shows brief description for currently hovered part of gctapp"]
    ]
)

export const GctAppInfo = () => {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();
    const hoveredStore = useWhatIsHoveredStore()
    const [state, setState] = useState(hoveredStore.hoveredElementDesc)

    useEffect(
        () => useWhatIsHoveredStore.subscribe(
            (state) => state.hoveredElementDesc, // zustand selector middleware, i.e subscribe only for changes on this property 
            setState
        ), []
    )
    return (
        <div ref={hoverRef}>
            <div id="gct-app-info-panel">{"#>"} {state} </div>
        </div>
    )
}