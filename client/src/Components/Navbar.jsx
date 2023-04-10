import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes/routes";
import { getAccessToken } from "../Util/helpers";
import ConnectWalletButton from "./ConnectWalletButton";
import { useAddress } from "@thirdweb-dev/react";

export default function Navbar() {
  let token = getAccessToken();

  const address = useAddress();

  const [isActive, setActive] = useState("home");

  useEffect(() => {
    const path = window.location.pathname;
    setActive(path);
  }, [isActive]);
  return (
    <div className="navbarWrapper sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-center">
          <div className="d-flex">
            <Link
              className="navbar-brand"
              to={routes.home}
              onClick={() => setActive("/")}
            >
              <img
                className="img-fluid"
                src="https://pngimg.com/d/shopping_cart_PNG71.png"
                alt="logo"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link
                  to={routes.home}
                  onClick={() => setActive("/")}
                  aria-current="page"
                  className={
                    isActive == "/" ? "nav-link my-border" : "nav-link"
                  }
                >
                  Home
                </Link>
                <Link
                  to={routes.marketPlace.index}
                  onClick={() => setActive("market")}
                  className={
                    isActive.includes("market")
                      ? "nav-link my-border"
                      : "nav-link"
                  }
                >
                  Market Place
                </Link>
               
                {token && (
                  <Link
                    to={routes.wishlist}
                    onClick={() => {
                      setActive("wishlist");
                    }}
                    className={
                      isActive.includes("wishlist")
                        ? "nav-link my-border"
                        : "nav-link"
                    }
                  >
                    Wishlist
                  </Link>
                )}
                <Link
                  to={routes.contact}
                  onClick={() => setActive("contact")}
                  className={
                    isActive.includes("contact")
                      ? "nav-link my-border"
                      : "nav-link"
                  }
                >
                  Contact Us
                </Link>
                {!token && (
                  <>
                    <Link
                      to={routes.login}
                      onClick={() => setActive("login")}
                      className={
                        isActive.includes("login")
                          ? "nav-link my-border"
                          : "nav-link"
                      }
                    >
                      Login
                    </Link>
                    <Link
                      to={routes.signup}
                      onClick={() => setActive("signup")}
                      className={
                        isActive.includes("signup")
                          ? "nav-link my-border"
                          : "nav-link"
                      }
                    >
                      Signup
                    </Link>
                  </>
                )}
                {token && (
                  <>
                    <Link
                      to={routes.listItem}
                      onClick={() => setActive("listItem")}
                      className={
                        isActive.includes("listItem")
                          ? "nav-link my-border"
                          : "nav-link"
                      }
                    >
                      List Item
                    </Link>
                  </>
                )}
                {token && (
                  <Link
                    to={routes.login}
                    onClick={() => {
                      localStorage.clear();
                      setActive("login");
                    }}
                    className={
                      isActive.includes("login")
                        ? "nav-link my-border d-none"
                        : "nav-link"
                    }
                  >
                    Logout
                  </Link>
                )}
                <ConnectWalletButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
