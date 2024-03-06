import { ITask } from "../models/task.interface";

export const apiCreateTask = (taskData: ITask) => {
  const taskList = localStorage.getItem("tasks");
  if (taskList) {
    let taskListData = JSON.parse(taskList);
    taskListData.push({
      id: new Date().getTime(),
      ...taskData,
    });
    localStorage.setItem("tasks", JSON.stringify(taskListData));
  } else {
    taskData.id = new Date().getTime();
    localStorage.setItem("tasks", JSON.stringify([taskData]));
  }
};

export const apiGetTaskList = () => {
  const taskList = localStorage.getItem("tasks");
  const taskData = taskList ? JSON.parse(taskList) : [];
  return taskData.reverse();
};

export const apiDeleteTaskById = (taskId: number) => {
  const taskList = localStorage.getItem("tasks");
  if (taskList) {
    let taskListData = JSON.parse(taskList);
    let indexDeleteTask = taskListData.findIndex(
      (task: ITask) => task.id === taskId
    );
    if (indexDeleteTask !== -1) {
      taskListData.splice(indexDeleteTask, 1);
      localStorage.setItem("tasks", JSON.stringify(taskListData));
    }
  }
};

export const apiGetTaskById = (taskId: number) => {
  const taskList = localStorage.getItem("tasks");
  if (taskList) {
    let taskListData = JSON.parse(taskList);
    const taskItem = taskListData.find((task: ITask) => task.id === taskId);
    return taskItem || null;
  }
  return null;
};

export const apiUpdateTask = (taskData: ITask) => {
  const taskList = localStorage.getItem("tasks");
  if (taskList) {
    let taskListData = JSON.parse(taskList);
    taskListData = taskListData.map((item: ITask) =>
      item.id === taskData.id ? taskData : item
    );
    localStorage.setItem("tasks", JSON.stringify(taskListData));
  }
};
