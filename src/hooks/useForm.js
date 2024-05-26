import { useState } from "react";
import MyAxios from "../lib/my-axios";
import { INITIAL_FORM_CONFIG } from "../configs/initial-config";
import _ from "underscore";
import { toastAlert } from "../lib/sweetalert";

export const useForm = (initialState, initialConfig = INITIAL_FORM_CONFIG) => {
	const [form, setForm] = useState(initialState);
	const [option, setOption] = useState({ ...INITIAL_FORM_CONFIG, ...initialConfig });
	const [validation, setValidation] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const reset = () => setForm(initialState);
	const resetOption = () => setOption({ ...INITIAL_FORM_CONFIG, ...initialConfig });

	const validate = () => {
		const rules = option.rules;
		let errors = {};

		for (const rule of rules) {
			const fieldValue = form[rule.field];
			if (fieldValue === "") {
				errors = { ...errors, [rule.field]: { error: true, message: `Harap Isi Bidang ${rule.label}` } };
			}
		}

		setValidation(errors);
		return Object.keys(errors).length >= 1;
	};

	const setNestedFormObject = (data, keys, value) => {
		const [parent, child] = keys;
		return { ...data, [parent]: { ...data[parent], [child]: value } };
	};

	const setNestedFormArray = (data, keys, index, value) => {
		const [parent, child] = keys;

		let copy = data[parent];
		copy[index][child] = value;

		return { ...data, [parent]: [...copy] };
	};

	const inputHandler = (event, cb) => {
		const inputName = event.target.name;
		let inputValue = event.target.value;
		switch (event.target.type) {
			case "file":
				inputValue = event.target.files[0];
				break;
			case "checkbox":
				inputValue = event.target.checked;
				break;
		}

		return setForm((state) => {
			let formValue = structuredClone(state);

			if (inputName.split(".").length > 1) {
				if (event.target.attributes.index) {
					formValue = setNestedFormArray(
						formValue,
						inputName.split("."),
						event.target.attributes.index.value,
						inputValue,
					);
				} else {
					formValue = setNestedFormObject(formValue, inputName.split("."), inputValue);
				}
			} else {
				formValue = { ...formValue, [inputName]: inputValue };
			}

			if (typeof cb == "function") formValue = cb(formValue, event.target.attributes?.index?.value);

			return formValue;
		});
	};

	const submit = async (event) => {
		setIsPending(true);

		if (typeof event === "object") event.preventDefault();

		try {
			// const hasError = validate();
			// if (hasError === true) return;

			const hasId = form?.id && form?.id !== "" && option.method === "PUT" ? form.id : null;

			let formdata =
				typeof option.transformData === "function"
					? option.transformData(form)
					: _.pick(form, Object.keys(initialState));
			if (option.includeIdOnSubmit === false) {
				delete formdata.id;
			}

			if (typeof option.beforeSubmit === "function") option.beforeSubmit(formdata);

			if (option.useFormData === true) {
				formdata = new FormData();
				for (const [key, value] of Object.entries(form)) {
					formdata.append(key, value);
				}
			}

			if (typeof option.onSubmit === "function") return await option.onSubmit(formdata);

			const request = await MyAxios({
				url: !hasId ? option.url : `${option.url}/${hasId}`,
				method: option.useFormData ? "POST" : option.method,
				params: {
					...(option.useFormData && option.method === "PUT" ? { _method: "put" } : {}),
					...option.params,
				},
				data: formdata,
			});
			const response = await request.data;
			if (typeof option.onSuccess === "function") option.onSuccess(response);
		} catch (error) {
			console.error("Form Error: ", error);
			if (typeof option.onFailed === "function") option.onFailed(error);
			else toastAlert.error(error.message);
		} finally {
			setIsPending(false);
		}
	};

	function deleteDetailRow(field, rowIndex) {
		return setForm((state) => ({ ...state, [field]: [...state[field].filter((_, index) => index != rowIndex)] }));
	}

	return {
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
	};
};

export default useForm;
