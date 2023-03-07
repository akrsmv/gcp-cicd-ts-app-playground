import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { hoveredElementsOfInterest } from '../components/GctAppInfo'

interface CurrentlyHoveredElement {
    hoveredElement: string
    hoveredElementDesc: string
    update: (whatIsNowHovered: string) => void
}

/**
 * Couple of elements within the system have their ids registered in 
 * GctAppInfo.hoveredElementsOfInterest map
 * 
 * This stores globally the last hovered element that has an id
 * 
 * Once the store changes, the GctAppInfo element positioned at the moment in the footer
 * will display the description assigned for a particular id
 */
export const useWhatIsHoveredStore = create<CurrentlyHoveredElement>()(
    devtools(
        subscribeWithSelector((set) =>
        ({
            hoveredElement: '',
            hoveredElementDesc: '',
            update: (whatIsNowHovered) => set((state) => ({
                hoveredElement: whatIsNowHovered,
                hoveredElementDesc: hoveredElementsOfInterest.get(whatIsNowHovered) || ''
            }))
        }))
    )
)