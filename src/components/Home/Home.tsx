import { Container } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";

import "./Home.scss";

const Home = () => {
  return (
        <div className={isMobile ? "mobile_container" : "container"}>
          <div className={isMobile ? "mobile_container_article" : "container_article"}>
            <Container>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                optio, aliquid esse sapiente ipsum similique blanditiis
                necessitatibus distinctio ullam debitis! Quaerat, numquam non
                deserunt architecto quae itaque incidunt qui quisquam!
              </p>
            </Container>
          </div>
          <div className={isMobile ? "mobile_container_article" : "container_article"}>
            <Container>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis,
                cumque nobis quos, eveniet esse quis vel quibusdam fuga quae
                enim, magnam harum blanditiis accusamus dolore libero ut iste
                illum voluptate.
              </p>
            </Container>
          </div>
          <div className={isMobile ? "mobile_container_article" : "container_article"}>
            <Container>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                cum consectetur reiciendis sunt at eius maiores temporibus,
                commodi quasi aperiam? Placeat vitae commodi autem iusto eos
                minus quia, libero voluptate.
              </p>
            </Container>
          </div>
        </div>
  );
};

export default Home;
