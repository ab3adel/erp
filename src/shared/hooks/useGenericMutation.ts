import { DocumentNode, MutationHookOptions, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

export const useGenericMutation = <
  TData = Record<string, any>,
  TVariables = Record<string, any>
>(
  query: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation<TData, TVariables>(query, {
    ...options,
    onError: (error) => {
      options?.onError?.(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    },
  });
  return mutation;
};
