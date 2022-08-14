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
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

import { object, ref, string } from "yup";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createURQLClient } from "../util/createURQLClient";
import { toErrorMap } from "../util/toErrorMap";
const Register: NextPage = ({}) => {
  const router = useRouter();

  const [, register] = useRegisterMutation();

  const validateEmail = () => {};
  const validatePassword = () => {};

  const Schema = object().shape({
    email: string().email().required("This field is required"),
    password: string().required("This field is required"),
    confirmPassword: string()
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: string().oneOf([ref("password")], "Both password need to be the same"),
      })
      .required("This field is required"),
  });

  const initialValues: any = { email: "", password: "", confirmPassword: "" };

  return (
    <Wrapper variant="small">
      <Heading mb={5}>Register</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            input: {
              email: values.email,
              password: values.password,
            },
          });
          console.log(response.data);

          if (response.data?.register?.errors) {
            setErrors(toErrorMap(response.data?.register.errors));
          } else if (response.data?.register?.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex gap={2} flexDir={"column"}>
              <InputField
                label="Email Address"
                name="email"
                helper="We'll never share your emal address"
                type={"email"}
              />
              <InputField label="Password" name="password" type={"password"} />
              <InputField label="Confirm Password" name="confirmPassword" type={"password"} />
            </Flex>
            <Flex>
              <Spacer />
              <Button mt={4} colorScheme="teal" type="submit" isLoading={isSubmitting}>
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createURQLClient)(Register);
