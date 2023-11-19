import Swal from "sweetalert2";

export const showErrorsMessage = (message: string, outsideClick = true) => {
  return Swal.fire({
    title: "Oppss...",
    html: `<p class="text-foreground/50">${message}</p>`,
    icon: "error",
    buttonsStyling: false,
    allowOutsideClick: outsideClick,
    customClass: {
      confirmButton: "h-9 rounded-md px-8 bg-primary text-primaryforeground",
      popup: "bg-background max-w-[90%]",
    },
  });
};

export const showSuccessMessage = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: `${message}`,
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      popup: "bg-background max-w-[90%]",
    },
  });
};
