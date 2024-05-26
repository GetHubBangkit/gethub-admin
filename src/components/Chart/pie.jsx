import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie as PieChart } from "react-chartjs-2";
import resolveConfig from "tailwindcss/resolveConfig";
import twConfig from "../../../tailwind.config.js";

const config = resolveConfig(twConfig);

ChartJS.register(ArcElement, Tooltip, Legend);

const {
	theme: { colors },
} = config;

export const data = {
	labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
	datasets: [
		{
			label: "# of Votes",
			data: [12, 19, 3, 5, 2],
			backgroundColor: [
				colors.danger[100],
				colors.info[100],
				colors.warning[100],
				colors.primary[100],
				colors.success[100],
			],
			borderColor: [
				colors.danger[500],
				colors.info[500],
				colors.warning[500],
				colors.primary[500],
				colors.success[500],
			],
			borderWidth: 2.5,
		},
	],
};

export default function Pie() {
	return <PieChart data={data} />;
}
