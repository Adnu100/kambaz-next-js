"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import {
  addNewEnrollment,
  deleteEnrollment,
} from "../Courses/enrollmentReducer";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const [showAll, setShowAll] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector(
    (state: any) => state.enrollmentsReducer.enrollments
  );
  const enrolledCourses = useMemo(() => {
    if (!currentUser) return new Set();
    return new Set(
      enrollments
        .filter((enrollment: any) => enrollment.user === currentUser._id)
        .map((enrollment: any) => enrollment.course)
    );
  }, [enrollments, currentUser]);
  const allCourses = useSelector((state: any) => state.coursesReducer.courses);
  const courses: any = useMemo(() => {
    if (!currentUser) return [];
    return showAll
      ? allCourses
      : allCourses.filter((course: any) =>
          enrollments.some(
            (enrollment: any) =>
              enrollment.user === currentUser._id &&
              enrollment.course === course._id
          )
        );
  }, [allCourses, currentUser, showAll]);

  return (
    <div id="wd-dashboard">
      <Row className="mb-3">
        <Col md={10}>
          <h1 id="wd-dashboard-title">Dashboard</h1>
        </Col>
        <Col md={2}>
          <Button
            variant="primary"
            className="float-end"
            id="wd-dashboard-enrollment-button"
            onClick={() => setShowAll(!showAll)}
          >
            Enrollments
          </Button>
        </Col>
      </Row>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Row xs={1} md={5} className="g-4">
            {courses.map((course: any) => (
              <Col
                className="wd-dashboard-course"
                style={{ width: "300px" }}
                key={course._id}
              >
                <Card>
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src="/images/reactjs.png"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>
                      {showAll ? (
                        enrolledCourses.has(course._id) ? (
                          <Button
                            variant="danger"
                            className="float-end me-2 mb-2"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                deleteEnrollment({
                                  user: currentUser._id,
                                  course: course._id,
                                })
                              );
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            className="float-end me-2 mb-2"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                addNewEnrollment({
                                  user: currentUser._id,
                                  course: course._id,
                                })
                              );
                            }}
                          >
                            Enroll
                          </Button>
                        )
                      ) : (
                        <>
                          <Button variant="primary"> Go </Button>
                          {currentUser.role === "FACULTY" && (
                            <>
                              <button
                                onClick={(event) => {
                                  event.preventDefault();
                                  dispatch(deleteCourse(course._id));
                                }}
                                className="btn btn-danger float-end"
                                id="wd-delete-course-click"
                              >
                                Delete
                              </button>
                              <button
                                id="wd-edit-course-click"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setCourse(course);
                                }}
                                className="btn btn-warning me-2 float-end"
                              >
                                Edit
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
