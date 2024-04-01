import {useContext} from "react"
import {AuthContext} from "../Components/AuthProvider"
const Home = () => {
    const {name, age} = useContext(AuthContext)
    return (
        <div>
            <p>Name: <span>{name}</span></p>
            <p>Age: <span>{age}</span></p>
        </div>
    );
};

export default Home;