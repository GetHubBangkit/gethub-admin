export default function Footer() {
	return (
		<div className="mt-4 flex h-12 w-full items-center justify-between self-end">
			<div className="mt-4 block">
				<p className="text-sm font-medium text-neutral-900">
					<b>{process.env.NEXT_PUBLIC_APP_NAME}</b> &copy; {new Date().getFullYear()}
				</p>
			</div>
			<div className="mt-4 block">
				<p className="text-sm font-medium text-neutral-900">v{process.env.APP_VERSION}</p>
			</div>
		</div>
	);
}
