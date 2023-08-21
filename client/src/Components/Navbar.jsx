import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {cookies.access_token ? (
        <Link to="/Stats">Stats</Link>
      ) : ("")}
      {!cookies.access_token ? (
        <Link to="/auth"> Login/Register </Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
  );
};

export default Navbar