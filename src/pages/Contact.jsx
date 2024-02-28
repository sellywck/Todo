import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function Contact() {
  return (
    <>
      <Container>
        <h1 style={{ textAlign: "center", marginTop: "10px", padding: "10px" }}>
          Contact us
        </h1>
        <div >
          <Row>
            <Col md={6} className="d-flex contactInformation">
              <div className="row d-flex justify-content-between ">
                <Row className="mb-4 mx-2">
                  <Col className="mb-4">
                    <div
                      className="d-flex justify-content-center align-items-center text-center"
                      style={{ width: "18rem", height: "200px" }}
                    >
                      <div>
                        <i
                          className="bi bi-geo-alt-fill"
                          style={{ fontSize: "40px" }}
                        ></i>
                        <Card.Title>Address:</Card.Title>
                        <Card.Text>
                          B-1-11, IOI Boulevard, Jalan Kenari 5, 47100 Puchong,
                          Selangor, Malaysia
                        </Card.Text>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div
                      className="d-flex justify-content-center align-items-center text-center"
                      style={{ width: "18rem", height: "200px" }}
                    >
                      <div>
                        <i
                          className="bi bi-envelope"
                          style={{ fontSize: "40px" }}
                        ></i>
                        <Card.Title>EMAIL:</Card.Title>
                        <Card.Text>support@sigmaschool.co</Card.Text>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-4 mx-2">
                  <Col className="mb-4">
                    <div
                      className="d-flex justify-content-center align-items-center text-center"
                      style={{ width: "18rem", height: "200px" }}
                    >
                      <Card.Body>
                        <i
                          className="bi bi-telephone"
                          style={{ fontSize: "40px" }}
                        ></i>
                        <Card.Title>CALL US </Card.Title>
                        <Card.Text>+60178782935</Card.Text>
                      </Card.Body>
                    </div>
                  </Col>
                  <Col className="mb-4">
                    <div
                      className="d-flex justify-content-center align-items-center text-center"
                      style={{ width: "18rem", height: "200px" }}
                    >
                      <Card.Body>
                        <Card.Title>CONNECT WITH US</Card.Title>
                        <Card.Text>
                          <i
                            className="bi bi-instagram "
                            style={{ fontSize: "40px", padding: "8px" }}
                          ></i>
                          <i
                            className="bi bi-whatsapp"
                            style={{ fontSize: "40px", padding: "8px" }}
                          ></i>
                          <i
                            className="bi bi-link"
                            style={{ fontSize: "40px", padding: "8px" }}
                          ></i>
                        </Card.Text>
                      </Card.Body>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* google Map */}
            <Col md={6} className="fluid">
              <div style={{ width: "100%" }}>
                <iframe
                  width={"100%"}
                  height={600}
                  src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Sigma%20Studios+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                >
                  &lt;a href="https://www.gps.ie/"&gt;gps trackers&lt;/a&gt;
                </iframe>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
