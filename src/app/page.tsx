import { type FC } from "react";
import { Paragraph } from "@/ui/atoms";
import { CenteredOnPage } from "@/ui/molecules";

const Home: FC = () => (
	<CenteredOnPage>
		<Paragraph>{":3"}</Paragraph>
	</CenteredOnPage>
);

export default Home;
