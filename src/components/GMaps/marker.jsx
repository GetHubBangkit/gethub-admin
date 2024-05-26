import { useEffect } from "react";

export default function Marker({ marker, ...options }) {
	useEffect(() => {
		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, []);

	useEffect(() => {
		if (marker) {
			marker.setOptions(options);
		}
	}, [marker, options]);

	return null;
}
