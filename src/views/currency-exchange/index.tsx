import React, { useEffect, FunctionComponent } from "react";
import { Card, Grid } from "semantic-ui-react";
import Base from "./base";
import List from "./list";
import Action from "./action";
import { CurrencyContainer } from "../../stores/index";
import { inject, observer } from "mobx-react";

const Loading = () => {
  return <Card.Content>Loading...</Card.Content>;
};
const CurrencyExchange = ({ currency }: any) => {
  useEffect(() => {
    currency.fetchInitialData();
  }, []);

  return (
    <Grid centered verticalAlign="middle" columns={3}>
      <Grid.Column mobile={16} tablet={8} computer={6}>
        <Card fluid>
          <Base />
          {currency.loading && <Loading />}
          <React.Fragment>
            <List />
            <Action />
          </React.Fragment>
        </Card>
      </Grid.Column>
    </Grid>
  );
};

export default inject("currency")(observer(CurrencyExchange));
