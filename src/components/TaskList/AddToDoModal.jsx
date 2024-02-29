import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTodo } from "../../feature/todo/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

export default function AddToModal({ show, onHide }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      dispatch(
        addTodo({
          id: uuidv4(),
          title,
          description,
          completed,
          time: new Date().toLocaleString(),
          selectedDate : formatDate(selectedDate)
        })
        );
        setTitle("");
        setDescription("");
        setSelectedDate("")
        onHide();
        toast.success("Task added successfully", {
          autoClose: 1000,
          position: "bottom-right",
        });
    }
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
        <Modal.Title id="contained-modal-title-vcenter">Add Todo</Modal.Title>
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
          </Form.Group >

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Due date</Form.Label> <br/>
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
              <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText={"dd/mm/yyyy"} // Placeholder with date and time format
              filterDate={(date) =>
                date.getDay() !== 6 && date.getDay() !== 0
              } // weekends cancel
              showYearDropdown // year show and scrolldown alos
              scrollableYearDropdown
              className="form-control" // Apply Bootstrap form-control class
              dateFormat="dd/MM/yyyy" // Date and time format
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
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
