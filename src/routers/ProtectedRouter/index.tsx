import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isValidToken } from "../../services/api/events";
import { getBearerTokenCookie } from "../../data/cookiesUtil";
import { useToast } from "@chakra-ui/react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getBearerTokenCookie();
  const toast = useToast();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          const res = await isValidToken(token);
          if (!res.valid) {
            throw new Error("Invalid token");
          }
        } catch (error) {
          toast({
            title: "Você não está logado",
            description: "Faça o login primeiro",
            status: "error",
          });
          // Redirecionar para a página de login quando o token for inválido
          navigate("/login");
        }
      } else {
        // Redirecionar para a página de login quando não houver token
        navigate("/login");
      }
    };

    checkTokenValidity();
  }, [token, toast]);

  return <>{children}</>;
};

export default ProtectedRoute;
