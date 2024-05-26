import { useState } from "react";
import classNames from "classnames";
import date from "../../utils/date";
import Card from "../Card";
import Modal from "../Modal";
import useModal from "../../hooks/useModal";
import _ from "underscore";
import Badge from "../Badge";

export default function SuggestionDpoCard({
	name,
	nik,
	placeOfBirth,
	dateOfBirth,
	image,
	records,
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
							<p className="text-base font-normal tracking-wider text-neutral-900">
								<b>NIK</b> : {!_.isEmpty(nik) ? nik : "-"}
							</p>
							<h6
								className={classNames("font-bold text-neutral-900", {
									"text-lg": size === "base",
									"text-xs": size === "xs",
								})}
							>
								{name}
							</h6>
							<p className="text-xs font-normal tracking-wider text-neutral-500">
								{placeOfBirth}
								{!_.isEmpty(dateOfBirth) ? `, ${date.formatToID(dateOfBirth)}` : ""}
							</p>
							<div className="mt-2 inline-flex flex-col space-y-2">
								{Array.isArray(records) &&
									records.map((record, index) => (
										<Badge key={`dpo-${record.id}-${index}`} variant="primary">
											{record.branch_name} - {record.dpo_number}
										</Badge>
									))}
							</div>
						</div>
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
