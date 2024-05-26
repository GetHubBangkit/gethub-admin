import _ from "underscore";
import Button from "../../components/Button";
import CriteriaGate from "../../components/CriteriaGate";
import Form from "../../components/Form";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";

export default function FormContent({ form, inputHandler, submit, isPending, toggle }) {
	const [preview, setPreview] = useState("");
	const { show: showPreview, toggle: togglePreview } = useModal();

	return (
		<Form onSubmit={submit}>
			<Form.Group>
				<Form.Label>Nama</Form.Label>
				<Form.Input type="text" name="name" onChange={inputHandler} value={form.name} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Link</Form.Label>
				<Form.Input type="url" name="link" onChange={inputHandler} value={form.link} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Gambar</Form.Label>
				<div className="flex gap-2">
					<Form.FileUploader
						onSuccess={(filename) =>
							inputHandler({
								target: {
									name: "image_url",
									value: filename,
								},
							})
						}
					/>
					<CriteriaGate criteria={!_.isEmpty(form.image_url)}>
						<Button.Detail
							type="button"
							size="base"
							onClick={() => {
								setPreview(form.image_url);
								togglePreview();
							}}
						>
							Preview
						</Button.Detail>
					</CriteriaGate>
				</div>
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
