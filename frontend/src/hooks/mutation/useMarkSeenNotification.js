import { useMutation, useQueryClient } from "react-query";
export default function useMarkSeenNotification(queryKey, queryApi) {
  const queryClient = useQueryClient();
  const queryFun = useMutation(queryApi, {
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return queryFun;
}
