import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateTodo } from "../../feature/todo/todoSlice";
import DatePicker from "react-datepicker";

export default function UpdateTodoModal({ show, todo, onHide }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          // hour: "2-digit",
          // minute: "2-digit",
        })
      : "";
  };

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
    setSelectedDate(todo.selectedDate);
  }, [todo, show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedSelectedDate = formatDate(selectedDate);

    if (
      todo.title !== title ||
      todo.description !== description ||
      todo.completed !== completed ||
      todo.selectedDate !== formattedSelectedDate
    ) {
      dispatch(
        updateTodo({
          ...todo,
          title: title,
          description: description,
          completed: completed,
          selectedDate: formattedSelectedDate,
        })
      );
    } else {
      toast.error("No Changes Made", {
        autoClose: 1000,
        position: "bottom-right",
      });
      return;
    }
    onHide();
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
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Due date</Form.Label> <br />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText={"dd/mm/yyyy"}
              filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0} // weekends cancel
              showYearDropdown // year show and scrolldown alos
              scrollableYearDropdown
              className="form-control" // Apply Bootstrap
              dateFormat="dd/MM/yyyy" // Date and time format
            />
            {/* <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText={"dd/mm/yyyy HH:mm"} // Placeholder with date and time format
              filterDate={(date) =>
                date.getDay() !== 6 && date.getDay() !== 0
              } // weekends cancel
              showYearDropdown // year show and scrolldown alos
              scrollableYearDropdown
              className="form-control" // Apply Bootstrap form-control class
              dateFormat="dd/MM/yyyy HH:mm" // Date and time format
              showTimeSelect // Show time selector
              timeFormat="HH:mm" // Time format
            /> */}
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
