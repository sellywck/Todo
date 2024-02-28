import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateTodo } from "../../feature/todo/todoSlice";

export default function UpdateTodoModal({ show, todo, onHide }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
  }, [todo, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //If no changes made
    if (
      todo.title !== title ||
      todo.description !== description ||
      todo.completed !== completed
    ) {
      dispatch(updateTodo({...todo,title,description,completed}));
    } else {
      toast.error("No Changes Made", {
        autoClose: 1000,
        position: "bottom-right",})
      return;
    }
    onHide()
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Todo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Todo"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={
                "1. Create amazing project\n2. Apply jobs\n3.Crush interview"
              }
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            id="completed"
            label="Mark as completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mb-3"
          />
          <Button type="submit">Update</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
