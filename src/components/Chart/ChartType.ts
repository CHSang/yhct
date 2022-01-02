type ChartTypeDataSet = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
};
export type ChartType = {
  labels: string[];
  datasets: ChartTypeDataSet[];
};

const ODD_MONTH = ["01", "03", "05", "07", "08", "10", "12"];
export const ODD_MONTH_LABEL = ["3","6","9","12","15","18","21","24","27","31"];
export const NORMAL_MONTH_LABEL = ["3","6","9","12","15","18","21","24","27","30"];
export const FEB_LEAP_YEAR_LABEL = ["3", "6", "9", "12", "15", "18", "21", "24", "28"];
export const FEB_NORMAL_YEAR_LABEL = ["3", "6", "9", "12", "15", "18", "21", "24", "27"];

export const buildChartLabelTemplate = (month: string, year: number) => {
  let result = [ ...NORMAL_MONTH_LABEL ];

  if (month === "02") {
    result = [ ...FEB_NORMAL_YEAR_LABEL ];
    if (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    ) {
    } else {
      result = [ ...FEB_LEAP_YEAR_LABEL ];
    }
  }

  if (ODD_MONTH.includes(month)) {
    result = [ ...ODD_MONTH_LABEL ];
  }

  return result;
};

export const getLastdayInMonth = (month: string, year: number) => {
  let result = 30;

  if (month === "02") {
    result = 27;
    if (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    ) {
      result = 28;
    }
  }

  if (ODD_MONTH.includes(month)) {
    result = 31
  }

  return result;
};

export const buildChartMonthTemplate = (month: string, year: number) => {
  let result = { ...CHART_MONTH };

  if (month === "02") {
    result = { ...CHART_NORMAL_FEB_MONTH };
    if (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    ) {
      result = {
        ...result,
        labels: FEB_LEAP_YEAR_LABEL,
      };
    } else {
      result = {
        ...result,
        labels: FEB_NORMAL_YEAR_LABEL,
      };
    }
  }
  
  if (ODD_MONTH.includes(month)) {
    let array = [];
    for (let i = 0; i<31; i++) {
      array.push("" + (i+1));
    }
    result = {
      ...result,
      labels: ODD_MONTH_LABEL,
    };
  }

  return result;
};

export const CHART_FEEDBACK_MONTH = {
  labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
  datasets: [
    {
      label: "# Thời gian tập luyện",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const CHART_NORMAL_FEB_MONTH = {
  labels: ["3", "6", "9", "12", "15", "18", "21", "24", "27"],
  datasets: [
    {
      label: "# Thời gian tập luyện",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const CHART_MONTH = {
  labels: ["3", "6", "9", "12", "15", "18", "21", "24", "27", "30"],
  datasets: [
    {
      label: "# Thời gian tập luyện",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const CHART_YEAR: ChartType = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  datasets: [
    {
      label: "# Thời gian tập luyện",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const CHART_WEEK = {
  labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  datasets: [
    {
      label: "# Thời gian tập luyện",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
