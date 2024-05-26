export default function paginationBuilder(current, total) {
	let startPage, endPage;

	if (total <= 5) {
		startPage = 1;
		endPage = total;
	} else {
		let maxPagesBeforeCurrentPage = 3;
		let maxPagesAfterCurrentPage = 3;

		if (current + 1 <= maxPagesBeforeCurrentPage) {
			startPage = 1;
			endPage = 4;
		} else if (current + 1 + maxPagesAfterCurrentPage >= total) {
			startPage = total - 4;
			endPage = total;
		} else {
			startPage = current + 1 - maxPagesBeforeCurrentPage;
			endPage = current + 1 + maxPagesAfterCurrentPage;
		}
	}

	return Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);
}
