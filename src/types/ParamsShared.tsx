import { MqttClient } from "mqtt";

export type Params = {
  nome: string;
  setNome: Function;
  abastecendo: boolean;
  setAbastecendo: Function;
  rfid: string;
  setRfid: Function;
  mqttConnection: MqttClient;
  setMqttConnection: Function;
  valorSensor: number;
  setValorSensor: Function;
};
