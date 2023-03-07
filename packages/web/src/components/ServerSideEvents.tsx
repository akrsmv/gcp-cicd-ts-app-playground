import { useHover } from "../hooks/useHover"
import { SSEContentStyled } from "./layout/Theme"

export const ServerSideEvents = (props: any) => {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>()
    return (
        <SSEContentStyled ref={hoverRef}>
            TODO: Suggestions/News from SSE
        </SSEContentStyled>
    )

}