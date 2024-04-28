import React from "react";
import { Form, Field } from "react-final-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { observer } from "mobx-react";
import formStore from "../FormStore";
import Calendar from "./Calendar";
import { useNavigate } from "react-router-dom";


const FormComponent = observer(() => {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log(values);
    // Здесь может быть код для отправки данных формы
    navigate("/formresuts");
    formStore.setAutocompleteValue(values.programmingLanguage);
    formStore.setRadioButtonValue(values.consoleMethod);
    formStore.setTextFieldValue(values.consoleFunction);
    formStore.setSelectValue(values.dataType);
    formStore.setCheckBoxValue(values.isNotRobot);
  };

  // Функция для валидации, возвращает undefined если нет ошибки
  const required = (value) => (value ? undefined : "Required");
  const requiredCheckbox = (value) =>
    value ? undefined : "This field is required";

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "2rem",
            maxWidth: "600px",
            margin: "auto",
            backgroundColor: "#f7f7f7",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <Typography
          className="test-h2"
            variant="h2"
            gutterBottom
            style={{ color: "#5b63d8", marginBottom: "1.5rem" }}
          >
            Пройдите тестирование:
          </Typography>
          <Field name="programmingLanguage" validate={required}>
            {({ input, meta }) => (
              <Autocomplete
                {...input}
                onChange={(event, value) => input.onChange(value)}
                options={["JavaScript", "Python", "Java", "Ruby"]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Какой язык программирования вам более знаком?"
                    variant="filled"
                    error={meta.error && meta.touched}
                    helperText={meta.error && meta.touched ? meta.error : null}
                    className="autocomplete"
                  />
                )}
                style={{ width: "100%", marginBottom: "20px" }}
                freeSolo
              />
            )}
          </Field>
          <Field name="dataType" validate={required} >
            {({ input, meta }) => (
              <FormControl
                variant="filled"
                style={{ width: "100%", marginBottom: "20px" }}
                className="select"
              >
                <InputLabel id="dataType-label">
                  Какие типы данных в JavaScript?
                </InputLabel>
                <Select
                  {...input}
                  labelId="dataType-label"
                  error={meta.error && meta.touched}
                  
                >
                  <MenuItem value="Строка">Строка</MenuItem>
                  <MenuItem value="Число">Число</MenuItem>
                  <MenuItem value="Булево значение">Булево значение</MenuItem>
                  <MenuItem value="Все вышеперечисленное">
                    Все вышеперечисленное
                  </MenuItem>
                </Select>
                {meta.error && meta.touched && (
                  <span style={{ color: "red" }}>{meta.error}</span>
                )}
              </FormControl>
            )}
          </Field>
          <Field name="consoleFunction" validate={required}>
            {({ input, meta }) => (
              <TextField
                {...input}
                label="Какая функция используется для вывода текста в консоль в JavaScript?"
                variant="filled"
                style={{ width: "100%", marginBottom: "20px" }}
                error={meta.error && meta.touched}
                helperText={meta.error && meta.touched ? meta.error : null}
                className="textfield"
              />
            )}
          </Field>
          <Field name="consoleMethod" type="radio" validate={required}>
            {({ input, meta }) => (
              <RadioGroup
                {...input}
                value={input.value}
                onChange={input.onChange}
                style={{ marginBottom: "20px" }}
              >
                <FormControlLabel
                  value="Alert"
                  control={<Radio />}
                  label="Alert"
                />
                <FormControlLabel
                  value="Console.log"
                  control={<Radio />}
                  label="Console.log"
                />
                <FormControlLabel
                  value="Prompt"
                  control={<Radio />}
                  label="Prompt"
                />
                <FormControlLabel
                  value="Print"
                  control={<Radio />}
                  label="Print"
                />
                {meta.error && meta.touched && (
                  <span style={{ color: "red" }}>{meta.error}</span>
                )}
              </RadioGroup>
            )}
          </Field>
          <Calendar />
          <Field name="isNotRobot" type="checkbox" validate={requiredCheckbox}>
            {({ input, meta }) => (
              <>
                <div>
                  <Checkbox {...input} style={{ marginBottom: "20px" }} />Я не
                  робот
                </div>
                {meta.error && meta.touched && (
                  <span style={{ color: "red" }}>{meta.error}</span>
                )}
              </>
            )}
          </Field>

          <div className="finish-button-container">
            {/* <Link to="/formresults"> */}
            <Button
              type="submit"
              variant="contained"
              disabled={submitting || pristine}
              style={{ marginBottom: "20px" }}
            >
              Сохранить
            </Button>
            {/* </Link> */}
          </div>
        </form>
      )}
    />
  );
});

export default FormComponent;
