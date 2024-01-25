import {
  ModalBody,
  Stack,
  Skeleton,
  Grid,
  GridItem,
  Heading,
  Divider,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface DefaultEventProps {
  isLoading: boolean;
  handleEditEvent: () => void;
  handleRemoveEvent: () => void;
  options: {
    id: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  };
}

export const DefaultEvent: React.FC<DefaultEventProps> = ({
  isLoading,
  options,
  handleEditEvent,
  handleRemoveEvent,
}) => {
  const [optionsValue, setOptionsValue] = useState(options);

  const formatDateString = (date: string) => {
    return date.split("T")[0].split("-").reverse().join("/");
  };

  useEffect(() => {
    const { startTime, endTime, ...rest } = options as any;
    setOptionsValue({ startDate: startTime, endDate: endTime, ...rest });
  }, [options]);
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
            <Grid padding="20px" templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem w="100%" h="10">
                <Heading as="h4" size="md">
                  Data de início
                </Heading>
                <Text fontSize="medium">
                  {optionsValue.startDate
                    ? formatDateString(optionsValue.startDate)
                    : "Indisponível"}
                </Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Heading as="h4" size="md">
                  Data de término
                </Heading>
                <Text fontSize="medium">
                  {optionsValue.endDate
                    ? formatDateString(optionsValue.endDate)
                    : "Indisponível"}
                </Text>
              </GridItem>
            </Grid>
            <Divider />
            <Stack padding="20px">
              <Heading textAlign="center" as="h4" size="md">
                Descrição
              </Heading>
              <Text fontSize="medium">
                {optionsValue.description ?? "Indisponível"}
              </Text>
            </Stack>
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
            <Button onClick={handleEditEvent} colorScheme="blue" mr={3}>
              Editar
            </Button>
            <Button onClick={handleRemoveEvent} colorScheme="red" mr={3}>
              Remover
            </Button>
          </>
        )}
      </ModalFooter>
    </>
  );
};
