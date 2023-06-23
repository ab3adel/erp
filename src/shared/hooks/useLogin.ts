import { useSelectedTenentId } from "@/global/states/selectedOrganizations";
import { useNavigate } from "react-router-dom";

export interface Params {
  onError?: (status: number) => void;
}

export const useLogin = (params?: Params) => {
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
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status.toString());
        }
        return res.json();
      })
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
      )
      .catch((error) => params?.onError?.(parseInt(error.message)));
  };
};
