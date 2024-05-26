import useUser from "./useUser";
import { useEffect, useState } from "react";
import MyAxios from "../lib/my-axios";
import queryBuilder from "../lib/query-builder";
import { ForbiddenError } from "../configs/exception";
import { toastAlert } from "../lib/sweetalert";
import useModal from "./useModal";
import useForm from "./useForm";

export default function useDatatable(url, options = {}) {
	const { logout } = useUser();

	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [sortBy, setSortBy] = useState({});
	const [prevSortBy, setPrevSortBy] = useState({});
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [reload, setReload] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [totalData, setTotalData] = useState(0);
	const [error, setError] = useState(null);

	const { form: filter, inputHandler: filterInputHandler, setForm: setFilter, reset: resetFilter } = useForm({});
	const { show: filtersShow, toggle: toggleFilters } = useModal();

	function refresh() {
		setReload(Math.random());
	}

	function canNext() {
		return pageIndex + 1 < pageCount;
	}

	function canPrev() {
		return pageIndex > 0;
	}

	function next() {
		if (canNext() === false) return;
		setPageIndex((state) => state + 1);
	}

	function previous() {
		if (canPrev() === false) return;
		setPageIndex((state) => state - 1);
	}

	function gotoPage(page) {
		setPageIndex(page);
	}

	function getSortBy(key) {
		return sortBy[key] ?? null;
	}

	function toggleSortBy(key) {
		setSortBy((state) => {
			const previousState = prevSortBy[key] ?? null;
			if (previousState && previousState === "desc") {
				setPrevSortBy({});
				return {};
			}

			const newState = { [key]: previousState ? "desc" : "asc" };
			setPrevSortBy({ ...newState });
			return { ...newState };
		});
	}

	async function fetchData({ filter, pageIndex, pageSize, sortBy }) {
		try {
			setIsLoading(true);
			setError(null);

			const isUseExactFilters = options?.useExactMatch
				? new Set(
						[...Object.entries(filter).map(([key, _]) => key)].filter((i) =>
							new Set([...options?.useExactMatch]).has(i),
						),
				  )
				: [];
			const includeFilters = options?.includeFilters ?? [];
			const query = {
				page: pageIndex + 1,
				limit: pageSize,
				criteria: queryBuilder(
					[
						...Object.entries(filter)
							.filter(([_, value]) => value)
							.map(([key, value]) => ({ key, value: String(value).trim() })),
						...includeFilters,
					],
					"key",
					"value",
				),
				exactmatch: Boolean([...isUseExactFilters].length),
				sortBy:
					Object.keys(sortBy).length < 1
						? options?.defaultSortBy
							? Object.entries(options?.defaultSortBy).at(0).join(":")
							: "created_at:desc"
						: Object.entries(sortBy).at(0).join(":"),
				...(options?.params ?? {}),
			};

			const request = await MyAxios({
				method: "GET",
				url: url,
				params: query,
			});

			const response = await request.data;

			const finalData =
				options?.transformResponse && typeof options.transformResponse == "function"
					? response.data.map((data) => options.transformResponse(data))
					: response.data;

			setData(finalData);
			setTotalData(response.total_data);
			setPageCount(Math.ceil(response.total_data / pageSize));

			options?.onLoad && typeof options.onLoad == "function" && options.onLoad(finalData);
		} catch (error) {
			console.error("Datatable Error: ", error);
			setData([]);
			setPageCount(0);
			setError(error.message);

			if (error instanceof ForbiddenError) {
				toastAlert.error(error.message);
				return await logout();
			}
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		window.addEventListener("datatable:refresh", refresh);

		return () => {
			window.removeEventListener("datatable:refresh", refresh, true);
		};
	}, []);

	return {
		data,
		filter,
		pageIndex,
		pageSize,
		sortBy,
		isLoading,
		reload,
		totalData,
		pageCount,
		error,
		refresh,
		fetchData,
		setData,
		setPageSize,
		setPageIndex,
		setFilter,
		setSortBy,
		filterInputHandler,
		getSortBy,
		toggleSortBy,
		next,
		previous,
		gotoPage,
		filtersShow,
		filterCount: Object.entries(filter).filter(([_, key]) => key).length,
		toggleFilters,
		resetFilter,
	};
}
