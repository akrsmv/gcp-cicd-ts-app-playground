import { useEffect, useState } from "react"
import { create } from "zustand"

// using zustand to share state
const useSelection = create<{ selected: string, updateSelection: (s: string) => void }>(
    (set) => ({
        selected: '',
        updateSelection:(newSelection: string) => set({selected: newSelection})
    }))

export const DevIndexManagement = (props: any) => {
    const { index, title } = props

    const selectionStore = useSelection()
    const [selected, setSelected] = useState(selectionStore.selected)
    useEffect(() => useSelection.subscribe((state) => setSelected(state.selected)), [])

    const reloadFromGCSData = "Reload GCS Data"
    const reloadFromTESTData = "Reload Test Data"
    return (
        <nav>
            <strong>{title}</strong>

            <button onClick={() => selectionStore.updateSelection(`${reloadFromGCSData}/${index}}`)}>
                {reloadFromGCSData}
            </button>
            <p hidden={selected !== `${reloadFromGCSData}/${index}}`}>
                flush redis key <i> {props.index} </i> and reload from from <u>GCS</u>?
                <a onClick={() => alert(`${reloadFromGCSData}/${index}}`)}>Proceed</a>
                &nbsp;
                <a onClick={() => selectionStore.updateSelection('')}>cancel</a>
            </p>

            <button onClick={() => selectionStore.updateSelection(`${reloadFromTESTData}/${index}}`)}>{reloadFromTESTData}</button>
            <p hidden={selected !== `${reloadFromTESTData}/${index}}`}>
                flush redis key <i> {props.index} </i> and reload from from <u>GCS</u >?
                <a onClick={() => alert(`${reloadFromTESTData}/${index}}`)}>Proceed</a>
                &nbsp;
                <a onClick={() => selectionStore.updateSelection('')}>cancel</a>
            </p>

        </nav>
    )
}

export const DevAdminSideBar = () => {
    return (
        <>
            <h3>DEV AREA</h3>

            <DevIndexManagement
                title="Price data"
                index="prices:bgn" />

            <DevIndexManagement
                title="Usage data"
                index="usage:kwh" />

            <div id="under-construction-img">
                <img src="/under-construction-barrier-icon.svg" />
            </div>
        </>
    )
}
