import {
  ModalBody,
  Stack,
  Skeleton,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface RemoveEventProps {
  isLoading: boolean;
  id?: string;
  title?: string;
  removeEvent: (id?: string) => void;
  onClose: () => void;
}

export const RemoveEvent: React.FC<RemoveEventProps> = ({
  isLoading,
  id,
  title,
  removeEvent,
  onClose,
}) => {
  console.log(id);
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
            <Text>
              Tem certeza que deseja remover o evento{" "}
              <strong>{title ?? "Indisponível"}</strong>?
            </Text>
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
            <Button onClick={() => removeEvent(id)} colorScheme="red" mr={3}>
              Remover
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </>
        )}
      </ModalFooter>
    </>
  );
};
