import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import NewTask from "./pages/newTask/NewTask";
import Task from "./pages/task/Task";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="new" element={<NewTask />} />
            <Route path="task/:taskId" element={<Task />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
