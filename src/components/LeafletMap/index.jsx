import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import useLocalStorage from "../../hooks/useLocalStorage";
import Card from "../Card";
import Form from "../Form";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const RoutingMachine = dynamic(() => import("./RoutingMachine"), { ssr: false });

export default function LeafletMap({ className, markers = [], waypoints, leading, onMarkerClick } = {}) {
	const tiles = useMemo(
		() => [
			{
				label: "Default",
				value: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			},
			{
				label: "Topografi",
				value: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
			},
		],
		[],
	);
	const [isClient, setIsClient] = useState(false);
	const [selectedTile, setSelectedTile] = useLocalStorage("LEAFLET_TILE_MODE", tiles[0]);
	useEffect(() => {
		delete L.Icon.Default.prototype._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconRetinaUrl: "/img/leaflet/marker-icon-2x.svg",
			iconUrl: "/img/leaflet/marker-icon.svg",
			shadowUrl: "/img/leaflet/marker-shadow.png",
		});
	}, []);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;
	return (
		<Card>
			<Card.Header className="flex items-center gap-4 pb-4">
				{leading}
				<Form.Group className="m-0 ml-auto flex items-center px-4">
					<Form.Label className="m-0 mr-2 text-sm font-normal normal-case">Mode: </Form.Label>
					<Form.HTMLSelect
						className="w-32"
						onChange={(event) =>
							setSelectedTile(() => {
								const value = event.target.value;
								const find = tiles.find((tile) => tile.value === value) ?? tiles[0];

								return find;
							})
						}
						options={tiles}
						value={selectedTile.value}
					/>
				</Form.Group>
			</Card.Header>
			<div id="map-container" className={twMerge(classNames("h-96 overflow-hidden", className))}>
				<MapContainer
					center={[-2.6000285, 118.015776]}
					zoom={5}
					scrollWheelZoom={false}
					className="h-full w-full overflow-hidden"
					style={{ backgroundColor: "#AAD3DF" }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url={selectedTile.value}
					/>
					{markers &&
						markers.map((marker, index) => (
							<Marker
								key={`marker-${index}`}
								eventHandlers={{
									click: () => typeof onMarkerClick === "function" && onMarkerClick(marker),
								}}
								position={[parseFloat(marker.lat), parseFloat(marker.lng)]}
							>
								<Popup keepInView>{marker.name}</Popup>
							</Marker>
						))}
					{waypoints && <RoutingMachine waypoints={waypoints} onMarkerClick={onMarkerClick} />}
				</MapContainer>
			</div>
		</Card>
	);
}
