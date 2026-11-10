import { useNavigate } from "react-router-dom"
import Counter from "./counter";

const Navbar = () => {
    const navigate = useNavigate();
    return (<>
        <button onClick={() => navigate("/")}>Landing</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <Counter />
    </>)
}

export default Navbar