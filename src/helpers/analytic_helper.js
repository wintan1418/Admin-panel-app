function averageTurnoverColumns() {
  return [
    {
      title: "Location",
      dataIndex: "name",
      key: 1,
      colSpan: 1,
    },
    {
      title: "Turnover Rate",
      dataIndex: "value",
      key: 2,
      colSpan: 1,
    },
  ];
}

function topSaleCategoryColumns() {
  return [
    {
      title: "Sales Category",
      dataIndex: "sale_category",
      key: 2,
      colSpan: 1,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: 2,
      colSpan: 1,
    },
    {
      title: "Net Sale",
      dataIndex: "net_sale",
      key: 3,
      colSpan: 1,
    },
  ];
}

function topItemColumns() {
  return [
    {
      title: "Sales Category",
      dataIndex: "sale_category",
      key: 1,
      colSpan: 1,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: 2,
      colSpan: 1,
    },
    {
      title: "Net Sale",
      dataIndex: "net_sale",
      key: 3,
      colSpan: 1,
    },
  ];
}

function topModifierColumns() {
  return [
    {
      title: "Sales Category",
      dataIndex: "sale_category",
      key: 1,
      colSpan: 1,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: 2,
      colSpan: 1,
    },
    {
      title: "Net Sale",
      dataIndex: "net_sale",
      key: 3,
      colSpan: 1,
    },
  ];
}

const chartLegend = {
  display: false,
};

const separateNum = (num, sep, string) => {
  if (num) {
    var number = typeof num === "number" ? num.toString() : num,
      separator = typeof sep === "undefined" ? "," : sep ? sep : ",";

    return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + separator);
  } else {
    return string ? "" : 0;
  }
};

const chartOptions = {
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  tooltips: {
    displayColors: false,
    titleFontStyle: "normal",
    titleFontColor: "#666",
    bodyFontColor: "#000",
    bodyFontStyle: "bold",
    bodyFontSize: 15,
    xPadding: 13,
    yPadding: 10,
    backgroundColor: "#fff",
    titleMarginBottom: 10,
    custom: (tooltip) => {
      // tooltip.width = 100;
      tooltip.borderColor = "#ccc";
      tooltip.borderWidth = 1;
    },
    callbacks: {
      label: (tooltipItem, data) => {
        return separateNum(tooltipItem?.value * 1000);
      },
    },
  },
  scales: {
    yAxes: [
      {
        type: "linear",
        gridLines: {
          color: "#D9DBDC",
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 1000,
          stepSize: 400,
          padding: 25,
          fontColor: "#828282",
          callback: function (value, index, values) {
            return `${value}K`;
          },
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

const generateChartData = (canvas, labels, data) => {
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, "300");
  gradient.addColorStop(0, "rgba(254, 109, 20, 0.6)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  const datasets = [];

  data.forEach((item) => {
    let obj = {
      label: "",
      data: [],
      fill: true,
      backgroundColor: gradient,
      borderColor: "#FE6D14",
      ...item,
    };

    datasets.push(obj);
  });

  return {
    labels: labels,
    datasets: datasets,
  };
};

const fakeDataTopModifiers = [
  {
    id: 1,
    sale_category: "Mixers",
    qty: "1231",
    net_sale: "$12123",
  },
  {
    id: 2,
    sale_category: "Ganish",
    qty: "1231",
    net_sale: "$12123",
  },
  {
    id: 3,
    sale_category: "Entrees",
    qty: "1231",
    net_sale: "$12123",
  },
  {
    id: 4,
    sale_category: "Temperature",
    qty: "1231",
    net_sale: "$12123",
  },
];

const fakeDataTopItems = [
  {
    id: 1,
    sale_category: "Pizza",
    qty: "1231",
    net_sale: "$12123",
  },
  {
    id: 2,
    sale_category: "Burger",
    qty: "1231",
    net_sale: "$12123",
  },
  {
    id: 3,
    sale_category: "Grilled Sandwich",
    qty: "1231",
    net_sale: "$12123",
  },
  {
    id: 4,
    sale_category: "Alcohol",
    qty: "1231",
    net_sale: "$12123",
  },
];

const fakeDataTopSaleCategories = [
  {
    id: 1,
    sale_category: "Appetizers",
    qty: "1231",
    net_sale: "$12123",
  },
  {
    id: 2,
    sale_category: "Drinks",
    qty: "1231",
    net_sale: "$12123",
  },
  {
    id: 3,
    sale_category: "Entrees",
    qty: "1231",
    net_sale: "$12123",
  },
  {
    id: 4,
    sale_category: "Alcohol",
    qty: "1231",
    net_sale: "$12123",
  },
];

const fakeDataAverageTurnovers = [
  {
    id: 1,
    name: "Alaska",
    value: "22%",
  },
  {
    id: 2,
    name: "Arizona",
    value: "22%",
  },
  {
    id: 3,
    name: "California",
    value: "22%",
  },
  {
    id: 4,
    name: "Connecticut",
    value: "22%",
  },
  {
    id: 5,
    name: "Delaware",
    value: "22%",
  },
];

const fakeDataLocations = [
  { id: 1, name: "All Locations" },
  { id: 2, name: "All Locations 2" },
  { id: 3, name: "All Locations 3" },
];
const fakeDataModels = [
  { id: 1, name: "Model Venue" },
  { id: 2, name: "Model Venue 2" },
  { id: 3, name: "Model Venue 3" },
];

export {
  averageTurnoverColumns,
  topSaleCategoryColumns,
  topItemColumns,
  topModifierColumns,
  //chart
  chartLegend,
  chartOptions,
  generateChartData,
  //fake data
  fakeDataTopModifiers,
  fakeDataTopItems,
  fakeDataTopSaleCategories,
  fakeDataAverageTurnovers,
  fakeDataLocations,
  fakeDataModels,
};
