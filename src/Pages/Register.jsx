import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { AuthContext } from "../Components/AuthProvider";
import toast from "react-hot-toast";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState("");
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(name, email, password, terms);

    //reset error or success message
    setRegistered("");
    setError("");

    if (password.length < 6) {
      return setError("Password should be at least 6 characters");
    } else if (!/[A-Z]/.test(password)) {
      return setError("Password must have at least one uppercase letter");
    }

    // createUserWithEmailAndPassword(auth, email, password)
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        setRegistered("User Created Successfully");
        toast.success("User Created Successfully")
        
        //update profile
        updateProfile(res.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(()=> {
            toast.success("Profile Updated")
        })
        .catch(err => console.log(err))
        //verify user
        sendEmailVerification(res.user)
          .then(() => {
            setRegistered(`A Verification Email was sent to ${email}`);
            toast.success('Verification Email sent')
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.message);
        const errorMessage = err.message;
        const colonIndex = errorMessage.indexOf(":");
        const cleanErrorMessage =
          colonIndex !== -1
            ? errorMessage.substring(colonIndex + 1).trim()
            : errorMessage;
        setError(cleanErrorMessage);
      });
  };
  return (
    <div className="bg-grey-lighter min-h-[80vh] flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-4 rounded shadow-xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              placeholder="Full Name"
              required
            />

            <input
              type="email"
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

            <div className="flex items-center mb-1 gap-2">
              <input
                type="checkbox"
                id="terms"
                className=""
                name="terms"
                required
              />
              <label htmlFor="terms">
                Accept with our terms and condition?
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white font-semibold hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>
          </form>
          <div>
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            {registered && (
              <p className="text-green-500 font-semibold">{registered}</p>
            )}
          </div>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline ml-1 border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline ml-1 border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            to={"/login"}
            className="ml-1 font-bold text-blue-500 border-b border-blue text-blue"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Register;
