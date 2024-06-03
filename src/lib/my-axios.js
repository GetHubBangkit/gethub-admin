import axios from "axios";
import { ForbiddenError, InternalServerError, NotFoundError, ValidationError } from "../configs/exception";

export const MyAxios = axios.create();
MyAxios.interceptors.response.use(
	function (response) {
		const message = response.data.message ?? "Internal Server Error";
		if (response.data.error_code === 400) return Promise.reject(new ValidationError(message));
		if (response.data.error_code === 401) return Promise.reject(new ForbiddenError(message));
		if (response.data.error_code === 404) return Promise.reject(new NotFoundError(message));
		if (response.data.error_code === 404) return Promise.reject(new NotFoundError(message));
		if (response.data.error_code === 500) return Promise.reject(new InternalServerError(message));
		if (response.data.error_code === 0 || response.data.error_code === 200) return response;

		let error = new Error();
		error.name = "Network error";
		error.message = `Failed to fetch ${new URL(response.config.url).pathname}`;

		return Promise.reject(error);
	},
	function (error) {
		return Promise.reject(error);
	},
);

export default MyAxios;
