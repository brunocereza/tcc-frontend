import { QoS } from "mqtt";

export type ParamsToSend = {
  topic: string;
  payload: string;
  qos: QoS;
  retain: boolean;
};
