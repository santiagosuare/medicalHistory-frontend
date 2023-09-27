import React, { useState } from "react";
import {
  Card,
  Text,
  Textarea,
  Button,
  Input,
  Flex,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const MedicalConsultation = () => {
  const location = useLocation();
  const { data, doctors } = location.state;
  const [diagnosis, setDiagnosis] = useState("");
  const [ordenPrescription, setOrdenPrescription] = useState("");
  const [studyRequest, setStudyRequest] = useState("");
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  console.log(data);
  console.log(doctors);

  const createMedicalHistoryData = () => {
    let medicalHistoryData = {};
    if (doctors.role === 2) {
      medicalHistoryData = {
        diagnostic: diagnosis,
        studyRequest: ordenPrescription,
        orderPrescription: studyRequest,
        patientId: data.id,
        doctor: {
          id: doctors.id,
        },
      };
    } else {
      if (doctors.role === 3) {
        medicalHistoryData = {
          diagnostic: diagnosis,
          studyRequest: ordenPrescription,
          orderPrescription: studyRequest,
          patientId: data.id, // Replace with the actual patient ID
          medicalStaff: {
            id: doctors.id,
          },
        };
      }
    }

    return medicalHistoryData;
  };

  const handleSearch = async () => {
    navigate("/MedicalHistory", { state: { data } });
  };

  const handleCus = async () => {
    navigate("/CUSView", { state: { data } });
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSave = () => {
    if (diagnosis.trim() === "") {
      setShowError(true);
      setAlertMessage("Ingrese el diagnóstico");
      onOpen();
    } else {
      setShowError(false);
      console.log("Diagnóstico:", diagnosis);
      console.log("Receta:", ordenPrescription);
      console.log("Observaciones:", studyRequest);
      setShowError(true);
      setAlertMessage("Consulta guardada");
      onOpen();

      console.log(createMedicalHistoryData());

      fetch(
        `${process.env.REACT_APP_API_BASE_URL}/v1/medicalHistory/createMedicalHistory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createMedicalHistoryData()),
        }
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      setDiagnosis("");
      setOrdenPrescription("");
      setStudyRequest("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "100%" }}>
      <Card bg={"#eeeaf4"}>
        <div style={{ padding: "20px", textAlign: "left" }}>
          <Text>
            <b>Médico Clínico:</b> {doctors.name}, {doctors.surname}
            <br />
            <b>M.P.:</b> {doctors.mp}
            <br />
            <b>Institucion:</b> {doctors.institution}
          </Text>
        </div>
      </Card>

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
              <Button bg={"#ce94f5"} width={"100%"} mt={2} onClick={handleCus}>
                Descargar C.U.S
              </Button>
              <Button
                bg={"#ce94f5"}
                width={"100%"}
                mt={2}
                onClick={handleSearch}
              >
                Ver H.C
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card bg={"#eeeaf4"} mt={4} justifyContent={"center"} padding={"10px"}>
        <Text>
          <b>Consulta Medica</b>
        </Text>
      </Card>
      <Flex
        style={{
          padding: "20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text color={"black"} mt={4}>
          Fecha y Hora:
        </Text>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
          color={"black"}
          flex={"2"}
        />
      </Flex>

      <Card bg={"#eeeaf4"} mt={4}>
        <div style={{ padding: "20px", textAlign: "left" }}>
          <Text>
            <b>Diagnóstico:</b>
          </Text>
          <Textarea
            placeholder="Diagnóstico"
            mt={2}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
          {showError && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Alert status="success">
                    <AlertIcon />
                    {alertMessage}
                  </Alert>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="purple" onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          <Text mt={4}>
            <b>Receta Medica:</b>
          </Text>
          <Textarea
            placeholder="Receta Medica"
            mt={2}
            value={ordenPrescription}
            onChange={(e) => setOrdenPrescription(e.target.value)}
          />
          <Text mt={4}>
            <b>Estudios:</b>
          </Text>
          <Textarea
            placeholder="Estudios"
            mt={2}
            value={studyRequest}
            onChange={(e) => setStudyRequest(e.target.value)}
          />
        </div>
        <div>
          <Button
            bg={"#ce94f5"}
            width={"20%"}
            textAlign={"right"}
            style={{ marginRight: "10px" }}
            onClick={handleSave}
          >
            Guardar
          </Button>
          <Button
            bg={"#ce94f5"}
            width={"20%"}
            textAlign={"right"}
            style={{ marginLeft: "10px" }}
            onClick={handleGoBack}
          >
            Volver
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MedicalConsultation;
