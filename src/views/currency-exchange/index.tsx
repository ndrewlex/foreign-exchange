import React, { FunctionComponent } from "react";
import { Card } from "semantic-ui-react";
import styled from "styled-components";
import Base from "./base";

interface ICurrencyExchange {}

const Container = styled.div`
  width: 500px;
`;

const base: any = {
  currency: "USD",
  value: "2323"
};

const CurrencyExchange: FunctionComponent<ICurrencyExchange> = () => {
  return (
    <Container>
      <Card fluid>
        <Base base={base} />
        <Card.Content extra />
      </Card>
    </Container>
  );
};

export default CurrencyExchange;
