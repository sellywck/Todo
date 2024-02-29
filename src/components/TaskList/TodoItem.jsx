import { Badge, Button, Card, Col } from "react-bootstrap";
import { deleteTodo } from "../../feature/todo/todoSlice";
import { useDispatch } from "react-redux";
import UpdateTodoModal from "./UpdateToDoModal";
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion.

export default function TodoItem({ todo }) {
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
        <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.9 }}>
          <Card
            className="my-3"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Card.Body className="todoItem">
              <p style={{ fontSize: "13px" }}>{todo.time}</p>

              <p style={{fontSize: '20px'}}>
                <b>Title:</b> {todo.title}
              </p>
              <p style={{fontSize: '20px'}}>
                <b>Description:</b> {todo.description}
              </p>
              <p style={{fontSize: '20px'}}>
                <b>Due Date:</b> {todo.selectedDate}
              </p>
              <Button onClick={() => handleUpdate()}>
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                className="mx-1 my-4"
                variant="danger"
                onClick={() => handleDelete()}
              >
                <i className="bi bi-trash3 "></i>
              </Button>
              <br />
              <Badge className="mt-2" bg={bg}>
                {!completed && "Not"} Completed
              </Badge>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
      <UpdateTodoModal
        show={modalShow}
        todo={todo}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
