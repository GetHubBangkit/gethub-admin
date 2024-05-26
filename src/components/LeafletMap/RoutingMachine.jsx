import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-textpath";

const createRoutineMachineLayer = ({ waypoints, onMarkerClick }) => {
	const instance = L.Routing.control({
		waypoints: waypoints
			.filter((obj, index, self) => index === self.findIndex((t) => t.lat === obj.lat && t.long === obj.long))
			.map((wp) => L.latLng(wp.lat, wp.lng)),
		show: false,
		addWaypoints: false,
		routeWhileDragging: false,
		draggableWaypoints: false,
		fitSelectedRoutes: true,
		showAlternatives: false,
		useZoomParameter: true,
		createMarker: function (i, wp, nWps) {
			const marker = L.marker(wp.latLng);
			marker.addEventListener("click", () => typeof onMarkerClick === "function" && onMarkerClick(waypoints[i]));
			marker.bindTooltip(waypoints[i]["label"], {
				permanent: true,
			});
			return marker;
		},
		routeLine: function (route) {
			const line = L.polyline(route.coordinates);
			// line.setText(" ➡️ ", { repeat: true, attributes: { fill: "red" } });

			return line;
		},
	});

	return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
