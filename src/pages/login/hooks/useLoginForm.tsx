import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "@/shared/hooks/useLogin";

export const useLoginForm = () => {
  const login = useLogin();

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
        email: result.username,
        password: result.password,
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
