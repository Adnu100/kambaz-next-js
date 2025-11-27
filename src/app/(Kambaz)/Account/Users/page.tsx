"use client";

import PeopleTable from "../../Courses/[cid]/People/Table/page";

export default function Users() {
  return (
    <div>
      <h3>Users</h3>
      <PeopleTable selectOption={true} />
    </div>
  );
}
