import { type FC } from "react";
import { Button, Flex, FullHeight, Paragraph } from "@/ui/atoms";
import "./../styles/not-found.module.scss"
import { PageHeader } from "@/ui/molecules";

const NotFound: FC = () => {
  return (
    <FullHeight style={{ width: "100vw" }}>
      <Flex direction={"column"} style={{ gap: "1rem", height: "70vh", width: "90%" }} fullWidth>
        <Flex justify="flex-start" align="center" style={{ gap: "1rem", height: "auto", marginLeft: "3rem"}}>
          <Paragraph fontSize={5} style={{textAlign: "center"}}>Error</Paragraph>
          <Paragraph fontSize={10}>404</Paragraph>
        </Flex>
        <Flex justify="flex-end" style={{ gap: "1rem", height: "30%", marginRight: "5rem" }}>
          <Paragraph fontSize={2.2} style={{textWrap:"wrap", width:"30%", textAlign:"center"}}>Ups... Najwyraźniej nie ma takiego regału w naszym magazynie</Paragraph>
        </Flex>
        <Flex justify="center" align="center" direction="column" style={{ gap: "2rem", height: "40%", marginTop: "4rem" }}>
          <Paragraph variant="secondary" fontSize={1.3} style={{width:"20%", textAlign:"center"}}>Sprawdź adres URL, lub pozwól, że przekierujemy cię do strony głównej.</Paragraph>
          <Button style={{width:"20%"}} variant="secondary"><Paragraph fontSize={1}>Przejdź do strony głównej</Paragraph></Button>
        </Flex>
      </Flex>
    </FullHeight>
  )
};

export default NotFound;
