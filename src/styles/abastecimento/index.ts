import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 85vh;
  min-width: 80%;
  align-items: center;
`;

const Wellcome = styled.h5``;

const LabelAbastecendo = styled.div`
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  padding-top: 2%;
  padding-bottom: 2%;
  font-size: 35px;
  font-family: serif;
  width: 3;
  flex: 1;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-evenly;
`;

const ContainerAbastecimento = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  // justify-content: space-evenly;
  min-width: 40%;
  text-align: center;
`;

const ContainerModal = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;

export {
  Wrapper,
  Wellcome,
  Container,
  LabelAbastecendo,
  ContainerAbastecimento,
  ContainerModal,
};
