import { Box, Stack, Container } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../../layouts/Header";
import interactionPlugin from "@fullcalendar/interaction";

export const Calendar = () => {
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
                dateClick={(val) => console.log(val)}
                events={[
                  { title: "event 1", date: "2024-01-01" },
                  { title: "event 2", date: "2024-01-02" },
                ]}
              />
            </Box>
          </Stack>
        </Container>
      </div>
    </>
  );
};
