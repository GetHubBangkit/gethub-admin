import { useState } from "react";
import classNames from "classnames";
import Navlink from "../partials/Navlink";
import Icon from "../../components/Icon";

export default function Sidebar({ expanded, active }) {
	const [activeMenus, setActiveMenus] = useState([]);

	const toggleActiveMenu = (key) => {
		setActiveMenus((state) => {
			if (state.includes(key)) return state.filter((item) => item != key);
			return [key];
		});
	};

	return (
		<aside
			className={classNames(
				"absolute inset-y-0 z-50 w-full shrink-0 overflow-y-auto overflow-x-hidden whitespace-nowrap border-r bg-primary-500 transition-[max-width] duration-300 md:relative",
				{ "max-w-[18rem]": expanded },
				{ "max-w-0": !expanded },
			)}
		>
			<div className="mt-4 flex h-10 items-center justify-center border-r border-neutral-200 bg-primary-500 px-4 font-bold text-primary-100 md:w-72">
				<img src="/img/logo.png" alt="logo" className="h-full" />
			</div>
			<div className="flex flex-col gap-1 py-4">
				<Navlink
					title="Dashboard"
					icon={<Icon icon="Home" className="h-4 w-4" />}
					href="/"
					active={active === "/"}
				/>
				<Navlink
					title="Enumeration"
					icon={<Icon icon="Box" className="h-4 w-4" />}
					href="/enumeration"
					active={active === "/enumeration"}
				/>
				<Navlink
					title="Kategori"
					icon={<Icon icon="Box" className="h-4 w-4" />}
					href="/category"
					active={active === "/category"}
				/>
				<Navlink
					title="Sponsor"
					icon={<Icon icon="Database" className="h-4 w-4" />}
					href="/sponsor"
					active={active === "/sponsor"}
				/>
				<Navlink
					title="Event"
					icon={<Icon icon="Calendar" className="h-4 w-4" />}
					href="/information"
					active={active === "/information"}
				/>
				<Navlink
					title="Proyek"
					icon={<Icon icon="Briefcase" className="h-4 w-4" />}
					href="/project"
					active={active === "/project"}
				/>
				<Navlink
					title="Settlement"
					icon={<Icon icon="Inbox" className="h-4 w-4" />}
					href="/settlement"
					active={active === "/settlement"}
				/>
				<Navlink
					title="User"
					icon={<Icon icon="Users" className="h-4 w-4" />}
					href="/user"
					active={active === "/user"}
				/>
			</div>
		</aside>
	);
}
