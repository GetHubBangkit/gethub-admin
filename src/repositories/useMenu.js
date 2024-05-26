import useSWR from "swr";

export default function useMenu({ params = {}, args = true } = {}) {
	return useSWR(args && [process.env.NEXT_PUBLIC_API_ENDPOINT_USER_MANAGEMENT + "/menu", params]);
}
