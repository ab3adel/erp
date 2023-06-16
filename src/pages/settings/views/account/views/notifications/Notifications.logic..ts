import { useFormik } from "formik";
import { Params } from "../../types/profile.types";
import { useMeQuery } from "../../hooks/useMeQuery";
import { useEffect } from "react";
import { hasChanges } from "@/shared/utils/objectDiffCompare";
import { useProfileUpdateMutation } from "../../hooks/useProfileUpdateMutation";

type Form = Pick<
  Params,
  | "email_notifications"
  | "Mcultivo_App_updates"
  | "password_updates"
  | "security_updates"
  | "communications"
>;

export const useLogic = () => {
  const [mutateProfile] = useProfileUpdateMutation();

  const { data: profileData, loading: LodaingProfileData } = useMeQuery();

  console.log(LodaingProfileData);

  const form = useFormik<Form>({
    initialValues: {
      email_notifications: false,
      communications: false,
      Mcultivo_App_updates: false,
      password_updates: false,
      security_updates: false,
    },
    onSubmit: (values, actions) => {
      mutateProfile({ variables: values }).then(() => {
        actions.setSubmitting(false);
      });
    },
  });

  useEffect(() => {
    if (profileData && profileData.me)
      form.setValues({
        communications: profileData.me?.profile.communications,
        email_notifications: profileData?.me?.profile.email_notifications,
        password_updates: profileData.me?.profile.password_updates,
        Mcultivo_App_updates: profileData.me?.profile.Mcultivo_App_updates,
        security_updates: profileData.me?.profile.security_updates,
      });
  }, [profileData]);

  const isSubmittingDisabled =
    form.isSubmitting ||
    !profileData?.me ||
    LodaingProfileData ||
    !hasChanges(profileData?.me?.profile, form.values);

  return { form, isSubmittingDisabled, profileData };
};
