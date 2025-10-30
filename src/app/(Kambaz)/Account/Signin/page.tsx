"use client";

import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { Button, FormControl, FormGroup } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen p-3">
      <h3>Sign in</h3>
      <FormGroup className="mb-3" controlId="wd-username">
        <FormControl
          className="mb-3"
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          type="text"
          placeholder="username"
        />
      </FormGroup>
      <FormGroup className="mb-3" controlId="wd-password">
        <FormControl
          className="mb-3"
          defaultValue={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          type="password"
          placeholder="password"
        />
      </FormGroup>
      <Button onClick={signin} className="w-100 mb-3" color="primary">
        Signin
      </Button>
      <Link href="Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
