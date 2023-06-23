import { useSignout } from "@/layouts/hooks/useSignout";
import { usePasswordChangeMutation } from "./hooks/usePasswordChangeMutation";
import { Params } from "./types/password.types";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

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

  const [showCurrentPassowrd, setShowCurrentPassword] = useState(false);

  const [showNewPassowrd, setShowNewPassword] = useState(false);

  const [showConfirmPassowrd, setShowConfirmPassowrd] = useState(false);

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
      changePassword({ variables: values })
        .then((resp) => {
          if (resp.errors) {
            resp.errors?.forEach((error: any) => {
              Object.keys(error?.extensions?.validation).forEach(
                (validationKey) => {
                  const fieldKeyFromValidation = validationKey.split(".")[1];

                  actions.setFieldError(
                    fieldKeyFromValidation,
                    error?.extensions?.validation[
                      `input.${fieldKeyFromValidation}`
                    ]
                  );
                }
              );
            });
          } else {
            actions.resetForm();

            //logout  after changing the password so we can use the account with the new one
            signout();
          }
        })
        .finally(() => actions.setSubmitting(false));
    },
  });

  return {
    form,
    showCurrentPassowrd,
    showNewPassowrd,
    showConfirmPassowrd,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassowrd,
  };
};
