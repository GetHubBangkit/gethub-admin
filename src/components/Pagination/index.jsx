import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/20/solid";
import Button from "../Button";

export default function Pagination({ items, current, last, nextPageHandler, prevPageHandler, handler, ...props }) {
	return (
		<nav className="flex items-stretch gap-1" aria-label="Pagination">
			<Button.Pagination onClick={() => handler(0)}>
				<ChevronDoubleLeftIcon className="h-4 w-4" />
			</Button.Pagination>
			<Button.Pagination onClick={prevPageHandler}>
				<ChevronLeftIcon className="h-4 w-4" />
			</Button.Pagination>
			{items.map((value) => (
				<Button.Pagination
					key={`pagination-${value}`}
					onClick={() => handler(value - 1)}
					active={value === current + 1}
					disabled={value === value + 1}
				>
					{value}
				</Button.Pagination>
			))}
			<Button.Pagination onClick={nextPageHandler}>
				<ChevronRightIcon className="h-4 w-4" />
			</Button.Pagination>
			<Button.Pagination onClick={() => handler(last - 1)}>
				<ChevronDoubleRightIcon className="h-4 w-4" />
			</Button.Pagination>
		</nav>
	);
}
