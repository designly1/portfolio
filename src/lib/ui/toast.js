import Swal from "sweetalert2";

export default function toast({ title = 'Error', timeOut = 3000, icon = 'error' }) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: timeOut,
        timerProgressBar: true
    });
    Toast.fire({
        icon: icon,
        title: title
    })
}