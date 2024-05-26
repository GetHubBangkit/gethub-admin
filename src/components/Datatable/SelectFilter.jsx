import classNames from "classnames";
import Form from "../Form";
import { twMerge } from "tailwind-merge";

export default function SelectFilter({ className, value, ...props }) {
	return (
		<Form.HTMLSelect
			className={twMerge(classNames("mt-1 h-8 p-1 text-sm font-normal", className))}
			value={value ?? ""}
			disableAutoSelect
			{...props}
		/>
	);
}
