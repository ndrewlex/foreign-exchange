import React from "react";
import { Card, Input, Header } from "semantic-ui-react";

const Base = ({ currency, value, onChange }: any) => {
  return (
    <Card.Content>
      <Card.Meta>
        <div className="black bold">USD - United States Dollar</div>
      </Card.Meta>
      <Card.Header>
        <div className="row-between">
          <div>
            <Header>{currency}</Header>
          </div>
          <div>
            <Input
              size="mini"
              placeholder="Value..."
              defaultValue={value}
              onChange={onChange}
              type="number"
            />
          </div>
        </div>
      </Card.Header>
    </Card.Content>
  );
};

export default Base;
