import React from "react";
import { Card } from "semantic-ui-react";
import { CurrencyContainer } from "../../stores/index";
import Item from "./item";
import styled from "styled-components";

const CardContainer = styled.div`
  padding: 0 0.5rem;
`;

const List = () => {
  const {
    baseValue,
    visibleRates,
    onDeleteRate,
    baseCurrency
  } = CurrencyContainer.useContainer();
  return (
    <React.Fragment>
      {visibleRates.length > 0 && (
        <Card.Content extra>
          {visibleRates.map((item: any, index: any) => {
            return (
              <CardContainer key={index}>
                <Item
                  currency={item.currency}
                  rate={item.rate}
                  baseCurrency={baseCurrency}
                  baseValue={baseValue}
                  onDelete={(e: any) => onDeleteRate(e, index)}
                />
              </CardContainer>
            );
          })}
        </Card.Content>
      )}
    </React.Fragment>
  );
};

export default List;
