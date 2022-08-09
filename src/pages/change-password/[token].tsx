import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createURQLClient } from "../../util/createURQLClient";
import { toErrorMap } from "../../util/toErrorMap";
const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();

  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            data: {
              password: values.password,
              token: typeof router.query.token === "string" ? router.query.token : "",
            },
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            console.log(errorMap);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <PasswordInput name="password" title="Enter your new password" />
            {tokenError ? (
              <Flex>
                <Box mr={2} color="red">
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>
                    <u>Get a new one</u>
                  </Link>
                </NextLink>
              </Flex>
            ) : null}

            <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createURQLClient)(ChangePassword);
