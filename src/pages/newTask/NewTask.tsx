import React, { useState } from "react";
import { ITask } from "../../models/task.interface";
import { ETaskStatus } from "../../constants/task.constant";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { apiCreateTask } from "../../api/task.api";

const NewTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<ITask>({
    title: "",
    description: "",
    status: "pending",
    dueDate: dayjs().format("YYYY/MM/DD"),
  });
  const [formValid, setFormValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (key: string) => (event: any) => {
    setTask({
      ...task,
      [key]: event.target.value,
    });
  };

  /**
   * Handle check status
   */
  const onCheckStatus = (event: any) => {
    setTask({
      ...task,
      status: event.target.checked
        ? ETaskStatus.completed
        : ETaskStatus.pending,
    });
  };

  /**
   * Handle create task
   */
  const doCreateTask = () => {
    if (task.title && task.description) {
      setLoading(true);
      apiCreateTask(task);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1000);
    } else {
      setFormValid(false);
    }
  };

  const goBack = () => navigate(-1);

  return (
    <div className="h-screen pt-10 flex justify-center items-start bg-slate-50">
      <div className="w-3/6 h-auto p-3 bg-white rounded-md border-dashed border border-purple-400">
        {!loading ? (
          <>
            <h4 className="font-bold text-lg text-purple-500">
              Create New Task
            </h4>
            <div className="w-full">
              <label className="text-lg">
                Title*:
                <input
                  placeholder="Enter title..."
                  data-testid="task-title"
                  className="w-full h-10 border  border-slate-400 rounded-md p-3"
                  onChange={onChange("title")}
                />
              </label>
            </div>
            <div className="w-ful mt-3">
              <label className="text-lg">
                Description*:
                <textarea
                  rows={4}
                  placeholder="Enter descriptions..."
                  data-testid="task-description"
                  className="w-full h-30 border border-slate-400 rounded-md p-3"
                  onChange={onChange("description")}
                />
              </label>
            </div>
            <div className="w-ful mt-3">
              <label className="text-lg">
                Completed:
                <input
                  type="checkbox"
                  checked={task.status === ETaskStatus.completed}
                  onChange={onCheckStatus}
                  className="ml-5 w-4 h-4"
                />
              </label>
            </div>
            <div className="w-ful mt-3">
              <label className="text-lg">
                Due Date:
                <DatePicker
                  selected={
                    task.dueDate ? new Date(task.dueDate) : new Date()
                  }
                  onChange={(date) => {
                    if (date) {
                      setTask({
                        ...task,
                        dueDate: dayjs(date).format("YYYY/MM/DD"),
                      });
                    }
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                  className="ml-3 px-2 py-1 border rounded border-slate-400 focus:outline-none focus:ring focus:border-blue-300"
                />
              </label>
            </div>
            {!formValid && (
              <div className="w-ful mt-3">
                <span className=" text-red-500">
                  You need to fill in all information
                </span>
              </div>
            )}
            <div className="w-ful mt-3 flex items-center justify-end">
              <button
                onClick={goBack}
                className="w-auto h-10 px-4 rounded-md bg-zinc-200 transition-all hover:border hover:border-slate-400"
              >
                Go Back
              </button>
              <button
                onClick={doCreateTask}
                className="ml-3 w-auto h-10 px-4 rounded-md bg-zinc-200 transition-all hover:bg-purple-600 hover:text-white"
              >
                Create
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/assets/icon/todo-icon.png"
                alt="todo-logo"
                className="w-12 h-12 aspect-auto"
              />
              <span className="text-purple-500 mt-1">Creating tasks...</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewTask;
