import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
	const [LS, setLS] = useState(null);
	const [state, setState] = useState(initialValue);

	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(state) : value;
			LS.setItem(key, JSON.stringify(valueToStore));
			setState(value);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (typeof window === "undefined") return;

		setLS(() => {
			return localStorage;
		});

		return () => {
			setLS(null);
		};
	}, []);

	useEffect(() => {
		if (!LS) return;

		const value = LS.getItem(key) ?? null;
		if (!value) LS.setItem(key, JSON.stringify(initialValue));

		setState(value ? JSON.parse(value) : initialValue);
	}, [LS]);

	return [state, setValue];
};

export default useLocalStorage;
