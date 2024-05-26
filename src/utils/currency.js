const currency = {
	formatToID: (amount, option = {}) => Intl.NumberFormat("id", { currency: "IDR", maximumFractionDigits: 0, ...option }).format(amount),
	unformat: (value) => {
		const clearFormating = String(value).replace(/\D/g, "");
		return isNaN(Number.parseFloat(clearFormating)) ? 0 : Number.parseFloat(clearFormating);
	},
	withFormatToID: function (value) {
		const clear = this.unformat(value);
		return this.formatToID(clear);
	},
};

export default currency;
