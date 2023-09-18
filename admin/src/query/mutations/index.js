import { useMutation, useQueryClient } from "react-query";

export const useDeleteItemMutataion = (queryFn, queryKey) => {
  const queryClient = useQueryClient();
  const queryMutation = useMutation(queryFn, {
    // When mutate is called:
    onMutate: async ({ id }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(queryKey);

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old) => {
        let cloneData = old;
        let filterData = old.data.filter((el) => el._id !== id);
        cloneData.data = filterData;
        return cloneData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, id, context) => {
      queryClient.setQueryData(queryKey, context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return queryMutation;
};
