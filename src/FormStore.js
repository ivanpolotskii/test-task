// FormStore.js
import { observable, action, makeObservable } from 'mobx';
import moment from "moment";
import "moment/locale/ru";

class FormStore {
  autocompleteValue = null;
  selectValue = null;
  textFieldValue = '';
  checkBoxValue = false;
  radioButtonValue = '';
  calendarValue = "";
  selectedDate = moment();
  selectedDateForSave =moment();
  showModal = false;
  modalHeight = "300px";
  constructor() {
    makeObservable(this, {
      autocompleteValue: observable,
      selectValue: observable,
      textFieldValue: observable,
      checkBoxValue: observable,
      radioButtonValue: observable,
      calendarValue:observable,
      selectedDate:observable,
      selectedDateForSave:observable,
      showModal:observable,
      modalHeight:observable,
      setAutocompleteValue: action,
      setSelectValue: action,
      setTextFieldValue: action,
      setCheckBoxValue: action,
      setRadioButtonValue: action,
      setCalendarValue:action,
      setSelectedDate:action,
      setSelectedDateForSave:action,
      setShowModal:action,
      setModalHeight:action,
    });
  }

  setAutocompleteValue(value) {
    this.autocompleteValue = value;
  }

  setSelectValue(value) {
    this.selectValue = value;
  }

  setTextFieldValue(value) {
    this.textFieldValue = value;
  }

  setCheckBoxValue(value) {
    this.checkBoxValue = value;
  }

  setRadioButtonValue(value) {
    this.radioButtonValue = value;
  }
  setCalendarValue(value){
    this.calendarValue = value;
  }
  setSelectedDate(value){
    this.selectedDate = value;
  }
  setSelectedDateForSave(value){
    this.selectedDateForSave = value;
  }
  setShowModal(value){
    this.showModal = value;
  }
  setModalHeight(value){
    this.modalHeight = value;
  }
  
}

const formStore = new FormStore();
export default formStore;
