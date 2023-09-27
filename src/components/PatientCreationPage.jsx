import React, { useState } from "react";
import {
  Card,
  Button,
  Select,
  Textarea,
  CardHeader,
  Heading,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Alert,
  AlertIcon,
  ModalFooter,
} from "@chakra-ui/react";

const PatientCreationPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [member, setMember] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("No especificar");
  const [genderChar, setGenderChar] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [medication, setMedication] = useState("");
  const [card, setCard] = useState("");
  const [cardBool, setCardBool] = useState(false);
  const [complete, setComplete] = useState("");
  const [completeBool, setCompleteBool] = useState(false);
  const [vaccineObservation, setVaccineObservation] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [physicalObservation, setPhysicalObservation] = useState("");
  const [surgery, setSurgery] = useState("");
  const [cardiovascular, setCardiovascular] = useState("");
  const [allergies, setAllergies] = useState("");
  const [ophthalmological, setOphthalmological] = useState("");
  const [others, setOthers] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure(); // To control the modal
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const mapGenderToChar = (genderString) => {
    switch (genderString) {
      case "Masculino":
        return "M";
      case "Femenino":
        return "F";
      default:
        return "X";
    }
  };

  const mapTrueOrFalse = (value) => {
    switch (value) {
      case "Si":
        return true;
      case "No":
        return false;
      default:
        return false;
    }
  };

  const patientResponse = {
    name: name,
    surname: surname,
    document: document,
    email: email,
    patient: {
      age: age,
      cellphone: cellphone,
      healthInsurance: healthInsurance,
      member: member,
      cus: {
        birthDate: birthDate,
        gender: genderChar,
        address: address,
        city: city,
        prescribedMedication: {
          medication: medication,
        },
        vaccine: {
          card: cardBool,
          complete: completeBool,
          observations: vaccineObservation,
        },
        physicalExamination: {
          size: size,
          weight: weight,
          bmi: bmi,
          observations: physicalObservation,
        },
        pathologicalHistory: {
          surgeries: surgery,
          cardiovascular: cardiovascular,
          allergies: allergies,
          oftalmologicos: ophthalmological,
          others: others,
        },
      },
    },
  };

  const handleSave = async () => {
    console.log(JSON.stringify(patientResponse));
    try {
      const response = await fetch(
        `http://localhost:8080/v1/patient/createPatient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientResponse),
        }
      );
      if (response.ok) {
        console.log("Paciente creado");
        setAlertMessage("Paciente creado correctamente");
        setShowAlert(true);
        onOpen();
      } else {
        console.log("Error al crear paciente");
      }
    } catch (err) {
      console.log("Error al crear paciente:", err);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "100%" }}>
        <Card bg={"#eeeaf4"}>
          <CardHeader>
            <Heading size="md">Registrar Nuevo Paciente</Heading>
          </CardHeader>
        </Card>
        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "20px",
              // flexDirection: "column",
            }}
          >
            <div style={{ flex: "1", marginBottom: "20px" }}>
              <Card bg={"#eeeaf4"}>
                <CardHeader>
                  <Heading size="md">Datos Personales</Heading>
                </CardHeader>

                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre"
                    type="text"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    placeholder="Apellido"
                    type="text"
                    name="surname"
                    onChange={(event) => setSurname(event.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Documento</FormLabel>
                  <Input
                    placeholder="Documento"
                    type="number"
                    name="document"
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const intValue = parseInt(inputValue);
                      setDocument(intValue);
                    }}
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Contraseña</FormLabel>
                  <Input placeholder="Contraseña, la primera vez en iniciar se solicitara realizar el cambio de la misma" />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Edad</FormLabel>
                  <Input
                    placeholder="Edad"
                    name="age"
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const intValue = parseInt(inputValue);
                      setAge(intValue);
                    }}
                  />
                </FormControl>
                <br />
                <FormControl as="fieldset" isRequired>
                  <FormLabel>Sexo</FormLabel>
                  <RadioGroup
                    onChange={(value) => {
                      setGender(value);
                      setGenderChar(mapGenderToChar(value));
                    }}
                    value={gender}
                  >
                    <HStack spacing="24px">
                      <Radio value="Masculino">Masculino</Radio>
                      <Radio value="Femenino">Femenino</Radio>
                      <Radio value="No especificar">No especificar</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Card>
              <div style={{ padding: "20px" }}></div>
              <Card bg={"#eeeaf4"}>
                <CardHeader>
                  <Heading size="md">Vacunaciones</Heading>
                </CardHeader>
                <FormControl as="fieldset" isRequired>
                  <FormLabel>Carnet</FormLabel>
                  <RadioGroup
                    onChange={(value) => {
                      setCard(value);
                      setCardBool(mapTrueOrFalse(value));
                    }}
                    value={card}
                  >
                    <HStack spacing="24px">
                      <Radio value="Si">Si</Radio>
                      <Radio value="No">No</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormLabel>Completo</FormLabel>
                  <RadioGroup
                    onChange={(value) => {
                      setComplete(value);
                      setCompleteBool(mapTrueOrFalse(value));
                    }}
                    value={complete}
                  >
                    <HStack spacing="24px">
                      <Radio value="Si">Si</Radio>
                      <Radio value="No">No</Radio>
                    </HStack>
                  </RadioGroup>
                  <Textarea
                    placeholder="Debe completar esquema con..."
                    name="vaccineObservation"
                    onChange={(event) =>
                      setVaccineObservation(event.target.value)
                    }
                  />
                </FormControl>
              </Card>
              <div style={{ padding: "20px" }}></div>
              <Card bg={"#eeeaf4"}>
                <CardHeader>
                  <Heading size="md">Antecedentes Patologicos</Heading>
                </CardHeader>
                <Textarea
                  placeholder="Enfermedades Importantes..."
                  name=""
                  onChange={(event) => setOthers(event.target.value)}
                />
                <br />
                <FormControl isRequired>
                  <FormLabel>Cirugias:</FormLabel>
                  <Input
                    placeholder="Cirugias"
                    name="surgery"
                    onChange={(event) => setSurgery(event.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Cardiovasculares:</FormLabel>
                  <Input
                    placeholder="Cardiovasculares"
                    name="cardiovascular"
                    onChange={(event) => setCardiovascular(event.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Alergias:</FormLabel>
                  <Input
                    placeholder="Alergias"
                    name="allergies"
                    onChange={(event) => setAllergies(event.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Oftalmologicos:</FormLabel>
                  <Input
                    placeholder="Oftalmologicos"
                    name="ophthalmological"
                    onChange={(event) =>
                      setOphthalmological(event.target.value)
                    }
                  />
                </FormControl>
              </Card>
            </div>
            <div style={{ flex: "0.10", marginBottom: "20px" }}></div>
            <div style={{ flex: "1", marginBottom: "20px" }}>
              <Card bg={"#eeeaf4"}>
                <CardHeader>
                  <Heading size="md">Localidad</Heading>
                </CardHeader>
                <FormControl isRequired>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <Input
                    placeholder="Select Date"
                    size="md"
                    type="date"
                    onChange={(event) => {
                      const newDate = new Date(event.target.value);
                      const dateFormatted = newDate.toISOString();
                      setBirthDate(dateFormatted);
                    }}
                  />
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel>Provincia</FormLabel>
                  <Select
                    placeholder="Provincia"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  >
                    <option>Buenos Aires</option>
                    <option>Córdoba</option>
                    <option>Catamarca</option>
                    <option>Chaco</option>
                    <option>Chubut</option>
                    <option>Corrientes</option>
                    <option>Entre Ríos</option>
                    <option>Formosa</option>
                    <option>Jujuy</option>
                    <option>La Pampa</option>
                    <option>La Rioja</option>
                    <option>Mendoza</option>
                    <option>Misiones</option>
                    <option>Neuquén</option>
                    <option>Río Negro</option>
                    <option>Salta</option>
                    <option>San Juan</option>
                    <option>San Luis</option>
                    <option>Santa Cruz</option>
                    <option>Santa Fe</option>
                    <option>Santiago del Estero</option>
                    <option>
                      Tierra del Fuego, Antártida e Islas del Atlántico Sur
                    </option>
                    <option>Tucumán</option>
                  </Select>
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Localidad</FormLabel>
                  <Input placeholder="Localidad" />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Domicilio</FormLabel>
                  <Input
                    placeholder="Domicilio"
                    name="address"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </FormControl>
                <br />
                <InputGroup>
                  <FormLabel>Telefono: </FormLabel>
                  <InputLeftAddon children="+54" />
                  <Input
                    type="tel"
                    placeholder="Telefono celular"
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const intValue = parseInt(inputValue);
                      setCellphone(intValue);
                    }}
                  />
                </InputGroup>
                <br />
                <FormControl isRequired>
                  <FormLabel>Obra Social</FormLabel>
                  <Input
                    placeholder="Obra Social"
                    onChange={(event) => setHealthInsurance(event.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>N° de Socio</FormLabel>
                  <Input
                    placeholder="N° de Socio"
                    name="member"
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const intValue = parseInt(inputValue);
                      setMember(intValue);
                    }}
                  />
                </FormControl>
              </Card>
              <div style={{ padding: "20px" }}></div>
              <Card bg={"#eeeaf4"}>
                <CardHeader>
                  <Heading size="md">Medicamentos Prescriptos</Heading>
                </CardHeader>
                <Textarea
                  placeholder="Medicamentos Prescriptos..."
                  name="medication"
                  onChange={(event) => setMedication(event.target.value)}
                />
              </Card>
              <div style={{ padding: "20px" }}></div>
              <Card bg={"#eeeaf4"}>
                <CardHeader>
                  <Heading size="md">Examen Fisico</Heading>
                </CardHeader>
                <FormControl isRequired>
                  <FormLabel>Peso:</FormLabel>
                  <Input
                    placeholder="Peso"
                    type="number"
                    name="weight"
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const intValue = parseInt(inputValue);
                      setWeight(intValue);
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Talla:</FormLabel>
                  <Input
                    placeholder="Talla"
                    type="number"
                    name="size"
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const intValue = parseInt(inputValue);
                      setSize(intValue);
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>IMC:</FormLabel>
                  <Input
                    placeholder="IMC"
                    tpye="number"
                    name="bmi"
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const intValue = parseInt(inputValue);
                      setBmi(intValue);
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Observaciones:</FormLabel>
                  <Input
                    placeholder="Observaciones"
                    name="physicalObservation"
                    onChange={(event) =>
                      setPhysicalObservation(event.target.value)
                    }
                  />
                </FormControl>
              </Card>
            </div>
          </div>
          <div>
            <Button
              bg={"#ce94f5"}
              width={"100%"} // Use 100% width on small screens
              style={{ marginTop: "10px" }} // Add some spacing on top for small screens
              onClick={handleSave}
            >
              Guardar
            </Button>
            <Button
              bg={"#ce94f5"}
              width={"100%"} // Use 100% width on small screens
              style={{ marginTop: "10px" }} // Add some spacing on top for small screens
              onClick={handleGoBack}
            >
              Volver
            </Button>
            {showAlert && (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCreationPage;
