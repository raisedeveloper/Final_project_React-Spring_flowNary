// alert 창
import Swal from "sweetalert2";

export function correct (words){
  Swal.fire({
    title: words,
    icon: "success",
    showClass: {
      popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
      `
    },
    hideClass: {
      popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
      `
    }
  });
}

export function wrong (words){
  Swal.fire({
    title: words,
    icon: "warning"
  });
}


export function verify (words){
  Swal.fire({
    position: "center",
    icon: "success",
    title: words,
    showConfirmButton: false,
    timer: 1200
});
}