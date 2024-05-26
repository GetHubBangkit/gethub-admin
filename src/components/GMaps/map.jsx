import React, { useEffect, useRef, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

export default function Map({ onClick, onIdle, children, style, ...props }) {
	const mapRef = useRef();
	const [map, setMap] = useState();

	useEffect(() => {
		if (mapRef.current && !map) {
			setMap(new window.google.maps.Map(mapRef.current, {}));
		}
	}, [mapRef, map]);

	useDeepCompareEffect(() => {
		if (map) {
			map.setOptions(props);
		}
	}, [map, props]);

	return (
		<>
			<div ref={mapRef} className="h-full w-full"></div>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					// set the map prop on the child component
					// @ts-ignore
					return React.cloneElement(child, { map });
				}
			})}
		</>
	);
}
