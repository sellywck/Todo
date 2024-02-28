//check if userInfo exist in local storage
//  yes -> direct to todoApp main page
/// no -> pop out message : not register yet and direct user to login page

import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import image3 from "../assets/image3.gif";
import { toast } from "react-toastify";

export default function Login() {
  const usernameRef = useRef();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    //Check if user is registered
    const existingUsers = JSON.parse(localStorage.getItem("user") || "[]");
    console.log(existingUsers);

    const existingUser = existingUsers.find(
      (user) => user.username === username
    );
    console.log(existingUser);

    //If user is registered
    if (existingUser) {
      if (pwd === existingUser.pwd) {
        toast.success("Login successfully", {
          autoClose: 1000,
          position: "bottom-right",
        });
        authContext.setToken("1234");
        navigate("/tasklist");
      } else {
        // If credentials don't match, show error message
        toast.error("Wrong username or password. Please try again!", {
          autoClose: 1000,
          position: "bottom-right",
        });
      }
    } else {
      //if not register -> redirect to register page
      toast.error("You havent registered yet. Please register first!", {
        autoClose: 1000,
        position: "bottom-right",
      });
      navigate("/register");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <h1
            style={{ textAlign: "center", marginTop: "10px", padding: "10px" }}
          >
            Log in
          </h1>
        </Row>
        <Row>
          <Container className="d-flex justify-content-center align-items-center min-vh-70">
            <Row className="border rounded-5 p-3 bg-white shadow box-area">
              <Col
                md={6}
                className="rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
                style={{ background: "rgb(181, 181, 192)" }}
              >
                <div className="featured-image mb-3">
                  <img
                    src={image3}
                    className="img-fluid"
                    style={{ width: "350px", borderRadius: "15px" }}
                    alt="image"
                  />
                </div>
              </Col>
              <Col md={6} className="right-box">
                <Row className="align-items-center">
                  <div className="header-text mb-2">
                    <h3>
                      Welcome to TaskBoost
                      <span>
                        <i
                          className="bi bi-fire"
                          style={{ color: "red", fontSize: "25px" }}
                        ></i>
                      </span>
                    </h3>
                  </div>
                  <Form onSubmit={handleLogin}>
                    {/* Email */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>
                        <strong>Email address :</strong>
                      </Form.Label>
                      <Form.Control
                        ref={usernameRef}
                        value={username}
                        type="text"
                        placeholder="Enter email"
                        autoComplete="on"
                        required
                        onFocus={() => setUserNameFocus(true)}
                        onBlur={() => setUserNameFocus(false)}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>
                        <strong>Password :</strong>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPwd ? "text" : "password"}
                          placeholder="Password"
                          value={pwd}
                          required
                          autoComplete="off"
                          onFocus={() => setPwdFocus(true)}
                          onBlur={() => setPwdFocus(false)}
                          onChange={(e) => {
                            setPwd(e.target.value);
                          }}
                        />
                        <span
                          className="input-group-text"
                          onClick={() => setShowPwd(!showPwd)}
                        >
                          <i
                            className={
                              showPwd ? "bi bi-eye" : "bi bi-eye-slash"
                            }
                          ></i>
                        </span>
                      </InputGroup>
                    </Form.Group>
                    <Button variant="primary" className="mb-2" type="submit">
                      Login
                    </Button>
                  </Form>
                  <p>
                    Dont have an account? <br />{" "}
                    <a href="register">Create an account</a>
                  </p>
                </Row>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}
