import resolveConfig from "tailwindcss/resolveConfig";
import twConfig from "../../tailwind.config.js";

const config = resolveConfig(twConfig);

const {
	theme: { colors },
} = config;

export default colors;
