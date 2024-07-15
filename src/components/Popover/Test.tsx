import { Button, Divider, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/react";

export function TestPopover(): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger>
        <Button w={{ base: "50%", md: "20%" }} variant="black">Voir compte de tests</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Identifiants pour les tests</PopoverHeader>
        <PopoverBody>
          <Text>Joueur : </Text>
          <Text>email: jean.dujardin@mail.io <br />
            password: yjjk8E676a9JQZ!</Text>
          <Divider m={3} />
          <Text>Recruteur : </Text>
          <Text>email: nicolas.dupon@mail.io <br />
            password: X346Dc5V7kfYmv!</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover >
  )
}