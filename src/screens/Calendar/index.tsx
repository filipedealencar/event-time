import {
  Box,
  Stack,
  Container,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Textarea,
  Text,
  Heading,
  Divider,
  Grid,
  GridItem,
  Skeleton,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../../layouts/Header";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useState } from "react";

export const Calendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setIsRemove(false);
      setIsEdit(false);
    }
  }, [isOpen]);

  const handleEditEvent = () => {
    setIsEdit(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const handleRemoveEvent = () => {
    setIsRemove(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <>
      <Header />
      <div
        style={{
          height: "calc(100vh - 88px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxW="fit-content"
          height="fit-content"
          borderRadius="50px"
          padding="30px"
          bg="#fff"
          margin="20px"
        >
          <Stack width={{ base: "100%", sm: "900px" }}>
            <Box height={{ base: "400px", sm: "400px" }}>
              <FullCalendar
                height="100%"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                // dateClick={(val) => console.log(val)}
                eventClick={(val) => {
                  onOpen();
                  console.log(val.event.id, val.event.title);
                }}
                events={[
                  { id: "1", title: "event 1", date: "2024-01-01" },
                  { id: "2", title: "event 2", date: "2024-01-02" },
                ]}
                eventContent={renderEventContent}
              />
            </Box>
          </Stack>
        </Container>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent marginRight="20px" marginLeft="20px">
          <ModalHeader>Entrevista de Emprego</ModalHeader>
          <ModalCloseButton />

          {isRemove ? (
            <ModalBody>
              {isLoading ? (
                <Stack>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </Stack>
              ) : (
                <>
                  <Text>Tem certeza que deseja remover o evento?</Text>
                </>
              )}
            </ModalBody>
          ) : isEdit ? (
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
                    <FormLabel>Hora de início</FormLabel>
                    <Input readOnly ref={initialRef} placeholder="First name" />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Hora de término</FormLabel>
                    <Input readOnly placeholder="Last name" />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea
                      readOnly
                      placeholder="Last name"
                      value="teadfqwefweq"
                    />
                  </FormControl>
                </>
              )}
            </ModalBody>
          ) : (
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
                        Hora de início
                      </Heading>
                      <Text fontSize="medium">21/01/2024</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Heading as="h4" size="md">
                        Hora de término
                      </Heading>
                      <Text fontSize="medium">21/01/2024</Text>
                    </GridItem>
                  </Grid>
                  <Divider />
                  <Stack padding="20px">
                    <Heading textAlign="center" as="h4" size="md">
                      Descrição
                    </Heading>
                    <Text fontSize="medium">21/01/2024</Text>
                  </Stack>
                </>
              )}
            </ModalBody>
          )}

          <ModalFooter>
            {isRemove ? (
              isLoading ? (
                <Stack>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </Stack>
              ) : (
                <>
                  <Button colorScheme="red" mr={3}>
                    Remover
                  </Button>
                  <Button onClick={onClose}>Cancelar</Button>
                </>
              )
            ) : isEdit ? (
              isLoading ? (
                <Stack>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </Stack>
              ) : (
                <>
                  <Button colorScheme="blue" mr={3}>
                    Salvar
                  </Button>
                  <Button onClick={onClose}>Cancelar</Button>
                </>
              )
            ) : isLoading ? (
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
        </ModalContent>
      </Modal>
    </>
  );
};

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
