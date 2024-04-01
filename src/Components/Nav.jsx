import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("logged out successful");
      })
      .catch((err) => console.log(err));
  };
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
      <li>
        <NavLink to={"/register"}>Register</NavLink>
      </li>
      <li>
        <NavLink to={"/orders"}>Orders</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 my-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md font-semibold dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Authentication</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu gap-5 font-semibold menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-5">
        {user ? (
          <>
            <span>{user.email}</span>
            <button  onClick={handleLogOut} className="btn-ghost bg-green-500 btn">Sign Out</button>
          </>
        ) : (
          <Link to={"/login"}>
            <button className="btn-ghost bg-green-500 btn">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
