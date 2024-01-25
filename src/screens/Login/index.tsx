import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { PasswordField } from "./PasswordFields";
import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userLogin } from "../../services/api/events";
import { getLocalStorage, setLocalStorage } from "../../data/storageUtil";

export const Login = () => {
  const [valuesLogin, setValuesLogin] = useState<{
    name: string | undefined;
    password: string | undefined;
  }>({ name: undefined, password: undefined });

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { name, password } = valuesLogin;
    if (name && password) {
      setIsLoading(true);

      userLogin({ username: name, password })
        .then((res) => {
          if (res.token) {
            setLocalStorage("@bearerToken", res.token);

            setIsLoading(true);

            setTimeout(() => {
              navigate("/", { replace: true });
            }, 300);
          }
        })
        .catch(() => {
          console.log("error");

          if (!toast.isActive("login-error-toast")) {
            return toast({
              id: "login-error-toast",
              position: "top-right",
              title: "Usuário ou senha incorreto",
              description: "Verifique e tente novamente",
              status: "error",
            });
          }
        })

        .finally(() => setIsLoading(false)),
        console.log("Valores do formulário:", valuesLogin);
    }
  };

  if (getLocalStorage("@bearerToken") !== null) {
    return <Navigate to="/" />;
  }

  return (
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
            <Heading size={{ base: "xs", md: "sm" }}>
              Faça login na sua conta
            </Heading>
            <Text color="fg.muted">
              Não tem uma conta? <Link href="/register">Inscrever-se</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "10", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack onSubmit={handleSubmit} as={"form"} spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="name">Nome de Usuário</FormLabel>
                <Input
                  required
                  onChange={({ target }) =>
                    setValuesLogin((state) => {
                      return { ...state, name: target.value };
                    })
                  }
                  border="2px solid #c2c2c2"
                  id="name"
                  type="name"
                />
              </FormControl>
              <PasswordField
                onChange={({ target }) =>
                  setValuesLogin((state) => {
                    return { ...state, password: target.value };
                  })
                }
              />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Lembre de mim</Checkbox>
              <Button
                _hover={{ background: "#1a7373" }}
                background="#3a9797"
                color="#fff"
                variant="text"
                size="sm"
              >
                Esqueceu sua senha?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                isLoading={isLoading}
                type="submit"
                _hover={{ background: "#1a7373" }}
                background="#3a9797"
                color="#fff"
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
