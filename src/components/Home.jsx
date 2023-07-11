import React from "react";
import {
  Grid,
  GridItem,
  Text,
  AspectRatio,
  Flex,
  Avatar,
  Box,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";

const Home = () => {
  return (
    // Passing `columns={[2, null, 3]}` and `columns={{sm: 2, md: 3}}`
    // will have the same effect.
    <div>
      <Flex justify={"flex-start"}>
        <div style={{ marginLeft: "100px", marginTop: "100px" }}>
          <Text fontSize="6xl" color="black" as="b">
            Personal Medico
          </Text>
        </div>
      </Flex>
      <Flex>
        <div style={{ marginLeft: "150px" }}>
          <Card background={"#eeeaf4"} width={"900px"} height={"150px"}>
            <Grid
              h="200px"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={1}
            >
              <GridItem
                rowSpan={1}
                colSpan={3}
                textAlign={"left"}
                padding={"10px"}
              >
                {" "}
                <Text as="b">Medico Clinico:</Text> Sanchez, Juan{" "}
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}></GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <div style={{ marginLeft: "50px", marginTop: "50px" }}>
                  <Avatar
                    name="Sanchez, Juan"
                    src="https://bit.ly/santiago-suarez"
                    size={"xl"}
                  />
                </div>
              </GridItem>
              <GridItem
                rowSpan={2}
                colSpan={3}
                textAlign={"left"}
                padding={"10px"}
              >
                {" "}
                <Text as="b">M.P. :</Text>41143{" "}
              </GridItem>
            </Grid>

            {/* <Flex>Medico Clinico: Sanchez, Juan</Flex>
            <Flex>M.P. : 41143</Flex>
            <Flex justify={"flex-end"}>
              <Avatar
                name="Sanchez, Juan"
                src="https://bit.ly/santiago-suarez"
                justify={"flex-end"}
              />
            </Flex> */}
          </Card>
        </div>
      </Flex>
    </div>
  );
};

export default Home;
