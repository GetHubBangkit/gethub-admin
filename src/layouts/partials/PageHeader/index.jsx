import Breadcrumbs from "../Breadcrumbs";

export default function PageHeader({ title, leading, breadcrumbs = [] } = {}) {
	return (
		<div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
			<div className="flex items-center gap-2">
				{leading}
				<h1 className="text-xl font-semibold uppercase text-neutral-900">{title}</h1>
			</div>
			<Breadcrumbs items={["Home", ...breadcrumbs]} />
		</div>
	);
}
