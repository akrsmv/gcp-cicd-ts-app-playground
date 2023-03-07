import { useState, useCallback } from "react";
import { ButtonStyled, CheckBoxStyled, InputStyled } from "../../components/layout/Theme";
import { ITodoItemState, useTodoItemsStore } from "../stores/TodoItemsStore"
import { PROJECT } from "./Project";

export const AddTodoItem = () => {
  const _emptyNewItem: Omit<ITodoItemState, "id"> = { desc: "", labels: [] }
  const todoStore = useTodoItemsStore()
  // pull necessary utilities from global model
  const addTodo = useCallback((todo: Omit<ITodoItemState, "id">) => todoStore.add(todo), [todoStore])

  const [itemToAdd, setItemToAdd] = useState(_emptyNewItem)

  const handleAddNewItem = () => {
    // reset new item container only if adding successful
    if (addTodo(itemToAdd)) {
      setItemToAdd(_emptyNewItem)
    }
  }

  const toggleLabel = (project: PROJECT, checked: boolean) => {
    if (!checked && itemToAdd.labels.includes(project)) {
      const labelIndex = itemToAdd.labels.findIndex(i => i === project)
      itemToAdd.labels.splice(labelIndex, 1)
      setItemToAdd({ ...itemToAdd, labels: itemToAdd.labels })
    }
    if (checked && !itemToAdd.labels.includes(project)) {
      itemToAdd.labels.push(project)
      setItemToAdd({ ...itemToAdd, labels: itemToAdd.labels })
    }
  }

  return (
    <>
      <InputStyled
        type="text"
        placeholder="Recall something more Todo?"
        value={itemToAdd.desc}
        onChange={(e) => setItemToAdd({ ...itemToAdd, desc: e.target.value })}
      />
      {
        Object.values(PROJECT).map((project_name, index) => (
          <span key={`${project_name}-${index}`}>
            <CheckBoxStyled
              type="checkbox"
              checked={itemToAdd.labels.includes(project_name)}
              onChange={(e) => toggleLabel(project_name, e.target.checked)} />
            <label>{project_name}</label>
          </span>
        ))
      }
      <ButtonStyled onClick={handleAddNewItem}>
        Add Todo Item
      </ButtonStyled>
    </>
  )
}