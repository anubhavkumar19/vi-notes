import { useState } from "react";
import { registerUser } from "../../services/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await registerUser({ email, password });
    const data = await res.text();
    alert(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-6 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-500 hover:bg-green-600 p-2 rounded font-bold"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;