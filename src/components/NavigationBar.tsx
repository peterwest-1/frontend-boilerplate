import { Box, Flex, Heading, Link } from "@chakra-ui/react";

import NextLink from "next/link";
import Authentication from "./Authentication";

const NavigationBar = ({}) => {
  return (
    <Flex zIndex={1} position="sticky" bgColor={"white"} top={0} p={4}>
      <Flex flex={1} m="auto" align="center" maxW={1500}>
        <NextLink href="/">
          <Link>
            <Heading>Frontend Boilerplate</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>
          <Flex marginTop="10px" alignItems="center" padding="5px">
            <Authentication />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavigationBar;
