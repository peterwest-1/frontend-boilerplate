import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
  children: any;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = "small" }) => {
  return (
    <Box mt={8} mx="auto" maxW={variant === "regular" ? "1000px" : "500px"} w="100%">
      {children}
    </Box>
  );
};
