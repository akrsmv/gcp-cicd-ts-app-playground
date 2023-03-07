import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Popup from "reactjs-popup"
import { create } from "zustand"
import { GCT_API } from "../ApiEndpointsProvider"
import { TestDataGenConfigStyled, InputStyled } from "./layout/Theme"

// using zustand to share state between panels
const useSelection =
    create<{
        selected: string,
        postPayload: any,
        updateSelection: (s: string) => void
        updatePostPayload: (p: any) => void
    }>(
        (set) => ({
            selected: '',
            postPayload: {},
            updateSelection: (selected: string) => set({ selected }),
            updatePostPayload: (postPayload: string) => set({ postPayload })
        })
    )

const ProceedWitTestDataGeneration = (props: any) => {
    // at this point index may be 'prices:bgn' or 'usage:kwh'
    // we want to take only the head part, so we know 
    // what additional attributes to assign to payload along with user selected
    const [indexName] = props.index.split(':')
    const selectionStore = useSelection()
    const navigate = useNavigate()

    return (
        <Popup trigger={<span id="dev-link"><u>Proceed</u></span>} position="right center">
            <TestDataGenConfigStyled>
                <div><InputStyled onChange={(e) => selectionStore.updatePostPayload({ ...selectionStore.postPayload, start: e.target.value })} type="date" placeholder="start date" /></div>
                <div><InputStyled onChange={(e) => selectionStore.updatePostPayload({ ...selectionStore.postPayload, end: e.target.value })} type="date" placeholder="end date" /></div>
                <div><InputStyled onChange={(e) => selectionStore.updatePostPayload({ ...selectionStore.postPayload, min: e.target.value })} type="number" placeholder={`MIN ${indexName} range`} /></div>
                <div><InputStyled onChange={(e) => selectionStore.updatePostPayload({ ...selectionStore.postPayload, max: e.target.value })} type="number" placeholder={`MAX ${indexName} range`} /></div>
                <button onClick={() => rebuildIndex(props.index, selectionStore.postPayload).then(() => navigate("/dashboard/today"))}>GO</button>
            </TestDataGenConfigStyled>
        </Popup>
    )
}
const flushIndexData = (index: string) => fetch(`${GCT_API}/admin/${index.replace(':','/')}/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
})
    .then(async response => {
        if (response.status === 200) {
            toast.info(`${index} data removed`)
        } else {
            const payload = await response.json()
            toast.error(payload)
        }
    })

const rebuildIndex = (index: string, postPayload?: any) => {

    if (postPayload) {
        // so we want to generate TEST data, swith on the index to add any non user populated data:
        switch (index) {
            case "prices:bgn":
                Object.assign(postPayload, {
                    "randValueKey": "price",
                    "prefix": "prices",
                    "randValueRange": [postPayload.min, postPayload.max],
                    "additionalProps": {
                        "currency": "BGN"
                    },
                    "tickStep": 3600000
                })
                break;
            case "usage:kwh":
                Object.assign(postPayload, {
                    "randValueKey": "kwh",
                    "prefix": "usage",
                    "randValueRange": [postPayload.min, postPayload.max],
                    "tickStep": 3600000
                })
                break;
        }
    }
    return fetch(`${GCT_API}/admin/${index.replace(':', '/')}/rebuild-index/${postPayload ? '?useLocalfs=true' : ''}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload ?? {})
    })
        .then(async response => {
            if (response.status === 200) {
                toast.info(`${index} was recreated with test data: ${JSON.stringify(postPayload, null, 4)}`)
            } else {
                const payload = await response.json()
                toast.error(payload)
            }
        })
}
export const DevIndexManagement = (props: any) => {
    const { index, title } = props
    const navigate = useNavigate()

    const selectionStore = useSelection()
    const [selectedSection, setSelectedSection] = useState(selectionStore.selected)
    const [proceedSelected, setProceedSelected] = useState(false)

    useEffect(() => useSelection.subscribe((state) => setSelectedSection(state.selected)), [])

    const reloadFromGCSData = "Reload GCS Data"
    const reloadFromTESTData = "Reload Test Data"
    return (
        <>
            <strong>{title}</strong>

            {/* if already clicked, hide its info, if not display it */}
            <button onClick={() => selectionStore.updateSelection(selectedSection !== `${reloadFromGCSData}/${index}}` ? `${reloadFromGCSData}/${index}}` : '')}>
                {reloadFromGCSData}
            </button>
            <p hidden={selectedSection !== `${reloadFromGCSData}/${index}}`}>
                Flush redis <i> {props.index} </i> key and reload it from from <i>GCS</i>?
                <span id="dev-link" onClick={() => rebuildIndex(index).then(() => navigate("/dashboard/today"))}><u>Proceed</u></span>
                &nbsp;
                <span id="dev-link" onClick={() => selectionStore.updateSelection('')}><u>cancel</u></span>
            </p>


            {/* if already clicked, hide its info, if not display it */}
            <button onClick={() => selectionStore.updateSelection(selectedSection !== `${reloadFromTESTData}/${index}}` ? `${reloadFromTESTData}/${index}}` : '')}>
                {reloadFromTESTData}
            </button>
            <p hidden={selectedSection !== `${reloadFromTESTData}/${index}}`}>
                flush redis key <i> {props.index} </i> and reload from from <i>TEST data</i>?
                <ProceedWitTestDataGeneration index={index} />
                &nbsp;
                <span id="dev-link" onClick={() => selectionStore.updateSelection('')}><u>cancel</u></span>
            </p>

            <button onClick={() => selectionStore.updateSelection(selectedSection !== `Clear ${index} data` ? `Clear ${index} data` : '')}>
                    Clear {title}
                </button>
                <p hidden={selectedSection !== `Clear ${index} data`}>
                    <i>  Remove ${index} data without adding new one  </i>
                    <span id="dev-link" onClick={() => flushIndexData(index).then(() => navigate("/dashboard/today"))}><u>Proceed</u></span>
                    &nbsp;
                    <span id="dev-link" onClick={() => selectionStore.updateSelection('')}><u>cancel</u></span>
                </p>

        </>
    )
}

export const DevAdminSideBar = (props: any) => {
    const selectionStore = useSelection()
    const [selectedSection, setSelectedSection] = useState(selectionStore.selected)

    useEffect(() => useSelection.subscribe((state) => setSelectedSection(state.selected)), [])
    return (
        <>
            <h3>DEV AREA</h3>
            <nav>
                <DevIndexManagement
                    title="Price data"
                    index="prices:bgn" />

                <DevIndexManagement
                    title="Usage data"
                    index="usage:kwh" />

            </nav>
            <div id="under-construction-img">
                <img src="/under-construction-barrier-icon.svg" />
            </div>
        </>
    )
}
