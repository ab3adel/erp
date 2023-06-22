import { useState } from "react";
import * as yup from "yup";
import { useAddOwnerMutation } from "../../hooks/useAddOwnerMutation";
import { useAddOwnerStore } from "./addOwner.store";

export const useLogic = () => {
  const isOpen = useAddOwnerStore((state) => state.isOpen);

  const close = useAddOwnerStore((state) => state.Close);

  const [mutateAddOwner, { loading: loadingAddOwner }] = useAddOwnerMutation();

  const handleConfirmAddOwner = () => {
    mutateAddOwner({ variables: { email: addOwnerEmail } }).then(() => {
      close();
      setAddOwnerEmail("");
    });
  };

  const handleCancelAddOwner = () => close();

  const [addOwnerEmail, setAddOwnerEmail] = useState("");

  const isOwnerEmailValid = yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .isValidSync(addOwnerEmail);

  const handleEmailChange = (value: string) => setAddOwnerEmail(value);

  return {
    isOpen,
    handleConfirmAddOwner,
    isOwnerEmailValid,
    handleCancelAddOwner,
    loadingAddOwner,
    addOwnerEmail,
    handleEmailChange,
  };
};
