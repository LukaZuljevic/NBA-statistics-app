import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header>
      <h1>ZuljaScore</h1>
      <button onClick={handleLogOut} className="logOut-button">Logout</button>
    </header>
  );
}

export default Header;
