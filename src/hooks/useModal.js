import useToggle from "./useToggle";
import { INITIAL_TOGGLE_OPTIONS } from "../configs/initial-config";

export default function useModal(options = INITIAL_TOGGLE_OPTIONS) {
	const [show, toggle] = useToggle(false, {
		onOpen: options.onOpen,
		onClose: options.onClose,
	});

	const open = () => toggle(true);
	const close = () => toggle(false);

	return { show, toggle, open, close };
}
