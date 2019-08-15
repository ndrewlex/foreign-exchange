import React from "react";
import { Header } from "semantic-ui-react";
import { code } from "currency-codes";

const Item = ({ currency, baseCurrency, baseValue, rate }: any) => {
  return (
    // <Card fluid>
    //   <Card.Content>
    //     <Card.Header>
    //       <div className="row-between">
    //         <div>{currency}</div>
    //         <div>{new Intl.NumberFormat("de-ID").format(baseValue * rate)}</div>
    //       </div>
    //     </Card.Header>
    //     <Card.Meta>
    //       {currency} - {code(currency).currency}
    //     </Card.Meta>
    //     <Card.Meta>
    //       1 {baseCurrency} = {currency}{" "}
    //       {new Intl.NumberFormat("de-ID").format(rate)}
    //     </Card.Meta>
    //   </Card.Content>
    // </Card>

    <>
      <div className="row-between">
        <div>
          <Header>{currency}</Header>
        </div>
        <div>
          <Header>
            {new Intl.NumberFormat("de-ID").format(baseValue * rate)}
          </Header>
        </div>
      </div>
      <p>
        {currency} - {code(currency).currency}
      </p>
      <p>
        1 {baseCurrency} = {currency}{" "}
        {new Intl.NumberFormat("de-ID").format(rate)}
      </p>
    </>
  );
};

export default Item;
