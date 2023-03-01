import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

export interface ITodoItemState {
    id: string
    desc: string
    labels: string[]
}

interface IMonorepoTodoItemsState {
    items: ITodoItemState[]
    /**
     * returns id of newly added todo item or undefined if adding failed
     */
    add: (todo: Omit<ITodoItemState,"id">) => string | undefined
    remove: (id: string) => void
    update: (id: string, desc?: string) => void
}

/**
 * great way to easily have global storage
 * By https://www.npmjs.com/package/zustand
 */
export const useCountStore = create<IMonorepoTodoItemsState>()(
    devtools(
        persist(
            subscribeWithSelector((set) =>
            ({
                items: [],                
                add: (todoDto) => {
                    if (!todoDto.desc){
                        toast.error("Please add todo description")
                        return
                    }
                    if (!todoDto.labels.length){
                        toast.error("Please add at least one label")
                        return
                    }
                    const id = uuidv4()
                    set((state) => ({ items: state.items.concat([{...todoDto, id }]) }))
                    return id
                },
                remove: (id) => set((state) => { 
                    return Object.assign({}, { items: state.items.filter(i => i.id !== id) })
                }),
                update: (id, desc) => set((state) => {
                    state.items[state.items.findIndex(i => i.id === id)].desc = desc ?? ''
                    return Object.assign({}, { items: state.items })
                })
            })),
            {
                name: 'count-storage',
            }
        )
    )
)