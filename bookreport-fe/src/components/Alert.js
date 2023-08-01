import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const icon = {
    SUCCESS : "success",
    ERROR : "error",
    WARNING : "warning",
    INFO : "info",
    question : "question"
}

const MixinToast = ({icon, title}) => {
    MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }})
    .fire({
        icon: icon,
        title: title
    })
}

const Toast = ({title, text, icon, confirmText, confirmTitle, confirmContent}) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#5E72E4',
        cancelButtonColor: '#F5365C',
        confirmButtonText: confirmText
    }).then((result) => {
        if (result.isConfirmed) {
            MySwal.fire(
                confirmTitle,
                confirmContent,
                'success'
            )
        }
    })
}

export {icon, MixinToast, Toast}