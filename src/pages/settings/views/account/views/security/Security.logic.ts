import { useSignout } from "@/layouts/hooks/useSignout";
import { usePasswordChangeMutation } from "./hooks/usePasswordChangeMutation";
import { Params } from "./types/password.types";
import { useFormik } from "formik";
import * as yup from "yup";

interface PasswordForm
  extends Pick<
    Params,
    "current_password" | "password" | "password_confirmation"
  > {}

const passwordChangeSchema = yup.object().shape({
  current_password: yup.string().required("Current password is required"),
  password: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .matches(/[a-z]/),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const useLogic = () => {
  const [changePassword] = usePasswordChangeMutation();

  const signout = useSignout();

  const form = useFormik<PasswordForm>({
    validationSchema: passwordChangeSchema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: (values, actions) => {
      changePassword({ variables: values }).then(() => {
        actions.resetForm();
        actions.setSubmitting(false);

        //logout  after changing the password so we can use the account with the new one
        signout();
      });
    },
  });

  return { form };
};
