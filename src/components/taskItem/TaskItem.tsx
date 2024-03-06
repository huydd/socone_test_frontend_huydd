import React from "react";
import { ITask } from "../../models/task.interface";
import { ETaskStatus } from "../../constants/task.constant";
import { Link } from "react-router-dom";

interface ITaskItemProps {
  data: ITask;
  onDelete: (taskId: number) => void;
}

const TaskItem = ({ data, onDelete }: ITaskItemProps) => {
  const goDeleteTask = () => {
    if (data.id) onDelete(data.id);
  };

  return (
    <div className="w-full p-3 mb-2 flex flex-row items-center justify-between border border-dashed rounded-md border-purple-600 bg-white">
      <div className="flex flex-col flex-7 h-full ">
        <h4 className="font-bold text-lg">{data.title}</h4>
        <span className="text-md italic">{data.description}</span>
      </div>
      <div className="flex flex-col flex-3 items-end">
        <span
          className={` text-white text-sm rounded px-1 ${
            data.status === ETaskStatus.completed
              ? "bg-green-600"
              : "bg-gray-600"
          }`}
        >
          {data.status}
        </span>
        <span className="text-xs italic text-gray-600">{data.dueDate}</span>
        <div className="mt-2">
          <Link to={`/task/${data.id}`}>
            <button className="w-auto py-0.5 px-2 bg-purple-500 text-white text-sm rounded-md">
              Edit
            </button>
          </Link>
          <button
            onClick={goDeleteTask}
            className="w-auto py-0.5 px-2 ml-1 bg-red-500 text-white text-sm rounded-md"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);
