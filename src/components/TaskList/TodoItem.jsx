import { Badge, Button, Card, Col } from "react-bootstrap";
import { deleteTodo } from "../../feature/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdateTodoModal from "./UpdateToDoModal";
import { useState } from "react";

export default function TodoItem( {todo} ) {
  const completed = todo.completed;
  const bg = completed ? "success" : "danger";
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleUpdate = () => {
    setModalShow(true);
  };

  return (
    <>
      <Col md={4} key={todo.id}>
        <Card className="my-3">
          <Card.Body>
            <p style={{ fontSize: "13px" }}>{todo.time}</p>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Text>{todo.description}</Card.Text>
            {/* <Button>
            <i className="bi bi-play"></i>
          </Button>
          <Button className="mx-1">
            <i className="bi bi-pause-fill"></i>
          </Button>
          <Button className="mx-1">
            <i className="bi bi-arrow-clockwise"></i>
          </Button> */}
            <Button 
            className="mx-1"
            onClick={()=> handleUpdate()}
            >
              <i className="bi bi-pencil"></i>
            </Button>
            <Button
              className="mx-1"
              variant="danger"
              onClick={() => handleDelete()}
            >
              <i className="bi bi-trash3 "></i>
            </Button>
            <br />
            <Badge className="mt-4" bg={bg}>
              {!completed && "Not"} Completed
            </Badge>
          </Card.Body>
        </Card>
      </Col>
      <UpdateTodoModal show={modalShow} todo={todo} onHide={() => setModalShow(false)} />
    </>
  );
}
