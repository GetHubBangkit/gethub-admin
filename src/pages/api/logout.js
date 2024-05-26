import axios from "axios";
import { withSessionRoute } from "../../lib/with-session";

export default withSessionRoute(logoutRoute);

async function logoutRoute(req, res) {
	try {
		await req.session.destroy();
		res.send({ error_code: 0, data: null, message: "Successfully logout" });
	} catch (error) {
		res.send({ error_code: 500, data: null, message: "Error logout" });
	}
}
