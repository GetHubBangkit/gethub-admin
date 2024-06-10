import { useState } from "react";
import _ from "underscore";
import Layout from "../layouts";
import Button from "../components/Button";
import Container from "../components/Container";
import Datatable from "../components/Datatable";
import PageLoader from "../components/PageLoader";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import useDatatable from "../hooks/useDatatable";
import useUser from "../hooks/useUser";
import useCrud from "../hooks/useCrud";
import date from "../utils/date";
import currency from "../utils/currency";

import FormContent from "../modules/settlement/form";
import MyAxios from "../lib/my-axios";
import { toastAlert } from "../lib/sweetalert";

export default function Settlement() {
	const { isUserLoading } = useUser({ redirectTo: "/login" });

	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/projects/settlements";
	const CRUD_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/projects/settlements";
	const INITIAL_FORM = {
		id: "",
		project_id: "",
		status: "",
		bukti_transfer: "",
		message: "",
	};

	const { refresh, filter, setFilter, filtersShow, filterCount, toggleFilters, resetFilter, ...datatable } =
		useDatatable(API_ENDPOINT);
	const { formdata, modal } = useCrud(CRUD_ENDPOINT, INITIAL_FORM, {
		form: {
			includeIdOnSubmit: true,
			transformData: (data) => _.pick(data, Object.keys(INITIAL_FORM)),
			onSubmit: async (formdata) => {
				const request = await MyAxios({
					url:
						process.env.NEXT_PUBLIC_API_ENDPOINT +
						`/admin/projects/${formdata.project_id}/settlements/${formdata.id}`,
					method: "PUT",
					data: _.omit(formdata, ["id"]),
				});
				const response = await request.data;
				toastAlert.success(response.message);

				modal.toggle();
				refresh();
			},
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
			label: "Project Title",
			accessor: "project.title",
		},
		{
			label: "Project Status",
			accessor: "project.status_project",
		},
		{
			label: "Freelance Status Task",
			accessor: "project.status_freelance_task",
		},
		{
			label: "Freelance Name",
			accessor: "freelancer.full_name",
		},
		{
			label: "Freelance Phone",
			accessor: "freelancer.phone",
		},
		{
			label: "Total Bid Project",
			accessor: "total",
			cell: (value) => "Rp " + currency.formatToID(value),
		},
		{
			label: "Total Fee",
			accessor: "total_fee_application",
			cell: (value) => "Rp " + currency.formatToID(value),
		},
		{
			label: "Total Diterima",
			accessor: "total_diterima",
			cell: (value) => "Rp " + currency.formatToID(value),
		},
		{
			label: "Rekening Akun",
			accessor: "rekening_account",
		},
		{
			label: "Rekening Bank",
			accessor: "rekening_bank",
		},
		{
			label: "Rekening Number",
			accessor: "rekening_number",
		},
		{
			label: "Status",
			accessor: "status",
		},
		{
			label: "Tanggal Request",
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
		<Layout title="Settlement" breadcrumbs={["Settlement"]} active="/settlement">
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
				size="lg"
				content={<FormContent {...{ form, inputHandler, submit, isPending, toggle }} />}
			/>
		</Layout>
	);
}
