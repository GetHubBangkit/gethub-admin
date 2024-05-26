import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export const Modal = ({ children, title, show, handler, size = "base", content } = {}) => {
	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={show} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto"
				initialFocus={cancelButtonRef}
				onClose={handler}
			>
				<div
					id="modal"
					className="relative flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-neutral-900/25 filter backdrop-blur-[2px] transition-opacity" />
					</Transition.Child>
					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div
							className={classNames(
								"relative inline-block w-full transform rounded-lg bg-white text-left align-bottom shadow transition-all sm:my-8 sm:w-full sm:align-middle",
								{
									"sm:max-w-lg": size === "base",
									"sm:max-w-4xl": size === "lg",
									"sm:max-w-7xl": size === "xl",
								},
							)}
						>
							<div className="rounded bg-white p-4 sm:p-6">
								<div className="mt-2 flex items-stretch sm:mt-0">
									<Dialog.Title
										as="h3"
										className="grow text-base font-medium leading-6 text-neutral-900"
									>
										{title}
									</Dialog.Title>
									<div className="shink">
										<button ref={cancelButtonRef} onClick={() => handler(false)}>
											<XMarkIcon className="h-5 w-5" />
										</button>
									</div>
								</div>
								<div className="mt-4">{content}</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Modal;
