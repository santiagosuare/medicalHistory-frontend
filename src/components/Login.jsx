import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
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

function Login() {
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); // To control the modal
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const documentNumber = document.getElementById("documentInput").value;
      const passwordNumber = document.getElementById("passwordInput").value;
      if (documentNumber === "" || passwordNumber === "") {
        setAlertMessage("Ingrese los datos");
        setShowAlert(true);
        onOpen();
        return;
      }

      const response = await fetch(
        `http://localhost:8080/v1/login/loginUser/${documentNumber}/${passwordNumber}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.role === 2) {
          navigate("/home", { state: { data } });
        } else {
          console.log("No es medico");

          setAlertMessage("No es medico");
          setShowAlert(true);
          onOpen();
        }
      } else {
        console.log("Error fetching patient data:");
      }
    } catch (err) {
      console.log("Error fetching patient data:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <Text color={"black"} fontSize={"lg"}>
          <b>
            Sistema unico de historiales clinicos <br /> para la Provincia de
            Cordoba.
          </b>
        </Text>
        <br />
        <br />
        <Text color={"black"}>
          <b>Iniciar Sesion</b>
        </Text>
        <Input
          id="documentInput"
          placeholder="Ingresar Documento"
          type="number"
          variant="filled"
          width={"100%"}
          marginTop={"4"}
          color={"black"}
        />
        <InputGroup size="md" marginTop={"3"}>
          <Input
            id="passwordInput"
            pr="4.5rem"
            color={"black"}
            variant="filled"
            type={show ? "text" : "password"}
            placeholder="Ingesar contraseña"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="purple"
          width={"100%"}
          marginTop={"7"}
          onClick={handleSearch}
        >
          Ingresar
        </Button>

        {showAlert && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Alert status="warning">
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
  );
}

export default Login;
