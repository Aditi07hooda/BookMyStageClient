import React, { useEffect, useState } from "react";
import moment from "moment";

type CustomDateFormatterProps = {
  inputDate: string;
};

const CustomDateFormatter = ({ inputDate }: CustomDateFormatterProps) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const parsedDate = moment(inputDate);
    const formattedDateString = parsedDate.format("DD MMM h:mm A");
    setFormattedDate(formattedDateString);
  }, [inputDate]);

  return <>{formattedDate}</>;
};

export default CustomDateFormatter;