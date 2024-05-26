import { useEffect, useState } from "react";

const useSessionStorage = (key, initialValue) => {
	const [SS, setSS] = useState(null);
	const [state, setState] = useState(initialValue);

	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(state) : value;
			sessionStorage.setItem(key, JSON.stringify(valueToStore));
			setState(value);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (typeof window === "undefined") return;

		setSS(() => {
			return sessionStorage;
		});

		return () => {
			setSS(null);
		};
	}, []);

	useEffect(() => {
		if (!SS) return;

		const value = SS.getItem(key) ?? null;
		if (!value) SS.setItem(key, JSON.stringify(initialValue));

		setState(value ? JSON.parse(value) : initialValue);
	}, [SS]);

	return [state, setValue];
};

export default useSessionStorage;
