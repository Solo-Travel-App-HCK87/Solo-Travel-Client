import Swal from "sweetalert2";

export const showError = (err) => {
  let message = "Oops, something went wrong!"
  if (err.response) {
    message = err.response.data.message
  }

  return Swal.fire({
    title: "Error!",
    text: message,
    icon:"error"
  })

}

export const successRegister = () => {
  return Swal.fire({
    title:"SUCCESS",
    text: "Registered succesfully",
    icon:"success"
  })
}


export const successLogin = () => {
  const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
return Toast.fire({
  icon: "success",
  title: "Signed in successfully"
});
}