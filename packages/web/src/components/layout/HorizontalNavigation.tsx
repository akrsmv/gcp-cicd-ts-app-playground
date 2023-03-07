import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { LoadDataParams, usePriceAndUsageMergedStore } from "../../stores/PriceAndUsageMergedStore";
import { ContentBoxesStyled, ContentStyled, NavBarStyled } from "./Theme";

export const HorizontalNavigation = () => {

    const priceAndUsageMergedStore = usePriceAndUsageMergedStore()

    const loadData = useCallback((params: LoadDataParams) => priceAndUsageMergedStore.load(params), [])

    const ParentChildNav = (props: any) => {
        const parentlocation = Array.isArray(props.parent) ? props.parent.join('/') : props.parent??''
        const location = `${parentlocation}/${props.label.toLowerCase().replace(/\s/,'')}`
        return ( <li> <NavLink to={location} onClick={props.onClick}> {props.label} </NavLink> </li> )
    }

    return (
        <NavBarStyled>
            <nav>
                <ContentBoxesStyled>
                    <ContentStyled>
                        <ul className="top-left-nav">
                            <ParentChildNav parent="dashboard" label="Today" onClick={async () => await loadData({ periodCount: 1, periodType: "d" })} />
                            <ParentChildNav parent="dashboard" label="Month" onClick={async () => await loadData({ periodCount: 1, periodType: "m" })} />
                            <ParentChildNav parent="dashboard" label="Quarter" onClick={async () => await loadData({ periodCount: 3, periodType: "m" })} />
                            <ParentChildNav parent="dashboard" label="Year" onClick={async () => await loadData({ periodCount: 1, periodType: "y" })} />
                            {/* TODO Date Range Component, use Nivo? https://nivo.rocks/time-range/ */}
                            {/* <ParentChildNav parent="dashboard" label="Pick Range" onClick={async () => await loadData({ periodCount: 1, periodType: "d" })} /> */}
                        </ul>
                    </ContentStyled>
                    <ContentStyled>
                        <ul className="top-right-nav">
                            <ParentChildNav parent={["settings","preferences"]} label="Chart Preferences" />
                            <ParentChildNav parent="invoices" label="Invoices" />
                            <ParentChildNav label="Logout" />
                        </ul>
                    </ContentStyled>
                </ContentBoxesStyled>
            </nav>
        </NavBarStyled>
    )
}


