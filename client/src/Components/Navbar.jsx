import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

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
      <Link to="/" className="big">
        CalTrack
      </Link>
      `
      {cookies.access_token ? (
        <button>
          <Link to="/Stats">Stats</Link>
        </button>
      ) : (
        ""
      )}
      {!cookies.access_token ? (
        <button>
          <Link className="login" to="/auth">
            <LoginIcon />
          </Link>
        </button>
      ) : (
        <button className="logout" onClick={logout}>
          <LogoutIcon />
        </button>
      )}
    </div>
  );
};

export default Navbar