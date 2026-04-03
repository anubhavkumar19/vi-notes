import React from "react";
import Editor from "./components/Editor/Editor";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const App: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h2 className="text-3xl font-bold">Welcome to Vi-Notes</h2>
        <Login />
        <Register />
      </div>
    );
  }

  return (
      <Editor />
  );
};

export default App;