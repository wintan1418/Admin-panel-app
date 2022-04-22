import { useState } from "react";
import propsTypes from "prop-types";
import moment from "moment";
import { DatePicker, Space } from "antd";

const dateFormat = "YYYY-MM-DD";

const DatePickerM = ({ onChange }) => {
  const [value, setValue] = useState(moment());

  const handleChange = (value) => {
    onChange && onChange(value ? moment(value?._d).format(dateFormat) : "");

    setValue(value);
  };

  return (
    <>
      <Space direction="vertical">
        <DatePicker
          className="calendar-box"
          value={value}
          onChange={handleChange}
        />
      </Space>
    </>
  );
};

DatePickerM.propsTypes = {
  onChange: propsTypes.func,
};

export default DatePickerM;
