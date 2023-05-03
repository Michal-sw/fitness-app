import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";

function NavbarSmartButton({
  path,
  pathName,
}: {
  path: string;
  pathName: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const navButton = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    const buttonRef = navButton.current;
    if (location.pathname === path) {
      buttonRef?.classList.add("active");
    }
    return () => {
      buttonRef?.classList.remove("active");
    };
  }, [location.pathname, path]);

  return (
    <button
      ref={navButton}
      className="navButton"
      onClick={() => navigate(path)}
    >
      {pathName}
    </button>
  );
}

export default NavbarSmartButton;
