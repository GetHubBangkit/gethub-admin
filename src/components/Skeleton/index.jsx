import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export default function Skeleton({ height = 40, className } = {}) {
	return (
		<div
			className={twMerge(classNames("block animate-pulse rounded bg-primary-100 py-2", className))}
			style={{ height: height }}
		></div>
	);
}
