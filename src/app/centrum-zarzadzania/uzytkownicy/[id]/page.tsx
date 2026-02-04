"use client";

import { redirect, useParams } from "next/navigation";

const User = () => {
	const params = useParams();

	redirect(`/centrum-zarzadzania/uzytkownicy/${params.id as string}/wyswietl`);
};

export default User;
