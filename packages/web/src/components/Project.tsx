import { useState, useEffect, useCallback } from "react"
import { useCountStore, ITodoItemState } from "../stores/TodoItemsStore"
import { DatePickerRange } from "./DatePickerRange"
import { TodoItem } from "./TodoItem"

export enum PROJECT {
    API = "api",
    CORE = "core",
    WEB = "web",
    CICD = "cicd"
}
export const PROJECT_NAMESPACE = "@gctapp"

export const Project = (props: any) => {
    const { project_name } = props

    // local state pulled from global store
    const [projectTodoItems, setProjectTodoItems] = useState(useCountStore().items)

    // make sure you rerender when store updates
    useEffect(
        () => useCountStore.subscribe(
            (state) => state.items, // zustane selector middleware, i.e subscribe only for changes on this property 
            setProjectTodoItems
        ), []
    )

    // pull necessary utilities from global state 
    const removeTodo = useCallback(useCountStore().remove, [])
    const updateTodo = useCallback(useCountStore().update, [])


    return (
        <>
            <h2 >{PROJECT_NAMESPACE}/{project_name}</h2>
            <DatePickerRange />
            {
                projectTodoItems
                    .filter(item => item.labels.includes(project_name))
                    .map((todo: ITodoItemState, todoIndex: number) =>
                        <TodoItem
                            key={`item-${todoIndex}`}
                            todo={todo}
                            updateTodo={updateTodo}
                            removeTodo={removeTodo}
                        />
                    )
            }
        </>
    )
    }