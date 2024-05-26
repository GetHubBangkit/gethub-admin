import { Router } from "next/router";
import { SWRConfig } from "swr";
import NProgress from "nprogress";
import fetcher from "../lib/fetcher";

import "nprogress/nprogress.css";
import "../styles/globals.css";

NProgress.configure({
	showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<SWRConfig
			value={{
				fetcher: fetcher,
				onError: (error) => console.error(error),
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
			}}
		>
			<Component {...pageProps} />
		</SWRConfig>
	);
}

export default MyApp;
