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
				<Form.Label>Nama Lengkap</Form.Label>
				<Form.Input type="text" name="full_name" onChange={inputHandler} value={form.full_name} disabled />
			</Form.Group>
			<Form.Group>
				<Form.Label>Email</Form.Label>
				<Form.Input type="email" name="email" onChange={inputHandler} value={form.email} disabled />
			</Form.Group>
			<Form.Group>
				<Form.Label>No. Telpon</Form.Label>
				<Form.Input type="text" name="phone" onChange={inputHandler} value={form.phone} disabled />
			</Form.Group>
			<Form.Group>
				<Form.Label>Alamat</Form.Label>
				<Form.Textarea name="address" onChange={inputHandler} value={form.address} disabled />
			</Form.Group>
			<Form.Group>
				<Form.Label>Gambar</Form.Label>
				<img
					src={form.photo}
					alt=""
					className="w-full"
					onError={(event) => {
						event.target.src = `https://ui-avatars.com/api/?name=${form?.full_name}&background=E6EDEC`;
					}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>KTP</Form.Label>
				<img
					src={form.is_verif_ktp_url}
					alt=""
					className="w-full"
					onError={(event) => {
						event.target.src = `https://ui-avatars.com/api/?name=ID&background=E6EDEC`;
					}}
				/>
			</Form.Group>
			<Form.Group className="flex items-center gap-4">
				<Form.Label className="mb-0 w-20 leading-none">Aktif</Form.Label>
				<Form.Switch
					checked={form.is_verif_ktp}
					name="is_verif_ktp"
					onChange={(checked) =>
						inputHandler({
							target: {
								name: "is_verif_ktp",
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
