import { Button, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
interface AuthenticationProps {}

const Authentication: React.FC<AuthenticationProps> = ({}) => {
  const router = useRouter();

  const [{ data, fetching, error }] = useMeQuery();
  const [{}, logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };
  if (fetching) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div>
        <p>{error.name}</p>
      </div>
    );
  }
  if (data?.me) {
    return (
      <Flex border="1px" borderColor="gray.200" padding="5px" borderRadius="10px" alignItems="center">
        <Text marginRight="10px">{data?.me.email}</Text>
        <Button onClick={handleLogout}>Logout</Button>
      </Flex>
    );
  }
  return (
    <div>
      <NextLink href="/login">
        <Button as={Link} mr={2}>
          Login
        </Button>
      </NextLink>
      <NextLink href="/register">
        <Button as={Link} mr={2}>
          Register
        </Button>
      </NextLink>
    </div>
  );
};

export default Authentication;
