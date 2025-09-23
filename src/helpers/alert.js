import Swal from "sweetalert2";

export const showError = (err) => {
  let message = "Oops, something went wrong!"
  if (err) {
    message = err.response.data.message
  }

  return Swal.fire({
    title: "Error!",
    text: message,
    icon:"error"
  })

}