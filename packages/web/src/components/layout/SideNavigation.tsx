import { DevAdminSideBar } from "../../components/DevAdminSideBar";
import { useHover } from "../../hooks/useHover";
import { SideBarStyled } from "./Theme";

export const SideNavigation = () => {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();
    return (
        <SideBarStyled ref={hoverRef} >
            <DevAdminSideBar/>
        </SideBarStyled >
    )
}


