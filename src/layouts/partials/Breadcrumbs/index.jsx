import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Breadcrumbs({ items }) {
	return (
		<div className="flex items-center gap-1 text-sm text-neutral-500">
			{items
				.map((item, index) => [
					<span key={`menu-breadcrumb-${index}`} className="capitalize">
						{item}
					</span>,
					index !== items.length - 1 && <ChevronRightIcon key={`separator-${index}`} className="h-4 w-4" />,
				])
				.flat()}
		</div>
	);
}
