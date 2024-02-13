import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Stack,
} from "@chakra-ui/react";

import { useState } from "react";

import { BrowserView, MobileView } from "react-device-detect";

import Calendar from "react-calendar";

import "./Stats.scss";
import "./Calendar.scss";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Stats = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <BrowserView>
        <h1>Modifiez vos statistiques</h1>
        <div className="stats_main">
          <div className="stats_container">
            <div className="stats_date">
              <div className="stats_date_button">
                <Button colorScheme="teal" size="sm" onClick={onOpen}>
                  Date du match
                </Button>
              </div>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Date</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Calendar
                      onChange={onChange}
                      showWeekNumbers
                      value={value}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      Fermer
                    </Button>
                    <Button colorScheme="teal">Valider</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
            <Divider />
            <div className="stats_teams">
              <h2>Equipes</h2>

              <div className="stats_teams_input_home">
                <Input placeholder="Domicile" size="md" type="search" />
                <FormControl>
                  <NumberInput maxW={20} defaultValue={0} max={50} min={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </div>
              <div className="stats_teams_inputs_away">
                <Input placeholder="Extérieur" size="md" type="search" />
                <FormControl>
                  <NumberInput maxW={20} defaultValue={0} max={50} min={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </div>
            </div>
            <Divider />
            <div className="stats_form">
              <h2>Statistiques</h2>
              <div className="stats_form_left">
                <FormControl isRequired>
                  <FormLabel>Etat de forme</FormLabel>
                  <Select maxW={200} size="sm" placeholder="--Etat de forme--">
                    <option>En forme</option>
                    <option>Absent</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Minutes jouées</FormLabel>
                  <NumberInput
                    maxW={24}
                    defaultValue={90}
                    size="sm"
                    max={120}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>But(s) marqué(s)</FormLabel>
                  <NumberInput
                    maxW={20}
                    defaultValue={0}
                    size="sm"
                    max={120}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </div>
              <div className="stats_form_right">
                <FormControl>
                  <FormLabel>Passe(s) décisive(s)</FormLabel>
                  <NumberInput
                    maxW={20}
                    defaultValue={0}
                    size="sm"
                    max={120}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Carton(s) jaune(s)</FormLabel>
                  <NumberInput
                    maxW={20}
                    defaultValue={0}
                    size="sm"
                    max={2}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Carton rouge</FormLabel>
                  <NumberInput
                    maxW={20}
                    defaultValue={0}
                    size="sm"
                    max={1}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </div>
            </div>
            <Divider />
            <Stack direction="row" spacing={4}>
              <Button
                rightIcon={<CloseIcon />}
                colorScheme="red"
                variant="solid"
              >
                Annuler
              </Button>
              <Button
                rightIcon={<CheckIcon />}
                colorScheme="teal"
                variant="solid"
              >
                Valider
              </Button>
            </Stack>
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <h1>Modifiez vos statistiques</h1>
        <div className="stats_main">
          <div className="mobile_stats_container">
            <div className="mobile_stats_date">
              <div className="mobile_stats_date_button">
                <Button colorScheme="teal" size="sm" onClick={onOpen}>
                  Date du match
                </Button>
              </div>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Date</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Calendar
                      onChange={onChange}
                      showWeekNumbers
                      value={value}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      Fermer
                    </Button>
                    <Button colorScheme="teal">Valider</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
            <Divider />
            <div className="mobile_stats_teams">
              <h2>Equipes</h2>

              <div className="mobile_stats_teams_input_home">
                <Input placeholder="Domicile" size="md" type="search" />
                <FormControl>
                  <NumberInput maxW={20} defaultValue={0} max={50} min={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </div>
              <div className="mobile_stats_teams_inputs_away">
                <Input placeholder="Extérieur" size="md" type="search" />
                <FormControl>
                  <NumberInput maxW={20} defaultValue={0} max={50} min={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </div>
            </div>
            <Divider />
            <div className="mobile_stats_form">
              <h2>Statistiques</h2>
              <div className="mobile_stats_form_both">
                <div className="mobile_stats_form_left">
                  <FormControl isRequired>
                    <FormLabel>Etat de forme</FormLabel>
                    <Select
                      maxW={200}
                      size="sm"
                      placeholder="--Etat de forme--"
                    >
                      <option>En forme</option>
                      <option>Absent</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Minutes jouées</FormLabel>
                    <NumberInput
                      maxW={24}
                      defaultValue={90}
                      size="sm"
                      max={120}
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>But(s) marqué(s)</FormLabel>
                    <NumberInput
                      maxW={20}
                      defaultValue={0}
                      size="sm"
                      max={120}
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </div>
                <div className="mobile_stats_form_right">
                  <FormControl>
                    <FormLabel>Passe(s) décisive(s)</FormLabel>
                    <NumberInput
                      maxW={20}
                      defaultValue={0}
                      size="sm"
                      max={120}
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Carton(s) jaune(s)</FormLabel>
                    <NumberInput
                      maxW={20}
                      defaultValue={0}
                      size="sm"
                      max={2}
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Carton rouge</FormLabel>
                    <NumberInput
                      maxW={20}
                      defaultValue={0}
                      size="sm"
                      max={1}
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </div>
              </div>
            </div>
            <Divider />
            <div className="mobile_buttons">
              <Stack direction="row" spacing={4}>
                <Button
                  rightIcon={<CloseIcon />}
                  colorScheme="red"
                  variant="solid"
                >
                  Annuler
                </Button>
                <Button
                  rightIcon={<CheckIcon />}
                  colorScheme="teal"
                  variant="solid"
                >
                  Valider
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default Stats;
