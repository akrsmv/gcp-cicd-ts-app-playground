import { useState } from "react";
import { DevAdminSideBar } from "../components/DevAdminSideBar";
import { SideBarStyled } from "./Theme";



export const SideNavigation = () => {
    return (
        <SideBarStyled>
            <DevAdminSideBar />
        </SideBarStyled >
    )
}


