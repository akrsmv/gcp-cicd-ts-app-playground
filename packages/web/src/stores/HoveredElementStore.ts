import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { hoveredElementsOfInterest } from '../components/GctAppInfo'

interface CurrentlyHoveredElement {
    hoveredElement: string
    hoveredElementDesc: string
    update: (whatIsNowHovered: string) => void
}

/**
 * great way to easily have global storage
 * By https://www.npmjs.com/package/zustand
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