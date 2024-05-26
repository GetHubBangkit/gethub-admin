import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useState } from "react";
import Loader from "../Loader";

const center = { lat: -1.6000285, lng: 118.015776 };
const containerStyle = {
	width: "100%",
	height: "100%",
};

export function GMaps({ markers, onMarkerClick, waypoints }) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	const [map, setMap] = useState(null);
	const [direction, setDirection] = useState(null);

	const onLoad = useCallback(function callback(map) {
		map.setCenter(center);
		setMap(map);
	}, []);
	const onUnmount = useCallback(() => setMap(null), []);

	useEffect(() => {
		if (!waypoints || !isLoaded) return;
		const directionsService = new google.maps.DirectionsService();

		const origin = waypoints.at(0);
		const destination = waypoints.at(-1);

		directionsService.route(
			{
				origin: origin,
				destination: destination,
				travelMode: google.maps.TravelMode.DRIVING,
				waypoints: waypoints.map((waypoint) => ({ location: waypoint })),
			},
			(result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					console.log(result);
					setDirection(result);
				} else {
					console.error(result);
					console.error(`error fetching directions ${result}`);
				}
			},
		);
	}, [waypoints, isLoaded]);

	if (!isLoaded)
		return (
			<div className="flex items-center justify-center">
				<Loader />
			</div>
		);
	return (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5} onLoad={onLoad} onUnmount={onUnmount}>
			{markers &&
				markers.map((marker, index) => (
					<Marker
						key={`maps-marker-${index}`}
						position={{ lat: marker.lat, lng: marker.lng }}
						onClick={() => typeof onMarkerClick === "function" && onMarkerClick(marker)}
						icon="/img/gmaps/marker.png"
					/>
				))}
			{direction && <DirectionsRenderer directions={direction} />}
		</GoogleMap>
	);
}

export default memo(GMaps);
