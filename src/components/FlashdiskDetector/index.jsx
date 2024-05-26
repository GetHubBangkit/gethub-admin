import { useEffect } from "react";

export default function FlashdiskDetector() {
	useEffect(() => {
		const handleConnect = (event) => {
			console.log("Flashdisk terhubung:", event.device.productName);
		};

		const handleDisconnect = (event) => {
			console.log("Flashdisk terputus:", event.device.productName);
		};

		const initFlashdiskDetection = async () => {
			if ("usb" in navigator) {
				navigator.usb
					.getDevices()
					.then((devices) => {
						// Handle devices
						devices.forEach((device) => {
							console.log(device);
						});
					})
					.catch((error) => {
						console.error("Kesalahan saat mendeteksi flashdisk:", error);
					});

				try {
					navigator.usb.addEventListener("connect", handleConnect);
					navigator.usb.addEventListener("disconnect", handleDisconnect);
				} catch (error) {
					console.error("Kesalahan saat mendeteksi flashdisk:", error);
				}
			} else {
				console.error("Browser tidak mendukung navigator.usb API");
			}
		};

		initFlashdiskDetection();

		return () => {
			navigator.usb.removeEventListener("connect", handleConnect);
			navigator.usb.removeEventListener("disconnect", handleDisconnect);
		};
	}, []);

	return (
		<button
			type="button"
			onClick={async () => {
				try {
					await navigator.usb.requestDevice({
						filters: [
							{
								vendorId: 0x046d,
							},
						],
					});
				} catch (e) {
					console.error(e);
				}
			}}
		>
			Connect to USB
		</button>
	);
}
