import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import resolveConfig from "tailwindcss/resolveConfig";
import twConfig from "../../../tailwind.config.js";

const config = resolveConfig(twConfig);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const {
	theme: { colors },
} = config;

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	elements: {
		line: {
			tension: 0.25,
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			grid: {
				display: false,
			},
			ticks: {
				display: false,
			},
		},
		x: {
			border: { dash: [8, 4] },
			grid: {
				display: true,
			},
			ticks: {
				display: true,
			},
		},
	},
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},
};

export default function Area({ labels, data }) {
	return (
		<Line
			options={options}
			data={{
				labels,
				datasets: [
					{
						fill: true,
						label: "Jumlah",
						data: data,
						borderColor: colors.primary[500],
						backgroundColor: (context) => {
							const bgColor = [colors.primary[400], "rgba(255, 255, 255, 0.1)"];

							if (!context.chart.chartArea) return;

							const {
								ctx,
								chartArea: { top, bottom },
							} = context.chart;
							const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
							gradientBg.addColorStop(0, bgColor[0]);
							gradientBg.addColorStop(1, bgColor[1]);

							return gradientBg;
						},
					},
				],
			}}
		/>
	);
}
