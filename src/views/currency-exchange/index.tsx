import React, { useEffect, FunctionComponent } from "react";
import { Card, Dropdown, Button, Grid } from "semantic-ui-react";
import styled from "styled-components";
import Base from "./base";
import Item from "./item";
import { FaMinusCircle } from "react-icons/fa";
import { CurrencyContainer } from "../../stores/index";

interface ICurrencyExchange {}

const DeleteContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  svg {
    font-size: 26px;
    margin: auto;
  }
`;

const CardContainer = styled.div`
  padding: 0 0.5rem;
`;

const data: any = {
  baseCurrency: "USD"
};

const CurrencyExchange: FunctionComponent<ICurrencyExchange> = () => {
  const {
    loading,
    baseValue,
    visibleRates,
    dropDownData,
    fetchData,
    onChangeValue,
    onChangeNewRate,
    onAddRate,
    onDeleteRate
  } = CurrencyContainer.useContainer();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid centered verticalAlign="middle" columns={3}>
      <Grid.Column mobile={16} tablet={8} computer={6}>
        <Card fluid>
          <Base
            currency={data.baseCurrency}
            value={baseValue}
            onChange={onChangeValue}
          />
          <Card.Content extra>
            {!loading ? (
              visibleRates.map((item: any, index: any) => {
                return (
                  <CardContainer key={index}>
                    <Grid celled>
                      <Grid.Row>
                        <Grid.Column width={13}>
                          <Item
                            key={index}
                            currency={item.currency}
                            rate={item.rate}
                            baseCurrency={data.baseCurrency}
                            baseValue={baseValue}
                          />
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <DeleteContainer>
                            <FaMinusCircle
                              onClick={(e: any) => onDeleteRate(e, index)}
                            />
                          </DeleteContainer>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </CardContainer>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </Card.Content>
          <Card.Content extra>
            <div className="row-between">
              <Dropdown
                placeholder="Select currency"
                fluid
                search
                selection
                options={dropDownData}
                onChange={onChangeNewRate}
              />
              <Button onClick={onAddRate}>Add</Button>
            </div>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
};

export default CurrencyExchange;
