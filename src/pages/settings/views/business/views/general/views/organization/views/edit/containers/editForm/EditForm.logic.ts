import { useSelectedOrganiztion } from "@/global/states/selectedOrganizations";
import { useOrganiaztion } from "@/shared/hooks/graphql/queries/useOrganization/useOrganization";
import { useCountries } from "../../../../hooks/useCountries";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { useAddUpdateOrganizationMutation } from "../../../../hooks/useAddUpdateOrganizationMutation";
import { hasChanges } from "@/shared/utils/objectDiffCompare";

const validationSchema = Yup.object().shape({
  company_name: Yup.string().required("Company name is required"),
  address_1: Yup.string().required("Address 1 is required"),
  address_2: Yup.string(),
  city: Yup.number().required("City is required"),
  country: Yup.number().required("Country is required"),
  language: Yup.number().required("Language is required"),
  currency: Yup.number().required("Currency is required"),
});

export const useLogic = () => {
  const SelectedOrganizationId = useSelectedOrganiztion((state) => state.id);

  const { data: organizationData } = useOrganiaztion({
    id: SelectedOrganizationId,
  });

  const [mutateAddUpdateOrganization] = useAddUpdateOrganizationMutation();

  const { data: countires } = useCountries({ first: 100 });

  const form = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: validationSchema,
    initialValues: {
      company_name: "",
      address_1: "",
      address_2: "",
      city: NaN,
      country: NaN,
      language: NaN,
      currency: NaN,
    },
    onSubmit: (values, actions) => {
      if (SelectedOrganizationId)
        mutateAddUpdateOrganization({
          variables: {
            address1: values.address_1,
            address2: values.address_2,
            cityId: values.city,
            companyName: values.company_name,
            id: SelectedOrganizationId,
            countryId: values.country,
            currencyId: values.currency,
            languageId: values.language,
          },
        }).finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    if (organizationData?.organization) {
      form.setValues({
        city: organizationData.organization.city.id,
        address_1: organizationData.organization.address_1,
        address_2: organizationData.organization.address_2,
        country: organizationData.organization.country.id,
        company_name: organizationData.organization.company_name,
        currency: organizationData.organization.currency.id,
        language: organizationData.organization.language.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationData]);

  const formHasChanged = !hasChanges(form.values, {
    city: organizationData?.organization?.city.id,
    address_1: organizationData?.organization?.address_1,
    address_2: organizationData?.organization?.address_2,
    country: organizationData?.organization?.country.id,
    company_name: organizationData?.organization?.company_name,
    currency: organizationData?.organization?.currency.id,
    language: organizationData?.organization?.language.id,
  });

  return { form, formHasChanged, countires };
};
