export default {
	formatToID: (date, option = { dateStyle: "long" }) =>
		date ? Intl.DateTimeFormat("id-ID", option).format(new Date(date)) : "",
	formatToInput: (date) => (date ? date.split("T")[0] : ""),
	formatToInputTz: (date) => {
		const dt = date ? new Date(date) : new Date();
		return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(
			2,
			"0",
		)}`;
	},
	different: (a, b) => {
		const NUM_OF_DAYS = 1000 * 3600 * 24;

		const differentInTime =
			new Date(new Date(b).setHours(0, 0, 0, 0)).getTime() - new Date(new Date(a).setHours(0, 0, 0, 0)).getTime();
		const differentInDays = Math.ceil(differentInTime / NUM_OF_DAYS);

		return differentInDays;
	},
	getFirstDayCurrentMonth: () => {
		var date = new Date();
		return new Date(date.getFullYear(), date.getMonth(), 1);
	},
	getLastDayCurrentMonth: () => {
		var date = new Date();
		return new Date(date.getFullYear(), date.getMonth() + 1, 0);
	},
};
