import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";

const Root = () => {
    return (
        <div className="mx-auto w-[85%]">
            <Nav/>
            <Outlet/>
        </div>
    );
};

export default Root;