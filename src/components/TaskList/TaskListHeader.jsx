import { Button, Container, Form, Row } from "react-bootstrap";
import AddToModal from "./AddToDoModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../../feature/todo/todoSlice";

export default function TaskListHeader() {
  const [modalShow, setModalShow] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus)
  const dispatch = useDispatch();

  const buttonStyle = {
    width: "140px",
    marginRight: "10px",
  };

  const handleFilterChange = (e) => {
    
    dispatch((updateFilterStatus(e.target.value)))
  };
  
  return (
    <Container>
      <h1 className="title">TODO LIST</h1>
      <div>
        <Row>
          <Container>
            <Button style={buttonStyle} onClick={() => setModalShow(true)}>
              Add Task
            </Button>
            <AddToModal show={modalShow} onHide={() => setModalShow(false)} />
            <Form.Select
              id="status"
              value={filterStatus} onChange={handleFilterChange}
              className="mt-2"
              style={buttonStyle}
            >
              Status
              <option value={"all"}>All</option>
              <option value={"completed"}>Completed</option>
              <option value={"incomplete"}>Incomplete</option>
            </Form.Select>
          </Container>
        </Row>
      </div>
    </Container>
  );
}
