import { useState, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ContainerModal } from "../styles/abastecimento/index";
import useContexto from "../modules/index";
import api from "../service/api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  overFlow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns: GridColDef[] = [
  {
    field: "quantidade_abastecida",
    headerName: "Quantidade Abastecida em ML",
    width: 500,
  },
  {
    field: "data_abastecida",
    headerName: "Data do Abastecimento",
    width: 300,
  },
];

const ModalHistorico = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: Function;
}) => {
  const { nome, rfid } = useContexto();
  const [abastecimentos, setAbastecimentos] = useState([]);
  const totalAbastecido = abastecimentos.reduce(
    (acc, item: { quantidade_abastecida: number }) =>
      acc + +item.quantidade_abastecida,
    0
  );

  const handleRequest = async () => {
    const response = await api.get("/buscaHistorico", {
      params: {
        rfid,
      },
    });

    setAbastecimentos(response.data);
  };

  useEffect(() => {
    if (open) {
      handleRequest();
    } else {
      setAbastecimentos([]);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={() => onClose()}>
      <Box sx={style}>
        <ContainerModal>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Histórico de Abastecimento de {nome}
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Total Abastecido: {totalAbastecido} ML
          </Typography>
        </ContainerModal>

        <DataGrid
          rows={abastecimentos}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25]}
          hideFooterSelectedRowCount
        />
      </Box>
    </Modal>
  );
};

export default ModalHistorico;
