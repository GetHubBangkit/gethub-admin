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

import FormContent from "../modules/project/form";
import _ from "underscore";
import date from "../utils/date";
import Badge from "../components/Badge";
import currency from "../utils/currency";
import SelectFilter from "../components/Datatable/SelectFilter";
import { useState } from "react";

export default function Project() {
	const { isUserLoading } = useUser({ redirectTo: "/login" });

	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/projects";
	const CRUD_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/projects";
	const INITIAL_FORM = {
		id: "",
		is_active: "",
	};

	const [isActive, setIsActive] = useState(false);
	const { refresh, filter, setFilter, filtersShow, filterCount, toggleFilters, resetFilter, ...datatable } =
		useDatatable(API_ENDPOINT, {
			params: { is_active: isActive },
		});
	const { formdata, modal } = useCrud(CRUD_ENDPOINT, INITIAL_FORM, {
		form: {
			transformData: (data) => _.pick(data, Object.keys(INITIAL_FORM)),
		},
	});

	const { form, option, isPending, setForm, inputHandler, submit, setOption } = formdata;
	const { show, toggle } = modal;

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
			label: "Budget",
			accessor: (row) => `Rp ${currency.formatToID(row.min_budget)} - Rp ${currency.formatToID(row.max_budget)}`,
		},
		{
			label: "Deadline",
			accessor: (row) => `${date.formatToID(row.min_deadline)} - ${date.formatToID(row.max_deadline)}`,
		},
		{
			label: "Aktif?",
			accessor: "is_active",
			cell: (value) => <Badge variant={value ? "success" : "danger"}>{value ? "Ya" : "Tidak"}</Badge>,
			enableFilter: true,
			filter: ({ accessor, value, handler }) => (
				<SelectFilter
					name={accessor}
					onChange={(event) => {
						handler(event);
						return setIsActive(event.target.value);
					}}
					value={isActive}
					options={[
						{ label: "Ya", value: true },
						{ label: "Tidak", value: false },
					]}
				/>
			),
		},
		{
			label: "Dibuat Pada",
			accessor: "createdAt",
			cell: (value) => date.formatToID(value),
		},
		{
			label: "Aksi",
			accessor: (data) => (
				<div className="flex flex-nowrap items-center gap-2">
					<Button.Edit
						onClick={() => {
							setForm(data);
							setOption((state) => ({ ...state, title: "Edit Data", method: "PUT" }));
							toggle();
						}}
						iconBtn
					/>
				</div>
			),
		},
	];

	const pageData = [];
	if (isUserLoading || pageData.some((data) => data == null)) return <PageLoader />;
	return (
		<Layout title="Proyek" breadcrumbs={["Proyek"]} active="/project">
			<Container>
				<div className="mb-6 flex flex-wrap gap-2 md:justify-between">
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
