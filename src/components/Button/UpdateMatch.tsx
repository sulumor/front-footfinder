import {
  Box, Button, Divider, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Spacer, useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { formatDate } from "@/utils/functions";
import { Match } from "@/@Types";
import crud from "@/utils/crud";
import { useAuth } from "@/context/Auth";

function UpdateMatch({ match }: { match:Match }) {  
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  


  

  return (
    <>
      <Button colorScheme="red" textAlign="center" onClick={onOpen}>
        Modifier
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modifier les statistiques</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <h3>{formatDate(match?.date)}</h3>
              <Divider m={2} />
              <h3>Score</h3>
              <FormControl mt={2}>
                <Flex gap={2}>
                  <Box>
                    <FormLabel>{match?.home.club_name}</FormLabel>
                    <NumberInput min={0} defaultValue={patchValues.scoreHome} onChange={(e) => handleChangeField("scoreHome")(e)}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  <Box>
                    <FormLabel>{match?.away.club_name}</FormLabel>
                    <NumberInput min={0} defaultValue={patchValues.scoreAway} onChange={(e) => handleChangeField("scoreAway")(e)}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Flex>
              </FormControl>
              <FormControl isRequired mt={2}>
                <Flex w="100%">
                  <Box>
                    <FormLabel>Etat de forme</FormLabel>
                    <Select
                      maxW={200}
                      size="sm"
                      placeholder="--Etat de forme--"
                      value={patchValues.fitness}
                      onChange={(e) => handleChangeField("fitness")(e.target.value)}
                    >
                      <option>En forme</option>
                      <option>absent</option>
                      <option>blesse</option>
                    </Select>
                  </Box>
                  <Spacer />
                  <Box>
                    <FormLabel>Minutes jouées</FormLabel>
                    <NumberInput min={0} step={5} defaultValue={patchValues.minutes_played} onChange={(e) => handleChangeField("minutes_played")(e)}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Flex>

              </FormControl>

              <FormControl mt={2}>
                <Flex gap={2}>
                  <Box>
                    <FormLabel>Carton(s) jaune(s)</FormLabel>
                    <NumberInput min={0} max={2} defaultValue={patchValues.yellow_card} onChange={(e) => handleChangeField("yellow_card")(e)}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  <Spacer />
                  <Box>
                    <FormLabel>Carton rouge</FormLabel>
                    <NumberInput min={0} max={1} defaultValue={patchValues.red_card} onChange={(e) => handleChangeField("red_card")(e)}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Flex>
              </FormControl>
              {position === "Gardien" ? (
                <FormControl mt={2}>
                  <Flex gap={2}>
                    <Box>
                      <FormLabel>But(s) encaissé(s)</FormLabel>
                      <NumberInput min={0} defaultValue={patchValues.goals_conceded} onChange={(e) => handleChangeField("goals_conceded")(e)}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Box>
                    <Box>
                      <FormLabel>Arrêt(s)</FormLabel>
                      <NumberInput min={0} defaultValue={patchValues.stops} onChange={(e) => handleChangeField("stops")(e)}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Box>
                  </Flex>
                </FormControl>
              )
                : (
                  <FormControl mt={2}>
                    <Flex gap={2}>
                      <Box>
                        <FormLabel>But(s) marqué(s)</FormLabel>
                        <NumberInput min={0} defaultValue={patchValues.goals_scored} onChange={(e) => handleChangeField("goals_scored")(e)}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                      <Spacer />
                      <Box>
                        <FormLabel>Passe(s) décisive(s)</FormLabel>
                        <NumberInput min={0} defaultValue={patchValues.assists} onChange={(e) => handleChangeField("assists")(e)}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                    </Flex>
                  </FormControl>
                )}
            </ModalBody>
            <ModalFooter>
              <Button rightIcon={<CheckIcon />} colorScheme="teal" variant="solid" mr={3} onClick={handleSubmit}>Valider</Button>
              <Button rightIcon={<CloseIcon />} onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>

  );
}

export default UpdateMatch;
