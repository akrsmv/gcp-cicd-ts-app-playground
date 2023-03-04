import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PROJECT } from "../components/Project";
import { LoadDataParams, usePriceStore } from "../stores/PricesDataStore";
import { useUsageStore } from "../stores/UsageDataStore";
import { ContentBoxesStyled, ContentStyled, NavBarStyled } from "./Theme";

export const HorizontalNavigation = () => {

    const priceStore = usePriceStore()
    const usageStore = useUsageStore()

    const [pricesData, setPricesData] = useState(priceStore.data)
    const [usageData, setUsageData] = useState(usageStore.data)
    const [activeView, setActiveView] = useState("Today")


    // make sure you rerender when any of the stores used is updated update
    useEffect(() => usePriceStore.subscribe(
        state => setPricesData(state.data)
    ), [])
    useEffect(() => useUsageStore.subscribe(
        state => setUsageData(state.data)
    ), [])

    const loadData = useCallback((params: LoadDataParams, view: string) => {
        priceStore.load(params)
        usageStore.load(params)
        setActiveView(view)
    }, [])

    const TimeView = (props: any) => <li>
        <a className={activeView === props.label ? "active" : ""}
            onClick={async () => await loadData(props.loadDataParams, props.label)}>
            {props.label}
        </a>
    </li>

    return (
        <NavBarStyled>
            <nav>
                <ContentBoxesStyled>
                    <ContentStyled>
                        <ul className="top-left-nav">
                            <TimeView label="Today" loadDataParams={{ periodCount: 1, periodType: "d" }}/>
                            <TimeView label="Month" loadDataParams={{ periodCount: 1, periodType: "m" }}/>
                            <TimeView label="Quarter" loadDataParams={{ periodCount: 3, periodType: "m" }}/>
                            <TimeView label="Year" loadDataParams={{ periodCount: 1, periodType: "y" }}/>
                            <TimeView label="Pick Range"/>
                        </ul>
                    </ContentStyled>
                    <ContentStyled>
                        <ul className="top-right-nav">
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
                    </ContentStyled>
                </ContentBoxesStyled>




            </nav>
        </NavBarStyled>
    )
}


