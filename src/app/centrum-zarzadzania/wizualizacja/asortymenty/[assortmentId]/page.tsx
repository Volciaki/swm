"use client";

import { redirect, useParams } from "next/navigation";

const Assortment = () => {
	const params = useParams();

	redirect(`/centrum-zarzadzania/wizualizacja/asortymenty/${params.assortmentId as string}/wyswietl`);
};

export default Assortment;
