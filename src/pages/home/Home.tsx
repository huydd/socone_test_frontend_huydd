import React, { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import CreateTaskButton from "../../components/createTaskButton/CreateTaskButton";
import TaskItem from "../../components/taskItem/TaskItem";
import { ITask } from "../../models/task.interface";
import { apiDeleteTaskById, apiGetTaskList } from "../../api/task.api";
import { ETaskStatus } from "../../constants/task.constant";
import FilterTask from "../../components/filterTask/FilterTask";
Chart.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const refOriginTasks = useRef<ITask[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [notFoundTask, setNotFoundTask] = useState<boolean>(false);
  const [chartConfig, setChartConfig] = useState<any>();

  /**
   * Get task list
   */
  const getTaskList = () => {
    const taskList = apiGetTaskList();
    setTasks(taskList);
    refOriginTasks.current = taskList;
    if (taskList.length === 0) setNotFoundTask(true);
  };

  /**
   * Delete task by id
   */
  const deleteTask = (taskId: number) => {
    let indexDeleteTask = tasks?.findIndex((task: ITask) => task.id === taskId);
    if (indexDeleteTask !== -1) {
      const newTaskList = [...tasks];
      newTaskList.splice(indexDeleteTask, 1);
      setTasks(newTaskList);
      refOriginTasks.current = newTaskList;
      apiDeleteTaskById(taskId);
      if (newTaskList.length === 0) setNotFoundTask(true);
    }
  };

  /**
   * Calculate percent status task
   */
  const calculatePercent = () => {
    const totalTasks = refOriginTasks.current.length;
    const completedCount = refOriginTasks.current.filter(
      (item) => item.status === ETaskStatus.completed
    ).length;
    const pendingCount = refOriginTasks.current.filter(
      (item) => item.status === ETaskStatus.pending
    ).length;
    const completedPercentage = (completedCount / totalTasks) * 100;
    const pendingPercentage = (pendingCount / totalTasks) * 100;
    setChartConfig({
      labels: [ETaskStatus.completed, ETaskStatus.pending],
      datasets: [
        {
          label: "% status",
          data: [completedPercentage, pendingPercentage],
          backgroundColor: ["#4ade80", "#6b7280"],
          hoverBackgroundColor: ["#22c55e", "#4b5563"],
        },
      ],
    });
  };

  /**
   * Handle filter
   */
  const doFilter = (statusFilters: string[]) => {
    const taskList = refOriginTasks.current.filter((item: ITask) =>
      statusFilters.includes(item.status)
    );
    setTasks([...taskList]);
  };

  useEffect(() => {
    getTaskList();
  }, []);

  useEffect(() => {
    calculatePercent();
  }, [refOriginTasks.current]);

  return (
    <div className="p-5">
      <div className="flex flex-row items-center justify-end">
        <CreateTaskButton />
      </div>
      {!notFoundTask ? (
        <div className="mt-2 flex flex-row xs:flex-col">
          <div className="w-7/12 xs:w-full">
            <FilterTask
              filterSelected={[ETaskStatus.completed, ETaskStatus.pending]}
              onFilter={doFilter}
            />
            {tasks ? (
              tasks.map((taskItem) => (
                <TaskItem
                  key={taskItem.id}
                  data={taskItem}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="w-5/12 xs:w-full p-5 flex items-start justify-center relative">
            <div className="w-4/5 flex items-center justify-center">
              {chartConfig && tasks.length > 0 && (
                <Pie
                  data={chartConfig}
                  options={{ maintainAspectRatio: true, responsive: true }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full pt-5 flex flex-col justify-center items-center">
          <img
            src="/assets/icon/todo-icon.png"
            alt="todo-logo"
            className="w-20 h-20 aspect-auto"
          />
          <span className="text-purple-500 mt-1">
            You don't have any tasks yet, create them now!
          </span>
        </div>
      )}
    </div>
  );
};

export default Home;
