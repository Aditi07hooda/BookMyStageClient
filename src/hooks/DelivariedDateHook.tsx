import React, { useEffect, useState } from "react";
import moment from "moment";

type DeliveredDateHookProps = {
  inputDate: string;
};

const DeliveredDateHook = ({ inputDate }: DeliveredDateHookProps) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const parsedDate = moment(inputDate, "MM/DD/YY h:mm A");
    const futureDate = parsedDate.add(3, "days");
    const formattedDateString = futureDate.format("DD MMM h.mm A");
    setFormattedDate(formattedDateString);
  }, [inputDate]);

  return <>{formattedDate}</>;
};

export default DeliveredDateHook;