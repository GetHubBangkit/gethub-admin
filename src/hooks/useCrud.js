import { useRouter } from "next/router";
import useForm from "./useForm";
import useModal from "./useModal";
import useUser from "./useUser";
import { loadingAlert, MySwal, toastAlert, warningAlert } from "../lib/sweetalert";
import MyAxios from "../lib/my-axios";
import { INITIAL_EDIT_OPTIONS, INITIAL_FORM_CONFIG, INITIAL_TOGGLE_OPTIONS } from "../configs/initial-config";
import { ForbiddenError } from "../configs/exception";

const INITIAL_OPTIONS = {
	form: INITIAL_FORM_CONFIG,
	modal: INITIAL_TOGGLE_OPTIONS,
};

export default function useCrud(API_ENDPOINT, INITIAL_FORM, options = INITIAL_OPTIONS) {
	const config = { ...INITIAL_OPTIONS, ...options };

	const router = useRouter();
	const { logout } = useUser({ redirectTo: "/login" });

	const { show, toggle, open, close } = useModal({
		...config.modal,
		onClose: () => {
			if (typeof config.modal.onClose === "function") config.modal.onClose();
			reset();
		},
	});

	const {
		form,
		option,
		validation,
		isPending,
		submit,
		setForm,
		setOption,
		inputHandler,
		setNestedFormObject,
		setNestedFormArray,
		reset,
		resetOption,
		validate,
		setValidation,
		deleteDetailRow,
	} = useForm(INITIAL_FORM, {
		...config.form,
		url: API_ENDPOINT,
		onSuccess: (response) => {
			const refreshEvent = new Event("datatable:refresh");
			window.dispatchEvent(refreshEvent);

			if (typeof config.form.onSuccess === "function") config.form.onSuccess(response);
			close();
			return toastAlert("success", response.message, 2000);
		},
	});

	const create = () => {
		setOption((state) => ({ ...state, title: "Tambah Data", method: "POST", detail: false }));
		open();
		return;
	};

	const edit = async (id, options = INITIAL_EDIT_OPTIONS) => {
		const { usePost = false, params = {}, onSuccess } = { ...INITIAL_EDIT_OPTIONS, ...options };

		try {
			loadingAlert({ text: "Mengambil Data..." });
			const request = await MyAxios({ method: "GET", url: `${API_ENDPOINT}/${id}`, params: { ...params } });
			const response = await request.data;

			MySwal.close();

			const responseData = typeof onSuccess === "function" ? onSuccess(response.data) : response.data;

			setOption((state) => ({ ...state, title: "Edit Data", method: usePost ? "POST" : "PUT", detail: false }));
			setForm(responseData);

			open();
		} catch (error) {
			console.error("CRUD Error: ", error);
			if (error instanceof ForbiddenError) {
				toastAlert("error", error.message);
				return await logout();
			}

			toastAlert("error", error.message ?? "Terjadi kesalahan pada server!");
		}
	};

	const detail = async (id, options = INITIAL_EDIT_OPTIONS) => {
		const { usePost = false, params = {}, onSuccess } = { ...INITIAL_EDIT_OPTIONS, ...options };

		try {
			loadingAlert({ text: "Mengambil Data..." });
			const request = await MyAxios({ method: "GET", url: API_ENDPOINT, params: { id: id, ...params } });
			const response = await request.data;

			MySwal.close();

			const responseData = typeof onSuccess === "function" ? onSuccess(response.data) : response.data;

			setOption({ title: "Detail Data", method: usePost ? "POST" : "PUT", detail: true });
			setForm(responseData);

			open();
		} catch (error) {
			console.error("CRUD Error: ", error);
			if (error instanceof ForbiddenError) {
				toastAlert("error", error.message);
				return await logout();
			}

			toastAlert("error", error.message || "Terjadi kesalahan pada server!");
		}
	};

	const destroy = async (id, cb = null, options = {}) => {
		return warningAlert({
			...options,
			onConfirmed: async () => {
				try {
					const request = await MyAxios({ method: "DELETE", url: `${API_ENDPOINT}/${id}` });
					const response = await request.data;

					MySwal.close();

					const refreshEvent = new Event("datatable:refresh");
					window.dispatchEvent(refreshEvent);

					if (typeof cb === "function") cb();
					return toastAlert("success", response.message, 2000);
				} catch (error) {
					console.error("CRUD Error: ", error);
					if (error instanceof ForbiddenError) {
						toastAlert("error", error.message);
						return await logout();
					}

					toastAlert("error", error.message || "Internal Server Error!");
				}
			},
		});
	};

	return {
		create,
		detail,
		edit,
		destroy,
		formdata: {
			form,
			option,
			validation,
			isPending,
			submit,
			setForm,
			setOption,
			inputHandler,
			setNestedFormObject,
			setNestedFormArray,
			reset,
			resetOption,
			validate,
			setValidation,
			deleteDetailRow,
		},
		modal: {
			show,
			toggle,
			open,
			close,
		},
	};
}
