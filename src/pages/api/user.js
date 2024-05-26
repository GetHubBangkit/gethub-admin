import { withSessionRoute } from "../../lib/with-session";

export default withSessionRoute(userRoute);

async function userRoute(req, res) {
	res.send({
		error_code: 0,
		data: req.session.user ?? { is_logged_in: false },
		message: "Successfully read user data",
	});
}
