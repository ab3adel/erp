import { FunctionComponent, useState } from "react";
import DateRangePicker from "@/shared/components/dateRangePicker/DateRangePicker";
import { Box, Modal, Typography } from "@mui/material";
import dayjs from "dayjs";

interface DateRangeContainerProps {
  startdate: Date;
  endDate: Date | null;
  hundleChangeDateFilter?: any;
}

const DateRangeContainer: FunctionComponent<DateRangeContainerProps> = ({
  startdate,
  endDate,
  hundleChangeDateFilter,
}) => {
  const [date, setDate] = useState<[string | null, string | null] | undefined>([
    startdate?.toString(),
    endDate ? endDate?.toString() : "",
  ]);

  const [isOpen, setisOpen] = useState(false);
  const modalBoxStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const dateButtonStyle = {
    cursor: "pointer",
    userSelect: "none",
  };

  const hundleChangeDate = (date: any) => {
    if (hundleChangeDateFilter) {
      if (!isNaN(date[1].getTime())) {
        hundleChangeDateFilter.applyValue({
          value: {
            min: new Date(date[0]),
            max: new Date(date[1]),
          },
          field: hundleChangeDateFilter.item.field,
        });
      }
      setDate(date);
    } else {
      if (date) setDate(date);
    }
  };

  return (
    <>
      <Typography
        sx={{ ...dateButtonStyle }}
        onClick={() => setisOpen((status) => !status)}
      >
        {date?.[0] || date?.[1] ? (
          `${dayjs(date?.[0]).format("DD/MM/YYYY")} - ${
            date?.[1] ? dayjs(date?.[1]).format("DD/MM/YYYY") : ""
          }`
        ) : (
          <Typography sx={{ fontStyle: "italic", opacity: 0.8 }}>
            Select date
          </Typography>
        )}
      </Typography>
      <Modal open={isOpen} onClose={() => setisOpen((status) => !status)}>
        <Box sx={{ ...modalBoxStyles }}>
          <DateRangePicker value={date} onChange={hundleChangeDate} />
        </Box>
      </Modal>
    </>
  );
};

export default DateRangeContainer;
