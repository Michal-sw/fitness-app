import "../../styles/Navbar.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FitbitIcon from "@mui/icons-material/Fitbit";
import NavbarSmartButton from "./NavbarSmartButton";
import useAuth from "../../core/providers/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";

function Navbar() {
  const { logout, authenticated, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div id="navbar">
      <FitbitIcon id="logo-icon" />
      {authenticated ? (
        <>
          <NavbarSmartButton
            path="/dashboard"
            pathName={t("navbar.dashboard")}
          />
          <NavbarSmartButton path="/map" pathName={t("navbar.map")} />
          <NavbarSmartButton
            path="/map/activities"
            pathName={t("navbar.join-activity")}
          />
          <NavbarSmartButton path="/history" pathName={t("navbar.history")} />
          <div className="spacedRight">
            <button id="logout-button" className="navButton" onClick={logout}>
              {t("navbar.logout")}
            </button>
            <AccountCircleIcon
              id="profile-icon"
              onClick={() => navigate(`/user/${user._id}`)}
            />
          </div>
        </>
      ) : (
        <div className="spacedRight">
          <button
            id="login-button"
            className="navButton"
            onClick={() => navigate("/login")}
          >
            {t("navbar.login")}
          </button>
          <button className="navButton" onClick={() => navigate("/signin")}>
            {t("navbar.signin")}
          </button>
        </div>
      )}
      <LanguageSelect />
    </div>
  );
}

export default Navbar;
