/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  Flex,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getScoutInfos } from "@/Redux-store/Redux-reducers/scout";
import UpdateScoutButton  from "@/components/Button/updateScoutProfil"

const ScoutInfos = () => {
  const id = localStorage.getItem("id");
  const dispatch = useAppDispatch();

  const lastName = useAppSelector((state) => state.scout.lastname);
  const firstName = useAppSelector((state) => state.scout.firstname);
  const club = useAppSelector((state) => state.scout.club);
  const city = useAppSelector((state) => state.scout.city);
  const count = useAppSelector((state) => state.scout.count);

   const [patchValues, setPatchValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    club: "",
    city: "",
  }); 

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getScoutInfos(id));
      setPatchValues({ ...patchValues, firstname: res.payload.firstname });
      patchValues.firstname = res.payload.firstname;
      patchValues.lastname = res.payload.lastname;
      patchValues.email = res.payload.email;
      patchValues.city = res.payload.city;
      patchValues.club = res.payload.club;
    };
    fetchData();
  }, [count]);

  return (
        <div className="sprofil_container">
          <Flex>
            <Avatar
              size="2xl"
              name={lastName}
              src="https://bit.ly/dan-abramov"
            />
            <Box ml="4">
              <div className="scout_box_left">
                <Text fontWeight="bold" fontSize="2xl">
                  {firstName} {lastName}
                </Text>
                <Text fontSize="xl">Recruteur</Text>
                <div className="scout_box_right">
                  <Text fontSize="xl">Ville: {city}</Text>
                  <Text fontSize="xl">Club: {club}</Text>
                </div>
                <UpdateScoutButton />
              </div>
            </Box>
          </Flex>
        </div>
  );
};

export default ScoutInfos;
