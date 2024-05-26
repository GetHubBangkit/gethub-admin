import { quotes } from "../configs/quotes";

export default function generateQuote() {
	return quotes[Math.floor(Math.random() * (quotes.length + 1))] ?? "";
}
