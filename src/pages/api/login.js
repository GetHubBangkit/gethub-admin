import _ from "underscore";
import MyAxios from "../../lib/my-axios";
import { withSessionRoute } from "../../lib/with-session";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
	try {
		const request = await MyAxios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, req.body);
		const response = await request.data;
		const headers = request.headers;

		const userData = {
			..._.pick({ ...response.data }, ["id", "user_name", "full_name", "email", "photo", "token"]),
			is_logged_in: true,
		};

		req.session.user = userData;

		await req.session.save();
		res.status(200).send({ error_code: 0, data: userData, message: "Successfully Logged In" });
	} catch (error) {
		return res.send({ error_code: 500, data: null, message: error.message });
	}
}
