import { Card, CardBody, Heading } from "@chakra-ui/react";
import { NextMatchBox }  from "../Box";

export function NextMatchCard () : JSX.Element {
  return (
    <Card>
      <CardBody>
        <Heading as="h3" variant="h3">Prochain match: </Heading>
        <NextMatchBox/>
      </CardBody>
    </Card>
  );
}