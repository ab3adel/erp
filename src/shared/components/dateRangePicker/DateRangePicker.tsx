import { FunctionComponent } from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import {
  Box,
  Chip,
  Divider,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import { shortcutsItems } from "./DateRangePicker.shortcuts";
import dayjs, { Dayjs } from "dayjs";
import { Check } from "@mui/icons-material";

export type Value = (string | null)[];

export interface DateRangePickerProps {
  value?: [string | null, string | null];
  onChange?: (value: Value) => void;
}

const isDateRangeEqual = (
  range1Start: Dayjs,
  range1End: Dayjs,
  range2Start: Dayjs,
  range2End: Dayjs
) => {
  const formattedRange1Start: Dayjs = range1Start.startOf("day");
  const formattedRange1End: Dayjs = range1End.startOf("day");
  const formattedRange2Start: Dayjs = range2Start.startOf("day");
  const formattedRange2End: Dayjs = range2End.startOf("day");

  const isSameRange: boolean =
    formattedRange1Start.isSame(formattedRange2Start) ||
    (formattedRange1Start === formattedRange2Start &&
      formattedRange1End.isSame(formattedRange2End)) ||
    formattedRange2End === formattedRange2Start;

  return isSameRange;
};

const DateRangePicker: FunctionComponent<DateRangePickerProps> = (props) => {
  const { value, onChange } = props;

  return (
    <Box display="flex">
      <Box display="flex" alignItems="center">
        <MenuList>
          {shortcutsItems.map((item) => (
            <MenuItem
              onClick={() =>
                onChange?.(
                  item.getValue().map((item) => item?.toISOString() ?? null)
                )
              }
              sx={{ minWidth: 180 }}
              key={item.label}
            >
              <ListItemText primary={item.label} />
              <ListItemSecondaryAction>
                {isDateRangeEqual(
                  dayjs(item.getValue()[0]),
                  dayjs(item.getValue()[1]),
                  dayjs(value?.[0]),
                  dayjs(value?.[1])
                ) && <Check />}
              </ListItemSecondaryAction>
            </MenuItem>
          ))}
        </MenuList>
        <Divider orientation="vertical" variant="fullWidth" />
      </Box>

      <Box>
        <Box m={2}>
          <Typography
            paddingLeft={0.5}
            variant="overline"
            color="text.secondary"
          >
            SELECT DATE RANGE
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip
              sx={{ "& .MuiChip-label": { px: 0 } }}
              label={
                <Typography color="text.primary">
                  {value?.[0] ? dayjs(value?.[0]).format("MMM DD") : "Start"}{" "}
                </Typography>
              }
            />
            <span>-</span>
            <Typography>
              {" "}
              {value?.[1] ? dayjs(value?.[1]).format("MMM DD") : "End"}{" "}
            </Typography>
          </Stack>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangeCalendar
            sx={{
              "& .MuiDateRangeCalendar-monthContainer": {
                border: "none !important",
              },
            }}
            value={[dayjs(value?.[0]), dayjs(value?.[1])]}
            onChange={(value) =>
              onChange?.([(value[0] as any)?.$d, (value[1] as any)?.$d])
            }
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default DateRangePicker;
