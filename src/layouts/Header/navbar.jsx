import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Link from "next/link";
import Icon from "../../components/Icon";
import Skeleton from "../../components/Skeleton";
import classNames from "classnames";

const ACTIVE_MENU_CLASS =
	"after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary-500 after:content-['']";

export default function Navbar({ active }) {
	const [activeMenus, setActiveMenus] = useState([]);

	const toggleActiveMenu = (key) => {
		setActiveMenus((state) => {
			if (state.includes(key)) return state.filter((item) => item != key);
			return [key];
		});
	};

	return (
		<div className="z-50 hidden h-12 shrink-0 items-stretch gap-6 bg-white px-4 shadow md:flex">
			<Link
				href="/"
				className={classNames(
					"relative inline-flex items-center py-4 text-sm font-semibold leading-none text-primary-500",
					{
						"after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary-500 after:content-['']":
							active === "/",
					},
				)}
			>
				<Icon icon="Home" className="mr-1 h-4 w-4" />
				Dashboard
			</Link>
		</div>
	);
}
