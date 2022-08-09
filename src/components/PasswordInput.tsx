import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

interface PasswordInputProps {
  title?: string;
  name?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ name, title }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const validatePassword = () => {};

  return (
    <Field name={name} validate={validatePassword}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors.name && form.touched.name} isRequired>
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <InputGroup size="md">
            <Input {...field} id={name} type={showPassword ? "text" : "password"} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default PasswordInput;
