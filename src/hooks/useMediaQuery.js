import { useState, useEffect } from "react";

export default function useMediaQuery(mediaQuery) {
	const [isMatch, setIsMatch] = useState(false);

	useEffect(() => {
		if (!window) return;

		function resizeHandler() {
			const match = window.matchMedia(mediaQuery);
			setIsMatch(match.matches);
		}

		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [mediaQuery]);

	return isMatch;
}
