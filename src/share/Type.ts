export type IError = {
  message: string;
};

export interface StatisticDayItem {
  day?: string;
  totalInDay?: number;
  totalDaySession?: number;
}

export interface StatisticMonthItem {
  month: string;
  totalInMonth: number;
  totalMonthSession: number;
  dates: StatisticDayItem[];
}

export interface StatisticYearItem {
  year: number;
  totalInYear: number;
  totalYearSession: number;
  months: StatisticMonthItem[];
}

export interface UserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  className: string;
  studentNumber: string;
  statistic?: StatisticYearItem[];
}

export enum FILTER_OPTION {
  DAY,
  WEEK,
  MONTH,
  YEAR,
}