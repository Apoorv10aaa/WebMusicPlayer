import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingIndicator } from "./index";

function AuthLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus) {
      setLoading(false);
    } else {
      navigate("/");
    }
  }, [authStatus, navigate]);

  return loading ? <LoadingIndicator /> : <>{children}</>;
}
export default AuthLayout;
