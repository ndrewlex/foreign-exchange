import React, {
  useState,
  useEffect,
  FunctionComponent,
  ChangeEvent,
  SyntheticEvent
} from "react";
import {
  Card,
  Dropdown,
  Button,
  Form,
  Grid,
  Segment,
  Image,
  Container,
  GridColumn
} from "semantic-ui-react";
import styled from "styled-components";
import Base from "./base";
import Item from "./item";
import { FaMinusCircle } from "react-icons/fa";

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
  const [baseValue, setBaseValue] = useState("10.00");
  const [loading, setLoading] = useState(true);
  const [allRates, setAllRates] = useState([]);
  const [visibleRates, setVisibleRates] = useState<any>([]);
  const [dropDownData, setDropDownData] = useState<any>([]);
  const [newRate, setNewRate] = useState<any>(null);

  const fetchData = async () => {
    const base = "USD";
    const symbols = "CAD,IDR,GBP,CHF,SGD,INR,MYR,JPY,KRW";
    try {
      const response = await fetch(
        `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`
      );
      const json = await response.json();
      let allRatesMapped: any = [];
      let dropDownMapped: any = [];
      for (let currency in json.rates) {
        allRatesMapped.push({
          currency,
          rate: json.rates[currency]
        });
        dropDownMapped.push({
          key: currency,
          value: currency,
          text: currency
        });
      }
      setAllRates(allRatesMapped);
      setDropDownData(dropDownMapped);
      setVisibleRates(allRatesMapped.slice(0, 4));
    } catch {
      console.log("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeValue = (event: ChangeEvent, data: any) => {
    event.preventDefault();
    setBaseValue(data.value);
  };

  const onChangeNewRate = (event: SyntheticEvent, data: any) => {
    event.preventDefault();
    const selectedRate = allRates.find(
      (item: any) => item.currency === data.value
    );
    if (selectedRate) {
      setNewRate(selectedRate);
    }
  };

  const onAddRate = (event: SyntheticEvent) => {
    event.preventDefault();
    if (newRate != null) {
      const isExist = visibleRates.find((item: any) => {
        return item.currency === newRate.currency;
      });
      !isExist &&
        newRate !== null &&
        setVisibleRates([...visibleRates, newRate]);
    }
  };

  const onDeleteRate = (event: any, index: any) => {
    event.preventDefault();
    let copyOfVisibleRates = visibleRates;
    copyOfVisibleRates.splice(index, 1);
    console.log({ copyOfVisibleRates });
    setVisibleRates([...copyOfVisibleRates]);
  };

  useEffect(() => {
    console.log({ visibleRates });
  }, [visibleRates]);

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
                  <CardContainer>
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
