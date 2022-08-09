import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import PasswordInput from "../components/PasswordInput";

import { Wrapper } from "../components/Wrapper";
import { AuthenticationInput, useRegisterMutation } from "../generated/graphql";
import { createURQLClient } from "../util/createURQLClient";
import { toErrorMap } from "../util/toErrorMap";

const Register: NextPage = ({}) => {
  const router = useRouter();

  const [, register] = useRegisterMutation();

  const initialValues: AuthenticationInput = { email: "", password: "" };

  return (
    <Wrapper variant="small">
      <Heading>Register</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            input: {
              email: values.email,
              password: values.password,
            },
          });

          if (response.data?.register?.errors) {
            setErrors(toErrorMap(response.data?.register.errors));
          } else if (response.data?.register?.user) {
            router.push("/");
          }
        }}
      >
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

          <PasswordInput title="Password" name="password" />
          <PasswordInput title="Confirm Password" name="confirmPassword" />

          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createURQLClient)(Register);
