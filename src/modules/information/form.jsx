import _ from "underscore";
import Button from "../../components/Button";
import CriteriaGate from "../../components/CriteriaGate";
import Form from "../../components/Form";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";

export default function FormContent({ form, inputHandler, submit, isPending, toggle, categories, mutateCategories }) {
	const [preview, setPreview] = useState("");
	const { show: showPreview, toggle: togglePreview } = useModal();

	return (
		<Form onSubmit={submit}>
			<Form.Group>
				<Form.Label>Judul</Form.Label>
				<Form.Input type="text" name="title" onChange={inputHandler} value={form.title} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Kategori</Form.Label>
				<Form.Combobox
					onChange={(selected) =>
						inputHandler({
							target: {
								name: "SELECT_category",
								value: selected,
							},
						})
					}
					value={form.SELECT_category}
					options={categories ? categories.map((item) => ({ label: item.value, value: item.value })) : []}
					refreshHandler={mutateCategories}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Deskripsi</Form.Label>
				<Form.Textarea name="description" onChange={inputHandler} value={form.description} />
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
