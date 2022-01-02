import { useState } from "react";
import styled from "styled-components";
import { FILTER_OPTION } from "../../share/Type";

const FILTER_LIST = [
  {
    label: "Ngày",
    value: FILTER_OPTION.DAY,
  },
  {
    label: "Tuần",
    value: FILTER_OPTION.WEEK,
  },
  {
    label: "Tháng",
    value: FILTER_OPTION.MONTH,
  },
  {
    label: "Năm",
    value: FILTER_OPTION.YEAR,
  },
];

export type FilterOptionType = {
  label: string;
  value: any;
};

type FilterGroupProps = {
  onChange: Function;
  selectedValue: FILTER_OPTION;
};

const FilterGroupWrapper = styled.div`
  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5vmin;
    font-weight: bold;
    color: green;
    padding: 0;

    li {
      border: 1vmin solid green;
      border-right: none;
      border-width: medium;
      padding: 2vmin;
      width: 20vmin;
      text-align: center;

      &.selected {
        background: purple;
        color: white;
      }

      &:first-child {
        border-top-left-radius: 2vmin;
        border-bottom-left-radius: 2vmin;
      }

      &:last-child {
        border-right: 1vmin solid green;
        border-top-right-radius: 2vmin;
        border-bottom-right-radius: 2vmin;
      }
    }
  }
`;

const FilterGroup = ({ onChange, selectedValue }: FilterGroupProps) => {
  const [selectedItem, setSelectedItem] = useState<FilterOptionType>({
    label: "",
    value: selectedValue,
  });

  const handleClick = (item: FilterOptionType) => {
    setSelectedItem(item);
    onChange(item.value);
  };

  return (
    <FilterGroupWrapper>
      <ul>
        {FILTER_LIST.map((item) => {
          return (
            <li
              key={item.label}
              onClick={() => handleClick(item)}
              className={`${
                selectedItem.value === item.value ? "selected" : ""
              }`}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </FilterGroupWrapper>
  );
};

export default FilterGroup;
