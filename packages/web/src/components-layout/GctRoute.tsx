export {}
// import { NavLink } from "react-router-dom"

// const SITE_MAP = {
//     "dashboard": {
//         "past_month": "/dashboard/past-month",
//         "past_2_months": "/dashboard/past-two-months",
//         "past_3_months": "/dashboard/past-three-months",
//         "past_6_months": "/dashboard/past-six-months",
//         "past_year": "/dashboard/past-year",
//         "custom_range": "/dashboard/custom-range"
//     },
//     "invoices": {
//         "past_month": "/invoices/all",
//         "past_2_months": "/invoices/past-two-months",
//         "past_3_months": "/invoices/past-three-months",
//         "past_6_months": "/invoices/past-six-months",
//         "past_year": "/invoices/past-year",
//         "custom_range": "/invoices/custom-range"
//     }
// }

// export enum SIDE_ROUTES {
//     ELECTRICITY_USAGE = "/electricity/usage",
//     ELECTRICITY_PRICE = "/electricity/price",
//     EL_USAGE_ANALYSIS = "/electricity/analysis",
//     TEST_TV_ADVANCED = "/test/market",
//     TEST_AGGRID = "/test/grid"
// }

// /**
//  * Not containing any routes, idea of top left is to have only buttons for easily slicing time in different periods
//  */
// export enum TOP_LEFT_ROUTES {

// }

// export enum TOP_RIGHT_ROUTES {
//     MY_ACCOUNT = "/account",
//     ACCOUNT_LOGIN = "/login",
//     ACCOUNT_WALLET = "/account/wallet"
// }

// const APP_ROUTE_MAPPINGS: Map<SIDE_ROUTES | TOP_LEFT_ROUTES | TOP_RIGHT_ROUTES, string> = new Map([
//     [SIDE_ROUTES.ELECTRICITY_USAGE, "This Month"],
//     [SIDE_ROUTES.ELECTRICITY_PRICE, "Last Quarter"],
//     [SIDE_ROUTES.EL_USAGE_ANALYSIS, "This Year"],
//     [SIDE_ROUTES.TEST_TV_ADVANCED, "Last Year"]
// ])

// export const MappedRoute = (props: any) => {
//     const { routePath } = props
//     return (
//         <li key={`/${routePath}`}>
//             <NavLink to={routePath} className={navData => navData.isActive ? 'active' : ''}>
//                 {APP_ROUTE_MAPPINGS.get(routePath)}
//             </NavLink>
//         </li>
//     )
// }