import { type FC } from "react";
import { Loading, Paragraph } from "@/ui/atoms";

const Home: FC = () => (
	<>
		<Loading />

		<Paragraph>{":3"}</Paragraph>
	</>
);

export default Home;
