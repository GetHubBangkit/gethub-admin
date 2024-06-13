import Button from "../../components/Button";
import Form from "../../components/Form";

export default function FormContent({ form, inputHandler, submit, isPending, toggle }) {
	return (
		<Form onSubmit={submit}>
			<Form.Group>
				<Form.Label>Nama</Form.Label>
				<Form.Input type="text" name="name" onChange={inputHandler} value={form.name} />
			</Form.Group>
			<Form.Group className="mb-0 flex justify-between">
				<Button.Send loading={isPending} />
				<Button.Cancel onClick={toggle} />
			</Form.Group>
		</Form>
	);
}
