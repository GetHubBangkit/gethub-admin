import Link from "next/link";
import classNames from "classnames";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Icon from "../../../components/Icon";
import { twMerge } from "tailwind-merge";

function NavlinkSubmenu({ href, title, icon, active, className, ...rest }) {
	const baseClass = twMerge(
		classNames(
			"relative shrink-0 inline-flex h-10 w-full items-center pr-4  text-sm font-normal antialiased leading-none transition-all",
			{
				"text-primary-100": active,
				"text-primary-200 hover:text-primary-100": !active,
			},
			className,
		),
	);

	return (
		<Link href={href} className={baseClass} {...rest}>
			<span className="ml-6 mr-2">{icon}</span>
			{title}
		</Link>
	);
}

export default function Navlink({ title, icon, href, active, items, isSubmenu, ...rest }) {
	const baseClass = classNames(
		"relative flex h-10 w-full items-center px-4 text-sm antialiased leading-none transition-all rounded",
	);

	const linkClass = classNames("flex h-full grow items-center rounded", {
		"text-warning-900 bg-warning-500 before:absolute before:right-0 font-normal before:h-full before:w-1 before:rounded-s-md before:bg-warning-500":
			active,
		"text-primary-200 hover:text-primary-100 font-normal": !active,
	});

	if (items) {
		return (
			<div className="relative">
				<div className={baseClass}>
					<a href="#" className={`${linkClass} justify-between pr-2`} {...rest}>
						<div className="flex w-full grow items-center">
							<span className="mx-4">{icon}</span>
							{title}
						</div>
						<ChevronRightIcon
							className={classNames("h-4 w-4 transition-transform", { "rotate-90": active })}
						/>
					</a>
				</div>
				<div
					className={classNames("flex flex-col flex-nowrap overflow-hidden pl-4 transition-[max-height]", {
						"max-h-[999px] duration-500": active,
						"max-h-0 duration-300": !active,
					})}
				>
					{items.map((item, index) => (
						<NavlinkSubmenu
							key={`sidebar-${item.privilege_id}-${index}`}
							className={`${index === 0 && "mt-1"}`}
							href={item.menu_url}
							title={item.menu_label}
							icon={<Icon icon={item.menu_icon_url} className="h-4 w-4" />}
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className={baseClass}>
			<Link href={href} className={linkClass} {...rest}>
				<span className="mx-4">{icon}</span>
				{title}
			</Link>
		</div>
	);
}
