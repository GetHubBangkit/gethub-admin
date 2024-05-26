import { useMemo } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button";
import useUser from "../hooks/useUser";
import useForm from "../hooks/useForm";
import Head from "next/head";
import PageLoader from "../components/PageLoader";
import Form from "../components/Form";
import useToggle from "../hooks/useToggle";

export default function Login() {
	const { isUserLoading, login } = useUser({ redirectIfFound: true, redirectTo: "/" });

	const INITIAL_FORM = useMemo(
		() => ({
			email: "",
			password: "",
		}),
		[],
	);

	const [showPassword, toggleShowPassword] = useToggle();
	const { form, validation, inputHandler, submit, isPending } = useForm(INITIAL_FORM, {
		onSubmit: async (data) => await login(data),
		rules: [
			{
				field: "email",
				label: "Username atau Email",
			},
			{
				field: "password",
				label: "Password",
			},
		],
	});

	if (isUserLoading) return <PageLoader />;
	return (
		<div className="grid h-screen grid-cols-2 overflow-hidden md:grid-cols-8">
			<Head>
				<title>Login - {process.env.NEXT_PUBLIC_APP_NAME}</title>
			</Head>
			<div className="relative col-span-full flex max-w-full flex-col items-center justify-center bg-primary-500 p-12 md:col-span-3 md:max-w-full">
				<Form onSubmit={submit} className="mt-auto block">
					<div className="mb-4">
						<div className="mb-6 flex items-center gap-2">
							<img src="/img/logo.png" alt="logo" className="h-10" />
						</div>
						<h1 className="block text-2xl font-bold text-white">Login</h1>
						<p className="mt-2 block text-sm font-medium text-neutral-200">
							Selamat datang! Login terlebih dahulu untuk melanjutkan!
						</p>
					</div>
					<Form.Group>
						<Form.Label className="text-neutral-100">Username atau Email</Form.Label>
						<Form.Input
							type="text"
							name="email"
							onChange={inputHandler}
							value={form.email}
							error={validation?.email}
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="text-neutral-100">Password</Form.Label>
						<div className="relative">
							<Form.Input
								type={`${showPassword ? "text" : "password"}`}
								name="password"
								onChange={inputHandler}
								value={form.password}
								error={validation?.password}
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center justify-center px-4">
								<button type="button" className="text-primary-700" onClick={toggleShowPassword}>
									{showPassword === false && (
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
									{showPassword === true && (
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
					<div className="">
						<Button.Send
							variant="warning"
							className="w-full"
							icon={<ArrowRightOnRectangleIcon className="h-4 w-4 text-warning-900" />}
							iconPosition="left"
							loading={isPending}
						>
							Login
						</Button.Send>
					</div>
				</Form>
				<div className="mt-auto">
					<p className="text-right text-sm font-medium text-neutral-100">v{process.env.APP_VERSION}</p>
				</div>
			</div>
			<div className="relative col-span-5 hidden overflow-hidden md:block">
				<div className="absolute inset-0 flex flex-col justify-center bg-primary-900/60 p-20">
					<div className="mb-6 block">
						<h1 className="text-7xl font-black leading-tight text-white">
							{process.env.NEXT_PUBLIC_APP_NAME}
						</h1>
						<p className="mt-6 text-lg font-medium text-neutral-100">
							Your Gateway to Freelance Success!
						</p>
					</div>
				</div>
				<img
					src="/img/login-illustration.jpg"
					alt="Login Illustration"
					className="h-full w-full object-cover object-bottom"
				/>
			</div>
		</div>
	);
}
