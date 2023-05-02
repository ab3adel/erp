import { useApolloClient } from "@apollo/client";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useSignout = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  return () => {
    client.clearStore();
    Cookies.remove("token");
    navigate("/login");
  };
};
