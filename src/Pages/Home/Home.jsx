import { useEffect } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import useLogout from "../../Hooks/useLogout";

const Home = ()=>{
    
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const {logout} = useLogout();

    useEffect(()=>{
        !user && navigate("/authpage");
    },[user])

    return <div className="home">
        Home
        <button onClick={logout}>logout</button>
    </div>
}
export default Home;