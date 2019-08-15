import React, { useEffect, FunctionComponent } from "react";
import { Card, Grid, Header } from "semantic-ui-react";
import Base from "./base";
import List from "./list";
import Action from "./action";
import { CurrencyContainer } from "../../stores/index";

interface ICurrencyExchange {}

const Loading = () => {
  return <Card.Content>Loading...</Card.Content>;
};
const CurrencyExchange: FunctionComponent<ICurrencyExchange> = () => {
  const {
    baseValue,
    fetchData,
    onChangeValue,
    baseCurrency,
    loading
  } = CurrencyContainer.useContainer();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid centered verticalAlign="middle" columns={3}>
      <Grid.Column mobile={16} tablet={8} computer={6}>
        <Card fluid>
          <Base
            currency={baseCurrency}
            value={baseValue}
            onChange={onChangeValue}
          />
          {loading && <Loading />}
          <React.Fragment>
            <List />
            <Action />
          </React.Fragment>
        </Card>
      </Grid.Column>
    </Grid>
  );
};

export default CurrencyExchange;
