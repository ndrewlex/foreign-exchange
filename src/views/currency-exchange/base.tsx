import React from "react";
import { Card, Input } from "semantic-ui-react";

const Base = ({ currency, value, onChange }: any) => {
  return (
    <Card.Content>
      <Card.Meta>USD - United States Dollar</Card.Meta>
      <Card.Header>
        <div className="row-between">
          <div>{currency}</div>
          <Input
            size="mini"
            placeholder="Value..."
            defaultValue={value}
            onChange={onChange}
          />
        </div>
      </Card.Header>
    </Card.Content>
  );
};

export default Base;
