import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";

function NavbarSmartButton({
  path,
  pathName,
  onClick
}: {
  path: string;
  pathName: string;
  onClick?: () => any;
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
      onClick={() => {
        navigate(path);
        onClick && onClick();
      }}
    >
      {pathName}
    </button>
  );
}

export default NavbarSmartButton;
