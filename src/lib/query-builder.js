export default function queryBuilder(data, accessor, value, delimiter = ",") {
	return data
		.filter(Boolean)
		.map((d) => [d[accessor], d[value]].join(":"))
		.join(delimiter);
}
