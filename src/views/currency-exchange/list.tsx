import React from "react";
import { Card } from "semantic-ui-react";
import { CurrencyContainer } from "../../stores/index";
import Item from "./item";
import styled from "styled-components";
import { observer, inject } from "mobx-react";

const CardContainer = styled.div`
  padding: 0 0.5rem;
`;

const List = ({ currency }: any) => {
  return (
    <React.Fragment>
      {!currency.isListEmpty && (
        <Card.Content extra>
          {currency.list.map((item: any, index: any) => {
            return (
              <CardContainer key={index}>
                <Item details={item} index={index} />
              </CardContainer>
            );
          })}
        </Card.Content>
      )}
    </React.Fragment>
  );
};

export default inject("currency")(observer(List));
