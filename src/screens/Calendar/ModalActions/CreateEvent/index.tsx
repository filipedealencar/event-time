import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Skeleton,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";

type RequestProps = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

interface CreateEventProps {
  isLoading: boolean;
  startEvent?: string;
  createEvent: (value: RequestProps) => void;
  onClose: () => void;
}

export const CreateEvent: React.FC<CreateEventProps> = ({
  isLoading,
  startEvent,
  createEvent,
  onClose,
}) => {
  const initialRef = React.useRef(null);

  const [valuesInput, setValuesInput] = useState<RequestProps>({
    id: "",
    title: "",
    description: "",
    startTime: startEvent ?? "",
    endTime: "",
  });

  useEffect(() => {
    setValuesInput((state) => {
      return { ...state, startTime: startEvent ?? "" };
    });
  }, [startEvent]);

  return (
    <>
      <ModalBody>
        {isLoading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            <FormControl>
              <FormLabel>Título</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Título do Evento"
                onChange={({ target }) =>
                  setValuesInput((state) => {
                    return { ...state, title: target.value };
                  })
                }
                value={valuesInput.title}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Data de início</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Data de Início"
                type="date"
                onChange={({ target }) =>
                  setValuesInput((state) => {
                    return { ...state, startTime: target.value };
                  })
                }
                value={valuesInput.startTime}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Data de término</FormLabel>
              <Input
                placeholder="Data de Termino"
                type="date"
                onChange={({ target }) =>
                  setValuesInput((state) => {
                    return { ...state, endTime: target.value };
                  })
                }
                value={valuesInput.endTime}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                placeholder="Descrição"
                onChange={({ target }) =>
                  setValuesInput((state) => {
                    return { ...state, description: target.value };
                  })
                }
                value={valuesInput.description}
              />
            </FormControl>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        {isLoading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            <Button
              onClick={() => {
                createEvent(valuesInput);
              }}
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </>
        )}
      </ModalFooter>
    </>
  );
};
