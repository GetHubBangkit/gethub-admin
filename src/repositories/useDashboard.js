import useSWR from "swr";

export default function useDashboard({ params = {}, args = true } = {}) {
	return useSWR(args && ["http://127.0.0.1:8100/dashboard", params]);
}
