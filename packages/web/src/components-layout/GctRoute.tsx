import { NavLink } from "react-router-dom"

export enum SIDE_ROUTES {
    ELECTRICITY_USAGE = "/electricity/usage",
    ELECTRICITY_PRICE = "/electricity/price",
    EL_USAGE_ANALYSIS = "/electricity/analysis",
    TEST_TV_ADVANCED = "/test/market",
    TEST_AGGRID = "/test/grid"
}

export enum TOP_ROUTES {
    ACCOUNT_SETTINGS = "/test/grid",
    ACCOUNT_LOGIN = "/test/grid",
    ACCOUNT_WALLET = "/test/grid"
}

const APP_ROUTE_MAPPINGS: Map<SIDE_ROUTES | TOP_ROUTES, string> = new Map([
    [SIDE_ROUTES.ELECTRICITY_USAGE, "UsageTEST123"],
    [SIDE_ROUTES.ELECTRICITY_PRICE, "Price"],
    [SIDE_ROUTES.EL_USAGE_ANALYSIS, "Analysis"],
    [SIDE_ROUTES.TEST_TV_ADVANCED, "Market"],
    [SIDE_ROUTES.TEST_AGGRID, "Grid"]
])

export const GctRoute = (props: any) => {
    const { routePath } = props
    return (
        <li key={`/${routePath}`}>
            <NavLink to={routePath} className={navData => navData.isActive ? 'active' : ''}>
                {APP_ROUTE_MAPPINGS.get(routePath)}
            </NavLink>
        </li>
    )
}