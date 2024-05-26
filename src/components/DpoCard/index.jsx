import { useState } from "react";
import classNames from "classnames";
import date from "../../utils/date";
import Card from "../Card";
import Modal from "../Modal";
import useModal from "../../hooks/useModal";

export default function DpoCard({
	serialNumber,
	name,
	nik,
	placeOfBirth,
	dateOfBirth,
	image,
	info,
	branch,
	size = "base",
	onClick,
	...rest
} = {}) {
	const [preview, setPreview] = useState();
	const { show: showPreview, toggle: togglePreview } = useModal({
		onClose: () => setPreview(""),
	});

	return (
		<>
			<Card variant="outline-dark" className="cursor-pointer transition-transform active:scale-95" {...rest}>
				<Card.Body className="flex flex-col gap-1 md:flex-row md:gap-4">
					<div
						className={classNames("shrink-0", {
							"h-16 w-16 md:h-24 md:w-24": size === "base",
							"h-8 w-8 md:h-12 md:w-12": size === "xs",
						})}
					>
						<img
							src={image}
							onClick={() => {
								setPreview(image);
								togglePreview();
							}}
							onError={(event) =>
								(event.target.src = "https://ui-avatars.com/api/?name=DPO&background=E6EDEC")
							}
							alt="dpo image"
							className="h-full w-full object-cover"
						/>
					</div>
					<div
						onClick={() => typeof onClick === "function" && onClick()}
						className={classNames("flex grow", {
							"flex-col": size === "base",
							"flex-row": size === "base",
						})}
					>
						<div className="block grow">
							<div className={classNames(size === "base" ? "mb-2" : "mb-1")}>
								<p className="text-xs font-bold tracking-wider text-neutral-900">{branch}</p>
								<p className="text-xs font-normal tracking-wider text-neutral-500">{serialNumber}</p>
							</div>
							<h6
								className={classNames("font-bold text-neutral-900", {
									"text-lg": size === "base",
									"text-xs": size === "xs",
								})}
							>
								{name}
							</h6>
							<p className="text-xs font-normal tracking-wider text-neutral-500">{nik}</p>
							<p className="text-xs font-normal tracking-wider text-neutral-500">
								{placeOfBirth} {dateOfBirth ? ", " + date.formatToID(dateOfBirth) : ""}
							</p>
						</div>
						<p
							className={classNames("mt-auto", {
								"pt-4": size === "base",
								"pt-1 text-xs": size === "xs",
							})}
						>
							{info}
						</p>
					</div>
				</Card.Body>
			</Card>
			<Modal
				title="Preview Foto"
				show={showPreview}
				handler={togglePreview}
				content={
					<img
						src={preview}
						onError={(event) =>
							(event.target.src = "https://ui-avatars.com/api/?name=DPO&background=E6EDEC")
						}
						alt="dpo image"
						className="h-full w-full object-cover"
					/>
				}
			/>
		</>
	);
}
