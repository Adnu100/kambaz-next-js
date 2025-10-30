"use client";

import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Title from "./Title";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

  return (
    <Container id="wd-courses">
      <Title course={course} />
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation cid={cid?.toString()} />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </Container>
  );
}
