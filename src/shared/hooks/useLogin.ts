import { useSelectedTenentId } from "@/global/states/selectedOrganizations";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const setSelectedTenant = useSelectedTenentId((state) => state.set);
  return (data: { email: string; password: string }) => {
    fetch(import.meta.env.VITE_BACKEND_URL + "api/login", {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((res) => res.json())
      .then(
        (res: {
          data: {
            token: string;
            tenant: string;
            organization: string;
          };
        }) => {
          localStorage.setItem("token", res.data.token);
          navigate("/");
          setSelectedTenant(res.data.tenant);
        }
      );
  };
};
