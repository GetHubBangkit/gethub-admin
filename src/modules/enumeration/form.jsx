import Button from "../../components/Button";
import Form from "../../components/Form";

export default function FormContent({ form, inputHandler, submit, isPending, toggle }) {
	return (
		<Form onSubmit={submit}>
			<Form.Group>
				<Form.Label>Key</Form.Label>
				<Form.Input type="text" name="key" onChange={inputHandler} value={form.key} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Value</Form.Label>
				<Form.Input type="text" name="value" onChange={inputHandler} value={form.value} />
			</Form.Group>
			<Form.Group className="mb-0 flex justify-between">
				<Button.Send loading={isPending} />
				<Button.Cancel onClick={toggle} />
			</Form.Group>
		</Form>
	);
}
