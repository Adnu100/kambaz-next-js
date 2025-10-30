"use client";

import { usePathname } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";

export default function Title({ course }: Readonly<any>) {
  const pathname = usePathname();
  const pathtree = pathname.split("/");
  const coursesIndex = pathtree.findIndex((path) => path === "Courses");
  const breadcrumbs = pathtree.slice(coursesIndex + 2);

  return (
    <div>
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course.name} &gt; {breadcrumbs.join(" > ")}
      </h2>
    </div>
  );
}
