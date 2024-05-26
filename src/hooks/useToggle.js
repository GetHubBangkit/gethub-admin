import { useState } from "react";
import { INITIAL_TOGGLE_OPTIONS } from "../configs/initial-config";

export const useToggle = (initialState = false, options = INITIAL_TOGGLE_OPTIONS) => {
	const [active, setActive] = useState(initialState);
	const toggle = () => {
		return setActive((state) => {
			const currentState = !state;
			if (typeof options.onOpen == "function" && currentState === true) options.onOpen(currentState);
			if (typeof options.onClose == "function" && currentState === false) options.onClose(currentState);

			return currentState;
		});
	};

	return [active, toggle];
};

export default useToggle;
