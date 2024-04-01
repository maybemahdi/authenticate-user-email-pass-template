import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { AuthContext } from "../Components/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [logged, setLogged] = useState("");
  const [error, setError] = useState("");
  const [forgetError, setForgetError] = useState("");
  const [successForget, setSuccessForget] = useState("");
  const emailRef = useRef(null);
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "Firebase: Error (auth/invalid-credential).":
        return "Wrong email or password. Please try again.";
      // Add more cases for other error codes as needed
      default:
        return "An error occurred. Please try again later.";
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setForgetError("");
    setSuccessForget("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    //reset error or success message
    setLogged("");
    setError("");
    // signInWithEmailAndPassword(auth, email, password)
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        setLogged("Logged in successfully");
        toast.success("Logged in successfully");
        e.target.reset();
        navigate("/");
        if (!result.user.emailVerified) {
          toast.error("Please Verify Your Email");
        }
      })
      .catch((err) => {
        console.log(err.message);
        const errorMessage = handleFirebaseError(err.message);
        // const colonIndex = errorMessage.indexOf(":");
        // const cleanErrorMessage =
        //   colonIndex !== -1
        //     ? errorMessage.substring(colonIndex + 1).trim()
        //     : errorMessage;
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    setSuccessForget("");
    setLogged("");
    if (!email) {
      console.log("Please provide an email to get password reset link");
      setForgetError("Please provide an email to get password reset link");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setForgetError("Please provide a valid email address");
      toast.error("Please provide a valid email address");
      return;
    }
    console.log("send reset email", email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setForgetError("");
        setSuccessForget(`A password reset email was sent to: ${email}`);
        toast.success("Password reset Email was sent");
      })
      .catch((err) => setForgetError(err));
  };
  return (
    <div className="bg-grey-lighter min-h-[80vh] flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-4 rounded shadow-xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Log in</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              ref={emailRef}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              required
            />

            <div className="relative flex">
              <input
                type={showPassword ? "text" : "password"}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 cursor-pointer top-1/4"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            <h5
              onClick={handleForgetPassword}
              className="text-sm transition duration-1000 mb-2 text-gray-500 hover:underline cursor-pointer"
            >
              Forget Password?
            </h5>
            {forgetError && (
              <p className="text-red-500 font-semibold mb-1">{forgetError}</p>
            )}
            {successForget && (
              <p className="text-green-500 font-semibold mb-1">
                {successForget}
              </p>
            )}
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white font-semibold hover:bg-green-dark focus:outline-none my-1"
            >
              Login
            </button>
          </form>
          <div>
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            {logged && <p className="text-green-500 font-semibold">{logged}</p>}
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          New to our Website?
          <Link
            to={"/register"}
            className="ml-1 font-bold text-blue-500 border-b border-blue text-blue"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
