import useSWR from "swr";

export default function useDashboard({ params = {}, args = true } = {}) {
	return useSWR(args && ["https://machinelearning-api-kot54pmj3q-et.a.run.app/dashboard", params]);
}
