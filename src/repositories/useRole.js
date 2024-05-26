import useSWR from "swr";

export default function useRole({ params = {}, args = true } = {}) {
	return useSWR(args && [process.env.NEXT_PUBLIC_API_ENDPOINT_USER_MANAGEMENT + "/role", params]);
}
