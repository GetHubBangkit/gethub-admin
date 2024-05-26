import * as ReactFeather from "react-feather";

export default function Icon({ icon, ...rest }) {
	const Find = ReactFeather[icon] || ReactFeather.AlertCircle;
	return <Find {...rest} />;
}
