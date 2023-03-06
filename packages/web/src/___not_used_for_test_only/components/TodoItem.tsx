import { ButtonStyled, InputStyled } from "../../components-layout/Theme";

export const TodoItem = (props: any) => {
  const {updateTodo, removeTodo, todo} = props
  const handleDeleteButton = () => removeTodo(todo.id)
  return (
    <>
      <InputStyled
        type="text"
        value={todo.desc}
        onChange={(e) => updateTodo(todo.id, e.target.value)}
      />
      <ButtonStyled onClick={handleDeleteButton}>
        Delete
      </ButtonStyled>
    </>
  );
}