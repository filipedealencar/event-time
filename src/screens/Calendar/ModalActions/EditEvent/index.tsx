import {
  ModalBody,
  Stack,
  Skeleton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type RequestProps = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

interface EditEventProps {
  isLoading: boolean;
  editEvent: (value: RequestProps) => void;
  onClose: () => void;
  options: {
    id: string;
    title?: string;
    startTime?: string;
    endTime?: string;
    description?: string;
  };
}

export const EditEvent: React.FC<EditEventProps> = ({
  isLoading,
  options,
  editEvent,
  onClose,
}) => {
  const initialRef = React.useRef(null);

  const [valuesInput, setValuesInput] = useState<RequestProps>({
    id: options.id,
    title: options.title ?? "",
    description: options.description ?? "",
    startTime: options.startTime ?? "",
    endTime: options.endTime ?? "",
  });

  useEffect(() => {
    console.log(valuesInput.startTime);
    setValuesInput({
      id: options.id,
      title: options.title ?? "",
      description: options.description ?? "",
      startTime: options.startTime ?? "",
      endTime: options.endTime ?? "",
    });
  }, [options]);
  useEffect(() => {
    console.log(valuesInput);
  }, [valuesInput]);

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
                placeholder="title"
                defaultValue={valuesInput.title}
                onChange={({ target }) =>
                  setValuesInput((state) => {
                    return { ...state, title: target.value };
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Data de início</FormLabel>
              <Input
                ref={initialRef}
                placeholder="startDate"
                defaultValue={valuesInput.startTime?.split("T")[0]}
                type="date"
                onChange={({ target }) =>
                  setValuesInput((state) => {
                    return { ...state, startTime: target.value };
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Data de término</FormLabel>
              <Input
                placeholder="endDate"
                defaultValue={valuesInput.endTime?.split("T")[0]}
                type="date"
                onChange={({ target }) =>
                  setValuesInput((state) => {
                    return { ...state, endTime: target.value };
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                placeholder="description"
                defaultValue={valuesInput.description}
                onChange={({ target }) =>
                  setValuesInput((state) => {
                    return { ...state, description: target.value };
                  })
                }
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
              onClick={() => editEvent(valuesInput)}
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
