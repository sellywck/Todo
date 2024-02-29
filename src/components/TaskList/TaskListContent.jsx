import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { Container, Row } from "react-bootstrap";

export default function TaskListContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  
  //Sort todolist based on date
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filterStatus = useSelector((state) => state.todo.filterStatus);

  //display todolist based on filter status
  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    if (filterStatus === "completed") {
      return item.completed === true;
    }
    if (filterStatus === "incomplete") return item.completed === false;
  });

  return (
    <div>
      <Container>
        <Row>
          {filteredTodoList && filteredTodoList.length > 0 ? (
            filteredTodoList.map((todo, key) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <p>No Todo...</p>
          )}
        </Row>
      </Container>
    </div>
  );
}
