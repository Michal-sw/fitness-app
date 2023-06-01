import "../../styles/Navbar.scss";

import FitbitIcon from "@mui/icons-material/Fitbit";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavButtons } from "./NavButtons";
import LanguageSelect from "./LanguageSelect";

function Navbar() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState<boolean>(false);

  return (
    <>
      <div id="navbar">
        <FitbitIcon id="logo-icon" onClick={() => navigate('/')}/>
        <div id="main-nav-buttons" className={`menu-${menu}`}>
          <NavButtons/>
        </div>
        <div id="navbar-menu">
          <div id={`language-menu`}>
            <LanguageSelect />
          </div>
          <MenuIcon id="menu" onClick={() => setMenu(active => !active)}/>
        </div>
      </div>
      <div id={`menu-${menu}`}>
        <NavButtons menuMode={true} setIsMenu={setMenu}/>
      </div>
    </>
  );
}

export default Navbar;
