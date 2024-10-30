import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import Image from "../../../public/img/absensi.jpg"

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agree) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must agree to the Terms and Conditions.',
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorData.message || 'Registration failed',
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: data.message || 'You have registered successfully!',
        });

        // Reset form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setAgree(false);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <section className="m-20 flex">
      <div className="w-2/5 h-full  hidden lg:block">
        <img
          src={Image}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Welcome to our community! Please fill out the form below to register.
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleRegister}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="Username"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your password
            </Typography>
            <Input
              size="lg"
              type="password"
              placeholder="Password"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Register Now
          </Button>

          <Typography variant="paragraph" className="mt-4 flex justify-center gap-1">
            Already have an account?
            <Link to="/auth/sign-in" className="font-medium text-black transition-colors hover:text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
