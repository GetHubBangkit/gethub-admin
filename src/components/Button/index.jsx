import classNames from "classnames";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import {
	PlusIcon,
	ArrowPathIcon,
	PencilSquareIcon,
	TrashIcon,
	PaperAirplaneIcon,
	FunnelIcon,
	EyeIcon,
} from "@heroicons/react/20/solid";

export default function Button({
	children,
	icon,
	className,
	disabled = false,
	variant = "primary",
	size = "base",
	iconPosition = "left",
	iconBtn = false,
	...rest
} = {}) {
	const baseClass = useMemo(
		() => "flex items-center rounded text-center text-xs font-semibold leading-none shadow transition-transform",
		[],
	);
	const sizeClasses = useMemo(
		() => ({
			sm: "h-8",
			base: "h-10",
			lg: "h-12",
		}),
		[],
	);
	const variantClasses = useMemo(
		() => ({
			primary: "bg-primary-500 text-primary-100",
			secondary: "bg-neutral-100 text-neutral-900",
			success: "bg-success-500 text-success-100",
			info: "bg-info-500 text-info-100",
			warning: "bg-warning-500 text-warning-900",
			danger: "bg-danger-500 text-danger-100",
			"label-primary": "bg-primary-100 text-primary-500",
			"label-secondary": "bg-neutral-100 text-neutral-900",
			"label-success": "bg-success-100 text-success-500",
			"label-info": "bg-info-100 text-info-500",
			"label-warning": "bg-warning-100 text-warning-500",
			"label-danger": "bg-danger-100 text-danger-500",
			pagination: "bg-neutral-200 text-neutral-900",
		}),
		[],
	);
	const iconVariantClasses = useMemo(
		() => ({
			primary: "bg-primary-400 text-primary-100",
			secondary: "bg-neutral-100 text-neutral-900",
			success: "bg-success-400 text-success-100",
			info: "bg-info-400 text-info-100",
			warning: "bg-warning-400 text-warning-100",
			danger: "bg-danger-400 text-danger-100",
			"label-primary": "bg-primary-400 text-primary-100",
			"label-secondary": "bg-neutral-200 text-neutral-900",
			"label-success": "bg-success-400 text-success-100",
			"label-info": "bg-info-400 text-info-100",
			"label-warning": "bg-warning-400 text-warning-100",
			"label-danger": "bg-danger-400 text-danger-100",
		}),
		[],
	);

	return (
		<button
			className={twMerge(
				classNames(
					baseClass,
					sizeClasses[size] ?? sizeClasses["base"],
					variantClasses[variant] ?? variantClasses["primary"],
					{
						"active:focus:scale-95": !disabled,
						"cursor-not-allowed opacity-75": disabled,
					},
				),
				className,
			)}
			disabled={disabled}
			{...rest}
		>
			{icon && iconPosition === "left" && (
				<div
					className={classNames(
						"flex h-full items-center justify-center rounded-l",
						iconVariantClasses[variant] ?? iconVariantClasses["primary"],
						{
							"w-8 px-1": children,
							"w-10 rounded-r px-2": !children || iconBtn,
						},
					)}
				>
					{icon}
				</div>
			)}
			{children && iconBtn === false && <div className="grow px-4 py-2">{children}</div>}
			{icon && iconPosition === "right" && (
				<div
					className={classNames(
						"flex h-full items-center justify-center rounded-r",
						iconVariantClasses[variant] ?? iconVariantClasses["primary"],
						{
							"w-8 px-1": children,
							"w-10 rounded-l px-2": !children || iconBtn,
						},
					)}
				>
					{icon}
				</div>
			)}
		</button>
	);
}

Button.Create = (props) => (
	<Button variant="primary" size="base" icon={<PlusIcon className="h-4 w-4" />} {...props}>
		Tambah
	</Button>
);

Button.Detail = ({ children, ...props }) => (
	<Button variant="success" size="sm" icon={<EyeIcon className="h-4 w-4" />} {...props}>
		{children ?? "Detail"}
	</Button>
);

Button.Edit = (props) => (
	<Button variant="primary" size="sm" icon={<PencilSquareIcon className="h-4 w-4" />} {...props}>
		Edit
	</Button>
);

Button.Delete = (props) => (
	<Button variant="danger" size="sm" icon={<TrashIcon className="h-4 w-4" />} {...props}>
		Hapus
	</Button>
);

Button.Filter = ({ className, count, ...props }) => (
	<Button
		variant="label-primary"
		size="base"
		icon={<FunnelIcon className="h-4 w-4" />}
		className={classNames(className, "relative")}
		{...props}
	>
		Filter
		{count > 0 && (
			<div className="absolute right-0 top-0 z-50 flex h-6 w-6 -translate-y-2 translate-x-2 items-center justify-center rounded-full bg-primary-500 text-xs leading-none text-primary-100">
				{count}
			</div>
		)}
	</Button>
);

Button.Refresh = ({ showLabel = true, ...props } = {}) => (
	<Button variant="success" size="base" icon={<ArrowPathIcon className="h-4 w-4" />} {...props}>
		{showLabel && "Refresh"}
	</Button>
);

Button.Send = ({ loading, icon, children, ...rest } = {}) => (
	<Button
		variant="primary"
		icon={
			loading ? (
				<ArrowPathIcon className="h-4 w-4 animate-spin" />
			) : !icon ? (
				<PaperAirplaneIcon className="h-4 w-4" />
			) : (
				icon
			)
		}
		iconPosition="right"
		disabled={loading}
		{...rest}
	>
		{children ?? "Kirim"}
	</Button>
);

Button.Cancel = (props) => (
	<Button type="button" variant="secondary" size="base" {...props}>
		Batal
	</Button>
);

Button.Reset = (props) => (
	<Button type="button" variant="secondary" size="base" {...props}>
		Reset
	</Button>
);

Button.Pagination = ({ children, className, active, disabled, ...rest }) => (
	<button
		type="button"
		className={twMerge(
			classNames(
				"flex h-10 w-10 items-center justify-center overflow-hidden rounded bg-neutral-200 px-1 py-1 text-center text-xs font-semibold leading-none text-neutral-900 shadow transition-transform",
				className,
				{
					"active:focus:scale-95": !disabled,
					"cursor-not-allowed opacity-75": disabled,
					"bg-primary-500 text-primary-100": active,
				},
			),
		)}
		{...rest}
	>
		{children}
	</button>
);

Button.Create.displayName = "ButtonCreate";
Button.Detail.displayName = "ButtonDetail";
Button.Edit.displayName = "ButtonEdit";
Button.Delete.displayName = "ButtonDelete";
Button.Filter.displayName = "ButtonFilter";
Button.Refresh.displayName = "ButtonRefresh";
Button.Send.displayName = "ButtonSend";
Button.Cancel.displayName = "ButtonCancel";
Button.Reset.displayName = "ButtonReset";
Button.Pagination.displayName = "ButtonPagination";
