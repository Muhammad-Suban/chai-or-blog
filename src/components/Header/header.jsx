import React from "react";
import { Container, logoutBtn, Logo } from "../index";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { authData } from "../../store/authSlice";

const authStatus = useSelector((state) => state.auth.status);
const navigate = useNavigate();

// always use in array navigate
const navItem = [
  {
    name: "Home",
    slug: "/",
    active: true,
  },
  {
    name: "login",
    slug: "/login",
    active: !authStatus,
  },
  {
    name: "Signup",
    slug: "/logout",
    active: !authStatus,
  },
  {
    name: "All Posts",
    slug: "/all-posts",
    active: authStatus,
  },
  {
    name: "Add Post",
    slug: "/add-post",
    active: authStatus,
  },
];

function header() {
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name} className="mr-4">
                  <button
                    onClick={(item) => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* latest syntax of react */}
            {/* if authStatus true then (data ) will execute */}
            {authStatus && (
              <li>
                <logoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default header;
