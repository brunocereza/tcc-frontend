import mqtt, { IClientOptions, MqttClient } from "mqtt";
import { Component } from "react";
import { ParamsToSend } from "./typs";
class Mqtt {
  public createConnect(): MqttClient {
    const url = `ws://broker.hivemq.com:8000/mqtt`;
    const options: IClientOptions = {
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      // will: {
      //   topic: "TCCBrunoTRR_hardware_le",
      //   payload: message,
      //   qos: 0,
      //   retain: false,
      // },
      rejectUnauthorized: false,
    };
    const connection = mqtt.connect(url, options);

    return connection;
  }

  public async publish(message: string, connection: MqttClient): Promise<void> {
    const topic = "TCCBrunoTRR_hardware_le";
    try {
      connection.publish(topic, message, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    } catch (error) {
      console.log("erro ao encerrar conexao", error);
    }
  }

  public hear(connection: MqttClient): string {
    const topic = "TCCBrunoTRR_hardware_escreve";
    let messageReceive: string = "";
    try {
      connection.on("message", (topic, message) => {
        messageReceive = message.toString();
      });
      return messageReceive;
    } catch (error) {
      console.log("erro ao encerrar conexao", error);
    }
    return messageReceive;
  }
}

export const myMqtt = new Mqtt();
