import classNames from "classnames";
import { Fragment, forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";
import useToggle from "../../hooks/useToggle";

export const Alert = forwardRef(({ children, variant = "primary", className, ...rest }, ref) => {
	const variantClasses = useMemo(
		() => ({
			"solid-primary": "bg-primary-500 text-primary-100",
			"solid-success": "bg-success-500 text-success-100",
			"solid-info": "bg-info-500 text-info-100",
			"solid-warning": "bg-warning-500 text-warning-100",
			"solid-danger": "bg-danger-500 text-danger-100",
			primary: "bg-primary-100 text-primary-500",
			success: "bg-success-100 text-success-500",
			info: "bg-info-100 text-info-500",
			warning: "bg-warning-100 text-warning-500",
			danger: "bg-danger-100 text-danger-500",
		}),
		[],
	);

	return (
		<div
			ref={ref}
			className={twMerge(
				classNames(
					"rounded px-4 py-4 text-sm leading-none tracking-tight",
					variantClasses[variant] ?? variantClasses["primary"],
					className,
				),
			)}
			{...rest}
		>
			{children}
		</div>
	);
});

Alert.Dismissible = ({ children, ...rest }) => {
	const [show, toggle] = useToggle(true);

	return (
		<Transition.Root show={show} as={Fragment}>
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200 transform"
				leaveFrom="opacity-100 translate-x-0"
				leaveTo="opacity-0 -translate-x-full"
			>
				<Alert className="relative pr-12" {...rest}>
					{children}
					<button
						className="absolute inset-y-0 right-0 flex w-12 items-center justify-center p-2"
						onClick={toggle}
					>
						<XMarkIcon className="h-4 w-4" />
					</button>
				</Alert>
			</Transition.Child>
		</Transition.Root>
	);
};

Alert.Dismissible.displayName = "AlertDismissible";

export default Alert;
