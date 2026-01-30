"use client";

import { type FC } from "react";
import { Button, Flex, FullHeight, Loading, Paragraph, Separator } from "@/ui/atoms";
import { List, ListItem, PageHeader } from "@/ui/molecules";
import { apiClient } from "@/ui/providers";
import commonStyles from "@/styles/common.module.scss";

const Visualisation: FC = () => {
	const shelves = apiClient.storage.getAllShelves.useQuery();

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

						{shelves.isLoading && <Loading />}

						<List>
							{shelves.data &&
								shelves.data.map((shelf, index) => (
									<ListItem clickable={false} key={`shelf-${index}`}>
										<Flex direction={"row"} align={"center"} justify={"space-between"} fullWidth>
											<Flex
												direction={"row"}
												align={"center"}
												justify={"center"}
												style={{ width: "fit-content", height: "100%", gap: "1rem" }}
											>
												<Paragraph fontSize={1.5} ellipsisOverflow>
													{shelf.name}
												</Paragraph>

												<Separator direction={"vertical"} style={{ width: "2.5px" }} />

												<Paragraph fontSize={1.25} variant={"secondary"} ellipsisOverflow>
													{shelf.comment}
												</Paragraph>
											</Flex>

											<Flex direction={"row"} align={"center"} style={{ gap: "1rem" }}>
												<Button>
													<Paragraph fontSize={1.5}>{"Edytuj"}</Paragraph>
												</Button>
												<Button>
													<Paragraph fontSize={1.5}>{"Asortyment"}</Paragraph>
												</Button>
											</Flex>
										</Flex>
									</ListItem>
								))}
						</List>
					</Flex>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Visualisation;
