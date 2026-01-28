"use client";

import { useParams } from "next/navigation";
import { Paragraph } from "@/ui/atoms";

const UsersExisting = () => {
	const params = useParams();

	return <Paragraph>{`użytkownicy isntiejący: ${params.id}`}</Paragraph>;
};

export default UsersExisting;
