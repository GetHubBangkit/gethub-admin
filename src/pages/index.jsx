import Layout from "../layouts";
import useUser from "../hooks/useUser";
import PageLoader from "../components/PageLoader";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Card from "../components/Card";
import { useRouter } from "next/router";
import useDashboard from "../repositories/useDashboard";
import Skeleton from "../components/Skeleton";
import { CalendarDaysIcon, NewspaperIcon, RocketLaunchIcon, UsersIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";

const AreaChart = dynamic(() => import("../components/Chart/area"), {
	ssr: false,
});

export default function Home() {
	const router = useRouter();
	const { user, isUserLoading } = useUser({ redirectTo: "/login" });
	const [isClient, setIsClient] = useState(false);

	const { data: dashboard, isLoading: isDashboardLoading } = useDashboard({
		args: Boolean(user),
		params: {
			mode: "stats",
		},
	});

	const { data: chart, isLoading: isChartLoading } = useDashboard({
		args: Boolean(user),
		params: {
			mode: "chart",
		},
	});

	useEffect(() => {
		setIsClient(true);
	}, []);

	const pageData = [isChartLoading];
	if (isUserLoading || !isClient || pageData.some((data) => data == null)) return <PageLoader />;
	return (
		<Layout title="Dashboard" breadcrumbs={["Dashboard"]} active="/">
			<div className="mb-4">
				<Alert.Dismissible variant="solid-primary">
					Selamat datang, <b>{user?.full_name}</b>!
				</Alert.Dismissible>
			</div>
			<div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
				<Card variant="outline-primary">
					<Card.Body className="p-6">
						<div className="flex items-center gap-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 p-1 text-primary-500">
								<UsersIcon className="h-5 w-5" />
							</div>
							<div className="block">
								<p className="mb-1 text-sm font-semibold leading-none text-neutral-600">Total User</p>
								<span className="text-lg font-bold text-neutral-900">
									{isDashboardLoading ? <Skeleton height={10} /> : dashboard?.total_user}
								</span>
							</div>
						</div>
					</Card.Body>
				</Card>
				<Card variant="outline-success">
					<Card.Body className="p-6">
						<div className="flex items-center gap-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success-100 p-1 text-success-500">
								<RocketLaunchIcon className="h-5 w-5" />
							</div>
							<div className="block">
								<p className="mb-1 text-sm font-semibold leading-none text-neutral-600">
									Total Sponsor
								</p>
								<span className="text-lg font-bold text-neutral-900">
									{isDashboardLoading ? <Skeleton height={10} /> : dashboard?.total_user}
								</span>
							</div>
						</div>
					</Card.Body>
				</Card>
				<Card variant="outline-info">
					<Card.Body className="p-6">
						<div className="flex items-center gap-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info-100 p-1 text-info-500">
								<CalendarDaysIcon className="h-5 w-5" />
							</div>
							<div className="block">
								<p className="mb-1 text-sm font-semibold leading-none text-neutral-600">Total Event</p>
								<span className="text-lg font-bold text-neutral-900">
									{isDashboardLoading ? <Skeleton height={10} /> : dashboard?.total_event}
								</span>
							</div>
						</div>
					</Card.Body>
				</Card>
				<Card variant="outline-danger">
					<Card.Body className="p-6">
						<div className="flex items-center gap-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-danger-100 p-1 text-danger-500">
								<NewspaperIcon className="h-5 w-5" />
							</div>
							<div className="block">
								<p className="mb-1 text-sm font-semibold leading-none text-neutral-600">
									Total Project
								</p>
								<span className="text-lg font-bold text-neutral-900">
									{isDashboardLoading ? <Skeleton height={10} /> : dashboard?.total_project}
								</span>
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
			<div className="mb-4">
				<Card>
					<Card.Header>
						<Card.Title>Project per Kategori</Card.Title>
					</Card.Header>
					<Card.Body className="h-96">
						<AreaChart
							labels={
								isChartLoading === false && Array.isArray(chart.chart)
									? chart.chart.map((item) => item.name)
									: []
							}
							data={
								isChartLoading === false && Array.isArray(chart.chart)
									? chart.chart.map((item) => item.total)
									: []
							}
						/>
					</Card.Body>
				</Card>
			</div>
		</Layout>
	);
}
