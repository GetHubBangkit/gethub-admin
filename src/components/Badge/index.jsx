import classNames from "classnames";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export default function Badge({ children, variant = "primary", size = "xs", className, ...rest } = {}) {
	const variantClasses = useMemo(
		() => ({
			primary: "bg-primary-100 text-primary-500 font-semibold",
			success: "bg-success-100 text-success-500 font-semibold",
			info: "bg-info-100 text-info-500 font-semibold",
			warning: "bg-warning-100 text-warning-500 font-semibold",
			danger: "bg-danger-100 text-danger-500 font-semibold",
		}),
		[],
	);

	return (
		<div
			className={twMerge(
				classNames(
					"inline-block rounded-full px-2 py-1 leading-none",
					variantClasses[variant] ?? variantClasses["primary"],
					`text-${size}`,
					className,
				),
			)}
			{...rest}
		>
			{children}
		</div>
	);
}
