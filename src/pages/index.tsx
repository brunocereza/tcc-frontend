import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useContexto from "../modules/index";
import mqtt, { IClientOptions, MqttClient } from "mqtt";
import api from "../service/api";
import { myMqtt } from "../mqtt/mqtt";
import { ParamsToSend } from "../mqtt/typs";
import axios from "axios";
import app from "next/app";
export default function BasicCard() {
  const router = useRouter();
  const { nome, setNome, setAbastecendo, setRfid } = useContexto();
  const [alertaRfid, setAlertaRfid] = useState(false);
  useEffect(() => {
    setAbastecendo(false);
  }, []);
  const connection = myMqtt.createConnect();
  // const res = myMqtt.hear(connection);

  connection.on("message", (topic, message) => {
    const messageReceive = String(message);
    const rfidReceive = String(message).split("").length == 10;
    console.log("AEEO DIABO");
    if (rfidReceive) {
      verifyRfid(messageReceive);
    }
  });
  connection.on("connect", () => {
    connection.subscribe("TCCBrunoTRR_hardware_escreve");
  });

  // const cone = Promise.resolve(connection);

  // const message = myMqtt.hear(cone);
  // console.log(message);
  // async function verifyMQTT() {
  //   // const paramsToSend: ParamsToSend = {
  //   //   topic: "TCCBrunoTRR_hardware_le",
  //   //   payload: "a",
  //   //   qos: 0,
  //   //   retain: false,
  //   // };
  //   // const connection = await myMqtt.hearMQTT();

  //   // connection.on("connect", function () {
  //   //   connection.subscribe("TCCBrunoTRR_hardware_escreve");
  //   //   console.log("conectado");
  //   // });

  //   // connection.on("message", function (topic: string, message: string) {
  //   //   console.log(message.toString());
  //   // });
  //   console.log("rodando");
  // }

  async function verifyRfid(rfid: string): Promise<void> {
    try {
      const response = await api.get("/verifyRfid", {
        params: {
          rfid,
        },
      });
      if (response.data) {
        setNome(response.data);
        setRfid(rfid);
        router.push("/abastecimento");
      }
    } catch (error) {
      setAlertaRfid(true);
      setTimeout(function () {
        setAlertaRfid(false);
      }, 2500);
    }
  }

  return (
    <>
      <Card>
        <CardActions>
          <Button
            size="large"
            style={{ fontSize: "40px" }}
            //2711274267
          >
            {alertaRfid
              ? "RFID Não Encontrado"
              : "Aproxime o cartão RFID do sensor!"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
