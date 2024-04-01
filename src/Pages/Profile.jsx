import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";
import Loading from "../Components/Loading";


const Profile = () => {
    const {user, loading} = useContext(AuthContext)
    if(loading){
        return <Loading/>
    }
    return (
        <div className="text-3xl my-10 flex justify-center items-center">
            {/* <h3>{user.length}</h3> */}
            {user.displayName}
        </div>
    );
};

export default Profile;