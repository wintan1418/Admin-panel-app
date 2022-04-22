import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

const ChartLine = ({ data, legend, options }) => {
  return (
    <>
      <Line data={data} legend={legend} options={options} />
    </>
  );
};

export default ChartLine;

// ChartLine.propTypes = {
//   data: PropTypes.object,
//   legend: PropTypes.object,
//   options: PropTypes.object,
// };
