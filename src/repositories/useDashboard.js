import useSWR from "swr";

export default function useDashboard({ params = {}, args = true } = {}) {
	return useSWR(args && ["https://mocki.io/v1/1767657c-7fcf-477c-994d-6ba66b1f6fdb", params]);
}
