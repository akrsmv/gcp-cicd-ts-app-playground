import { useHover } from "../hooks/useHover"
import { BarChartContentStyled } from "./layout/Theme"

export const BarChart = (props: any) => {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>()
    return (
        <BarChartContentStyled ref={hoverRef}>
            TODO: bar chart visualizing daily best price utilization?
        </BarChartContentStyled>
    )

}