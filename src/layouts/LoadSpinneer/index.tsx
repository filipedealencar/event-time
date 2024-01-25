import { Spinner } from "@chakra-ui/react";

export const LoadSpinner: React.FC = ({}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner
        thickness="12px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#31ce9d"
        width="150px"
        height="150px"
      />
    </div>
  );
};
