// alert 창
import Swal from "sweetalert2";
import './alert.css'

export function correct(words) {
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

export function wrong(words) {
  Swal.fire({
    title: words,
    icon: "warning"
  });
}


export function verify(words) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: words,
    showConfirmButton: false,
    timer: 1200
  });
}

export async function deleteConfirm() {
  const result = await Swal.fire({
    title: "정말로 삭제하시겠습니까?",
    text: "복구 할 수 없습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: '취소'
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: "성공적으로 삭제되었습니다.",
      icon: "success"
    });
    return 1;
  }

  return 2;
}

export async function Declaration(bid) {
  const result = await Swal.fire({
    title: "정말로 신고하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: '취소'
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: "성공적으로 삭제되었습니다.",
      icon: "success"
    });
    return true;
  }

  return false;
}

