import { useGenericMutation } from "@/shared";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signupUser } from "../graphql/mutations/signupUser";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useSignupForm = () => {
  const [signup] = useGenericMutation<
  { register: { jwt: string } },
  { email: string; password: string }
>(signupUser);

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
      signup({
        variables: {
          email: result.username,
          password: result.password,
        },
        onCompleted: (data) => {
          Cookies.set("token", data.register.jwt);
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
