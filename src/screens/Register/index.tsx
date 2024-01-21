import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { PasswordField } from "./PasswordFields";

export const Register = () => (
  <Container
    maxW="lg"
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Stack
      boxShadow={{ base: "none", sm: "md" }}
      width="100%"
      background="#fff"
      borderRadius="50px"
    >
      <Stack spacing="6" padding="20px">
        <Logo />
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size={{ base: "xs", md: "sm" }}>Crie sua conta</Heading>
          <Text color="fg.muted">
            Já tem uma conta? <Link href="/login">Entrar</Link>
          </Text>
        </Stack>
      </Stack>
      <Box
        py={{ base: "10", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={{ base: "transparent", sm: "bg.surface" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input border="2px solid #c2c2c2" id="email" type="email" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input border="2px solid #c2c2c2" id="email" type="email" />
            </FormControl>
            <PasswordField />
          </Stack>

          <Stack spacing="6">
            <Button
              _hover={{ background: "#1a7373" }}
              background="#3a9797"
              color="#fff"
            >
              Criar conta
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>
);
