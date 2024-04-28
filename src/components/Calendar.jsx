import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { observer } from "mobx-react";
import moment from "moment";
import "moment/locale/ru"; // Ensure you have the Russian locale if needed
import formStore from "../FormStore"; // Ensure correct path

import { useState } from "react";
import "./calendar.scss";

moment.locale("ru");

const Calendar = observer(() => {
  const [dateIfCancelled,setDateIfCancelled] = useState("");
  const handleDateChange = (newDate) => {
    formStore.setSelectedDate(newDate);
  };

  const handleSave = () => {
    formStore.setShowModal(false);
  };

  const handleClose = () => {
    formStore.setSelectedDate(dateIfCancelled);
    formStore.setShowModal(false);
  };
  const handleOpen = () => {
    formStore.setShowModal(true);
    setDateIfCancelled(formStore.selectedDate);
  };

  const generateCalendarDays = () => {
    const days = [];
    const selectedDate = formStore.selectedDate;
    const startDay = selectedDate.clone().startOf("month").startOf("week");
    const endDay = selectedDate.clone().endOf("month").endOf("week");

    let date = startDay.clone().subtract(1, "day");

    while (date.isBefore(endDay, "day")) {
      days.push(date.add(1, "day").clone());
    }

    return days;
  };

  return (
    <div className="calendar">
      <TextField
        variant="outlined"
        value={formStore.selectedDate.format("DD.MM.YYYY")}
        
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleOpen}>
              <CalendarMonthIcon />
            </IconButton>
          ),
        }}
        size="small"
        readOnly
      />

      <Dialog
        open={formStore.showModal}
        onClose={handleClose}
        aria-labelledby="calendar-dialog-title"
      >
        <DialogContent className="dialog">
          <div className="calendar-navigation">
            <IconButton
              onClick={() =>
                handleDateChange(
                  formStore.selectedDate.clone().subtract(1, "month")
                )
              }
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h6">
              {formStore.selectedDate.format("MMMM YYYY")}
            </Typography>
            <IconButton
              onClick={() =>
                handleDateChange(formStore.selectedDate.clone().add(1, "month"))
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>

          <div className="days-of-week">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
              <Typography key={day} variant="caption" className="day-of-week">
                {day}
              </Typography>
            ))}
          </div>

          <div className="days-grid">
            {generateCalendarDays().map((day, index) => (
              <Button
              sx={{
                minWidth: 30, 
                height: 30,
                padding: 0,
                fontSize: '0.875rem',
                color: 'inherit',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 1, 
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                '&.selected': {
                  backgroundColor: '#1976d2',
                  color: 'white',
                }
              }}
              onClick={() => handleDateChange(day)}
              className={day.isSame(formStore.selectedDate, 'day') ? 'selected' : ''}
              size="small"
            >
                {day.format("D")}
              </Button>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary" variant="contained">
            Сохранить
          </Button>
          <Button onClick={handleClose} color="secondary">
            Отменить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default Calendar;
