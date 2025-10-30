"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string | undefined }) {
  const pathname = usePathname();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          href={`/Courses/${cid}/${link}`}
          id={`wd-course-${link}-link`}
          className={`list-group-item ${
            pathname.endsWith(link) ? "active" : ""
          } border-0 text-danger`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
