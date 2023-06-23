import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ErrorMessage = styled.p`
  color: red;
`;

const ModalBox = ({ text, variant, isSignupFlow }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [, setState] = useContext(UserContext);

  const handleClick = async () => {
    let user;
    let error;
    let token;
    if (isSignupFlow) {
      const { data } = await axios.post("/api/v1/register", {
        name,
        email,
        password,
      });
      user = data?.user;
      token = data?.token;
      error = data?.error;
    } else {
      const { data } = await axios.post("/api/v1/login", {
        email,
        password,
      });
      user = data?.user;
      token = data?.token;
      error = data?.error;
    }

    console.log("response", user);

    if (error) {
      console.log("response error", error);
      return setErrorMsg(error);
    }

    setState({
      data: user,
      loading: false,
      error: null,
    });
    localStorage.setItem("token", token);
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    setShow(false);
    navigate("/articles");
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        size="lg"
        style={{ marginRight: "1rem", padding: "0.5rem 3rem" }}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSignupFlow && (
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <FormControl
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          )}
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalBox;
