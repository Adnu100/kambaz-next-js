"use client";

import { useParams } from "next/navigation";
import { FormControl, Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  findAllUsers,
  findUsersByPartialName,
  createUser,
} from "../../../../Account/client";
import PeopleDetails from "../Details";
import { FaPlus } from "react-icons/fa6";

export default function PeopleTable({
  selectOption = false,
}: {
  selectOption?: boolean;
}) {
  const [role, setRole] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  const { cid } = useParams();

  const createNewUser = async () => {
    const user = await createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    if (name && name.length > 0) {
      findUsersByPartialName(name).then((users) => {
        setUsers(
          users.filter((user: any) => (role ? user.role === role : true))
        );
      });
    } else
      findAllUsers(role).then((users) => {
        setUsers(users);
      });
  }, [cid, role, name, showDetails]);

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
          }}
        />
      )}
      {selectOption && (
        <>
          <button
            onClick={createNewUser}
            className="float-end btn btn-danger wd-add-people"
          >
            <FaPlus className="me-2" />
            Users
          </button>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select float-start w-25 wd-select-role"
          >
            <option value="">All Roles</option>
            <option value="STUDENT">Students</option>
            <option value="TA">Assistants</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrators</option>
          </select>
          <FormControl
            onChange={(e) => setName(e.target.value)}
            placeholder="Search people"
            className="float-start w-25 me-2 wd-filter-by-name"
          />
        </>
      )}
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <span
                    className="text-decoration-none"
                    onClick={() => {
                      setShowDetails(true);
                      setShowUserId(user._id);
                    }}
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                  </span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
