import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BriefcaseIcon, BuildingOffice2Icon, FingerPrintIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Icon from "../../../components/Icon";

export default function AppMenu({ user, roles }) {
	if (!roles) return null;
	return (
		<Menu as="div" className="relative inline-block text-left">
			<Menu.Button className="flex items-center">
				<Icon icon="Grid" className="h-5 w-5 text-primary-500" />
			</Menu.Button>
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
					<div className="px-1 py-1">
						<Menu.Item>
							{({ active }) => (
								<a
									href={`${process.env.NEXT_PUBLIC_SSO_SNA}?authkey=${user?.authkey}&application_id=${process.env.NEXT_PUBLIC_APP_ID_SNA}`}
									className={`${
										active ? "bg-primary-100" : ""
									} group flex w-full items-center rounded-md px-2 py-2 text-sm tracking-tight text-primary-500`}
									target="_blank"
								>
									<Icon icon="Radio" className="mr-2 h-5 w-5 text-primary-500" aria-hidden="true" />
									SNA
								</a>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
