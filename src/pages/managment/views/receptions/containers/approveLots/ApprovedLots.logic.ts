import { enqueueSnackbar } from "notistack";
import { useApprovePendingLotsStore } from "./ApproveLots.store";
import { useFormik } from "formik";
import { schema } from "./ApproveLots.validation";
import { useMergeLotsMutation } from "@/shared/hooks/graphql/mutation/mergeLots/useMergeLots";
import { useUpdateLotsStatusMutation } from "@/shared/hooks/graphql/mutation/updateLotsStatus/useUpdateLotsStatus";
import { useLots } from "@/shared/hooks/graphql/queries/useLots/useLots";
import { useMemo } from "react";

export const useLogic = () => {
  const idList = useApprovePendingLotsStore((state) => state.idList);

  const clearIdList = useApprovePendingLotsStore((state) => state.clearList);

  const [mutateUpdateLotsStatus, { loading: loadingUpdateLotStatus }] =
    useUpdateLotsStatusMutation();

  const [mutateMergeLots, { loading: loadingMergeLots }] =
    useMergeLotsMutation();

  const { data } = useLots({ filter: { ids: idList } });

  const totalWeight = useMemo(
    () =>
      data?.lots.data.reduce(
        (sum, current) => (sum = sum + (current?.weight ?? 0)),
        0
      ),
    [data?.lots.data]
  );

  const loading = loadingUpdateLotStatus || loadingMergeLots;

  const form = useFormik({
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: { name: "", combined: false },
    onSubmit: (values) => {
      const notficationMessage =
        idList.length === 1
          ? `1 Reception has been approved`
          : idList.length > 1 && !values.combined
          ? `${idList.length} Reception has been approved to inventory`
          : ``;

      // this promise will be used to merge multiply lots together
      const mergePromise = new Promise((resolve) => {
        if (values.combined)
          mutateMergeLots({
            variables: { ids: idList, name: values.name },
          }).then(() => {
            resolve("");
          });

        if (!values.combined)
          mutateUpdateLotsStatus({
            variables: { ids: idList, status: "approved" },
          }).then(() => resolve(""));
      });

      mergePromise.then(() => {
        if (notficationMessage)
          enqueueSnackbar({
            message: notficationMessage,
            anchorOrigin: { horizontal: "center", vertical: "bottom" },
          });
        clearIdList();
      });
    },
  });

  return { idList, clearIdList, form, loading, totalWeight };
};
