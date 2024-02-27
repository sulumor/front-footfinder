import { Container } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";

import "./Home.scss";

const Home = () => {
  return (
        <div className={isMobile ? "mobile_container" : "container"}>
          <div className={isMobile ? "mobile_container_article" : "container_article"}>
            <h1>Bienvenue sur FootFinder</h1>
            <h3>Trouvez votre équipe de rêve, bâtissez votre légende</h3>
            <Container>
              <p>
                Bienvenue sur FootFinder, la plateforme ultime qui réunit passionnés et talents du football. Que vous soyez un recruteur à la recherche de la perle rare ou un joueur désireux de faire entendre son talent, FootFinder est l'endroit où les rêves se concrétisent.
              </p>
            </Container>
          </div>
          <div className={isMobile ? "mobile_container_duo" : "container_duo"}>
          <div className={isMobile ? "mobile_container_article_left" : "container_article_left"}>
            <h2>Pour les recruteurs</h2>
            <h3>Découvez l'excellence</h3>
            <Container>
              <p>
              Parcourez notre vaste base de données de joueurs exceptionnels, classés selon leurs compétences, leur position sur le terrain et leurs réalisations. Trouvez le joueur qui correspond parfaitement à vos besoins, que vous recherchiez un buteur aguerri, un défenseur intraitable ou un milieu de terrain créatif.
              </p>
            </Container>
          </div>
          <div className={isMobile ? "mobile_container_article_right" : "container_article_right"}>
              <h2>Pour les joueurs</h2>
              <h3>Faites briller votre talent</h3>
            <Container>
              <p>
              Créez votre profil de joueur complet, mettant en valeur vos compétences, votre expérience et vos statistiques. Attirez l'attention des recruteurs grâce à un portfolio professionnel qui reflète votre passion et votre dévouement pour le football.
              </p>
            </Container>
          </div>
          </div>
        </div>
  );
};

export default Home;
