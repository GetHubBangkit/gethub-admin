import { useState } from "react";

export default function useFormWizard(steps) {
	const [index, setIndex] = useState(0);

	function next() {
		setIndex((state) => {
			if (state + 1 > steps.length) return state;
			return state + 1;
		});
	}

	function prev() {
		setIndex((state) => {
			if (state - 1 < 0) return state;
			return state - 1;
		});
	}

	function goto(i) {
		setIndex((state) => {
			if (i < 0 || i > steps.length) return state;
			return i;
		});
	}

	return {
		current: steps[index],
		index,
		canNext: index < steps.length - 1,
		canPrev: index > 0,
		isLastStep: index === steps.length - 1,
		next,
		prev,
		goto,
	};
}
