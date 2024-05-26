export default {
	capitalizeFirstLetter: (str = "") => {
		if (str.length === 0) return str;
		return String(str[0]).toUpperCase() + String(str).substring(1);
	},
	parsePhoneNumber: (str) => {
		const regex = new RegExp(/[^\d]/);
		const sanitize = String(str).replace(regex, "");

		if (sanitize.substring(3) === "+62") return "62" + sanitize.substring(0, 3);
		return sanitize;
	},
};
