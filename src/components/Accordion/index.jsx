import classnames from "classnames";
import useToggle from "../../hooks/useToggle";
import { twMerge } from "tailwind-merge";

export default function Accordion({
	children,
	title,
	className,
	leading,
	maxHeight = false,
	show = false,
	light = false,
} = {}) {
	const [expand, toggle] = useToggle(show);
	return (
		<div className="relative block w-full">
			<div
				className={twMerge(
					"flex w-full cursor-pointer items-center justify-between rounded bg-primary-500 px-4 py-2 text-primary-100",
					light === true ? "bg-primary-100 text-primary-500" : "",
				)}
			>
				<div className="grow" onClick={toggle}>
					<h5 className="block text-base font-bold">{title}</h5>
				</div>
				<div className="flex items-stretch gap-2">
					{leading}
					<button type="button" className="cursor-pointer px-2 py-2" onClick={toggle}>
						{!expand && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						)}
						{expand && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
							</svg>
						)}
					</button>
				</div>
			</div>
			<div
				className={classnames("block w-full overflow-x-hidden bg-white transition-[max-height]", {
					"max-h-0": !expand,
					"duration-500": expand,
					"max-h-[1000px]": expand && maxHeight === false,
					"max-h-full": expand && maxHeight === true,
				})}
			>
				{children}
			</div>
		</div>
	);
}
