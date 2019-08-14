import React from "react";
import { Card, Form } from "semantic-ui-react";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const Item = ({ currency, baseCurrency, baseValue, rate, onDelete }: any) => {
  return (
    <Wrapper>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <div className="row-between">
              <div>{currency}</div>
              <div>{baseValue * rate}</div>
              <div>
                <IoMdCloseCircle onClick={onDelete} />
              </div>
            </div>
          </Card.Header>
          <Card.Meta>{currency}</Card.Meta>
          <Card.Meta>
            1 {baseCurrency} = {currency} {rate}
          </Card.Meta>
        </Card.Content>
      </Card>
    </Wrapper>
  );
};

export default Item;
