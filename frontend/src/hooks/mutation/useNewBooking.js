import { useMutation } from "react-query";
import Swal from "sweetalert2";

export const useNewBooking = (queryApi) => {
  const queryFun = useMutation(queryApi, {
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, id, context) => {
      Swal.fire({
        icon: "error",
        title: "Booking",
        showConfirmButton: false,
        timer: 2000,
      });
    },

    // Always refetch after error or success:
  });

  return queryFun;
};
