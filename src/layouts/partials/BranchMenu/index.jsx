import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Icon from "../../../components/Icon";

export default function BranchMenu({ roles }) {
	if (!roles) return null;
	return (
		<Menu as="div" className="relative inline-block text-left">
			<Menu.Button className="flex items-center">
				<Icon icon="Info" className="h-5 w-5 text-primary-500" />
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
						{roles.map((role, index) => {
							return (
								<Fragment key={`branch-role-${index}`}>
									<Menu.Item>
										<div className="flex w-full items-center rounded px-2 py-2 text-sm font-bold text-primary-500">
											{role.role_name}
										</div>
									</Menu.Item>
									{role.user_role_branches.map((branch, bIndex) => (
										<Menu.Item key={`branch-${bIndex}`}>
											<div className="flex w-full flex-wrap items-center justify-between rounded-md px-2 py-2 text-sm">
												{branch.branch_name}
											</div>
										</Menu.Item>
									))}
								</Fragment>
							);
						})}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
