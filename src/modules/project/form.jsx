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
			<Form.Group>
				<Form.Label>Judul</Form.Label>
				<Form.Input type="text" name="title" onChange={inputHandler} value={form.title} disabled />
			</Form.Group>
			<Form.Group>
				<Form.Label>Budget</Form.Label>
				<Form.Input
					type="text"
					name="budget"
					onChange={inputHandler}
					value={`Rp ${currency.formatToID(form.min_budget)} - Rp ${currency.formatToID(form.max_budget)}`}
					disabled
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Deadline</Form.Label>
				<Form.Input
					type="text"
					name="deadline"
					onChange={inputHandler}
					value={`${date.formatToID(form.min_deadline)} - ${date.formatToID(form.max_deadline)}`}
					disabled
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Deskripsi</Form.Label>
				<Form.Textarea name="description" onChange={inputHandler} value={form.description} disabled />
			</Form.Group>
			<Form.Group className="flex items-center gap-4">
				<Form.Label className="mb-0 w-20 leading-none">Aktif</Form.Label>
				<Form.Switch
					checked={form.is_active}
					name="is_active"
					onChange={(checked) =>
						inputHandler({
							target: {
								name: "is_active",
								value: checked,
							},
						})
					}
				/>
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
