import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "@/shared/hooks/useLogin";

export const useLoginForm = () => {
  /* For the future person who is going to work on this error handling, there is definitely a better way to handle it. Unfortunately,
   due to time constraints, I wasn't able to implement it properly. Please forgive me for any inconvenience caused. :') */
  const onError = (status: number) => {
    if (status === 401)
      formik.setFieldError(
        "username",
        "Invalid email or password. Please check your email and password and try again."
      );
  };

  const login = useLogin({ onError });

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
