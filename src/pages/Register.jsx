import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.gif";
import { toast } from "react-toastify";

//Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.
const pwdRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
const usernameRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function Register() {
  const usernameRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [matchPwd, setmatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  //Autofocus on the username input
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUserName(usernameRegex.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(pwdRegex.test(pwd));
    setValidMatchPwd(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    //check if user already registers
    const existingUsers = JSON.parse(localStorage.getItem("user") || "[]");
    console.log(existingUsers);
    const existingUser = existingUsers.find(
      (user) => user.username === username
    );
    console.log(existingUser);

    if (existingUser) {
      toast.info("You are already registered. Please login instead", {autoClose: 1000, position: "bottom-right"})
      navigate("/login");
      return;
    }

    //if new user, proceed with registration
    const newUser = { username, pwd };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("user", JSON.stringify(updatedUsers));
    toast.success("Account created successfully! Please log in to access all features!", {autoClose: 1000, position: "bottom-right"})
    navigate("/Tasklist");
  };

  return (
    <>
      <Container>
        <Row>
          <h1
            style={{ textAlign: "center", marginTop: "10px", padding: "10px" }}
          >
            Create an account
          </h1>
        </Row>
        <Row>
          <Container className="d-flex justify-content-center align-items-center min-vh-70">
            <Row className="border rounded-5 p-3 bg-white shadow box-area">
              {/* left side image */}
              <Col
                md={6}
                className="rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
                style={{ background: "rgb(181, 181, 192)" }}
              >
                <div className="featured-image mb-3">
                  <img
                    src={image}
                    className="img-fluid"
                    style={{ width: "350px" , borderRadius: '15px'}}
                    alt="image"
                  />
                </div>  
              </Col>
              {/* right side register form */}
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
                  <Form onSubmit={handleFormSubmit}>
                    {/* Email */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>
                        <strong>Email address :</strong>
                        <span className={validUserName ? "valid" : "hide"}>
                          <i className="bi bi-check-lg"></i>
                        </span>
                        <span
                          className={
                            validUserName || !username ? "hide" : "invalid"
                          }
                        >
                          <i className="bi bi-x-circle"></i>
                        </span>
                      </Form.Label>
                      <Form.Control
                        ref={usernameRef}
                        value={username}
                        type="text"
                        placeholder="Enter email"
                        required
                        aria-invalid={validUserName ? "false" : "true"}
                        aria-describedby="userNameNote"
                        onFocus={() => setUserNameFocus(true)}
                        onBlur={() => setUserNameFocus(false)}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                      <p
                        id="userNameNote"
                        className={
                          userNameFocus && username && !validUserName
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <i className="bi bi-info-circle"></i> Please enter a
                        valid email address
                      </p>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>
                        <strong>Password : </strong>
                        <span className={validPwd ? "valid" : "hide"}>
                          <i className="bi bi-check-lg"></i>
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                          <i className="bi bi-x-circle"></i>
                        </span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPwd ? "text" : "password"}
                          placeholder="Password"
                          value={pwd}
                          required
                          autoComplete="off"
                          aria-invalid={validPwd ? "false" : "true"}
                          aria-describedby="pwdNote"
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
                              validPwd && showPwd
                                ? "bi bi-eye"
                                : "bi bi-eye-slash"
                            }
                          ></i>
                        </span>
                      </InputGroup>
                      <div
                        id="pwdNote"
                        className={
                          pwdFocus && !validPwd ? "instructions" : "offscreen"
                        }
                      >
                        <p>
                          <i className="bi bi-info-circle"> </i>
                          Your password must :
                        </p>
                        <ul>
                          <li>Be 8-16 characters long</li>
                          <li>Include at least one digit (0-9).</li>
                          <li>
                            Include at least one digit (0-9), lowercase letter
                            (a-z), uppercase letter (A-Z), and special character
                            (e.g., !@#$%^&*).
                          </li>
                          <li>Not contain any spaces.</li>
                        </ul>
                        <p>Example: ExamplePassword123!</p>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                      <Form.Label>
                        <strong>Confirm Password :</strong>
                        <span
                          className={
                            validMatchPwd && matchPwd ? "valid" : "hide"
                          }
                        >
                          <i className="bi bi-check-lg"></i>
                        </span>
                        <span
                          className={
                            validMatchPwd || !matchPwd ? "hide" : "invalid"
                          }
                        >
                          <i className="bi bi-x-circle"></i>
                        </span>
                      </Form.Label>
                      <InputGroup>
                      <Form.Control
                        type={showPwd ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={matchPwd}
                        required
                        aria-invalid={validMatchPwd ? "false" : "true"}
                        aria-describedby="confirmNote"
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)}
                        onChange={(e) => {
                          setmatchPwd(e.target.value);
                        }}
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setShowPwd(!showPwd)}
                      >
                        <i
                          className={
                            validPwd && showPwd
                              ? "bi bi-eye"
                              : "bi bi-eye-slash"
                          }
                        ></i>
                      </span>
                      </InputGroup>
                      <p
                        id="confirmNote"
                        className={
                          matchPwdFocus && !validMatchPwd
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <i className="bi bi-info-circle"></i>
                        Must match the first password input field.
                      </p>
                    </Form.Group>
                    <Button
                      disabled={!validUserName || !validPwd || !validMatchPwd}
                      variant="primary"
                      className="mb-2"
                      type="submit"
                    >
                      Sign up
                    </Button>
                  </Form>
                  <p>
                    Already registered? <br /> <a href="login">Login</a>
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
