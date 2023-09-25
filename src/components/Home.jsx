import React, { useState, useEffect } from "react";
import { Text, Avatar, Card, Input, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = (props) => {
  const location = useLocation();
  const data = location.state.data;

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.role === 2) {
      fetch(`http://localhost:8080/v1/doctor/getDoctorByUserId/${data.userId}`)
        .then((res) => res.json())
        .then((data) => {
          setDoctors(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No es medico");
    }
  }, [data]);

  const handleSearch = async () => {
    try {
      const documentNumber = document.getElementById("documentInput").value; // Get the input value
      const response = await fetch(
        `http://localhost:8080/v1/patient/getPatientByDocument/${documentNumber}`
      );
      if (response.ok) {
        const data = await response.json();
        navigate("/MedicalConsultation", { state: { data, doctors } });
      } else {
        console.log("Error fetching patient data:");
      }
    } catch (err) {
      console.log("Error fetching patient data:", err);
    }
  };

  return (
    <>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Text fontSize="4xl" color="black" as="b">
          Personal Médico
        </Text>
      </div>
      <div style={{ padding: "20px" }}>
        <Card bg={"#eeeaf4"} width={"100%"} maxWidth={"900px"} margin="0 auto">
          <div
            style={{ display: "flex", alignItems: "center", padding: "20px" }}
          >
            <div style={{ marginRight: "20px" }}>
              <Avatar name={doctors.name + " " + doctors.surname} size={"xl"} />
            </div>
            <div>
              <Text>
                <b>Médico Clínico:</b> {doctors.name}, {doctors.surname}
              </Text>
              <Text>
                <b>M.P.:</b> {doctors.mp}
              </Text>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ padding: "20px" }}>
        <Card bg={"#eeeaf4"} width={"100%"} maxWidth={"400px"} margin="0 auto">
          <div style={{ padding: "20px" }}>
            <Text>
              <b>Búsqueda de paciente</b>
            </Text>
            <Input
              id="documentInput"
              placeholder="Documento"
              type="number"
              width={"100%"}
              marginTop={"4"}
            />
            <Button
              colorScheme="purple"
              width={"100%"}
              marginTop={"7"}
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Home;
