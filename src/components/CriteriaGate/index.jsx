export default function CriteriaGate({ children, criteria }) {
	if (Boolean(criteria) === false) return null;
	return children;
}
