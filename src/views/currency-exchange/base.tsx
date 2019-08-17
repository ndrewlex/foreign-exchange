import React, { ChangeEvent } from "react";
import { Card, Input, Header } from "semantic-ui-react";
import { code } from "currency-codes";
import { inject, observer } from "mobx-react";

const Base = ({ currency }: any) => {
  const onChangeBaseValue = (event: ChangeEvent, data: any) => {
    event.preventDefault();
    currency.setBaseValue(data.value);
  };

  return (
    <Card.Content>
      <Card.Meta>
        <div className="black bold">
          {currency.base.id} - {code(currency.base.id).currency}
        </div>
      </Card.Meta>
      <Card.Header>
        <div className="row-between">
          <div>
            <Header>{currency.base.id}</Header>
          </div>
          <div>
            <Input
              size="mini"
              placeholder="Value..."
              defaultValue={currency.base.value}
              onChange={onChangeBaseValue}
              type="number"
            />
          </div>
        </div>
      </Card.Header>
    </Card.Content>
  );
};

export default inject("currency")(observer(Base));
