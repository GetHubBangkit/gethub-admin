import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
	ChevronDownIcon,
	ArrowLeftOnRectangleIcon,
	UserCircleIcon,
	InboxArrowDownIcon,
	KeyIcon,
} from "@heroicons/react/20/solid";
import CriteriaGate from "../../../components/CriteriaGate";

export default function UserMenu({ user, logout }) {
	const [ts, setTs] = useState(Date.now());

	useEffect(() => {
		setTs(Date.now());
	}, [user]);

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div className="flex items-center">
				<Menu.Button className="flex w-full items-center justify-center">
					<div className="flex items-center gap-1 text-sm font-semibold text-neutral-900">
						<div className="h-8 w-8 overflow-hidden rounded-full">
							<CriteriaGate criteria={user}>
								<img
									src={user?.photo}
									alt="Profile picture"
									className="h-full w-full object-cover"
									onError={(event) => {
										event.target.src = `https://ui-avatars.com/api/?name=${user?.full_name}&background=E6EDEC`;
									}}
								/>
							</CriteriaGate>
						</div>
						<span className="hidden md:block">{user?.full_name}</span>
						<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
					</div>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="block p-4 text-center">
						<div className="mx-auto h-12 w-12 overflow-hidden rounded-full">
							<img
								src={user?.photo}
								alt="Profile picture"
								className="h-full w-full object-cover"
								onError={(event) => {
									event.target.src = `https://ui-avatars.com/api/?name=${user?.full_name}&background=E6EDEC`;
								}}
							/>
						</div>
						<div className="mt-2">
							<p>{user?.full_name}</p>
							<p className="max-w-full truncate text-xs font-normal text-neutral-500">{user?.email}</p>
						</div>
					</div>
					<div className="px-1 py-1">
						<Menu.Item>
							{({ active }) => (
								<Link
									href="/profile"
									className={`${
										active ? "bg-primary-100" : ""
									} group flex w-full items-center rounded-md px-2 py-2 text-sm tracking-tight text-primary-500`}
								>
									<UserCircleIcon className="mr-2 h-5 w-5 text-primary-500" aria-hidden="true" />
									Profile
								</Link>
							)}
						</Menu.Item>
						{/* <Menu.Item>
							{({ active }) => (
								<Link
									href="/change-password"
									className={`${
										active ? "bg-primary-100" : ""
									} group flex w-full items-center rounded-md px-2 py-2 text-sm tracking-tight text-primary-500`}
								>
									<KeyIcon className="mr-2 h-5 w-5 text-primary-500" aria-hidden="true" />
									Ganti Password
								</Link>
							)}
						</Menu.Item> */}
						
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={logout}
									className={`${
										active ? "bg-danger-100" : ""
									} group flex w-full items-center rounded-md px-2 py-2 text-sm tracking-tight text-danger-500`}
								>
									<ArrowLeftOnRectangleIcon
										className="mr-2 h-5 w-5 text-danger-500"
										aria-hidden="true"
									/>
									Logout
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
