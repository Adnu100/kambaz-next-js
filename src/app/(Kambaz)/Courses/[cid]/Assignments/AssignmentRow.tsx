import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { RiFileEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "../Assignments/reducer";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  notAvailableUntil: string;
  dueDate: string;
  totalPoints: number;
  description: string;
}

export default function AssignmentRow({
  assignment,
}: {
  assignment: Assignment;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  return (
    <Row>
      <Col md={2} className="d-flex align-items-center">
        <BsGripVertical className="fs-4 me-3" />
        <RiFileEditLine className="fs-4 me-3" />
      </Col>
      <Col md={7} className="align-items-center ps-0">
        <strong>
          {currentUser?.role === "FACULTY" ? (
            <Link
              className="text-bold text-dark assignment-link"
              href={`/Courses/${assignment.course}/Assignments/${assignment._id}`}
            >
              {assignment.title}
            </Link>
          ) : (
            <Link className="text-bold text-dark assignment-link" href="#">
              {assignment.title}
            </Link>
          )}
        </strong>
        <div>
          <span className="text-danger me-2 text-nowrap">Multiple Modules</span>
          <span className="text-muted me-2 small text-nowrap">|</span>
          <span className="text-muted me-2 small text-nowrap">
            Not available until{" "}
            {new Date(assignment.notAvailableUntil).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
            })}
            at 12:00am
          </span>
          <span className="text-muted me-2 small">|</span>
        </div>
        <div className="text-muted small">
          <span className="text-muted me-2 small">
            Due{" "}
            {new Date(assignment.dueDate).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
            })}
            at 11:59pm
          </span>
          <span className="text-muted me-2 small">|</span>
          <span className="text-muted me-2 small">
            {assignment.totalPoints} pts
          </span>
        </div>
      </Col>
      <Col
        md={1}
        className="text-end d-flex align-items-center justify-content-end"
      >
        <FaTrash
          className="text-danger fs-5"
          onClick={() => {
            dispatch(deleteAssignment(assignment._id));
          }}
        />
      </Col>
      <Col
        md={1}
        className="text-end d-flex align-items-center justify-content-end"
      >
        <FaCheckCircle className="text-success fs-5" />
      </Col>
      <Col md={1} className="d-flex align-items-center">
        <IoEllipsisVertical className="fs-4" />
      </Col>
    </Row>
  );
}
