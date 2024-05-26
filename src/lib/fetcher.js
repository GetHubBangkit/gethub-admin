import MyAxios from "./my-axios";
import { toastAlert } from "./sweetalert";

export default async function fetcher([url, params, options = {}]) {
	try {
		const request = await MyAxios({ method: "GET", url: url, params: params });
		const response = await request.data;

		return typeof options.transformData === "function" ? options.transformData(response.data) : response.data;
	} catch (error) {
		toastAlert.error(error.message);
		console.error("Fetch Error: ", error);

		return Promise.resolve([]);
	}
}
