import { useQueryClient, useMutation } from "react-query";
import Swal from "sweetalert2";

export default function useProfileUpdate(queryKey, queryApi, notify) {
  const queryClient = useQueryClient();
  const queryFun = useMutation(queryApi, {
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, id, context) => {
      notify &&
        Swal.fire({
          icon: "error",
          title: "Updated",
          showConfirmButton: false,
          timer: 2000,
        });
    },
    onSuccess: () => {
      notify &&
        Swal.fire({
          icon: "success",
          title: "Updated",
          showConfirmButton: false,
          timer: 2000,
        });
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return queryFun;
}
