import Layout from "../layouts";
import Button from "../components/Button";
import Container from "../components/Container";
import Datatable from "../components/Datatable";
import PageLoader from "../components/PageLoader";
import CriteriaGate from "../components/CriteriaGate";
import Modal from "../components/Modal";
import useDatatable from "../hooks/useDatatable";
import useUser from "../hooks/useUser";
import useCrud from "../hooks/useCrud";

import FormContent from "../modules/sponsor/form";
import _ from "underscore";

export default function Enumeration() {
	const { isUserLoading } = useUser({ redirectTo: "/login" });

	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT + "/sponsors";
	const CRUD_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT + "/sponsor";
	const INITIAL_FORM = {
		id: "",
		name: "",
		image_url: "",
		link: "",
		is_active: true,
	};

	const { refresh, filter, setFilter, filtersShow, filterCount, toggleFilters, resetFilter, ...datatable } =
		useDatatable(API_ENDPOINT);
	const { create, edit, destroy, formdata, modal } = useCrud(CRUD_ENDPOINT, INITIAL_FORM, {
		form: {
			transformData: (data) => _.pick(data, Object.keys(INITIAL_FORM)),
		},
	});

	const { form, option, isPending, inputHandler, submit } = formdata;
	const { show, toggle } = modal;

	const columns = [
		{
			label: "#",
			accessor: (_, index) => index + 1,
		},
		{
			label: "Name",
			accessor: "name",
		},
		{
			label: "Link",
			accessor: "link",
		},
		{
			label: "Aksi",
			accessor: (data) => (
				<div className="flex flex-nowrap items-center gap-2">
					<Button.Edit onClick={() => edit(data.id)} iconBtn />
					<Button.Delete onClick={() => destroy(data.id)} iconBtn />
				</div>
			),
		},
	];

	const pageData = [];
	if (isUserLoading || pageData.some((data) => data == null)) return <PageLoader />;
	return (
		<Layout title="Sponsor" breadcrumbs={["Sponsor"]} active="/sponsor">
			<Container>
				<div className="mb-6 flex flex-wrap gap-2 md:justify-between">
					<div className="flex gap-2">
						<Button.Create onClick={create} />
					</div>
					<div className="flex gap-2">
						<Button.Refresh onClick={refresh} />
					</div>
				</div>
				<Datatable columns={columns} filter={filter} {...datatable} />
			</Container>
			<Modal
				title={option.title}
				show={show}
				handler={toggle}
				content={<FormContent {...{ form, inputHandler, submit, isPending, toggle }} />}
			/>
		</Layout>
	);
}
