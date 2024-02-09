import { Container } from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";

import "./Home.scss";

const Home = () => {
  return (
    <>
      <BrowserView>
        <div className="container">
          <div className="container_article">
            <Container>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                optio, aliquid esse sapiente ipsum similique blanditiis
                necessitatibus distinctio ullam debitis! Quaerat, numquam non
                deserunt architecto quae itaque incidunt qui quisquam!
              </p>
            </Container>
          </div>
          <div className="container_article">
            <Container>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis,
                cumque nobis quos, eveniet esse quis vel quibusdam fuga quae
                enim, magnam harum blanditiis accusamus dolore libero ut iste
                illum voluptate.
              </p>
            </Container>
          </div>
          <div className="container_article">
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
      </BrowserView>
      <MobileView>
      <div className="mobile_container">
          <div className="mobile_container_article">
            <Container>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                optio, aliquid esse sapiente ipsum similique blanditiis
                necessitatibus distinctio ullam debitis! Quaerat, numquam non
                deserunt architecto quae itaque incidunt qui quisquam!
              </p>
            </Container>
          </div>
          <div className="mobile_container_article">
            <Container>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis,
                cumque nobis quos, eveniet esse quis vel quibusdam fuga quae
                enim, magnam harum blanditiis accusamus dolore libero ut iste
                illum voluptate.
              </p>
            </Container>
          </div>
          <div className="mobile_container_article">
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
      </MobileView>
    </>
  );
};

export default Home;
