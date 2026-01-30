import { type FC } from "react";
import { Button, Flex, FullHeight, Paragraph, Separator } from "@/ui/atoms";
import { List, ListItem, PageHeader } from "@/ui/molecules";
import commonStyles from "@/styles/common.module.scss";
import { apiClient } from "@/ui/providers";

const Visualisation: FC = () => {
	// const shelves = apiClient.storage.

	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Wizualizacja magazynu"}
					description={
						"Przeglądaj, twórz i edytuj regały. Istnieje również możliwość importowania regałów z pliku CSV."
					}
				/>

				<Flex direction={"column"} className={commonStyles["form-container"]} fullWidth>
					<Flex direction={"row"} fullWidth>
						<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
							<Paragraph fontSize={1.75}>{"Importuj regały z pliku CSV"}</Paragraph>

							<Button>
								<Paragraph fontSize={1.5} style={{ marginInline: "20px" }}>
									{"Importuj"}
								</Paragraph>
							</Button>
						</Flex>

						<Separator direction={"vertical"} />

						<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
							<Paragraph fontSize={1.75}>{"Ręcznie dodaj nowy regał"}</Paragraph>

							<Button>
								<Paragraph fontSize={1.5} style={{ marginInline: "20px" }}>
									{"Dodaj"}
								</Paragraph>
							</Button>
						</Flex>
					</Flex>

					<Separator />

					<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }}>
						<Paragraph>{"Lista regałów"}</Paragraph>

						{/*
						<List>
							{}
						</List>
						*/}
					</Flex>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Visualisation;
