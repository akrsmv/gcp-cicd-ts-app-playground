import { SideBarStyled } from "./Theme";

export const SideNavigation = () => (
    <SideBarStyled>
        <h2>DEV ADMIN</h2>
        <nav>
            {/* <ul>
                {
                    Object.values(SIDE_ROUTES).map(routePath => (<MappedRoute key={routePath} routePath={routePath} />))
                }
            </ul> */}
        </nav>
        <div id="under-construction-img">
            <img src="/under-construction-barrier-icon.svg" />
        </div>
    </SideBarStyled>
)

