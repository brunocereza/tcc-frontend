import { Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import useContexto from "../modules/index";
import ModalHistorico from "../components/ModalHistorico";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import {
  Wrapper,
  Container,
  LabelAbastecendo,
  ContainerAbastecimento,
} from "../styles/abastecimento";
import { myMqtt } from "../mqtt/mqtt";
import Router from "next/router";
import api from "../service/api";
const url = require("url");

const Abastecimento = () => {
  //TCCBrunoTRR_hardware_le <- topico mqtt
  const {
    nome,
    abastecendo,
    setAbastecendo,
    mqttConnection,
    valorSensor,
    rfid,
    setValorSensor,
  } = useContexto();
  const [exibirHistorico, setExibirHistorico] = useState(false);
  const [blockAbastecimento, setBlockAbastecimento] = useState(false);

  // mqttConnection.on("connect", () => {
  //   mqttConnection.subscribe("TCCBrunoTRR_hardware_escreve");
  // });
  // mqttConnection.on("message", (topic, message) => {
  //   // const messageReceive = String(message);
  //   const sensorFlow = String(message).split("").length;
  //   console.log(sensorFlow);
  // });

  async function toggleAbastecimento(status: boolean): Promise<void> {
    setAbastecendo(status);
    const mensagem: string = status ? "abre" : "fecha";
    mqttConnection.publish("TCCBrunoTRR_hardware_le", mensagem, (error) => {
      if (error) {
        console.log("Publish error: ", error);
      }
    });
    console.log("iniciando abastecimento");
    if (!status) {
      console.log("encerrar abastecimento");
      setBlockAbastecimento(true);
      setValorSensor(600);
      if (valorSensor) {
        try {
          const data = new Date();
          data.setHours(data.getHours() - 3);
          const response = await api.get("/salvarAbastecimento", {
            params: {
              rfid,
              valor_abastecido: valorSensor,
              data_abastecimento: data,
            },
          });

          setTimeout(function () {
            setValorSensor(0);
            Router.push("/");
            setBlockAbastecimento(false);
          }, 2500);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <>
      <ModalHistorico
        open={exibirHistorico}
        onClose={() => setExibirHistorico(false)}
      />
      <Wrapper>
        <div>
          <Typography
            alignSelf="center"
            variant="h3"
            style={{ fontFamily: "serif" }}
          >
            Bem vindo {nome}!
          </Typography>
        </div>

        <ContainerAbastecimento>
          <LocalGasStationIcon
            style={{
              fontSize: 100,
            }}
          />
          <LabelAbastecendo>
            {" "}
            {!abastecendo
              ? "AGUARDANDO INICIAR ABASTECIMENTO"
              : valorSensor + " mL"}
          </LabelAbastecendo>
        </ContainerAbastecimento>
        <Container>
          <Button
            variant="contained"
            fullWidth
            color={!abastecendo ? "success" : "error"}
            onClick={() => toggleAbastecimento(!abastecendo)}
            disabled={blockAbastecimento}
          >
            {!abastecendo ? "Iniciar Abastecimento" : "Encerrar Abastecimento"}
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="info"
            onClick={() => setExibirHistorico(!exibirHistorico)}
          >
            Exibir histórico
          </Button>
        </Container>
      </Wrapper>
    </>
  );
};

export default Abastecimento;
