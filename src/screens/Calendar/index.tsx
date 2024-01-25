import {
  Box,
  Stack,
  Container,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../../layouts/Header";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from "../../services/api/events";
import { getLocalStorage } from "../../data/storageUtil";
import { EventData } from "../../services/api/types";
import { ModalActions } from "./ModalActions";

interface PropsEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

interface ModalProps {
  type: "default" | "create" | "edit" | "remove";
  isLoading: boolean;
  isOpen: boolean;
  options: PropsEvent;
}

export const Calendar = () => {
  const { onClose } = useDisclosure();
  const [token, setToken] = useState(getLocalStorage("@bearerToken"));
  const [dataEvents, setDataEvents] = useState<PropsEvent[]>([]);

  const stateDefaultModal: ModalProps = {
    type: "default",
    isLoading: false,
    isOpen: false,
    options: {
      id: "Indisponivel",
      title: "Título",
      description: "Indisponivel",
      startTime: "Indisponivel",
      endTime: "Indisponivel",
    },
  };

  const [modal, setModal] = useState<ModalProps>(stateDefaultModal);

  const toast = useToast();

  console.log(modal);

  useEffect(() => {
    setToken(getLocalStorage("@bearerToken"));
  }, [getLocalStorage("@bearerToken")]);

  useEffect(() => {
    if (token) {
      getEvent(token).then((res) => {
        console.log(res);
        setDataEvents(
          res.map((event: EventData) => {
            const { _id, title, description, startTime, endTime } = event;
            const dateValue = startTime.split("T")[0];
            return {
              id: _id,
              title: title,
              description,
              date: dateValue,
              startTime,
              endTime,
            };
          })
        );
      });
    }
  }, [modal.isLoading]);

  const handleActionEvent = (
    event: "default" | "create" | "edit" | "remove"
  ) => {
    setModal((state) => {
      return { ...state, type: event };
    });
    setModal((state) => {
      return { ...state, isLoading: true };
    });
    setTimeout(() => {
      setModal((state) => {
        return { ...state, isLoading: false };
      });
    }, 2000);
  };

  const handleDimissEvent = () => {
    setModal(stateDefaultModal);
    onClose;
  };

  const handleConfirmationRemoveEvent = (id?: string) => {
    setModal((state) => {
      return { ...state, isLoading: true };
    });
    if (id) {
      return toast.promise(
        deleteEvent(id).finally(() => {
          return handleDimissEvent();
        }),
        {
          success: {
            title: "Evento removido com sucesso",
            description: "Tudo certo",
          },
          error: {
            title: "Erro ao remover evento",
            description: "Algo deu errado",
          },
          loading: {
            title: "Removendo evento",
            description: "Por favor, aguarde",
          },
        }
      );
    }

    return handleDimissEvent();
  };
  const handleConfirmationEditEvent = (value: PropsEvent) => {
    setModal((state) => {
      return { ...state, isLoading: true };
    });

    if (value) {
      const { id, ...rest } = value;
      return toast.promise(
        updateEvent(value?.id, { _id: id, ...rest }).finally(() => {
          return handleDimissEvent();
        }),
        {
          success: {
            title: "Evento editado com sucesso",
            description: "Tudo certo",
          },
          error: {
            title: "Erro ao editar evento",
            description: "Algo deu errado",
          },
          loading: {
            title: "Editando evento",
            description: "Por favor, aguarde",
          },
        }
      );
    }

    return handleDimissEvent();
  };
  const handleConfirmationCreateEvent = (value: PropsEvent) => {
    setModal((state) => {
      return { ...state, isLoading: true };
    });

    if (value) {
      const { id, ...rest } = value;
      return toast.promise(
        createEvent({ _id: id, ...rest }).finally(() => {
          return handleDimissEvent();
        }),
        {
          success: {
            title: "Evento criado com sucesso",
            description: "Tudo certo",
          },
          error: {
            title: "Erro ao criar evento",
            description: "Algo deu errado",
          },
          loading: {
            title: "Criando evento",
            description: "Por favor, aguarde",
          },
        }
      );
    }

    return handleDimissEvent();
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
                dateClick={(val) => {
                  setModal((state) => {
                    return {
                      ...state,
                      type: "create",
                      isOpen: true,
                      isLoading: true,
                      options: { ...state.options, startTime: val.dateStr },
                    };
                  });

                  setTimeout(() => {
                    setModal((state) => {
                      return {
                        ...state,
                        isLoading: false,
                      };
                    });
                  }, 1000);
                }}
                eventClick={(val: any) => {
                  const eventClick = dataEvents.find(
                    (event) => event.id === val.event.id
                  );

                  if (eventClick) {
                    setModal((state) => {
                      return { ...state, isOpen: true, options: eventClick };
                    });
                  }
                }}
                events={
                  dataEvents
                  //   [
                  //   { id: "1", title: "event 1", date: "2024-01-01" },
                  //   { id: "2", title: "event 2", date: "2024-01-02" },
                  // ]
                }
                eventContent={renderEventContent}
              />
            </Box>
          </Stack>
        </Container>
      </div>
      <ModalActions
        isOpen={modal.isOpen}
        onClose={handleDimissEvent}
        isLoading={modal.isLoading}
        handleEditEvent={() => handleActionEvent("edit")}
        handleRemoveEvent={() => handleActionEvent("remove")}
        createEvent={handleConfirmationCreateEvent}
        editEvent={handleConfirmationEditEvent}
        removeEvent={handleConfirmationRemoveEvent}
        modalTypes={modal}
      />
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
