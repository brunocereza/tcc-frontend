import mqtt, { IClientOptions, MqttClient } from "mqtt";
import { createContext, useContext, useEffect, useState } from "react";
import { Params } from "../types/ParamsShared";
import { myMqtt } from "../mqtt/mqtt";

const ContextoCreate = createContext<Params>({
  nome: "",
  setNome: () => {},
  abastecendo: false,
  setAbastecendo: () => {},
  rfid: "",
  setRfid: () => {},
  mqttConnection: myMqtt.createConnect(),
  setMqttConnection: () => {},
  valorSensor: 0,
  setValorSensor: () => {},
});

const ContextoProvider = ({ children }: any) => {
  const [nome, setNome] = useState("");
  const [rfid, setRfid] = useState("");
  const [mqttConnection, setMqttConnection] = useState(myMqtt.createConnect());
  const [valorSensor, setValorSensor] = useState(0);
  const [abastecendo, setAbastecendo] = useState(false);

  return (
    <ContextoCreate.Provider
      value={{
        nome,
        setNome,
        abastecendo,
        setAbastecendo,
        rfid,
        setRfid,
        mqttConnection,
        setMqttConnection,
        valorSensor,
        setValorSensor,
      }}
    >
      {children}
    </ContextoCreate.Provider>
  );
};

const useContexto = () => useContext(ContextoCreate);

export default useContexto;
export { ContextoProvider };
