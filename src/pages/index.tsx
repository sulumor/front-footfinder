import { Text, Flex, Heading, Spacer, Box, Card, CardHeader, CardBody } from "@chakra-ui/react";

const HomePage = () => {
    return (
      <Box h="80%" p={10}>
        <Heading as="h1" variant="h1">Bienvenue sur FootFinder</Heading>
        
        <Flex wrap="wrap"  gap="1rem" mt="1.5rem">
          <Flex w="100%" justify="center" align="center" direction="column" mb="1rem" p="2rem">
            <Heading as="h3" variant="h3">Trouvez votre équipe de rêve, bâtissez votre légende</Heading>
            <Text textStyle="mainText">
              Bienvenue sur FootFinder, la plateforme ultime qui réunit passionnés et talents du football. Que vous soyez un recruteur à la recherche de la perle rare ou un joueur désireux de faire entendre son talent, FootFinder est l'endroit où les rêves se concrétisent.
            </Text>
          </Flex>
          <Card w={{base : "100%", md: "45%"}}>
            <CardHeader>
              <Heading as="h2" variant="h2">Pour les recruteurs</Heading>
            </CardHeader>
            <CardBody>
              <Heading as="h3" variant="h3">Découvez l'excellence</Heading>
              <Text textStyle="text">
                Parcourez notre vaste base de données de joueurs exceptionnels, classés selon leurs compétences, leur position sur le terrain et leurs réalisations. Trouvez le joueur qui correspond parfaitement à vos besoins, que vous recherchiez un buteur aguerri, un défenseur intraitable ou un milieu de terrain créatif.
              </Text>
            </CardBody>
          </Card>
          <Spacer/>
          <Card w={{base : "100%", md: "45%"}}>
            <CardHeader>
              <Heading as="h2" variant="h2">Pour les joueurs</Heading>
            </CardHeader>
            <CardBody>
              <Heading as="h3" variant="h3">Faites briller votre talent</Heading>
              <Text textStyle="text">
                Créez votre profil de joueur complet, mettant en valeur vos compétences, votre expérience et vos statistiques. Attirez l'attention des recruteurs grâce à un portfolio professionnel qui reflète votre passion et votre dévouement pour le football.
              </Text>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    )
};

export default HomePage;