import { Ring } from "@uiball/loaders";
import colors from "../../configs/theme";

export default function Loader(props) {
	return <Ring size={25} color={colors.primary[500]} {...props} />;
}
