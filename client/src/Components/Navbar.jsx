import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/Auth">Login/Rgister</Link>
      <Link to="/Stats">Stats</Link>
    </div>
  );
};

export default Navbar