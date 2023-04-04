import routes from "./routes";
import { useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { getAccessToken } from "../Util/helpers";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  let token = getAccessToken();

  useEffect(() => {
    if (!token) {
      navigate(
        {
          pathname: routes.login,
          search: createSearchParams({
            return: window.location.href,
          }).toString(),
        },
        { replace: true }
      );
    }
  }, [token]);

  return (
    <>
      {children}
    </>
  );
}
