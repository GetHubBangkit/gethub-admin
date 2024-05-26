import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { setPrivilegeMenu } from "../lib/privilege-builder";
import { INITIAL_PRIVILEGE } from "../configs/initial-config";
import MyAxios from "../lib/my-axios";
import { ForbiddenError } from "../configs/exception";

export const PrivilegeContext = createContext();

const usePrivilegeProvider = () => {
	const router = useRouter();

	let currentRoute = router.asPath;

	const guestRoutes = ["/login"];

	const { user, mutateUser } = useUser({ redirectTo: "/login" });
	const [privilege, setPrivilege] = useState({ ...INITIAL_PRIVILEGE });
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (!user || router.isReady === false) return;

		const updatePrivilege = (newPrivilege = null) => {
			let currentPrivilege = newPrivilege?.privileges ?? privilege.raw;
			currentPrivilege.sort((a, b) => a.menu_sequence - b.menu_sequence);

			const currentRoles = newPrivilege?.roles ?? privilege.roles;
			const resolvedPrivilege = setPrivilegeMenu(currentPrivilege);

			if (guestRoutes.includes(currentRoute)) return setPrivilege({ ...INITIAL_PRIVILEGE });
			if (currentRoute === "/")
				return setPrivilege({
					privileges: resolvedPrivilege,
					raw: currentPrivilege,
					roles: currentRoles,
				});

			if (privilege?.raw.length > 0 || newPrivilege?.privileges)
				return setPrivilege({
					privileges: resolvedPrivilege,
					raw: currentPrivilege,
					roles: currentRoles,
				});
		};

		const getPrivilege = async () => {
			if (guestRoutes.includes(currentRoute) || user.is_logged_in === false)
				return setPrivilege({ ...INITIAL_PRIVILEGE });

			try {
				setIsLoading(true);
				setIsError(false);

				const request = await MyAxios({
					url: `${process.env.NEXT_PUBLIC_API_ENDPOINT_USER_MANAGEMENT}/authtoken`,
					method: "POST",
					data: {
						application_id: process.env.NEXT_PUBLIC_APP_ID_SNA,
					},
					headers: {
						AuthKey: user.authkey,
					},
				});

				const response = await request.data;

				if (response.error_code === 0) updatePrivilege(response.data);
			} catch (error) {
				console.error("Privilege Context Error: ", error);
				if (error instanceof ForbiddenError) await mutateUser(axios({ url: "/api/logout", method: "POST" }));

				setIsError(error);
			} finally {
				setIsLoading(false);
			}
		};

		if (privilege.raw.length < 1) getPrivilege();
		else updatePrivilege();
	}, [user, router]);

	return { ...privilege, setPrivilege, isLoading, isError };
};

export default function PrivilegeProvider({ children }) {
	const privilege = usePrivilegeProvider();
	return <PrivilegeContext.Provider value={privilege}>{children}</PrivilegeContext.Provider>;
}
