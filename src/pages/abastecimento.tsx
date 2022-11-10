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
const Abastecimento = () => {
  //TCCBrunoTRR_hardware_le <- topico mqtt
  const { nome, abastecendo, setAbastecendo } = useContexto();
  const [exibirHistorico, setExibirHistorico] = useState(false);

  async function toggleAbastecimento(status: boolean) {
    setAbastecendo(status);
    console.log("iniciando abastecimento");
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
          <LabelAbastecendo> 113.21</LabelAbastecendo>
        </ContainerAbastecimento>
        <Container>
          <Button
            variant="contained"
            fullWidth
            color={!abastecendo ? "success" : "error"}
            onClick={() => toggleAbastecimento(!abastecendo)}
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
