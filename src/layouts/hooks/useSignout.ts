import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const signoutUser = gql`
  mutation Logout {
    logout {
      status
      message
    }
  }
`;

export const useSignout = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [signout] = useMutation<{
    logout: {
      status: string;
      message: string;
    };
  }>(signoutUser);

  return () => {
    signout({
      onCompleted: () => {
        client.clearStore();
        localStorage.removeItem("token");
        navigate("/login");
      },
      onError: () => {
        client.clearStore();
        localStorage.removeItem("token");
        navigate("/login");
      },
    });
  };
};
