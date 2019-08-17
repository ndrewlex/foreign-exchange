import React, { useEffect, FunctionComponent } from "react";
import { Card, Grid } from "semantic-ui-react";
import Base from "./base";
import List from "./list";
import Action from "./action";
import { CurrencyContainer } from "../../stores/index";
import { useContainer } from "unstated-next";

interface ICurrencyExchange {}

const CurrencyExchangeContainer: FunctionComponent = () => {
  return (
    <CurrencyContainer.Provider>
      <CurrencyExchange />
    </CurrencyContainer.Provider>
  );
};

const Loading = () => {
  return <Card.Content>Loading...</Card.Content>;
};

const CurrencyExchange: FunctionComponent<ICurrencyExchange> = () => {
  // console.log({ useContainer: useContainer(CurrencyContainer) });
  const {
    baseValue,
    fetchData,
    onChangeBaseValue,
    baseCurrency,
    loading
  } = useContainer(CurrencyContainer);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid verticalAlign="middle" columns={3}>
      <Grid.Column mobile={16} tablet={8} computer={6}>
        <Card fluid>
          <Base
            currency={baseCurrency}
            value={baseValue}
            onChange={onChangeBaseValue}
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

export default CurrencyExchangeContainer;
