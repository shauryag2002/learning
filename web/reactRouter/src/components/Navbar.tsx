import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();
    return (<>
        <button onClick={() => navigate("/")}>Landing</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
    </>)
}

export default Navbar