import Head from "next/head";
import { RaceBy } from "@uiball/loaders";
import colors from "../../configs/theme";

export default function PageLoader() {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-primary-100">
			<Head>
				<title>Loading...</title>
			</Head>
			<RaceBy size={100} lineWeight={8} speed={1.4} color={colors.primary[500]} />
		</div>
	);
}
