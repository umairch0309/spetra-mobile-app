import { useQueryClient, useMutation } from "react-query";

export default function useSlotUpdate(queryKey, queryApi) {
  const queryClient = useQueryClient();
  const queryFun = useMutation(queryApi, {
    // When mutate is called:
    onMutate: async (data) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(queryKey);

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old) => {
        let cloneData = old;

        if (data.type === "physical") {
          cloneData.data.data.physicalTimeSlot = data.slots;
        } else if (data.type === "video") {
          cloneData.data.data.videoTimeSlot = data.slots;
        }

        return cloneData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, id, context) => {
      // Swal.fire({
      //   icon: "error",
      //   title: "Updated",
      //   showConfirmButton: false,
      //   timer: 2000,
      // });
      queryClient.setQueryData(queryKey, context.previousData);
    },
    onSuccess: () => {
      // Swal.fire({
      //   icon: "success",
      //   title: "Updated",
      //   showConfirmButton: false,
      //   timer: 2000,
      // });
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return queryFun;
}
