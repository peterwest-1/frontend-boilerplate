import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createURQLClient } from "../util/createURQLClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
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
              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name} isRequired>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input {...field} id="email" />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">
                Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createURQLClient)(ForgotPassword);
