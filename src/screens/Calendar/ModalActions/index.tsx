import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DefaultEvent } from "./DefaultEvent";
import { CreateEvent } from "./CreateEvent";
import { EditEvent } from "./EditEvent";
import { RemoveEvent } from "./RemoveEvent";

type OptionsProp = {
  id: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

type RequestProps = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

interface ModalProps {
  type: "default" | "create" | "edit" | "remove";
  isLoading: boolean;
  isOpen: boolean;
  options: OptionsProp;
}

interface ModalActionsProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  createEvent: (value: RequestProps) => void;
  editEvent: (value: RequestProps) => void;
  removeEvent: (id?: string) => void;
  handleRemoveEvent: () => void;
  handleEditEvent: () => void;
  modalTypes: ModalProps;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  isOpen,
  handleRemoveEvent,
  handleEditEvent,
  onClose,
  createEvent,
  editEvent,
  removeEvent,
  modalTypes,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [modalBody, setModalBody] = useState({
    default: (
      <DefaultEvent
        isLoading={modalTypes.isLoading}
        handleEditEvent={handleEditEvent}
        handleRemoveEvent={handleRemoveEvent}
        options={modalTypes.options}
      />
    ),
    create: (
      <CreateEvent
        isLoading={modalTypes.isLoading}
        createEvent={createEvent}
        onClose={onClose}
        startEvent={(modalTypes.options as any).startTime}
      />
    ),
    edit: (
      <EditEvent
        isLoading={modalTypes.isLoading}
        editEvent={editEvent}
        onClose={onClose}
        options={modalTypes.options}
      />
    ),
    remove: (
      <RemoveEvent
        isLoading={modalTypes.isLoading}
        id={modalTypes.options.id}
        removeEvent={removeEvent}
        onClose={onClose}
        title={modalTypes.options.title}
      />
    ),
  });

  useEffect(() => {
    setModalBody({
      default: (
        <DefaultEvent
          isLoading={modalTypes.isLoading}
          handleEditEvent={handleEditEvent}
          handleRemoveEvent={handleRemoveEvent}
          options={modalTypes.options}
        />
      ),
      create: (
        <CreateEvent
          isLoading={modalTypes.isLoading}
          createEvent={createEvent}
          onClose={onClose}
          startEvent={(modalTypes.options as any).startTime}
        />
      ),
      edit: (
        <EditEvent
          isLoading={modalTypes.isLoading}
          editEvent={editEvent}
          onClose={onClose}
          options={modalTypes.options}
        />
      ),
      remove: (
        <RemoveEvent
          isLoading={modalTypes.isLoading}
          id={modalTypes.options.id}
          removeEvent={removeEvent}
          onClose={onClose}
          title={modalTypes.options.title}
        />
      ),
    });
  }, [modalTypes]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent marginRight="20px" marginLeft="20px">
        <ModalHeader>{modalTypes.options.title}</ModalHeader>
        <ModalCloseButton />
        <Stack>{modalBody[modalTypes.type]}</Stack>
      </ModalContent>
    </Modal>
  );
};
