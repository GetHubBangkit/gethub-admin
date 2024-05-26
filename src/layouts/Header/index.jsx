import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import UserMenu from "../partials/UserMenu";
import useUser from "../../hooks/useUser";
import BranchMenu from "../partials/BranchMenu";
import classNames from "classnames";

export default function Header({ expanded, toggleExpanded }) {
	const { user, logout } = useUser({ redirectTo: "/login" });

	return (
		<div className={classNames("z-50 flex h-16 shrink-0 bg-white")}>
			<div className="flex grow items-center justify-between text-primary-500 shadow">
				<div className="ml-4">
					<div className="flex items-center justify-start font-bold text-primary-500 md:hidden">
						<img src="/img/logo-alt.png" alt="logo" className="h-12" />
					</div>
					<button
						type="button"
						className="hidden rounded p-2 transition-all hover:bg-primary-100 active:focus:scale-90 md:block"
						onClick={toggleExpanded}
					>
						<Bars3BottomLeftIcon className="h-6 w-6" />
					</button>
				</div>
				<div className="mr-6 flex gap-2">
					<div className="flex items-center gap-4 text-sm font-semibold text-neutral-900">
						{/* <AppMenu {...{ user, roles }} /> */}
						{/* <BranchMenu {...{ roles }} /> */}
						<UserMenu {...{ user, logout }} />
					</div>
				</div>
			</div>
		</div>
	);
}
