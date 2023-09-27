import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";

const CUSView = () => {
  const location = useLocation();
  const { data } = location.state;

  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/v1/patient/getPatientById/${data.id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setPatient(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [data]);

  const formatDate = (dateAndTime) => {
    const date = new Date(dateAndTime);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const checkBoolean = (value) => {
    if (value) {
      return "Si";
    } else {
      return "No";
    }
  };

  console.log(patient);
  return (
    <div style={{ padding: "20px", maxWidth: "100%" }}>
      <Card bg={"#eeeaf4"}>
        <CardHeader>
          <Heading size="md">Certificado Unico de Salud</Heading>
        </CardHeader>
      </Card>
      <br />
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <Card>
          <CardHeader>
            <Heading size="md">
              Paciente: {patient.name}, {patient.surname}
            </Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Datos Personales
                </Heading>
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      padding: "20px",
                      // flexDirection: "column",
                    }}
                  >
                    <div style={{ flex: "1", marginBottom: "10px" }}>
                      <Text pt="2" fontSize="sm">
                        <b>Documento: </b> {patient.document}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Edad: </b> {patient.patient.age}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Fecha de Nacimiento: </b>{" "}
                        {formatDate(patient.patient.cus.birthDate)}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Sexo: </b> {patient.patient.cus.gender}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Obra Social: </b> {patient.patient.healthInsurance}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Credencial: </b> {patient.patient.member}
                      </Text>
                    </div>
                    <div style={{ flex: "1", marginBottom: "10px" }}>
                      <Text pt="2" fontSize="sm">
                        <b>Lugar de Nacimiento: </b> {patient.patient.cus.city}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Domicilio: </b> {patient.patient.cus.address}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Telefono: </b> {patient.patient.cellphone}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Email: </b> {patient.email}
                      </Text>
                    </div>
                  </div>
                </div>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Examen Fisico
                </Heading>
                <div style={{ padding: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      padding: "10px",
                      // flexDirection: "column",
                    }}
                  >
                    <div style={{ flex: "1", marginBottom: "10px" }}>
                      <Text pt="2" fontSize="sm">
                        <b>Peso: </b>{" "}
                        {patient.patient.cus.physicalExamination.weight}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Talla: </b>{" "}
                        {patient.patient.cus.physicalExamination.size}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>IMC: </b>{" "}
                        {patient.patient.cus.physicalExamination.bmi}
                      </Text>
                    </div>
                    <div style={{ flex: "1", marginBottom: "10px" }}>
                      <Text pt="2" fontSize="sm">
                        <b>Observaciones: </b>{" "}
                        {patient.patient.cus.physicalExamination.observations}
                      </Text>
                    </div>
                  </div>
                </div>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Vacunacion
                </Heading>
                <div style={{ padding: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      padding: "10px",
                      // flexDirection: "column",
                    }}
                  >
                    <div style={{ flex: "1", marginBottom: "10px" }}>
                      <Text pt="2" fontSize="sm">
                        <b>Posee carnet: </b>{" "}
                        {checkBoolean(patient.patient.cus.vaccine.card)}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Carnet Completo: </b>{" "}
                        {checkBoolean(patient.patient.cus.vaccine.complete)}
                      </Text>
                    </div>
                    <div style={{ flex: "1", marginBottom: "10px" }}>
                      <Text pt="2" fontSize="sm">
                        <b>Observaciones: </b>{" "}
                        {patient.patient.cus.vaccine.observations}
                      </Text>
                    </div>
                  </div>
                </div>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Antecedentes Patologicos
                </Heading>
                <div style={{ padding: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      padding: "10px",
                      // flexDirection: "column",
                    }}
                  >
                    <div style={{ flex: "1", marginBottom: "10px" }}>
                      <Text pt="2" fontSize="sm">
                        <b>Cirugias: </b>{" "}
                        {checkBoolean(patient.patient.cus.vaccine.complete)}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Cardiovasculares: </b>{" "}
                        {patient.patient.cus.vaccine.observations}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Alergias: </b>{" "}
                        {patient.patient.cus.vaccine.observations}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        <b>Oftalmologicos: </b>{" "}
                        {patient.patient.cus.vaccine.observations}
                      </Text>
                    </div>
                    <div style={{ flex: "1", marginBottom: "10px" }}>
                      <Text pt="2" fontSize="sm">
                        <b>Enfermedades Importantes: </b>{" "}
                        {patient.patient.cus.pathologicalHistory.others}
                      </Text>
                    </div>
                  </div>
                </div>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Medicamentos Prescriptos
                </Heading>
                <div style={{ padding: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      padding: "10px",
                      flexDirection: "column",
                    }}
                  >
                    <Text pt="2" fontSize="sm">
                      <b>Medicamentos Actual: </b>{" "}
                      {patient.patient.cus.prescribedMedication.medication}
                    </Text>
                  </div>
                </div>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      )}

      <Button
        bg={"#ce94f5"}
        width={"50%"} // Use 100% width on small screens
        style={{ marginTop: "10px" }} // Add some spacing on top for small screens
        onClick={handleGoBack}
      >
        {" "}
        Volver{" "}
      </Button>
    </div>
  );
};

export default CUSView;
