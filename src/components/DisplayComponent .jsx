import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Typography, Paper } from '@mui/material';
import formStore from '../FormStore';
import './DisplayComponent.scss'; // импорт файла стилей
import moment from 'moment';
import "moment/locale/ru";

class DisplayComponent extends Component {
  // метод для форматирования даты
  formatDate = (date) => {
    return moment(date).locale('ru').format('D MMMM YYYY');
  };

  render() {
    return (
      <Paper className="container" elevation={3}>
        <div className="item">
          <Typography variant="body1">
            <span className="label">Ваш язык: </span>
            <span className="value">{formStore.autocompleteValue}</span>
          </Typography>
        </div>
        <div className="item">
          <Typography variant="body1">
            <span className="label">Типы данных: </span>
            <span className="value">{formStore.selectValue}</span>
          </Typography>
        </div>
        <div className="item">
          <Typography variant="body1">
            <span className="label">Функция: </span>
            <span className="value">{formStore.textFieldValue}</span>
          </Typography>
        </div>
        <div className="item">
          <Typography variant="body1">
            <span className="label">Ты не робот: </span>
            <span className="value">{formStore.checkBoxValue ? "Я не робот" : "Я робот"}</span>
          </Typography>
        </div>
        <div className="item">
          <Typography variant="body1">
            <span className="label">Функция: </span>
            <span className="value">{formStore.radioButtonValue}</span>
          </Typography>
        </div>
        <div className="item">
          <Typography variant="body1">
            <span className="label">Дата: </span>
            <span className="value">{this.formatDate(formStore.selectedDate)}</span>
          </Typography>
        </div>
      </Paper>
    );
  }
}

// export default DisplayComponent;
export default observer(DisplayComponent);
