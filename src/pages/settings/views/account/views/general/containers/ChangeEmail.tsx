import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import ChangeEmailDialog from "../components/ChangeEmailDialog/ChangeEmailDialog";
import VerifingEmailDialog from "../components/VerifyingEmailDialog/VerifingEmailDialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useChangeEmail } from "../hooks/useChangeEmail";
import { verifiyEmail } from "../graphql/mutations/verifiyEmail";
import { useVerifiyEmail } from "../hooks/useVerifiyEmail";

const codeValidationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
});

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

interface ChangeEmailProps {}

const ChangeEmail: FunctionComponent<ChangeEmailProps> = () => {
  const [showChangeEmailDialog, setShowChangeEmailDialog] = useState(false);

  const [showVerifiyEmailDialog, setShowVerifiyEmailDialog] = useState(false);

  const handleShowChangeEmailDialog = () => setShowChangeEmailDialog(true);

  const handleCancelChangeEmail = () => setShowChangeEmailDialog(false);

  const handleCancelVerifiyEmail = () => setShowVerifiyEmailDialog(false);

  const [mutateChangeEmail] = useChangeEmail();

  const [mutateVerifiyCode] = useVerifiyEmail();

  const emailForm = useFormik({
    initialValues: { email: "" },
    onSubmit: (values, actions) => {
      mutateChangeEmail({ variables: { newEmail: values.email } })
        .then(() => {
          setShowVerifiyEmailDialog(true);
          setShowChangeEmailDialog(false);
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
    validationSchema: emailValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const verifiyCode = useFormik({
    validationSchema: codeValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: { code: "" },
    onSubmit: (values, actions) => {
      mutateVerifiyCode({ variables: { code: values.code } })
        .then(() => {
          setShowVerifiyEmailDialog(false);
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

  return (
    <>
      <ChangeEmailDialog
        open={showChangeEmailDialog}
        onCancel={handleCancelChangeEmail}
        textfieldProps={{
          name: "email",
          onChange: emailForm.handleChange,
          error: !!emailForm.errors.email,
          helperText: emailForm.errors.email,
        }}
        confirmButtonProps={{
          onClick: emailForm.submitForm,
          disabled: emailForm.isSubmitting,
        }}
      />

      <VerifingEmailDialog
        open={showVerifiyEmailDialog}
        onCancel={handleCancelVerifiyEmail}
        textfieldProps={{
          name: "code",
          onChange: verifiyCode.handleChange,
          error: !!verifiyCode.errors.code,
          helperText: verifiyCode.errors.code,
        }}
        verifiyEmail={emailForm.values.email}
        confirmButtonProps={{
          onClick: verifiyCode.submitForm,
          disabled: verifiyCode.isSubmitting,
        }}
      />

      <Button variant="outlined" onClick={handleShowChangeEmailDialog}>
        Change email
      </Button>
    </>
  );
};

export default ChangeEmail;
