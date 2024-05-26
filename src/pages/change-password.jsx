import Layout from "../layouts";
import Button from "../components/Button";
import Container from "../components/Container";
import PageLoader from "../components/PageLoader";
import useAppMenu from "../hooks/useAppMenu";
import useUser from "../hooks/useUser";

import useForm from "../hooks/useForm";
import { toastAlert } from "../lib/sweetalert";
import useToggle from "../hooks/useToggle";
import Form from "../components/Form";

export default function ChangePassword() {
	const { isUserLoading } = useUser({ redirectTo: "/login" });
	const menu = useAppMenu("/profile");

	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_USER_MANAGEMENT + "/profile";
	const INITIAL_FORM = {
		password_old: "",
		password_new: "",
		password_new_confirmation: "",
	};

	const {
		form: accountForm,
		isPending: isAccountPending,
		inputHandler: accountInputHandler,
		setForm: setAccountForm,
		submit: accountSubmit,
	} = useForm(INITIAL_FORM, {
		url: API_ENDPOINT,
		params: {
			mode: "change-password",
		},
		transformData: (data) => ({
			password_old: String(data.password_old),
			password_new: String(data.password_new),
			password_new_confirmation: String(data.password_new_confirmation),
		}),
		onSuccess: (response) => {
			console.log(response);
			setAccountForm(INITIAL_FORM);
			toastAlert.success(response.message);
		},
		useFormData: false,
		includeIdOnSubmit: true,
	});

	const [passwordOld, togglePasswordOld] = useToggle();
	const [passwordNew, togglePasswordNew] = useToggle();
	const [passwordConfirm, togglePasswordConfirm] = useToggle();

	const pageData = [menu];
	if (isUserLoading || pageData.some((data) => data == null)) return <PageLoader />;
	return (
		<Layout title="Ganti Password" breadcrumbs={menu?.menu_breadcrumbs} active={menu?.menu_url}>
			<Container>
				<Form onSubmit={accountSubmit}>
					<Form.Group>
						<Form.Label>Password Lama</Form.Label>
						<div className="relative">
							<Form.Input
								type={`${passwordOld ? "text" : "password"}`}
								name="password_old"
								onChange={accountInputHandler}
								value={accountForm.password_old}
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center justify-center px-4">
								<button type="button" className="text-primary-700" onClick={togglePasswordOld}>
									{passwordOld === false && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fillRule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clipRule="evenodd"
											/>
										</svg>
									)}
									{passwordOld === true && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
												clipRule="evenodd"
											/>
											<path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
										</svg>
									)}
								</button>
							</div>
						</div>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password Baru</Form.Label>
						<div className="relative">
							<Form.Input
								type={`${passwordNew ? "text" : "password"}`}
								name="password_new"
								onChange={accountInputHandler}
								value={accountForm.password_new}
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center justify-center px-4">
								<button type="button" className="text-primary-700" onClick={togglePasswordNew}>
									{passwordNew === false && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fillRule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clipRule="evenodd"
											/>
										</svg>
									)}
									{passwordNew === true && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
												clipRule="evenodd"
											/>
											<path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
										</svg>
									)}
								</button>
							</div>
						</div>
					</Form.Group>
					<Form.Group>
						<Form.Label>Konfirmasi Password Baru</Form.Label>
						<div className="relative">
							<Form.Input
								type={`${passwordConfirm ? "text" : "password"}`}
								name="password_new_confirmation"
								onChange={accountInputHandler}
								value={accountForm.password_new_confirmation}
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center justify-center px-4">
								<button type="button" className="text-primary-700" onClick={togglePasswordConfirm}>
									{passwordConfirm === false && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fillRule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clipRule="evenodd"
											/>
										</svg>
									)}
									{passwordConfirm === true && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
												clipRule="evenodd"
											/>
											<path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
										</svg>
									)}
								</button>
							</div>
						</div>
					</Form.Group>
					<Form.Group className="mb-0">
						<Button.Send loading={isAccountPending} />
					</Form.Group>
				</Form>
			</Container>
		</Layout>
	);
}
