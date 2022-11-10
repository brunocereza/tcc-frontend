import { createContext, useContext, useState } from "react";
import { Params } from "../types/ParamsShared";
const ContextoCreate = createContext<Params>({
  nome: "",
  setNome: () => {},
  abastecendo: false,
  setAbastecendo: () => {},
  rfid: "",
  setRfid: () => {},
});

const ContextoProvider = ({ children }: any) => {
  const [nome, setNome] = useState("");
  const [rfid, setRfid] = useState("");

  const [abastecendo, setAbastecendo] = useState(false);

  return (
    <ContextoCreate.Provider
      value={{ nome, setNome, abastecendo, setAbastecendo, rfid, setRfid }}
    >
      {children}
    </ContextoCreate.Provider>
  );
};

const useContexto = () => useContext(ContextoCreate);

export default useContexto;
export { ContextoProvider };
