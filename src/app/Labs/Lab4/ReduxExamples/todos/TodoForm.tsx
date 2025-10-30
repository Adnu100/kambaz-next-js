import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "../todos/TodosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center">
      <FormControl
        value={todo.title}
        className="d-inline w-50 me-2"
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <Button
        variant="warning"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
        className="me-2"
      >
        Update
      </Button>
      <Button
        variant="success"
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
      >
        Add
      </Button>
    </ListGroupItem>
  );
}
