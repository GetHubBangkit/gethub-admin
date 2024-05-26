import useSWR from "swr";

export default function useEnumeration({ params = {}, args = true } = {}) {
	return useSWR(args && [process.env.NEXT_PUBLIC_API_ENDPOINT + "/enumerations", params]);
}
