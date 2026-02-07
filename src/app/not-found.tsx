import { type FC } from "react";
import { Button, Flex, FullHeight, Paragraph } from "@/ui/atoms";
import styles from "./../styles/not-found.module.scss"
import { PageHeader } from "@/ui/molecules";

const NotFound: FC = () => {
  return (
    <FullHeight style={{ width: "100vw", display:"grid", placeItems:"center" }} className={styles["background"]} >
      <Flex direction="column" justify="center" align="center" style={{ gap: "1rem", height: "100%" }} fullWidth>
        <Paragraph fontSize={2.2} className={styles["text"]}>Ups... Najwyraźniej nie ma takiego regału w naszym magazynie</Paragraph>
        <Paragraph variant="secondary" fontSize={1.3} className={styles["text"]}>Sprawdź adres URL, lub pozwól, że przekierujemy cię do strony głównej.</Paragraph>
        <Button style={{width:"20%"}} variant="secondary"><Paragraph fontSize={1}>Przejdź do strony głównej</Paragraph></Button>
      </Flex>
    </FullHeight>
  )
};

export default NotFound;
