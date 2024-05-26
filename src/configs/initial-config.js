export const INITIAL_PRIVILEGE = { privileges: [], raw: [], roles: [] };
export const INITIAL_FORM_CONFIG = {
	title: "Tambah Data",
	method: "POST",
	url: "",
	params: {},
	useFormData: false,
	includeIdOnSubmit: false,
	beforeSubmit: null,
	onSuccess: null,
	onFailed: null,
	onSubmit: null,
	transformData: null,
	rules: [],
};
export const INITIAL_TOGGLE_OPTIONS = {
	onOpen: null,
	onClose: null,
};
export const INITIAL_EDIT_OPTIONS = {
	params: {},
	onSuccess: null,
	usePost: false,
};
export const INITIAL_LOADING_ALERT_OPTIONS = {
	title: "Harap Tunggu",
	text: "",
};
export const INITIAL_WARNING_ALERT_OPTIONS = {
	title: "Anda Yakin?",
	text: "Data akan dihapus permanen!",
	loadingText: "Menghapus data...",
	onConfirmed: null,
};
export const ALL_UNIT = {
	id: "All Unit",
	name: "All Unit",
	code: "-",
};
export const YEAR_OPTIONS = Array.from(
	{ length: new Date().getFullYear() - 1999 },
	(_, i) => new Date().getFullYear() - i,
).map((item) => ({
	label: item,
	value: item,
}));
