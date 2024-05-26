import Card from "../Card";

export default function Container({ children, className, ...rest }) {
	return (
		<Card className={className} {...rest}>
			<Card.Body>{children}</Card.Body>
		</Card>
	);
}
