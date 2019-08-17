import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { FaMinusCircle } from "react-icons/fa";
import { code } from "currency-codes";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

const DeleteContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  svg {
    font-size: 26px;
    margin: auto;
  }
`;

const Item = ({ details, index, currency }: any) => {
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={13}>
          <div className="row-between">
            <div>
              <Header>{details.currency}</Header>
            </div>
            <div>
              <Header>
                {new Intl.NumberFormat("de-ID").format(
                  currency.base.value * details.rate
                )}
              </Header>
            </div>
          </div>
          <div className="black bold italic">
            <p>
              {details.currency} - {code(details.currency).currency}
            </p>
          </div>
          <div className="bold">
            <p>
              1 {currency.base.id} = {details.currency}{" "}
              {new Intl.NumberFormat("de-ID").format(details.rate)}
            </p>
          </div>
        </Grid.Column>
        <Grid.Column width={3}>
          <DeleteContainer>
            <FaMinusCircle onClick={(e: any) => currency.onDelete(e, index)} />
          </DeleteContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default inject("currency")(observer(Item));
