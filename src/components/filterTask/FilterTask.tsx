import React, { useState } from "react";
import { ITask } from "../../models/task.interface";
import { ETaskStatus } from "../../constants/task.constant";

interface ITaskItemProps {
  filterSelected: string[];
  onFilter: (statusList: string[]) => void;
}

const FilterTask = ({ filterSelected, onFilter }: ITaskItemProps) => {
  const [statuses, setStatus] = useState<string[]>(filterSelected);

  const toggleFilter = (status: ETaskStatus) => () => {
    let _statuses = [];
    if (statuses.includes(status)) {
      _statuses = statuses.filter((item) => item !== status);
    } else {
      _statuses = [...statuses, status];
    }
    setStatus(_statuses);
    onFilter(_statuses);
  };

  return (
    <div className="mb-4 flex flex-row items-center justify-end">
      Filter:
      <button
        className={`ml-3 rounded-md py-0.5 px-3 border  border-gray-500 text-sm ${
          statuses.includes(ETaskStatus.completed) &&
          "border-green-600 bg-green-600 text-white"
        }`}
        onClick={toggleFilter(ETaskStatus.completed)}
      >
        Completed
      </button>
      <button
        className={`ml-3 rounded-md py-0.5 px-3 border border-gray-500 text-sm ${
          statuses.includes(ETaskStatus.pending) &&
          "border-gray-600 bg-gray-600 text-white"
        }`}
        onClick={toggleFilter(ETaskStatus.pending)}
      >
        Pending
      </button>
    </div>
  );
};

export default React.memo(FilterTask);
