import React from "react";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const CreateTaskButton = () => {
  return (
    <Link to={"new"}>
      <button className="bg-opacity-30 bg-purple-600 text-black rounded-lg px-4 py-2 flex items-center">
        <BsPlus className="mr-2" />
        Add New Task
      </button>
    </Link>
  );
};

export default React.memo(CreateTaskButton);
