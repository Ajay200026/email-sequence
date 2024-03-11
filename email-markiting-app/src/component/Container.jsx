import React, { useEffect, useState } from "react";
import Flow from "./React-flow/components/Flow";
import ParentComponent from "./React-flow/components/ParentComponent";

const Container = ({ sequenceName }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    // Check local storage for sequence deletion status
    const isDeletedFromLocalStorage = localStorage.getItem("isDeleted");
    if (isDeletedFromLocalStorage === "true") {
      setIsDeleted(true);
    }
  }, []);

  const handleDelete = () => {
    // Set deletion status to true in local storage
    localStorage.setItem("isDeleted", "true");
    setIsDeleted(true);
  };

  const restoreContainer = () => {
    // Remove deletion status from local storage
    localStorage.removeItem("isDeleted");
    setIsDeleted(false);
  };

  if (isDeleted) {
    return (
      <div className="p-4 m-2 mt-[-3rem] rounded">
        <h2 className="text-lg font-bold">
          This sequence has been deleted.{" "}
          <button
            className="text-blue-500 underline cursor-pointer"
            onClick={restoreContainer}
          >
            Restore
          </button>
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 m-2 mt-[-3rem] rounded">
      <h2 className="text-lg font-bold">
        {sequenceName} Sequence
        <button
          className="ml-2 text-red-500 underline cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      </h2>
      <div className="w-[100%] h-[550px] flex gap-x-10 max-sm:flex max-sm:flex-col max-sm:w-[100%] max-sm:items-center max-sm:justify-center">
        <div className="w-[500px] h-[500px]">
          <Flow />
        </div>
        <div>
          <ParentComponent />
        </div>
      </div>
    </div>
  );
};

export default Container;
