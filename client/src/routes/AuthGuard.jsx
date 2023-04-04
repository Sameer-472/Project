import { useEffect } from "react";
import { getAccessToken } from "../Util/helpers";
import { useNavigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  const navigate = useNavigate();

  // disallow user to access this page if user is loggedin 
  useEffect(() => {
    if (getAccessToken()) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}