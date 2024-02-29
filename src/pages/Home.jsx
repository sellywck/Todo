import { Button, Col, Container, Row } from "react-bootstrap";
import GetTimeNow from "../components/GetTimeNow";
import { motion } from "framer-motion"; // Import motion from Framer Motion

export default function Home() {
  return (
    <div>
      <Container className="mainView">
        <Row>
          <Col>
            <p className=" header my-3">
              Empower your productivity and peace of mind with us!
            </p>
            <p className="subheading">
              Become focused, organized, and calm with us! Start for free now!
            </p>
            <GetTimeNow />
          </Col>
        </Row>
        <Row>
          <Col>
            <motion.div
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <Button className="StartForFree" href="register" variant="danger">
                Start for Free
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
