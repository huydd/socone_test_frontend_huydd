import React, { Component } from "react";

const Header = () => {
  return (
    <header className="bg-purple-600 text-white p-4 flex items-center justify-between">
      <h4 className="text-white font-bold">SOC.ONE - Section 3: Coding Challenges</h4>
      <div className="flex items-center">
        <span className="text-white font-bold">Huy Dam Dinh</span>
      </div>
    </header>
  );
};

export default React.memo(Header);
