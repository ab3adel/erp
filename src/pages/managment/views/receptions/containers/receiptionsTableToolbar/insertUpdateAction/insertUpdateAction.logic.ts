import {
  gridColumnFieldsSelector,
  gridRowSelectionStateSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import { useCheckMode } from "../../../hooks/useCheckMode";
import { useFormik } from "formik";
import { useUpdateLotMutation } from "@/shared/hooks/graphql/mutation/updateLots/useUpdateLots";

export const useLogic = () => {
  const { isInEditMode } = useCheckMode();

  const [mutateUpdateOrInsert] = useUpdateLotMutation();

  const form = useFormik({
    initialValues: {
      // status: "",
      reception_date: "",
      account_id: 1,
      is_paid: false,
      weight: 1200,
      cost_per_uom: 10,
      grade: "",
      commission_uom: 0,
      id: 0,
      coffee_state: "",
    },
    onSubmit: (values) => {
      mutateUpdateOrInsert({
        variables: {
          input: {
            account_id: values.account_id,
            weight: values.weight,
            is_paid: !!values.is_paid,
            reception_date: values.reception_date,
            id: values.id,
            grade: values.grade,
            commission_uom: Number(values.commission_uom),
            coffee_state: "Cherry",
          },
        },
      });
    },
  });

  const apiRef = useGridApiContext();

  const rowsSelection = useGridSelector(apiRef, gridRowSelectionStateSelector);

  const fields = useGridSelector(apiRef, gridColumnFieldsSelector);

  const handleConfirm = () => {
    const mappedValues = fields.reduce((acc, current) => {
      acc[current] = apiRef.current.getRowWithUpdatedValues(
        rowsSelection[0],
        current
      )[current];

      return acc;
    }, {} as any);

    form
      .setValues({ ...mappedValues, id: Number(rowsSelection[0]) })
      .then(() => {
        form.submitForm();
      });
  };

  const handleCancel = () => {
    apiRef.current.stopRowEditMode({
      id: Number(rowsSelection[0]),
      field: "status",
    });
  };

  return { isInEditMode, handleCancel, handleConfirm };
};
