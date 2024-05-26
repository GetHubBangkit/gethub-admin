import Button from "../../components/Button";
import Form from "../../components/Form";

export default function FormContent({ form, inputHandler, submit, isPending, toggle }) {
	return (
		<Form onSubmit={submit}>
			<Form.Group>
				<Form.Label>ID Aplikasi</Form.Label>
				<Form.Input
					type="text"
					name="application_id"
					onChange={inputHandler}
					value={form.application_id}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Nama</Form.Label>
				<Form.Input type="text" name="name" onChange={inputHandler} value={form.name} required />
			</Form.Group>
			<Form.Group>
				<Form.Label>URL</Form.Label>
				<Form.Input type="text" name="url" onChange={inputHandler} value={form.url} required />
			</Form.Group>
			<Form.Group>
				<Form.Label>Welcome API</Form.Label>
				<Form.Input type="text" name="welcome_api" onChange={inputHandler} value={form.welcome_api} required />
			</Form.Group>
			<Form.Group className="mb-0 flex justify-between">
				<Button.Send loading={isPending} />
				<Button.Cancel onClick={toggle} />
			</Form.Group>
		</Form>
	);
}
