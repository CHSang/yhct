import { DATE_FORMAT, MONTH_FORMAT, YEAR_FORMAT } from "../../constants/Constants";
import { FILTER_OPTION } from "../../share/Type";

export const getMomentFormat = (filterOptionType: FILTER_OPTION) => {
    switch (filterOptionType) {
      case FILTER_OPTION.DAY:
        return DATE_FORMAT;
      case FILTER_OPTION.MONTH:
        return MONTH_FORMAT;
      case FILTER_OPTION.YEAR:
        return YEAR_FORMAT;
      default:
        return DATE_FORMAT;
    }
  };