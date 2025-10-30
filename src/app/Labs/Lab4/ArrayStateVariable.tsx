import { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div
      style={{
        width: "250px",
      }}
      id="wd-array-state-variables"
      className="border p-2 m-1"
    >
      <h2>Array State Variable</h2>
      <button className="btn btn-success" onClick={addElement}>
        Add Element
      </button>
      <Container className="mt-2">
        {array.map((item, index) => (
          <Row className="border p-2" key={index}>
            <Col md={5}>{item}</Col>
            <Col md={7} className="d-flex justify-content-end">
              <button
                className="btn btn-danger"
                onClick={() => deleteElement(index)}
              >
                Delete
              </button>
            </Col>
          </Row>
        ))}
        <ListGroup>
          {todos.map((todo: any) => (
            <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
          ))}
        </ListGroup>
        <hr />
      </Container>
      <hr />
    </div>
  );
}
