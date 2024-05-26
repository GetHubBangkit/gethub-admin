import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import MyAxios from "../lib/my-axios";
import { ForbiddenError, InternalServerError } from "../configs/exception";
import { toastAlert } from "../lib/sweetalert";

export default function useUser({ redirectTo = false, redirectIfFound = false } = {}) {
	const router = useRouter();
	const {
		data: user,
		mutate: mutateUser,
		isLoading: isUserLoading,
	} = useSWR(["/api/user"], {
		revalidateOnFocus: true,
		revalidateIfStale: true,
		revalidateOnMount: true,
		revalidateOnReconnect: true,
	});
	if (user && user.is_logged_in) MyAxios.defaults.headers.common["Authorization"] = `Bearer ${user?.token}`;

	async function login(data) {
		try {
			const request = await MyAxios.post("/api/login", {
				...data,
			});

			const response = await request.data;
			await mutateUser(response.data);

			return toastAlert.success(response.message, 1500);
		} catch (error) {
			if (error instanceof ForbiddenError) await logout();
			if (error instanceof InternalServerError) toastAlert.error(error.message);
		}
	}

	async function logout() {
		return await mutateUser(MyAxios.post("/api/logout")).then(() => router.push("/login"));
	}

	useEffect(() => {
		if (!redirectTo || !user) return;
		if ((redirectTo && !redirectIfFound && !user?.is_logged_in) || (redirectIfFound && user?.is_logged_in)) {
			router.push(redirectTo);
		}
	}, [user, redirectIfFound, redirectTo]);

	return { user, isUserLoading, mutateUser, login, logout };
}
