import { Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface LinkButtonProps {
  link: string;
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, children }) => {
  return (
    <NextLink href={link}>
      <Button as={Link} mr={2}>
        {children}
      </Button>
    </NextLink>
  );
};

export default LinkButton;
