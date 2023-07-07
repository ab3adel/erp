import { FunctionComponent, useState } from "react";
import DateRangePicker from "@/shared/components/dateRangePicker/DateRangePicker";
import { Box, Modal } from "@mui/material";
import dayjs from "dayjs";

interface DateRangeContainerProps {}

const DateRangeContainer: FunctionComponent<DateRangeContainerProps> = () => {
  const [date, setDate] = useState<[string | null, string | null] | undefined>([
    new Date().toString(),
    new Date().toString(),
  ]);
  const [isOpen, setisOpen] = useState(false);

  const style = {
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

  const hundleChangeDate = (date :any) => {
    if (date) setDate(date);
  };

  return (
    <>
      <span onClick={() => setisOpen((status) => !status)}>
        {date
          ?.map((item) => item && dayjs(item).format("DD/MM/YY"))
          .join(" - ")}
      </span>
      <Modal open={isOpen} onClose={() => setisOpen((status) => !status)}>
        <Box sx={{ ...style }}>
          <DateRangePicker value={date} onChange={hundleChangeDate} />
        </Box>
      </Modal>
    </>
  );
};

export default DateRangeContainer;
