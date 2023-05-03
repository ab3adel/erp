import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export const useSignout = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  return () => {
    client.clearStore();
    localStorage.removeItem("token");
    navigate("/login");
  };
};
