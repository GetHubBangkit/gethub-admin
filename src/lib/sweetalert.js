import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { INITIAL_LOADING_ALERT_OPTIONS, INITIAL_WARNING_ALERT_OPTIONS } from "../configs/initial-config";
import colors from "../configs/theme";

export const MySwal = withReactContent(Swal);

export const toastAlert = (type, text, timer = 3600) =>
	MySwal.fire({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: timer,
		timerProgressBar: true,
		icon: type,
		title: text,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", MySwal.stopTimer);
			toast.addEventListener("mouseleave", MySwal.resumeTimer);
		},
	});

toastAlert.success = (text, timer = 3600) => toastAlert("success", text, timer);
toastAlert.info = (text, timer = 3600) => toastAlert("info", text, timer);
toastAlert.error = (text, timer = 3600) => toastAlert("error", text, timer);
toastAlert.warning = (text, timer = 3600) => toastAlert("warning", text, timer);

export const warningAlert = async (options = INITIAL_WARNING_ALERT_OPTIONS) => {
	const config = { ...INITIAL_WARNING_ALERT_OPTIONS, ...options };
	const result = await MySwal.fire({
		title: config.title,
		text: config.text,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: colors.primary[500],
		cancelButtonColor: colors.neutral[400],
		confirmButtonText: "Ya",
		cancelButtonText: "Tidak",
	});
	if (result.isConfirmed) {
		loadingAlert({ text: config.loadingText });
		if (typeof config.onConfirmed == "function") {
			return config.onConfirmed();
		}
	}
};

export const loadingAlert = (options = INITIAL_LOADING_ALERT_OPTIONS) => {
	const config = { ...INITIAL_LOADING_ALERT_OPTIONS, ...options };
	return MySwal.fire({
		title: config.title,
		text: config.text,
		didOpen: () => {
			MySwal.showLoading();
		},
	});
};

export const basicAlert = (title, text) =>
	MySwal.fire({
		icon: "warning",
		title: title,
		text: text,
	});
