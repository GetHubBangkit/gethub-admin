import classNames from "classnames";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export default function Card({ children, variant = "basic", className, ...rest } = {}) {
	const variantClasses = useMemo(
		() => ({
			primary: "bg-primary-500 text-white",
			success: "bg-success-500 text-white",
			info: "bg-info-500 text-white",
			warning: "bg-warning-500 text-white",
			danger: "bg-danger-500 text-white",
			"label-primary": "bg-primary-100 text-primary-900",
			"label-success": "bg-success-100 text-success-900",
			"label-info": "bg-info-100 text-info-900",
			"label-warning": "bg-warning-100 text-warning-900",
			"label-danger": "bg-danger-100 text-danger-900",
			"outline-dark": "border border-neutral-900 bg-white text-neutral-900",
			"outline-primary": "border border-primary-500 bg-white text-neutral-900",
			"outline-success": "border border-success-500 bg-white text-neutral-900",
			"outline-info": "border border-info-500 bg-white text-neutral-900",
			"outline-warning": "border border-warning-500 bg-white text-neutral-900",
			"outline-danger": "border border-danger-500 bg-white text-neutral-900",
			basic: "bg-white text-neutral-900",
			dark: "bg-neutral-800 text-white",
		}),
		[],
	);

	return (
		<div
			className={twMerge(
				classNames(
					"relative overflow-hidden rounded shadow",
					variantClasses[variant] ?? variantClasses["basic"],
					className,
				),
			)}
			{...rest}
		>
			{children}
		</div>
	);
}

Card.Title = ({ children, className, ...rest }) => {
	return (
		<h5 className={twMerge(classNames("font-semibold", className))} {...rest}>
			{children}
		</h5>
	);
};

Card.Img = ({ children, className, cover, ...rest }) => {
	return (
		<img
			className={twMerge(
				classNames(
					"w-full object-cover",
					{ "absolute inset-0 h-full": cover, "aspect-square": !cover },
					className,
				),
			)}
			alt=""
			{...rest}
		/>
	);
};

Card.Header = ({ children, className, ...rest }) => {
	return (
		<div className={twMerge(classNames("border-b px-4 py-4", className))} {...rest}>
			{children}
		</div>
	);
};

Card.Body = ({ children, className, ...rest }) => {
	return (
		<div className={twMerge(classNames("relative px-4 py-4 text-sm", className))} {...rest}>
			{children}
		</div>
	);
};

Card.Title.displayName = "CardTitle";
Card.Img.displayName = "CardImg";
Card.Header.displayName = "CardHeader";
Card.Body.displayName = "CardBody";
