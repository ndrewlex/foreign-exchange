import React from "react";
import { Card } from "semantic-ui-react";
import styled from "styled-components";

const FlexRow = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const Base = ({ base }: any) => {
  return (
    <Card.Content>
      <Card.Meta>USD - United States Dollar</Card.Meta>
      <Card.Header>
        <FlexRow>
          <div>{base.currency}</div>
          <div>{base.value}</div>
        </FlexRow>
      </Card.Header>
    </Card.Content>
  );
};

export default Base;
