import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage, removeLocalStorage } from "../../data/storageUtil";
import { isValidToken } from "../../services/api/events";

export const ComponentReplace: React.FC = ({}) => {
  const toast = useToast();

  const showToast = () => {
    if (!toast.isActive("auth-error-toast")) {
      return toast({
        id: "auth-error-toast",
        position: "top-right",
        title: "Você não está logado",
        description: "Faça o login primeiro",
        status: "error",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showToast();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return <Navigate to="/login" />;
};
const ProtectedRoute: React.FC = ({}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = getLocalStorage("@bearerToken") ?? "";
        await isValidToken(token);
        setIsValid(true);
      } catch (error) {
        removeLocalStorage("@bearerToken");
        setIsValid(false);
      }
    };

    checkTokenValidity();
  }, []);

  if (isValid === null) {
    // Verificação ainda em progresso
    return null;
  }
  return getLocalStorage("@bearerToken") ? <Outlet /> : <ComponentReplace />;
};

export default ProtectedRoute;
