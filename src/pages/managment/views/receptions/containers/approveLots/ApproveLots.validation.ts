import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().when("combined", {
    is: true,
    then: () => yup.string().required("Name is required when Combined"),
    otherwise: () => yup.string(),
  }),
  combined: yup.boolean(),
});
