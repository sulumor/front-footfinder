import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Radar } from "react-chartjs-2";

import {
  Divider,
  Button,
  Avatar,
  Wrap,
  WrapItem,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import { BrowserView, MobileView } from "react-device-detect";

import { useState } from "react";
import Calendar from "react-calendar";

import "./Player.scss";
import "./Calendar.scss";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

/*
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: void;
}
*/

export const data = {
  labels: [
    "Passes décisives",
    "Buts",
    "Fautes",
    "Cartons jaunes",
    "Cartons rouges",
    "Tacles",
  ],
  datasets: [
    {
      label: "vos statistiques",
      data: [4, 9, 3, 5, 0, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Player = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <BrowserView>
        <div className="player_name">
          <h2>Bonjour, Jean Dupont</h2>
        </div>
        <Center>
          <Divider width="50%" />
        </Center>
        <div className="player_container">
          <div className="player_infos">
            <div className="player_match">
              <h3>Prochain match: </h3>
              <span>Samedi 12 Janvier 2024</span>
              <div className="player_match_infos">
                <h3>RC Lens - Paris Saint Germain</h3>
                <p>Stade Bollaert-Delelis</p>
                <p>Av. Alfred Meas, 62300 Lens</p>
                <div className="player_match_button">
                  <Button colorScheme="teal" onClick={onOpen}>
                    Modifier
                  </Button>
                </div>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      Modifier le match
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Calendar
                        onChange={onChange}
                        showWeekNumbers
                        value={value}
                      />
                      <FormControl>
                        <FormLabel>Equipe à domicile</FormLabel>
                        <Input />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Equipe à l'extérieur</FormLabel>
                        <Input />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="teal" mr={3}>
                        Modifier
                      </Button>
                      <Button onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
            <Divider />
            <div className="player_follow">
              <h3>Je suis suivi par</h3> <span>3 recruteurs:</span>
              <div className="player_follow_pics">
                <Wrap>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                      />
                    </a>
                  </WrapItem>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                    </a>
                  </WrapItem>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                      />
                    </a>
                  </WrapItem>
                </Wrap>
              </div>
            </div>
          </div>
          <Center>
            <Divider orientation="vertical" />
          </Center>
          <div className="player_data">
            <Radar data={data} />
          </div>
        </div>
      </BrowserView>


      <MobileView>
        <div className="player_name">
          <h2>Bonjour, Jean Dupont</h2>
        </div>
        <Center>
          <Divider width="50%" />
        </Center>
        <div className="mobile_player_container">
          <div className="player_infos">
            <div className="player_match">
              <h3>Prochain match: </h3>
              <span>Samedi 12 Janvier 2024</span>
              <div className="player_match_infos">
                <h3>RC Lens - Paris Saint Germain</h3>
                <p>Stade Bollaert-Delelis</p>
                <p>Av. Alfred Meas, 62300 Lens</p>
                <div className="player_match_button">
                  <Button colorScheme="teal" onClick={onOpen}>
                    Modifier
                  </Button>
                </div>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      Modifier le match
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Calendar
                        onChange={onChange}
                        showWeekNumbers
                        value={value}
                      />
                      <FormControl>
                        <FormLabel>Equipe à domicile</FormLabel>
                        <Input />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Equipe à l'extérieur</FormLabel>
                        <Input />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="teal" mr={3}>
                        Modifier
                      </Button>
                      <Button onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
            <Divider />
            <div className="player_follow">
              <h3>Je suis suivi par</h3> <span>3 recruteurs:</span>
              <div className="player_follow_pics">
                <Wrap>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                      />
                    </a>
                  </WrapItem>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                    </a>
                  </WrapItem>
                  <WrapItem>
                    <a href="#">
                      <Avatar
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                      />
                    </a>
                  </WrapItem>
                </Wrap>
              </div>
            </div>
          </div>
          <div className="mobile_player_data">
            <Radar data={data} />
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default Player;
