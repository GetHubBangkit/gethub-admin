import Head from "next/head";

export default function Forbidden() {
	return (
		<>
			<Head>
				<title>Akses Dilarang</title>
			</Head>
			<div className="fixed inset-0 flex items-center justify-center bg-primary-100" style={{ zIndex: 9999 }}>
				<p>
					<span className="text-lg font-bold text-black">Akses Dilarang</span> | Kamu tidak punya izin untuk
					mengakses halaman ini
				</p>
			</div>
		</>
	);
}
