import { Badge, Button, Card, Col } from "react-bootstrap";
import { deleteTodo } from "../../feature/todo/todoSlice";
import { useDispatch } from "react-redux";
import UpdateTodoModal from "./UpdateToDoModal";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion.

export default function TodoItem({ todo }) {
  const completed = todo.completed;
  const bg = completed ? "success" : "danger";
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const currentTime = new Date();
      // console.log(currentTime); //Thu Feb 29 2024 21:35:55 GMT+0800 (Malaysia Time)

      const dueDate = new Date(todo.selectedDate);
      // console.log(dueDate); //Thu Feb 29 2024 21:35:55 GMT+0800 (Malaysia Time)

      const timeDiff = dueDate - currentTime;
      // console.log(timeDiff) //return millusecond

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setRemainingTime("Expired");
        clearInterval(timeInterval);
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [todo.selectedDate]);

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
          <Card className="my-3" style={{ backgroundColor: "#FFFFFF" }}>
            <Card.Body className="todoItem">
              <Card.Title>{todo.time}</Card.Title>
              <Card.Title>{todo.title}</Card.Title>
              <p style={{ fontSize: "20px" }}>
                <b>Description:</b> {todo.description}
              </p>
              <p style={{ fontSize: "20px" }}>
                <b>Due Date:</b> {todo.selectedDate}
              </p>
              <p style={{ fontSize: "20px" }}>
                {!todo.completed && `Remaining Time: ${remainingTime}` }
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
