import { useMemo } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export default function Table({ children, className, variant = "primary", strip = false, ...rest } = {}) {
	const variantClasses = useMemo(
		() => ({
			primary: "table-theme-label-primary",
			success: "table-theme-label-success",
			info: "table-theme-label-info",
			warning: "table-theme-label-warning",
			danger: "table-theme-label-danger",
			"solid-primary": "table-theme-primary",
			"solid-success": "table-theme-success",
			"solid-info": "table-theme-info",
			"solid-warning": "table-theme-warning",
			"solid-danger": "table-theme-danger",
			light: "table-theme-light",
			dark: "table-theme-dark",
		}),
		[],
	);
	return (
		<table
			className={twMerge(
				classNames(
					"w-full overflow-hidden rounded",
					variantClasses[variant] ?? variantClasses["primary"],
					strip && "table-theme-strip",
				),
				className,
			)}
			{...rest}
		>
			{children}
		</table>
	);
}

Table.Head = ({ children, ...rest } = {}) => {
	return <thead {...rest}>{children}</thead>;
};

Table.Body = ({ children, ...rest }) => {
	return <tbody {...rest}>{children}</tbody>;
};

Table.TR = ({ children, ...rest }) => {
	return <tr {...rest}>{children}</tr>;
};

Table.TH = ({ children, className, ...rest }) => {
	return (
		<th
			className={twMerge(
				classNames(
					"whitespace-nowrap border border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide",
				),
				className,
			)}
			{...rest}
		>
			{children}
		</th>
	);
};

Table.TD = ({ children, className, ...rest }) => {
	return (
		<td
			className={twMerge(classNames("whitespace-nowrap border border-neutral-300 px-4 py-2 text-xs"), className)}
			{...rest}
		>
			{children}
		</td>
	);
};

Table.Head.displayName = "TableHead";
Table.Body.displayName = "TableBody";
Table.TR.displayName = "TableRow";
Table.TD.displayName = "TableData";
