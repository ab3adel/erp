import { useGenericMutation } from "@/shared";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../graphql/mutations/loginUser";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const [login] = useGenericMutation<
    { login: { jwt: string } },
    { email: string; password: string }
  >(loginUser);
  const navigate = useNavigate();

  const formik = useFormik<{
    username: string;
    password: string;
    acceptTerms: boolean;
  }>({
    initialValues: {
      username: "",
      password: "",
      acceptTerms: false,
    },
    onSubmit: (result: { username: string; password: string }) => {
      login({
        variables: {
          email: result.username,
          password: result.password,
        },
        onCompleted: (data) => {
          Cookies.set("token", data.login.jwt);
          navigate("/");
        },
      });
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      acceptTerms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .required("You must accept the terms and conditions"),
    }),
  });
  return formik;
};
