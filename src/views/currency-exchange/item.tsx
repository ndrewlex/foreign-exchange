import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { FaMinusCircle } from "react-icons/fa";
import { code } from "currency-codes";
import styled from "styled-components";

const DeleteContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  svg {
    font-size: 26px;
    margin: auto;
  }
`;

const Item = ({
  currency,
  baseCurrency,
  baseValue,
  rate,
  onDelete,
  index
}: any) => {
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={13}>
          <div className="row-between">
            <div>
              <Header>{currency}</Header>
            </div>
            <div>
              <Header>
                {new Intl.NumberFormat("de-ID").format(baseValue * rate)}
              </Header>
            </div>
          </div>
          <div className="black bold italic">
            <p>
              {currency} - {code(currency).currency}
            </p>
          </div>
          <div className="bold">
            <p>
              1 {baseCurrency} = {currency}{" "}
              {new Intl.NumberFormat("de-ID").format(rate)}
            </p>
          </div>
        </Grid.Column>
        <Grid.Column width={3}>
          <DeleteContainer>
            <FaMinusCircle onClick={(e: any) => onDelete(e, index)} />
          </DeleteContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Item;
