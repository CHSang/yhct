import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ButtonField from "../../components/ButtonField";
import Chart from "../../components/Chart";
import FilterGroup from "../../components/FilterGroup";
import {
  DATE_FORMAT,
  MAXIMUM_WORKING_TIME,
  MONTH_FORMAT,
  YEAR_FORMAT
} from "../../constants/Constants";
import { convertSecondsToMinutes } from "../../services/DateTimeService";
import { getUserInfo } from "../../services/FirebaseService";
import { FILTER_OPTION, StatisticYearItem, UserInfo } from "../../share/Type";
import BackgroundLayer from "../BackgroundLayer";
import { getMomentFormat } from "./Service";
import { StatisticWrapper } from "./Style";

interface StatisticType {
  session: number;
  time: number;
}

const Statistic = ({ email }: { email: string }) => {
  const history = useHistory();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [filterOption, setFilterOption] = useState<FILTER_OPTION>(
    FILTER_OPTION.DAY
  );
  const [datePickerValue, setDatePickerValue] = useState<string>(
    moment().format(DATE_FORMAT)
  );
  const [state, setstate] = useState({
    startDayOfWeek: "",
    endDayOfWeek: "",
  });

  const [statistic, setStatistic] = useState<StatisticType>({
    session: 0,
    time: 0,
  });

  useEffect(() => {
    async function getUser() {
      let response: UserInfo | null = await getUserInfo(email);
      setUser(response);
    }
    getUser();
  }, [email]);

  useEffect(() => {
    let result: StatisticType = {
      session: 0,
      time: 0,
    };
    if (filterOption !== FILTER_OPTION.WEEK) {
      result = buildDayStatistic(
        user?.statistic,
        filterOption,
        moment(datePickerValue, getMomentFormat(filterOption))
      );
      setStatistic(result);
    } else {
      let array = [];
      let temp = moment()
        .days("Monday")
        .week(parseInt(datePickerValue)).format(DATE_FORMAT);

      array.push(
        buildDayStatistic(
          user?.statistic,
          FILTER_OPTION.DAY,
          moment(temp, DATE_FORMAT)
        )
      );
      for (let index = 1; index < 7; index++) {
        temp=moment(temp, DATE_FORMAT)
          .add(1, "days")
          .format(DATE_FORMAT);

        array.push(
          buildDayStatistic(
            user?.statistic,
            FILTER_OPTION.DAY,
            moment(temp, DATE_FORMAT)
          )
        );
      }
      let totalSession = array.map(item => item.session).reduce((a, b) => a + b, 0);
      let totalTime = array.map(item => item.time).reduce((a, b) => a + b, 0);

      setStatistic({
        session: totalSession,
        time: totalTime,
      })
    }
  }, [filterOption, user, datePickerValue]);

  const buildDayStatistic = (
    statistic: StatisticYearItem[] | undefined,
    filterOption: FILTER_OPTION,
    momentObj: moment.Moment
  ): StatisticType => {
    let yearUnit = statistic?.find((item) => item.year === momentObj.year());
    let monthUnit = yearUnit
      ? yearUnit.months.find((item) => item.month === momentObj.format(MONTH_FORMAT))
      : null;
    let dayUnit = monthUnit
      ? monthUnit.dates.find(
          (item) => item.day === momentObj.format(DATE_FORMAT)
        )
      : null;

    if (filterOption === FILTER_OPTION.YEAR) {
      return {
        session: yearUnit?.totalYearSession ? yearUnit?.totalYearSession : 0,
        time: yearUnit?.totalInYear ? yearUnit?.totalInYear : 0,
      };
    }

    if (filterOption === FILTER_OPTION.MONTH) {
      return {
        session: monthUnit?.totalMonthSession
          ? monthUnit?.totalMonthSession
          : 0,
        time: monthUnit?.totalInMonth ? monthUnit?.totalInMonth : 0,
      };
    }
    if (filterOption === FILTER_OPTION.DAY) {
      return {
        session: dayUnit?.totalDaySession ? dayUnit?.totalDaySession : 0,
        time: dayUnit?.totalInDay ? dayUnit?.totalInDay : 0,
      };
    }

    return {
      session: 0,
      time: 0,
    };
  };

  const handleOnChangeFilterOption = (item: FILTER_OPTION) => {
    setFilterOption(item);
    if (item === FILTER_OPTION.DAY) {
      setDatePickerValue(moment().format(DATE_FORMAT));
    }
    if (item === FILTER_OPTION.MONTH) {
      setDatePickerValue(moment().format(MONTH_FORMAT));
    }
    if (item === FILTER_OPTION.YEAR) {
      setDatePickerValue(moment().format(YEAR_FORMAT));
    }

    if (item === FILTER_OPTION.WEEK) {
      let weekNumber = moment().weeks();
      buildStartDayAndEndDayOfWeek(weekNumber);
      setDatePickerValue(weekNumber + "");
    }
  };

  const buildStartDayAndEndDayOfWeek = (weekNumber: number) => {
    let monday = moment().days("Monday").week(weekNumber).format(DATE_FORMAT);
    let sunday = moment(monday, DATE_FORMAT).add(6, "days").format(DATE_FORMAT);
    setstate({
      startDayOfWeek: monday,
      endDayOfWeek: sunday,
    });
  };

  const handlePreviousDatePicker = () => {
    switch (filterOption) {
      case FILTER_OPTION.DAY:
        let newDay = moment(datePickerValue, DATE_FORMAT)
          .subtract(1, "days")
          .format(DATE_FORMAT);
        setDatePickerValue(newDay);
        break;
      case FILTER_OPTION.WEEK:
        let newWeekNumber: number = parseInt(datePickerValue) - 1;
        setDatePickerValue(newWeekNumber + "");
        buildStartDayAndEndDayOfWeek(newWeekNumber);
        break;
      case FILTER_OPTION.MONTH: {
        let newMonth = moment(datePickerValue, MONTH_FORMAT)
          .subtract(1, "months")
          .format(MONTH_FORMAT);
        setDatePickerValue(newMonth);
        break;
      }
      case FILTER_OPTION.YEAR: {
        let newMonth = moment(datePickerValue, YEAR_FORMAT)
          .subtract(1, "years")
          .format(YEAR_FORMAT);
        setDatePickerValue(newMonth);
        break;
      }
      default:
        break;
    }
  };

  const handleForwardDatePicker = () => {
    switch (filterOption) {
      case FILTER_OPTION.DAY:
        let newDay = moment(datePickerValue, DATE_FORMAT)
          .add(1, "days")
          .format(DATE_FORMAT);
        setDatePickerValue(newDay);
        break;
      case FILTER_OPTION.WEEK:
        let newWeekNumber: number = parseInt(datePickerValue) + 1;
        setDatePickerValue(newWeekNumber + "");
        buildStartDayAndEndDayOfWeek(newWeekNumber);
        break;
      case FILTER_OPTION.MONTH: {
        let newMonth = moment(datePickerValue, MONTH_FORMAT)
          .add(1, "months")
          .format(MONTH_FORMAT);
        setDatePickerValue(newMonth);
        break;
      }
      case FILTER_OPTION.YEAR: {
        let newMonth = moment(datePickerValue, YEAR_FORMAT)
          .add(1, "years")
          .format(YEAR_FORMAT);
        setDatePickerValue(newMonth);
        break;
      }
      default:
        break;
    }
  };

  return (
    <BackgroundLayer showImgBottom={false}>
      <StatisticWrapper>
        <label className="caption">Nhật ký</label>

        <div className="summary flex">
          <div className="flex flex_column count">
            <label>Tổng buổi tập</label>
            <label className="result">{statistic.session}</label>
          </div>
          <span className="separator"></span>
          <div className="flex flex_column time">
            <label>Tổng thời gian</label>
            <label className="result">
              {convertSecondsToMinutes(statistic.time * MAXIMUM_WORKING_TIME)}
            </label>
          </div>
        </div>

        <div className="flex flex_column filter">
          <FilterGroup
            onChange={handleOnChangeFilterOption}
            selectedValue={filterOption}
          />
        </div>

        <div className="date_picker">
          <FontAwesomeIcon
            icon={faAngleLeft}
            color={"green"}
            size="2x"
            onClick={() => handlePreviousDatePicker()}
          />
          {filterOption !== FILTER_OPTION.WEEK && (
            <label>{datePickerValue}</label>
          )}
          {filterOption === FILTER_OPTION.WEEK && (
            <label>
              {state.startDayOfWeek} - {state.endDayOfWeek}
            </label>
          )}
          <FontAwesomeIcon
            icon={faAngleRight}
            color={"green"}
            size="2x"
            onClick={() => handleForwardDatePicker()}
          />
        </div>

        {user && filterOption !== FILTER_OPTION.DAY && (
          <div className="chart_section">
            <Chart user={user} filterOption={filterOption} momentValue={datePickerValue}/>
          </div>
        )}

        <div className="button_section">
          <ButtonField
            label="Xem ghi hình"
            onClick={() => history.push("video-viewer")}
            transparent={true}
          />
        </div>
      </StatisticWrapper>
    </BackgroundLayer>
  );
};

export default Statistic;
