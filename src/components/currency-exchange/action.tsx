import React from "react";
import { Card, Dropdown, Button, Icon, Grid } from "semantic-ui-react";
import { CurrencyContainer } from "../../stores/index";

const Action = () => {
  const {
    options,
    onChangeSelectedOption,
    onAddList,
    selectedOption,
    onAddMoreCurrency
  } = CurrencyContainer.useContainer();
  return (
    <React.Fragment>
      {options.length !== 0 && (
        <Card.Content extra>
          {selectedOption === null ? (
            <Button onClick={onAddMoreCurrency} size="large">
              <Icon name="plus square" />
              Add More Currency
            </Button>
          ) : (
            <Grid columns={2}>
              <Grid.Column mobile={10} tablet={10} computer={10}>
                <Dropdown
                  placeholder="Select currency"
                  fluid
                  search
                  selection
                  defaultValue={selectedOption.currency}
                  options={options}
                  onChange={onChangeSelectedOption}
                />
              </Grid.Column>
              <Grid.Column mobile={6} tablet={6} computer={6} stretched>
                <Button onClick={onAddList}>Submit</Button>
              </Grid.Column>
            </Grid>
          )}
        </Card.Content>
      )}
    </React.Fragment>
  );
};

export default Action;
