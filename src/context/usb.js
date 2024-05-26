import _ from "underscore";
import { useRouter } from "next/router";
import { createContext, useEffect, useMemo, useState } from "react";
import useUser from "../hooks/useUser";

export const UsbContext = createContext();

export function useUsbProvider() {
	const router = useRouter();
	const { user, isUserLoading } = useUser();

	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [device, setDevice] = useState(null);

	const BYPASS_PATHNAME = useMemo(() => ["/login"], []);
	const REDIRECT_TO = useMemo(() => "/lost-connection", []);

	const [allowedDevices, setAllowedDevices] = useState([
		{
			deviceId: 591,
		},
	]);

	function serialize(devices) {
		if (!devices) return null;
		return _.pick(devices, ["productName", "vendorId", "productId", "serialNumber"]);
	}

	function disconnectDevice() {
		setDevice(null);
	}

	async function requestConnection(callback = null) {
		try {
			const devices = await navigator.usb.requestDevice({
				filters: [],
			});

			const serialized = serialize(devices);

			setDevice(serialized);
			setIsConnected(true);
			if (typeof callback === "function") callback(serialized);
		} catch (error) {
			setError(error);
			setDevice(null);
			setIsConnected(false);
			console.error("Error getting USB devices:", error);
		}
	}

	useEffect(() => {
		if ([isPending, isUserLoading].some((item) => item === true)) return;

		const handleConnect = (event) => {
			if (user?.is_logged_in === true && event.device.productId == user?.device_id) {
				setIsConnected(true);
				setDevice(serialize(event.device));

				if (router.pathname === REDIRECT_TO && !BYPASS_PATHNAME.includes(router.pathname)) router.push("/");
			}

			console.log("Device terhubung:", event.device.productName);
		};

		const handleDisconnect = (event) => {
			if (user?.is_logged_in === true && event.device.productId == user?.device_id) {
				setIsConnected(false);
				setDevice(null);

				if (router.pathname !== REDIRECT_TO && !BYPASS_PATHNAME.includes(router.pathname))
					router.push(REDIRECT_TO);
			}

			console.log("Device terputus:", event.device.productName);
		};

		const initDeviceDetection = async () => {
			if ("usb" in navigator) {
				try {
					navigator.usb.addEventListener("connect", handleConnect);
					navigator.usb.addEventListener("disconnect", handleDisconnect);
				} catch (error) {
					setError(error);
					console.error("Kesalahan saat mendeteksi device:", error);
				}
			} else {
				console.error("Browser tidak mendukung navigator.usb API");
			}
		};

		initDeviceDetection();

		return () => {
			navigator.usb.removeEventListener("connect", handleConnect);
			navigator.usb.removeEventListener("disconnect", handleDisconnect);
		};
	}, [device, isPending, user, isUserLoading, router]);

	useEffect(() => {
		if ([isUserLoading].some((item) => item === true)) return;

		const initPairedDevice = async () => {
			if ("usb" in navigator) {
				try {
					const devices = await navigator.usb.getDevices();
					devices.forEach((device) => {
						if (device.productId == user?.device_id) {
							setDevice(serialize(device));
							setIsConnected(true);
						}
					});

					setIsPending(false);
				} catch (error) {
					setError(error);
					console.error("Kesalahan saat mendeteksi device:", error);
				}
			} else {
				console.error("Browser tidak mendukung navigator.usb API");
			}
		};

		initPairedDevice();
	}, [isUserLoading]);

	return {
		device,
		setDevice,
		requestConnection,
		disconnectDevice,
		error,
		isConnected,
		isPending,
	};
}

export default function UsbProvider({ children }) {
	const usbDevice = useUsbProvider();
	return <UsbContext.Provider value={usbDevice}>{children}</UsbContext.Provider>;
}
