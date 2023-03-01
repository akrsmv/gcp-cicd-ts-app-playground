import { GctRoute, SIDE_ROUTES } from "./GctRoute";

export const SideNavigation = () => (
    <>
        <nav>
            <ul>
                {
                    Object.values(SIDE_ROUTES).map(routePath => (<GctRoute key={routePath} routePath={routePath}/>))
                }
            </ul>
        </nav>
    </>
)

