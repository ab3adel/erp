import { useGenericMutation } from "@/shared";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../graphql/mutations/loginUser";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const [login] = useGenericMutation<
    { login: { token: string } },
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
          localStorage.setItem("token", data.login.token);
          navigate("/");
        },
      });
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username/Email is required"),
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
