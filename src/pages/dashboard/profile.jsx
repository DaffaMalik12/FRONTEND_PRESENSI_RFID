import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    jurusan: "",
    kelas: "",
    rfid_UID: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/register", formData); // Full API endpoint
      setMessage(response.data.message);
      setError(false);

      // Show success modal
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: response.data.message,
        confirmButtonText: "OK",
      });

    } catch (error) {
      setMessage("Error: Could not register user");
      setError(true);
      console.error(error);

      // Show error modal
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Could not register user. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <Card className="w-full max-w-xl shadow-lg rounded-lg overflow-hidden">
        <CardHeader
          className="relative h-48 flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600"
        >
          <Avatar
            src="https://via.placeholder.com/150"
            alt="profile"
            size="lg"
            className="absolute -bottom-10 border-4 border-white"
          />
        </CardHeader>

        <CardBody className="p-8 pt-14">
          <Typography
            variant="h5"
            className="text-center mb-6 font-semibold text-gray-700"
          >
            Create Your Profile
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.keys(formData).map((field, index) => (
              <div key={index} className="flex flex-col">
                <label
                  className="text-sm font-semibold text-gray-600 capitalize"
                  htmlFor={field}
                >
                  {field.replace("_", " ")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter ${field.replace("_", " ")}`}
                  required
                />
              </div>
            ))}

            <Button type="submit" color="blue" className="w-full py-3 mt-4">
              Register
            </Button>
          </form>

          {message && (
            <Typography
              variant="small"
              className={`mt-6 text-center ${
                error ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </Typography>
          )}
        </CardBody>

        <CardFooter className="pt-6 pb-6 bg-gray-100">
          <Typography variant="small" className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div> 
  );
}

export default Profile;
