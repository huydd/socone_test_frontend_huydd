import React, { Component } from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="mx-auto w-screen min-h-screen 2xl:max-w-5xl 3xl:max-w-6xl bg-slate-50">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
