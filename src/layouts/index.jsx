import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "./Header";
import Sidebar from "./Sidebar";
import classNames from "classnames";
import PageHeader from "./partials/PageHeader";
import Footer from "./Footer";
import useMediaQuery from "../hooks/useMediaQuery";
import useToggle from "../hooks/useToggle";
import { Bars3BottomLeftIcon } from "@heroicons/react/20/solid";

export default function Layout({ children, title = "", isExpanded = true, breadcrumbs, leading, active } = {}) {
	const router = useRouter();

	const [expanded, toggleExpanded] = useToggle(isExpanded);
	const isMobile = useMediaQuery("(max-width: 768px)");

	useEffect(() => {
		isMobile && toggleExpanded(false);
	}, [router.pathname, isMobile]);

	return (
		<div className="relative flex h-screen max-h-screen overflow-hidden bg-neutral-300 bg-opacity-10">
			<Head>
				<title>{`${title} - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
			</Head>
			<Sidebar {...{ expanded, active }} />
			<div className="relative w-full overflow-y-auto">
				<Header {...{ expanded, toggleExpanded }} />
				<div
					className={classNames(
						"flex h-full max-h-[calc(100vh-4rem)] w-full max-w-full flex-col overflow-y-auto overflow-x-hidden p-6",
					)}
				>
					<main className="grow">
						<PageHeader {...{ title, breadcrumbs, leading }} />
						{children}
					</main>
					<Footer />
				</div>
			</div>
			<div className="absolute bottom-0 right-0 z-50 mb-16 mr-8 block md:hidden">
				<button
					type="button"
					className="rounded-full bg-primary-500 p-5 text-primary-100 shadow-2xl active:focus:scale-90"
					onClick={toggleExpanded}
				>
					<Bars3BottomLeftIcon className="h-6 w-6" />
				</button>
			</div>
			{expanded && (
				<div className="fixed inset-0 z-30 bg-neutral-900/25 md:hidden" onClick={toggleExpanded}></div>
			)}
		</div>
	);
}
