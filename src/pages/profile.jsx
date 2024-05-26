import { useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { ArrowUpOnSquareIcon } from "@heroicons/react/20/solid";
import Layout from "../layouts";
import Form from "../components/Form";
import Button from "../components/Button";
import Container from "../components/Container";
import PageLoader from "../components/PageLoader";
import { loadingAlert, toastAlert } from "../lib/sweetalert";
import useAppMenu from "../hooks/useAppMenu";
import useUser from "../hooks/useUser";
import useForm from "../hooks/useForm";
import Badge from "../components/Badge";

export default function Profile() {
	const { user, isUserLoading } = useUser({ redirectTo: "/login" });

	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_USER_MANAGEMENT + "/user";
	const INITIAL_FILE_FORM = {
		id: "",
	};

	const fileInputRef = useRef();

	const { form, isPending, inputHandler, setForm, submit } = useForm(INITIAL_FILE_FORM, {
		url: API_ENDPOINT,
		params: {
			mode: "upload-photo",
		},
		onSuccess: (response) => {
			fileInputRef.current.value = "";
			toastAlert.success(response.message);
		},
		useFormData: true,
		includeIdOnSubmit: true,
	});

	useEffect(() => {
		if (!user) return;
		setForm((state) => ({ ...state, id: user?.id }));
	}, [user]);

	useEffect(() => {
		if (!form?.file) return;
		loadingAlert({ text: "Mengupload foto" });
		submit().then(() => setForm((state) => ({ ...state, file: null })));
	}, [form]);

	return (
		<Layout title="Profil" breadcrumbs={["Profil", user?.full_name ?? ""]} active="/profile">
			<div className="flex flex-col gap-8 md:flex-row">
				<div className="mx-auto block w-40 shrink-0">
					<div className="mx-auto aspect-square w-full overflow-hidden rounded-full">
						<img
							src={user?.photo}
							alt="Profile picture"
							className="h-full w-full object-cover"
							onError={(event) => {
								event.target.src = `https://ui-avatars.com/api/?name=${user?.full_name}&background=E6EDEC`;
							}}
						/>
					</div>
					<div className="mt-4 block">
						<Button
							className="w-full"
							icon={<ArrowUpOnSquareIcon className="h-4 w-4" />}
							onClick={() => {
								if (!fileInputRef.current) return;
								fileInputRef.current.click();
							}}
							disabled={isPending}
						>
							Update Foto
						</Button>
						<Form>
							<Form.Input
								ref={fileInputRef}
								type="file"
								name="file"
								className="hidden"
								accept="image/*"
								onChange={inputHandler}
							/>
						</Form>
					</div>
				</div>
				<div className="block grow">
					<Container>
						<Tab.Group>
							<Tab.List className="flex space-x-4">
								<Tab
									className={({ selected }) =>
										classNames(
											"border-b-4 py-2 text-sm font-medium leading-5 text-primary-700",
											"focus:outline-none",
											selected
												? "border-primary-500"
												: "border-transparent text-primary-100 hover:bg-white/[0.12] hover:text-primary-500",
										)
									}
								>
									Data Pribadi
								</Tab>
								{/* <Tab
									className={({ selected }) =>
										classNames(
											"border-b-4 py-2 text-sm font-medium leading-5 text-primary-700",
											"focus:outline-none",
											selected
												? "border-primary-500"
												: "border-transparent text-primary-100 hover:bg-white/[0.12] hover:text-primary-500",
										)
									}
								>
									Hak Akses
								</Tab> */}
							</Tab.List>
							<Tab.Panels className="mt-6">
								<Tab.Panel>
									<Form.Group>
										<Form.Label>Nama Lengkap</Form.Label>
										<Form.Input
											type="text"
											name="full_name"
											defaultValue={user?.full_name ?? ""}
											disabled
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Username</Form.Label>
										<Form.Input
											type="text"
											name="user_name"
											defaultValue={user?.user_name ?? ""}
											disabled
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Email</Form.Label>
										<Form.Input
											type="email"
											name="email"
											defaultValue={user?.email ?? ""}
											disabled
										/>
									</Form.Group>
									
								</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>
					</Container>
				</div>
			</div>
		</Layout>
	);
}
