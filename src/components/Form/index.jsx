import classNames from "classnames";
import { forwardRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useDeepCompareEffect from "use-deep-compare-effect";
import { Switch } from "@headlessui/react";
import Select from "react-select";
import Button from "../Button";
import useForm from "../../hooks/useForm";
import { MySwal, loadingAlert } from "../../lib/sweetalert";
import colors from "../../configs/theme";

export const Form = forwardRef(({ children, className, ...rest }, ref) => {
	return (
		<form ref={ref} className={twMerge(classNames(className))} {...rest}>
			{children}
		</form>
	);
});

Form.Group = ({ children, className, ...rest }) => {
	return (
		<div className={twMerge(classNames("relative mb-4", className))} {...rest}>
			{children}
		</div>
	);
};

Form.Label = ({ children, className, ...rest }) => {
	return (
		<label
			className={twMerge(classNames("mb-1 block text-sm font-semibold uppercase text-neutral-900", className))}
			{...rest}
		>
			{children}
		</label>
	);
};

Form.Input = forwardRef(({ error, className, addon = null, addonPosition = "right", ...rest } = {}, ref) => {
	return (
		<>
			<div className="flex w-full items-stretch">
				{addon && addonPosition === "left" && (
					<div className="flex items-center justify-center rounded-l border border-primary-500 bg-primary-500 px-4 text-primary-100">
						{addon}
					</div>
				)}
				<input
					ref={ref}
					className={twMerge(
						classNames(
							"form-input",
							{
								"rounded-l-none": addon && addonPosition === "left",
								"rounded-r-none": addon && addonPosition === "right",
							},
							className,
						),
					)}
					{...rest}
				/>
				{addon && addonPosition === "right" && (
					<div className="flex items-center justify-center rounded-r border border-primary-500 bg-primary-500 px-4 text-primary-100">
						{addon}
					</div>
				)}
			</div>
			{error && <small className="mt-2 text-xs font-semibold text-danger-500">{error}</small>}
		</>
	);
});

Form.HTMLSelect = ({
	value,
	options,
	className,
	withEmptyState = true,
	placeholder = "",
	disableAutoSelect = false,
	disabled,
	...rest
} = {}) => {
	const [controlledDisabled, setControlledDisabled] = useState(false);
	useDeepCompareEffect(() => {
		setControlledDisabled(false);
		if (!options || !Array.isArray(options) || options.length > 1 || value || disableAutoSelect) return;
		const selected = options[0].value;
		const name = rest.name;
		const event = {
			target: {
				name: name,
				value: selected,
			},
		};

		setControlledDisabled(true);
		rest.onChange(event);
	}, [options]);

	return (
		<select
			className={classNames("form-select", className)}
			value={value}
			disabled={disabled || controlledDisabled}
			{...rest}
		>
			{withEmptyState && <option value="">{placeholder}</option>}
			{options.map((option, index) => (
				<option key={`${rest.name}-option-${index}`} value={option.value} disabled={option.disabled}>
					{option.label}
				</option>
			))}
		</select>
	);
};

Form.Combobox = ({
	className,
	value,
	required,
	options,
	refreshHandler,
	disableAutoSelect = false,
	styles = {},
	isDisabled,
	...props
} = {}) => {
	const [controlledDisabled, setControlledDisabled] = useState(false);
	useEffect(() => {
		setControlledDisabled(false);
		if (!options || !Array.isArray(options) || options.length > 1 || value || disableAutoSelect) return;
		const selected = options[0];

		setControlledDisabled(true);
		props.onChange(selected);
	}, [options]);

	return (
		<div className="relative w-full max-w-full">
			<div className="flex items-stretch gap-2">
				<div className="grow">
					<Select
						className={className}
						styles={{
							menuPortal: (base) => ({ ...base, zIndex: 9999, ...styles?.menuPortal }),
							control: (base, state) => ({
								...base,
								borderWidth: "1px",
								borderColor: colors.gray[500],
								boxShadow: "none !important",
								padding: "0.2rem 0.2rem",
								fontSize: "1rem",
								"&:disabled": {
									backgroundColor: colors.primary[100],
								},
								"&:hover": {
									borderColor: colors.primary[500],
								},
								...(state.isDisabled ? { backgroundColor: colors.neutral[100] } : {}),
								...styles?.control,
							}),
							container: (base) => ({
								...base,
								border: "none",
								...styles?.container,
							}),
							option: (base, state) => ({
								...base,
								backgroundColor: state.isSelected ? colors.primary[100] : colors.white,
								color: colors.primary[900],
								"&:active": {
									backgroundColor: colors.primary[100],
								},
								...styles?.option,
							}),
							valueContainer: (base) => ({
								...base,
								...styles?.valueContainer,
							}),
							singleValue: (base) => ({
								...base,
								color: "black",
							}),
						}}
						menuPortalTarget={document.body}
						menuPosition="fixed"
						value={value}
						options={options ?? []}
						isDisabled={isDisabled || controlledDisabled}
						placeholder=""
						isClearable
						{...props}
					/>
				</div>
				{refreshHandler && (
					<div className="shrink">
						<Button.Refresh type="button" onClick={() => refreshHandler()} showLabel={false} />
					</div>
				)}
			</div>
			{required && (
				<input
					autoComplete="off"
					className="absolute inset-0 z-[-1]"
					style={{ border: "none" }}
					onChange={() => true}
					value={value || ""}
					required
				/>
			)}
		</div>
	);
};

Form.Checkbox = ({ className, ...rest }) => (
	<input type="checkbox" className={classNames("form-checkbox", className)} {...rest} />
);

Form.Radio = ({ className, ...rest }) => (
	<input type="radio" className={classNames("form-radio", className)} {...rest} />
);

Form.Switch = ({ checked, className, name, onChange, disabled = false, ...rest } = {}) => {
	const [enabled, setEnabled] = useState(checked ?? false);
	return (
		<Switch
			checked={enabled}
			onChange={(checked) => {
				if (disabled) return;

				if (typeof onChange === "function") onChange(checked);
				setEnabled(checked);
			}}
			className={twMerge(
				classNames(
					"relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none",
					enabled ? "bg-primary-500" : "bg-primary-100",
				),
			)}
		>
			<span className="sr-only">{name}</span>
			<span
				aria-hidden="true"
				className={`${enabled ? "translate-x-6" : "translate-x-1"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
			/>
		</Switch>
	);
};

Form.Textarea = ({ className, ...rest }) => <textarea className={classNames("form-textarea", className)} {...rest} />;

Form.FileUploader = ({ onSuccess, ...rest }) => {
	const UPLOADER_API_ENDPOINT = process.env.NEXT_PUBLIC_UPLOADER_ENDPOINT;

	const {
		form: uploader,
		inputHandler: uploaderInputHandler,
		submit: uploaderSubmit,
	} = useForm(
		{},
		{
			url: UPLOADER_API_ENDPOINT,
			useFormData: true,
			onSuccess: (response) => onSuccess(response.data),
		},
	);

	useDeepCompareEffect(() => {
		if (!uploader?.file) return;

		loadingAlert({ text: "" });
		uploaderSubmit()
			.then(() =>
				uploaderInputHandler({
					target: {
						name: "file",
						value: null,
					},
				}),
			)
			.then(() => MySwal.close());
	}, [uploader]);

	return (
		<Form.Input
			type="file"
			name="file"
			onChange={(event) => {
				if (event.target.files.length < 1) return onSuccess("");
				uploaderInputHandler(event);
			}}
			{...rest}
		/>
	);
};

Form.Group.displayName = "FormGroup";
Form.Label.displayName = "FormLabel";
Form.Input.displayName = "FormInput";
Form.Radio.displayName = "FormRadio";
Form.Switch.displayName = "FormSwitch";
Form.Textarea.displayName = "FormTextarea";
Form.HTMLSelect.displayName = "FormHTMLSelect";
Form.Combobox.displayName = "FormCombobox";
Form.FileUploader.displayName = "FormFileUploader";

export default Form;
