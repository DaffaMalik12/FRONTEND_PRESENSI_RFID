import React, { useState } from "react";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../../public/img/absensi.jpg"

export function SignIn({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handler untuk login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("handleLogin called"); // Tambahkan log ini
  
    fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Lihat respons yang diterima
      if (data.success) {
        console.log("Login successful, calling login() function");
        login();
        navigate("/dashboard/home", { replace: true }); 
      } else {
        setError(data.message || "Login gagal. Silakan coba lagi.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    });
  };
  

  return (
    <section className="m-8 flex gap-4">
      <div className="w-2/5 h-full mt-20 hidden lg:block">
        <img
          src={Image}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleLogin}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          
          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          {error && (
            <Typography color="red" className="text-center mt-4">
              {error}
            </Typography>
          )}

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create an account</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
