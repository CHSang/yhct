import { ChartOptions } from "chart.js";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import {
  DATE_FORMAT,
  MAXIMUM_WORKING_TIME,
  MONTH_FORMAT,
  YEAR_FORMAT
} from "../../constants/Constants";
import { convertSecondsToMinutes } from "../../services/DateTimeService";
import { FILTER_OPTION, StatisticYearItem, UserInfo } from "../../share/Type";
import { ChartType, CHART_FEEDBACK_MONTH, CHART_WEEK, CHART_YEAR, getLastdayInMonth } from "./ChartType";

type ChartProps = {
  user: UserInfo;
  filterOption: FILTER_OPTION;
  momentValue: string;
};

const ChartWrapper = styled.div``;

const CHART_OPTION : ChartOptions= {
  plugins: {
    legend: {
        labels: {
            font: {
                size: 14
            }
        }
    }
  }
};

const Chart = ({ user, filterOption, momentValue }: ChartProps) => {

  const builChartDayStatistic = (
    statistic: StatisticYearItem[] | undefined,
    momentObj: moment.Moment
  ) : number=> {
    let yearUnit = statistic?.find((item) => item.year === momentObj.year());
    let monthUnit = yearUnit
      ? yearUnit.months.find((item) => item.month === momentObj.format(MONTH_FORMAT))
      : null;
    let dayUnit = monthUnit
      ? monthUnit.dates.find(
          (item) => item.day === momentObj.format(DATE_FORMAT)
        )
      : null;

    if (dayUnit) {
      return convertSecondsToMinutes((dayUnit.totalInDay || 0) * MAXIMUM_WORKING_TIME);
    }
      
    return 0;
  };

  const builWeekStatistic = (
    statistic: StatisticYearItem[] | undefined,
    startDay: number,
    endDay: number,
    month: string,
    year: number,
  ) : number=> {
    let result = [];
    let yearUnit = statistic?.find((item) => item.year === year);
    let monthUnit = yearUnit
      ? yearUnit.months.find((item) => item.month === month)
      : null;
      
    for (let index = startDay; index < endDay; index++) {
      let combineDayAndMonth = (index <= 10 ? "0" + index : index) + "-" + month;
      let dayUnit = monthUnit
      ? monthUnit.dates.find((item) => item.day === combineDayAndMonth)
      : null;
      if (dayUnit) {
        result.push(convertSecondsToMinutes((dayUnit.totalInDay || 0) * MAXIMUM_WORKING_TIME));
      }
    }
      
    return result.reduce((a, b) => a + b, 0);
  };

  const buildChartData = (
    user: UserInfo,
    filterOption: FILTER_OPTION,
    momentValue: string
  ): ChartType => {
    let chartType: ChartType = CHART_YEAR;
    let array: number[] = [];

    if (filterOption === FILTER_OPTION.MONTH) {
      let monthMoment = moment(momentValue, MONTH_FORMAT);
      let yearUnit = user.statistic?.find(
        (item) => item.year === monthMoment.year()
      );

      let monthUnit = yearUnit
      ? yearUnit.months.find((item) => item.month === monthMoment.format(MONTH_FORMAT))
      : null;
      // chartType = buildChartMonthTemplate(monthMoment.format("MM"), yearUnit?.year!);
      chartType = {...CHART_FEEDBACK_MONTH}
      if (monthUnit) {
        let lastDayInMonth = getLastdayInMonth(monthMoment.format("MM"), yearUnit?.year!);
        let firstWeek = builWeekStatistic(user.statistic, 1, 7, monthMoment.format(MONTH_FORMAT), yearUnit?.year!);
        let secondWeek = builWeekStatistic(user.statistic, 8, 15, monthMoment.format(MONTH_FORMAT), yearUnit?.year!);
        let thirdWeek = builWeekStatistic(user.statistic, 16, 23, monthMoment.format(MONTH_FORMAT), yearUnit?.year!);
        let lastWeek = builWeekStatistic(user.statistic, 24, lastDayInMonth, monthMoment.format(MONTH_FORMAT), yearUnit?.year!);

        array.push(firstWeek);
        array.push(secondWeek);
        array.push(thirdWeek);
        array.push(lastWeek);
      }
    }

    if (filterOption === FILTER_OPTION.WEEK) {
      chartType = CHART_WEEK;
      let temp: string = moment()
        .days("Monday")
        .week(parseInt(momentValue))
        .format(DATE_FORMAT);
        array.push(
          builChartDayStatistic(
            user?.statistic,
            moment(temp, DATE_FORMAT)
          ));
        for (let index = 1; index < 7; index++) {
          temp=moment(temp, DATE_FORMAT)
            .add(1, "days")
            .format(DATE_FORMAT);
  
          array.push(
            builChartDayStatistic(
              user?.statistic,
              moment(temp, DATE_FORMAT)
            )
          );
        }
    }

    if (filterOption === FILTER_OPTION.YEAR) {
      let yearMoment = moment(momentValue, YEAR_FORMAT);
      let yearUnit = user.statistic?.find(
        (item) => item.year === yearMoment.year()
      );
      let months = yearUnit?.months;
      if (months) {
        for (let index = 1; index <= 12; index++) {
          let teampMonth = (index < 10 ? "0" + index : index) + "-" + yearUnit?.year;
          let temp = months.find((item) => item.month === teampMonth);
          if (temp) {
            array.push(
              convertSecondsToMinutes(temp.totalInMonth * MAXIMUM_WORKING_TIME)
            );
          } else array.push(0);
        }
      }
    }

    const chartData = {
      ...chartType,
    };
    chartData.datasets[0] = {
      ...chartData.datasets[0],
      data: array,
    };

    return chartData;
  };

  return (
    <ChartWrapper>
      <Bar
        data={buildChartData(user, filterOption, momentValue)}
        options={CHART_OPTION}
      />
    </ChartWrapper>
  );
};

export default Chart;
