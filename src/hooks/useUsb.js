import { useContext } from "react";
import { UsbContext } from "../context/usb";

export default function useUsb() {
	return useContext(UsbContext);
}
