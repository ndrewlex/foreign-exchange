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
    listData,
    onDeleteList,
    baseCurrency
  } = CurrencyContainer.useContainer();
  return (
    <React.Fragment>
      {listData.length > 0 && (
        <Card.Content extra>
          {listData.map((item: any, index: any) => {
            return (
              <CardContainer key={index}>
                <Item
                  details={item}
                  baseCurrency={baseCurrency}
                  baseValue={baseValue}
                  onDelete={(e: any) => onDeleteList(e, index)}
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
