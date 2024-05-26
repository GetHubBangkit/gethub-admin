import classNames from "classnames";
import Form from "../Form";
import { twMerge } from "tailwind-merge";

export default function ComboBoxFilter({ className, value, ...props }) {
	return (
		<Form.Combobox
			className={twMerge(classNames("mt-1 text-sm font-normal", className))}
			styles={{
				control: {
					minHeight: 0,
					height: "2rem",
					padding: "0.25rem",
					flexWrap: "nowrap",
				},
				valueContainer: {
					paddingLeft: 0,
					fontSize: "0.875rem",
					lineHeight: "1.25rem",
					textAlign: "left",
				},
			}}
			disableAutoSelect
			{...props}
		/>
	);
}
