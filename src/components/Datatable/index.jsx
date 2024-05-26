import { useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import InputFilter from "./InputFilter";
import Table from "../Table";
import Pagination from "../Pagination";
import Form from "../Form";
import Loader from "../Loader";
import paginationBuilder from "../../lib/pagination-builder";
import useForm from "../../hooks/useForm";
import useDebounce from "../../hooks/useDebounce";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export default function Datatable({
	columns,
	data,
	filter,
	fetchData,
	pageIndex,
	pageSize,
	pageCount,
	totalData,
	sortBy,
	reload,
	isLoading,
	error,
	setPageSize,
	setPageIndex,
	setFilter,
	setSortBy,
	filterInputHandler,
	getSortBy,
	toggleSortBy,
	previous,
	next,
	gotoPage,
}) {
	const debounceFormValue = useDebounce(filter, 250);

	function renderCell(column, row, index) {
		try {
			const { accessor } = column;

			let value = row[accessor];
			if (typeof accessor === "function") value = accessor(row, index);
			if (typeof accessor === "string" && accessor.split(".").length > 1) {
				accessor.split(".").forEach((key, index) => {
					if (index === 0) value = row[key];
					else value = value[key] ?? "";
				});
			}

			if (typeof column.cell !== "undefined") return column.cell(value, row, index);
			return value;
		} catch (error) {
			return error.message;
		}
	}

	function renderSortBy(column) {
		if (typeof column["accessor"] === "function") return null;
		const key = typeof column.sortKey === "undefined" ? column["accessor"] : column["sortKey"];
		const isSorted = getSortBy(key);

		if (isSorted === null) return <ArrowsUpDownIcon className="ml-2 h-4 w-4" />;
		if (isSorted === "desc") return <ArrowUpIcon className="ml-2 h-4 w-4" />;
		if (isSorted === "asc") return <ArrowDownIcon className="ml-2 h-4 w-4" />;
	}

	function renderFilter(column) {
		if (typeof column["accessor"] === "function") return null;
		const accessor = typeof column.filterKey === "undefined" ? column["accessor"] : column["filterKey"];

		if (typeof column["filter"] !== "undefined")
			return column["filter"]({
				column,
				accessor,
				value: filter[accessor],
				handler: filterInputHandler,
				setFilter: setFilter,
			});
		return (
			<InputFilter
				type={column.filterInputType ?? "text"}
				name={accessor}
				onChange={filterInputHandler}
				value={filter[accessor]}
			/>
		);
	}

	useEffect(() => {
		fetchData({ filter: debounceFormValue, pageIndex, pageSize, sortBy });
	}, [reload, pageIndex, pageSize, sortBy, debounceFormValue]);

	return (
		<>
			<div className="flex">
				<Form.Group className="flex items-center gap-1">
					<Form.Label>Tampilkan: </Form.Label>
					<Form.HTMLSelect
						className="w-20 px-2 py-1"
						withEmptyState={false}
						onChange={(event) => {
							setPageSize(event.target.value);
							setPageIndex(0);
						}}
						value={pageSize}
						options={[10, 20, 50, 100].map((item) => ({ label: item, value: item }))}
						disableAutoSelect
					/>
					<Form.Label>data</Form.Label>
				</Form.Group>
			</div>
			<div className="mb-4 block max-w-full overflow-x-auto">
				<Table strip>
					<Table.Head>
						<Table.TR>
							{columns.map((column, index) => (
								<Table.TH
									key={`table-head-${index}`}
									className={twMerge(
										classNames(
											!column?.disableSort &&
												typeof column["accessor"] === "string" &&
												"cursor-pointer",
											column?.className ?? "",
										),
									)}
								>
									<span
										className="flex items-center justify-between"
										onClick={() => {
											if (typeof column["accessor"] === "function" || column?.disableSort) return;
											const accessor =
												typeof column.sortKey === "undefined"
													? column["accessor"]
													: column["sortKey"];

											toggleSortBy(accessor);
										}}
									>
										{column.label}
										{!column?.disableSort && renderSortBy(column)}
									</span>
								</Table.TH>
							))}
						</Table.TR>
					</Table.Head>
					<Table.Body>
						{!isLoading &&
							!error &&
							Array.isArray(data) &&
							data.map((row, dataIndex) => {
								return (
									<Table.TR key={`table-row-${dataIndex}`}>
										{columns.map((column, cellIndex) => (
											<Table.TD key={`table-cell-${cellIndex}`}>
												{renderCell(column, row, dataIndex)}
											</Table.TD>
										))}
									</Table.TR>
								);
							})}
						{isLoading && (
							<Table.TR>
								<Table.TD colSpan={999} className="text-center font-medium">
									<div className="flex justify-center">
										<Loader />
									</div>
								</Table.TD>
							</Table.TR>
						)}
						{!isLoading && error && (
							<Table.TR>
								<Table.TD colSpan={999} className="text-center font-medium">
									Terjadi kesalahan saat memuat data:{" "}
									<span className="font-bold text-danger-500">{error}</span>
								</Table.TD>
							</Table.TR>
						)}
						{!isLoading && !error && Array.isArray(data) && data.length < 1 && (
							<Table.TR>
								<Table.TD colSpan={999} className="text-center font-medium">
									Tidak ditemukan data
								</Table.TD>
							</Table.TR>
						)}
					</Table.Body>
				</Table>
			</div>
			<div className="flex flex-col justify-between gap-6 md:flex-row">
				<Pagination
					items={paginationBuilder(pageIndex, pageCount)}
					current={pageIndex}
					prevPageHandler={previous}
					nextPageHandler={next}
					handler={gotoPage}
				/>
				<p className="block text-sm text-gray-900 md:text-sm">
					Menampilkan {pageIndex + 1 == pageCount ? totalData : data.length * (pageIndex + 1)} dari{" "}
					{totalData} data
				</p>
			</div>
		</>
	);
}
