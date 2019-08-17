import React from "react";
import { Card, Dropdown, Button } from "semantic-ui-react";
import { CurrencyContainer } from "../../stores/index";

const Action = () => {
  const {
    dropDownData,
    onChangeNewRate,
    onAddRate,
    newRate,
    onAddMoreCurrency
  } = CurrencyContainer.useContainer();
  return (
    <React.Fragment>
      {dropDownData.length !== 0 && (
        <Card.Content extra>
          {newRate === null ? (
            <Button onClick={onAddMoreCurrency}>Add More Currency</Button>
          ) : (
            <div className="row-between">
              <Dropdown
                placeholder="Select currency"
                fluid
                search
                selection
                defaultValue={newRate.currency}
                options={dropDownData}
                onChange={onChangeNewRate}
              />
              <Button onClick={onAddRate}>Submit</Button>
            </div>
          )}
        </Card.Content>
      )}
    </React.Fragment>
  );
};

export default Action;
