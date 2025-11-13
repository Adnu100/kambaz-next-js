"use client";

import { useEffect } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import "./styles.css";
import { useParams } from "next/navigation";
import AssignmentRow from "./AssignmentRow";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAssignments } from "../Assignments/reducer";
import Link from "next/link";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  return (
    <div id="wd-assignments">
      <Container className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup className="me-3">
          <InputGroupText>
            <FaSearch />
          </InputGroupText>
          <Form.Control placeholder="Search..." />
        </InputGroup>
        <Container className="text-nowrap text-end">
          {currentUser?.role === "FACULTY" && (
            <>
              <Button id="wd-add-assignment-group" variant="light" size="lg">
                + Group
              </Button>
              <Button
                id="wd-add-assignment"
                variant="danger"
                size="lg"
                className="me-1"
                href={`/Courses/${cid}/Assignments/New`}
              >
                <Link
                  href={`/Courses/${cid}/Assignments/New`}
                  className="text-white text-decoration-none"
                >
                  + Assignment
                </Link>
              </Button>
            </>
          )}
        </Container>
      </Container>
      <Container fluid="lg">
        <ListGroup className="rounded-0">
          <ListGroupItem className="wd-module p-0 fs-6">
            <div id="wd-assignments-title" className="wd-title p-3 ps-2 border">
              <Row>
                <Col md={1} className="d-flex align-items-center m-0">
                  <BsGripVertical className="fs-4" />
                </Col>
                <Col md={7} className="d-flex align-items-center">
                  <strong>ASSIGNMENTS</strong>
                </Col>
                <Col md={2} className="text-end align-items-center">
                  <span className="badge text-muted border m-1 me-0">
                    40% of Total
                  </span>
                </Col>
                <Col
                  md={1}
                  className="d-flex text-end align-items-center justify-content-end"
                >
                  <FaPlus className="fs-4 text-muted" />
                </Col>
                <Col
                  md={1}
                  className="d-flex text-end align-items-center justify-content-end"
                >
                  <IoEllipsisVertical className="fs-4 text-muted" />
                </Col>
              </Row>
            </div>
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="rounded-0 border-5 border-start border-success">
          {assignments
            .filter((assignment: any) => assignment.course === cid)
            .map((assignment: any) => (
              <ListGroupItem className="wd-lesson p-3" key={assignment._id}>
                <AssignmentRow assignment={assignment} />
              </ListGroupItem>
            ))}
        </ListGroup>
      </Container>
    </div>
  );
}
