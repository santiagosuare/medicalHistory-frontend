import React from "react";
import { Card, Text, Button, Input } from "@chakra-ui/react";

const MedicalConsultation = () => {
  return (
    <>
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <Card bg={"#ebdff7"}>
          <div style={{ padding: "20px" }}>
            <Text>
              <b>Médico Clínico:</b> Sanchez, Juan
              <br />
              <b>M.P.:</b> 123456
              <br />
              <b>Institucion:</b> Clinica Reina Fabiola
            </Text>
          </div>
        </Card>
        <br />
        <Card bg={"#ebdff7"}>
          <div style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}>
            <div
              style={{ flex: "1", marginRight: "20px", marginBottom: "20px" }}
            >
              <Text>
                <b>Paciente:</b> Rodriguez, Estefania
                <br />
                <b>Documento:</b> 38625476
                <br />
                <b>Edad:</b> 27
              </Text>
            </div>
            <div style={{ flex: "1", marginBottom: "20px" }}>
              <Text>
                <b>Obra Social:</b> OSDE
                <br />
                <b>Plan:</b> 410
                <br />
                <b>Afiliado:</b> 271983246728
              </Text>
            </div>
            <div style={{ flex: "1", marginTop: "7px" }}>
              <Button bg={"#ce94f5"} width={"100%"}>
                Descargar C.U.S
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <Card bg={"#ebdff7"} justifyContent={"center"} padding={"10px"}>
          <Text>
            <b>Consulta Medica</b>
          </Text>
        </Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            justifyContent: "center",
          }}
        >
          <Text padding={"10px"}>Fecha y Hora:</Text>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
        </div>
      </div>
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <Card bg={"#ebdff7"}>
          <div style={{ padding: "20px" }}>
            <Text>
              <b>Diagnostico:</b>
            </Text>
            <Input placeholder="Diagnostico" size="md" />
            <br />
            <br />
            <Text>
              <b>Receta:</b>
            </Text>
            <Input placeholder="Receta" size="md" />
            <br />
            <br />
            <Text>
              <b>Observaciones:</b>
            </Text>
            <Input placeholder="Observaciones" size="md" />
            <br />
            <br />
            <Button
              bg={"#ce94f5"}
              width={"20%"}
              margin={"10px"}
              marginLeft="400px"
            >
              Ver H.C
            </Button>
            <Button bg={"#ce94f5"} width={"20%"}>
              Guardar
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default MedicalConsultation;
