import Layout from "../layouts";
import Button from "../components/Button";
import Container from "../components/Container";
import Datatable from "../components/Datatable";
import PageLoader from "../components/PageLoader";
import Modal from "../components/Modal";
import useDatatable from "../hooks/useDatatable";
import useUser from "../hooks/useUser";
import useCrud from "../hooks/useCrud";

import FormContent from "../modules/information/form";
import _ from "underscore";
import Badge from "../components/Badge";
import useEnumeration from "../repositories/useEnumeration";

export default function Information() {
	const { user, isUserLoading } = useUser({ redirectTo: "/login" });

	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT + "/informations";
	const CRUD_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT + "/information";
	const INITIAL_FORM = {
		id: "",
		title: "",
		category: "",
		description: "",
		image_url: "",
		is_active: true,
	};

	const { refresh, filter, setFilter, filtersShow, filterCount, toggleFilters, resetFilter, ...datatable } =
		useDatatable(API_ENDPOINT);
	const { create, edit, destroy, formdata, modal } = useCrud(CRUD_ENDPOINT, INITIAL_FORM, {
		form: {
			transformData: (data) =>
				_.pick(
					{
						...data,
						category: data.SELECT_category?.value ?? "",
						is_active: String(data.is_active),
					},
					Object.keys(INITIAL_FORM),
				),
		},
	});

	const { form, option, isPending, inputHandler, submit } = formdata;
	const { show, toggle } = modal;

	const {
		data: categories,
		mutate: mutateCategories,
		isLoading: isCategoriesLoading,
	} = useEnumeration({
		args: Boolean(user),
		params: {
			criteria: "key:InformationCategory",
		},
	});

	const columns = [
		{
			label: "#",
			accessor: (_, index) => index + 1,
		},
		{
			label: "Judul",
			accessor: "title",
		},
		{
			label: "Aktif",
			accessor: "is_active",
			cell: (value) => <Badge variant={value ? "success" : "danger"}>{value ? "Aktif" : "Non-Aktif"}</Badge>,
		},
		{
			label: "Aksi",
			accessor: (data) => (
				<div className="flex flex-nowrap items-center gap-2">
					<Button.Edit
						onClick={() =>
							edit(data.id, {
								onSuccess: (data) => ({
									...data,
									SELECT_category: { label: data.category, value: data.category },
								}),
							})
						}
						iconBtn
					/>
					<Button.Delete onClick={() => destroy(data.id)} iconBtn />
				</div>
			),
		},
	];

	const pageData = [isCategoriesLoading];
	if (isUserLoading || pageData.some((data) => data == null)) return <PageLoader />;
	return (
		<Layout title="Event" breadcrumbs={["Event"]} active="/information">
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
				content={
					<FormContent {...{ form, inputHandler, submit, isPending, toggle, categories, mutateCategories }} />
				}
			/>
		</Layout>
	);
}
