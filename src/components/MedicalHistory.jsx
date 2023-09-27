import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Button,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const MedicalHistory = () => {
  const location = useLocation();
  const { data } = location.state;
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoHistoryAlert, setShowNoHistoryAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (data.role === 1) {
      fetch(
        `http://localhost:8080/v1/medicalHistory/getMedicalHistory/${data.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setIsLoading(false);
            setShowNoHistoryAlert(true);
          } else {
            console.log(data);
            setHistory(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [data]);

  function formatDate(dateAndTime) {
    const date = new Date(dateAndTime);
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;

    const formattedTime = `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

    return `${formattedDate} ${formattedTime}`;
  }

  const handleGoBack = () => {
    window.history.back();
  };

  const handleCus = async () => {
    navigate("/CUSView", { state: { data } });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "100%" }}>
      <Card bg={"#eeeaf4"} mt={4}>
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}>
            <div style={{ flex: "1", marginBottom: "20px" }}>
              <Text fontSize="lg">
                <b>Paciente:</b> {data.name}, {data.surname}
                <br />
                <b>Documento:</b> {data.document}
                <br />
                <b>Edad:</b> {data.age}
              </Text>
            </div>
            <div style={{ flex: "1", marginBottom: "20px" }}>
              <Text fontSize="lg">
                <b>Obra Social:</b> {data.healthInsurance}
                <br />
                <b>Plan:</b> 410HF
                <br />
                <b>Afiliado:</b> {data.member}
              </Text>
            </div>
            <div style={{ flex: "1", marginTop: "7px" }}>
              <Button bg={"#ce94f5"} width={"100%"} onClick={handleCus}>
                Descargar C.U.S
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <br />

      <Card>
        <CardHeader>
          <Heading size="md">Historial Clinico</Heading>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Stack divider={<StackDivider />} spacing="4">
              {history.map((item, index) => (
                <Box key={index}>
                  <Heading size="xs" textTransform="uppercase">
                    <b>Fecha y Hora:</b> {formatDate(item.creationDate)}
                  </Heading>
                  <div style={{ padding: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        padding: "20px",
                      }}
                    >
                      <div style={{ flex: "1", marginBottom: "20px" }}>
                        <Text pt="2" fontSize="sm">
                          <b>Medico Clinico:</b> {item.doctor.name},{" "}
                          {item.doctor.surname}
                        </Text>
                        <Text pt="2" fontSize="sm">
                          <b>M.P.:</b> {item.doctor.mp}
                        </Text>
                        <Text pt="2" fontSize="sm">
                          <b>Institucion:</b> {item.doctor.institution}
                        </Text>
                      </div>
                      <div style={{ flex: "1", marginBottom: "20px" }}>
                        <Text pt="2" fontSize="sm">
                          <b>Diagnostico:</b> {item.diagnostic}
                        </Text>
                        <Text pt="2" fontSize="sm">
                          <b>Recetas:</b> {item.orderPrescription}
                        </Text>
                        <Text pt="2" fontSize="sm">
                          <b>Estudios Requeridos:</b> {item.studyRequest}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Box>
              ))}
            </Stack>
          )}
          {showNoHistoryAlert && (
            <Alert status="warning" mb={4} color={"black"}>
              <AlertIcon />
              No se encontraron registros de historial médico.
            </Alert>
          )}
        </CardBody>
      </Card>
      <Button
        bg={"#ce94f5"}
        width={{ base: "100%", md: "auto" }}
        marginTop={4}
        marginLeft={{ base: 0, md: "auto" }}
        onClick={handleGoBack}
      >
        Volver
      </Button>
    </div>
  );
};

export default MedicalHistory;
