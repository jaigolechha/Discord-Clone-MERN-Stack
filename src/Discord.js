import React from "react";
import "./Discord.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
function Discord() {
  return (
    <div className="discord">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Discord;
