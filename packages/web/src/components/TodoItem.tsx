import { GCTButton, GCTInput } from "../components-layout/Theme";

export const TodoItem = (props: any) => {
  const {updateTodo, removeTodo, todo} = props
  const handleDeleteButton = () => removeTodo(todo.id)
  return (
    <>
      <GCTInput
        type="text"
        value={todo.desc}
        onChange={(e) => updateTodo(todo.id, e.target.value)}
      />
      <GCTButton onClick={handleDeleteButton}>
        Delete
      </GCTButton>
    </>
  );
}