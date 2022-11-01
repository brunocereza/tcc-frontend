import useContexto from "../modules/index";

const Abastecimento = (parametro: string) => {
  const { nome, setNome } = useContexto();

  return (
    <div>
      <span> Bem-Vindo {nome}</span>
    </div>
  );
};

export default Abastecimento;
