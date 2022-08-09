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

import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import PasswordInput from "../components/PasswordInput";
import { Wrapper } from "../components/Wrapper";
import { AuthenticationInput, useLoginMutation } from "../generated/graphql";
import { createURQLClient } from "../util/createURQLClient";
import { toErrorMap } from "../util/toErrorMap";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const initialValues: AuthenticationInput = { email: "", password: "" };
  const router = useRouter();

  const [{ data, fetching, error }, login] = useLoginMutation();
  if (fetching) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  return (
    <Wrapper variant="small">
      <Heading>Login</Heading>

      <Formik<AuthenticationInput>
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            input: {
              email: values.email,
              password: values.password,
            },
          });

          if (response.data?.login?.errors) {
            setErrors(toErrorMap(response.data?.login.errors));
          } else if (response.data?.login?.user) {
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

          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createURQLClient)(Login);
