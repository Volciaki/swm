"use client";

import { redirect, useParams } from "next/navigation";

const InvalidPutUpAssortment = () => {
	const params = useParams();

	redirect(`/centrum-zarzadzania/wizualizacja/regaly/${params.shelfId as string}/asortymenty`);
};

export default InvalidPutUpAssortment;
