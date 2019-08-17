import React, { SyntheticEvent } from "react";
import { Card, Dropdown, Button } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

const Action = ({ currency }: any) => {
  const {
    isDropDownEmpty,
    selectedDropdown,
    setSelectedDropdown,
    setDropdownValue,
    dropdown,
    dropdownValue,
    onAddMoreCurrency,
    onChangeDropdown
  } = currency;

  // const onChangeDropdown = (event: SyntheticEvent, data: any) => {
  //   event.preventDefault();
  //   setDropdownValue(data.value);
  // };

  return (
    <React.Fragment>
      {!isDropDownEmpty && (
        <Card.Content extra>
          {selectedDropdown === null ? (
            <Button onClick={onAddMoreCurrency}>Add More Currency</Button>
          ) : (
            <div className="row-between">
              <Dropdown
                placeholder="Select currency"
                fluid
                search
                selection
                defaultValue={dropdownValue}
                options={dropdown}
                onChange={onChangeDropdown}
              />
              {/* <Button onClick={onAddRate}>Submit</Button> */}
            </div>
          )}
        </Card.Content>
      )}
    </React.Fragment>
  );
};

export default inject("currency")(observer(Action));
