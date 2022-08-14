import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createURQLClient } from "../util/createURQLClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Heading mb={5}>Forgot Password</Heading>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>If an account with that email exists, we will send it an email</Box>
          ) : (
            <Form>
              <InputField label="Email" name="email" type={"email"} />
              <Flex>
                <Spacer />
                <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">
                  Submit
                </Button>
              </Flex>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createURQLClient)(ForgotPassword);
