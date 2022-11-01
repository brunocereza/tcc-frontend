import { createContext, useContext, useState } from "react";
import { Params } from "../types/ParamsShared";
const ContextoCreate = createContext<Params>({
  nome: "",
  setNome: () => {},
});

const ContextoProvider = ({ children }: any) => {
  const [nome, setNome] = useState("");

  return (
    <ContextoCreate.Provider value={{ nome, setNome }}>
      {children}{" "}
    </ContextoCreate.Provider>
  );
};

const useContexto = () => useContext(ContextoCreate);

export default useContexto;
export { ContextoProvider };
