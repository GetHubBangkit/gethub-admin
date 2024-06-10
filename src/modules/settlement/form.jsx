import _ from "underscore";
import Button from "../../components/Button";
import CriteriaGate from "../../components/CriteriaGate";
import Form from "../../components/Form";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import date from "../../utils/date";
import currency from "../../utils/currency";

export default function FormContent({ form, inputHandler, submit, isPending, toggle }) {
	const [preview, setPreview] = useState("");
	const { show: showPreview, toggle: togglePreview } = useModal();

	return (
		<Form onSubmit={submit}>
			<Form.Group className="m-0 grid grid-cols-2 gap-4">
				<Form.Group className="m-0">
					<Form.Label>Project Title</Form.Label>
					<Form.Input
						type="text"
						name="project.title"
						onChange={inputHandler}
						value={form.project?.title ?? ""}
						disabled
					/>
				</Form.Group>
				<Form.Group className="m-0">
					<Form.Label>Project Status</Form.Label>
					<Form.Input
						type="text"
						name="project.status_project"
						onChange={inputHandler}
						value={form.project?.status_project ?? ""}
						disabled
					/>
				</Form.Group>
				<Form.Group className="col-span-2">
					<Form.Label>Project Description</Form.Label>
					<Form.Textarea
						name="project.description"
						rows="10"
						onChange={inputHandler}
						value={form.project?.description ?? ""}
						disabled
					/>
				</Form.Group>
			</Form.Group>
			<Form.Group className="m-0 grid grid-cols-2 gap-4">
				<Form.Group className="m-0">
					<Form.Label>Freelance Name</Form.Label>
					<Form.Input
						type="text"
						name="freelancer.full_name"
						onChange={inputHandler}
						value={form.freelancer?.full_name ?? ""}
						disabled
					/>
				</Form.Group>
				<Form.Group className="m-0">
					<Form.Label>Freelance Phone</Form.Label>
					<Form.Input
						type="text"
						name="freelancer.phone"
						onChange={inputHandler}
						value={form.freelancer?.phone ?? ""}
						disabled
					/>
				</Form.Group>
				<Form.Group className="col-span-2">
					<Form.Label>Freelance Status Task</Form.Label>
					<Form.Input
						type="text"
						name="project.status_freelance_task"
						onChange={inputHandler}
						value={form.project?.status_freelance_task ?? ""}
						disabled
					/>
				</Form.Group>
			</Form.Group>
			<Form.Group className="m-0 grid grid-cols-2 gap-4">
				<Form.Group className="m-0">
					<Form.Label>Total Bid Project</Form.Label>
					<Form.Input
						type="text"
						name="total"
						onChange={inputHandler}
						value={currency.withFormatToID(form.total)}
						addon="Rp"
						addonPosition="left"
						disabled
					/>
				</Form.Group>
				<Form.Group className="m-0">
					<Form.Label>Total Fee</Form.Label>
					<Form.Input
						type="text"
						name="total_fee_application"
						onChange={inputHandler}
						value={currency.withFormatToID(form.total_fee_application)}
						addon="Rp"
						addonPosition="left"
						disabled
					/>
				</Form.Group>
				<Form.Group className="col-span-2">
					<Form.Label>Total Diterima</Form.Label>
					<Form.Input
						type="text"
						name="total_diterima"
						onChange={inputHandler}
						value={currency.withFormatToID(form.total_diterima)}
						addon="Rp"
						addonPosition="left"
						disabled
					/>
				</Form.Group>
			</Form.Group>
			<Form.Group className="m-0 grid grid-cols-2 gap-4">
				<Form.Group className="m-0">
					<Form.Label>Rekening Akun</Form.Label>
					<Form.Input
						type="text"
						name="rekening_account"
						onChange={inputHandler}
						value={form.rekening_account}
						disabled
					/>
				</Form.Group>
				<Form.Group className="m-0">
					<Form.Label>Rekening Bank</Form.Label>
					<Form.Input
						type="text"
						name="rekening_bank"
						onChange={inputHandler}
						value={form.rekening_bank}
						disabled
					/>
				</Form.Group>
				<Form.Group className="col-span-2">
					<Form.Label>Rekening Number</Form.Label>
					<Form.Input
						type="text"
						name="rekening_number"
						onChange={inputHandler}
						value={form.rekening_number}
						disabled
					/>
				</Form.Group>
			</Form.Group>
			<Form.Group>
				<Form.Label>Tanggal Request</Form.Label>
				<Form.Input
					type="text"
					name="deadline"
					onChange={inputHandler}
					value={date.formatToID(form.createdAt)}
					disabled
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Status</Form.Label>
				<Form.HTMLSelect
					name="status"
					onChange={inputHandler}
					value={form.status}
					options={[
						{ label: "Waiting", value: "Waiting" },
						{ label: "Settle", value: "Settle" },
					]}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Bukti Transfer</Form.Label>
				<div className="flex gap-2">
					<Form.FileUploader
						onSuccess={(filename) =>
							inputHandler({
								target: {
									name: "bukti_transfer",
									value: filename,
								},
							})
						}
						accept="image/*"
					/>
					<CriteriaGate criteria={!_.isEmpty(form.bukti_transfer)}>
						<Button.Detail
							type="button"
							size="base"
							onClick={() => {
								setPreview(form.bukti_transfer);
								togglePreview();
							}}
						>
							Preview
						</Button.Detail>
					</CriteriaGate>
				</div>
			</Form.Group>
			<Form.Group className="col-span-2">
				<Form.Label>Message</Form.Label>
				<Form.Textarea name="message" rows="5" onChange={inputHandler} value={form.message} />
			</Form.Group>
			<Form.Group className="mb-0 flex justify-between">
				<Button.Send loading={isPending} />
				<Button.Cancel onClick={toggle} />
			</Form.Group>
			<Modal
				title="Preview"
				show={showPreview}
				handler={togglePreview}
				content={
					<>
						<img src={preview} alt="" className="w-full" />
						<Button.Cancel className="mt-2" onClick={togglePreview} />
					</>
				}
			/>
		</Form>
	);
}
