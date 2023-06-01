import LanguageSelect from "./LanguageSelect";
import NavbarSmartButton from "./NavbarSmartButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../core/providers/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from '@mui/icons-material/Menu';

interface NavButtonProps {
    menuMode?: boolean;
    setIsMenu?: (isMenu: boolean) => void;
}

export const NavButtons = ({ menuMode = false, setIsMenu }: NavButtonProps) => {
    
  const { logout, authenticated, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

    return (
        <div id="nav-buttons">
            {menuMode && <MenuIcon id="menu" onClick={() => setIsMenu && setIsMenu(false)}/>}
        {authenticated ? (
          <>
            <NavbarSmartButton
              path="/dashboard"
              pathName={t("navbar.dashboard")}
              onClick={() => setIsMenu && setIsMenu(false)}
            />
            <NavbarSmartButton path="/map" pathName={t("navbar.map")} onClick={() => setIsMenu && setIsMenu(false)}/>
            <NavbarSmartButton
              path="/map/activities"
              pathName={t("navbar.join-activity")}
              onClick={() => setIsMenu && setIsMenu(false)}
            />
            <NavbarSmartButton path="/history" pathName={t("navbar.history")} onClick={() => setIsMenu && setIsMenu(false)}/>
            <div className="spacedRight">
              <button id="logout-button" className="navButton" onClick={() => {
                    logout();
                    setIsMenu && setIsMenu(false)
                }}>
                {t("navbar.logout")}
              </button>
              {!menuMode ?
              <div className="spacedRightButtons">
                <div id="profile-icon-container">
                    <AccountCircleIcon
                        id="profile-icon"
                        onClick={() => {
                            navigate(`/user/${user._id}`)
                            setIsMenu && setIsMenu(false)
                        }}
                    />
                </div> 
                
              </div>
              : 
              <button id="profile-button" onClick={() => {
                navigate(`/user/${user._id}`)
                setIsMenu && setIsMenu(false)
            }}>
                  Profile
              </button>}
            </div>
          </>
        ) : (
          <div className="spacedRight">
            <button
              id="login-button"
              className="navButton"
              onClick={() => {
                navigate("/login")
                setIsMenu && setIsMenu(false)
            }}
            >
              {t("navbar.login")}
            </button>
            <button className="navButton" onClick={() => {
                navigate("/signin")
                setIsMenu && setIsMenu(false)
            }}>
              {t("navbar.signin")}
            </button>
          </div>
        )}
        {!menuMode && <LanguageSelect />}
      </div>
    )
};