import { NavLink, Route, Routes } from "react-router-dom";
import { Project, PROJECT } from "../components/Project";

export const HorizontalNavigation = () => (
    <>
        <nav>
            <ul>
                <li>
                    <NavLink to={`/${PROJECT.API}`} className={navData => navData.isActive ? 'active' : ''}>
                        {PROJECT.API}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/${PROJECT.CORE}`} className={navData => navData.isActive ? 'active' : ''}>
                        {PROJECT.CORE}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/${PROJECT.WEB}`} className={navData => navData.isActive ? 'active' : ''}>
                        {PROJECT.WEB}
                    </NavLink>
                </li>
            </ul>
        </nav>
    </>

)

