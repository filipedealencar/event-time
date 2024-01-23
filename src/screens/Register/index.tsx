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
  useToast,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { PasswordField } from "./PasswordFields";
import { FormEvent, useState } from "react";
import { userLogin, userRegister } from "../../services/api/events";
import { useNavigate } from "react-router-dom";
import { setBearerTokenCookie } from "../../data/cookiesUtil";

export const Register = () => {
  const [valuesRegister, setValuesRegister] = useState<{
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
  }>({ name: undefined, email: undefined, password: undefined });

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { name, email, password } = valuesRegister;
    if (name && email && password) {
      setIsLoading(true);
      toast.promise(
        userRegister({ username: name, email, password })
          .then(() => {
            userLogin({ username: name, password }).then((res) => {
              if (res.token) {
                navigate("/");
                setBearerTokenCookie(res.token);
              }
            });
          })
          .finally(() => setIsLoading(false)),
        {
          success: {
            title: "Usuário cadastrado com sucesso",
            description: "Tudo certo",
          },
          error: {
            title: "Erro ao cadastrar usuário",
            description: "Algo deu errado",
          },
          loading: {
            title: "Cadastrando usuário",
            description: "Por favor, aguarde",
          },
        }
      );
      console.log("Valores do formulário:", valuesRegister);
    }
  };

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
        <Stack spacing="6" padding="20px 0 0">
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
          <Stack onSubmit={handleSubmit} as={"form"} spacing="2">
            <Stack spacing="2">
              <FormControl isInvalid={valuesRegister.name === ""}>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  required
                  onChange={({ target }) =>
                    setValuesRegister((state) => {
                      return { ...state, name: target.value };
                    })
                  }
                  border="2px solid #c2c2c2"
                  id="name"
                  type="name"
                />
              </FormControl>
              <FormControl isInvalid={valuesRegister.email === ""}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  required
                  onChange={({ target }) =>
                    setValuesRegister((state) => {
                      return { ...state, email: target.value };
                    })
                  }
                  border="2px solid #c2c2c2"
                  id="email"
                  type="email"
                />
              </FormControl>
              <FormControl isInvalid={valuesRegister.password === ""}>
                <PasswordField
                  onChange={({ target }) =>
                    setValuesRegister((state) => {
                      return { ...state, password: target.value };
                    })
                  }
                />
              </FormControl>
            </Stack>

            <Stack spacing="6">
              <Button
                isLoading={isLoading}
                type="submit"
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
};
