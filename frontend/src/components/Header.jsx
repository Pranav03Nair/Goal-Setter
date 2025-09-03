import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";

import { Goal } from "lucide-react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../redux/auth/authSlice.js";

import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const { userToken } = useSelector((state) => state.auth);

  const onLogout = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  // Nav Links
  const mobileItems = userToken
    ? [
        <NavbarButton onClick={onLogout} variant="dark" key="logout">
          Logout
        </NavbarButton>,
      ]
    : [
        <NavbarButton as={Link} to="/login" key="login">
          Login
        </NavbarButton>,
        <NavbarButton as={Link} to="/register" key="register">
          Register
        </NavbarButton>,
      ];

  return (
    <Navbar>
      <NavBody>
        <Link to="/" className="text-xl flex items-center gap-1 font-bold text-black dark:text-white">
          {/* 🔄 Replace with your logo or text */}
          <Goal className="size-8" color="white" />
          GoalSetter
        </Link>

        <div className="hidden gap-4 lg:flex">
          {userToken ? (
            <NavbarButton onClick={onLogout} variant="light">
              Logout
            </NavbarButton>
          ) : (
            <>
              <NavbarButton as={Link} to="/login" variant="light">
                Login
              </NavbarButton>
              <NavbarButton as={Link} to="/register" variant="light">
                Register
              </NavbarButton>
            </>
          )}
        </div>
      </NavBody>
      <MobileNav visible>
        <MobileNavHeader>
          <Link to="/" className="text-lg font-bold text-black dark:text-white">
            GoalSetter
          </Link>
          <MobileNavToggle
            isOpen={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          {mobileItems}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

export default Header;
