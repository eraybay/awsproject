"use client";
import React, { useState, useEffect } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import awsExports from "../../../aws-exports";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsExports);

const ProfilePage = ({ signOut }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
  };

  return (
    <div>
      {user && (
        <>
          <h1 className="text-2xl font-semibold tracking-wide mt-6 underline">
            {" "}
            Profile
          </h1>
          <h1 className="font-medium text-gray-500 my-2">
            Username: {user.username}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {" "}
            Email: {user.attributes.email}
          </p>
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default withAuthenticator(ProfilePage);
