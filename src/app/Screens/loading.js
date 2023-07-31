"use client";
import { Loader } from "@aws-amplify/ui-react";
import React from "react";

const loading = () => {
  return <Loader className="w-20 h-20" ariaLabel="Loading..." />;
};

export default loading;
