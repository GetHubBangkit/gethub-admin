export const sessionConfig = {
	cookieName: process.env.SESSION_NAME,
	password: process.env.SESSION_SECRET_KEY,
	cookieOptions: {
		secure: false,
	},
};
