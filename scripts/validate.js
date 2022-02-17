"use strict";

//object enable validation
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-form',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-form_error',
  errorClass: 'popup__input-error_visible'
}); 

//-Checked active popup-
function checkedOpenedPopup(popup) {
  const allFormsList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-form',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: '.popup__submit-button_disabled',
    inputErrorClass: '.popup__input-form_error',
    errorClass: '.popup__input-error_visible'
  };
//disable save button
  const allInputsList = popup.querySelectorAll('input');
  allInputsList.forEach((inputData) => {
    if (inputData.value.length === 0) {
      disableSaveButton(allFormsList, inputData);
    }
  });
}

//-Event validation inputs-

//Enable and disable input errors
function enableInputError(formsList, inputData) {
  inputData.classList.add(formsList ['inputErrors']);
}

function disableInputError(formsList, inputData) {
  inputData.classList.remove(formsList ['inputErrors']);
}
//Submit valid message
function submitValidationMessage(inputData) {
  return inputData.validationMessage;
}
//Enable and disable text errors
function enableTextError(formsList, inputData) {
  const formInput = inputData.closest(formsList ['formSelector']);
  const inputTextError = formInput.querySelector(`.${inputData.id}-error`);
  inputTextError.textContent = submitValidationMessage(inputData);
  inputTextError.classList.add(formsList ['errorClass']);
}

function disableTextError(formsList, inputData) {
  const formInput = inputData.closest(formsList ['formSelector']);
  const inputTextError = formInput.querySelector(`.${inputData.id}-error`);
  inputTextError.classList.remove(formsList ['errorClass']);
}

//-Event validation button-
//Enable and disable save  button
function enableSaveButton(formsList, inputData) {
  const formInput = inputData.closest(formsList ['formSelector']);
  const formSaveButton = formInput.querySelector(formsList ['submitButtonSelector']);
  formSaveButton.removeAttribute('disabled');
  formSaveButton.classList.remove(formsList ['inactiveButtonClass']);
}

function disableSaveButton(formsList, inputData) {
  const formInput = inputData.closest(formsList ['formSelector']);
  const formSaveButton = formInput.querySelector(formsList ['submitButtonSelector']);
  formSaveButton.setAttribute('disabled', true);
  formSaveButton.classList.add(formsList ['inactiveButtonClass']);
}
//Verified input forms
function verificationFormInput(formsList, inputData) {
  const formInput = inputData.closest(formsList ['formSelector']);
  const enableInputForm = Array.from(formInput.querySelectorAll(formsList ['inputSelector']));
  return enableInputForm.some((inputData) => { return !inputData.validity.valid });
}

//-Validity valid-
//Verified validity button
function verifiedValidityButton(formsList, inputData) {
  const validityValidForm = verificationFormInput(formsList, inputData);
  if (!validityValidForm) {
    enableSaveButton(formsList, inputData);
  } else {
    disableSaveButton(formsList, inputData);
  }
}
//Verified validity input
function verifiedValidityInput(formsList, inputData) {
  if (!inputData.validity.valid) {
    enableInputError(formsList, inputData);
    enableTextError(formsList, inputData);
  } else {
    disableInputError(formsList, inputData);
    disableTextError(formsList, inputData);
  }
  verifiedValidityButton(formsList, inputData);
}
//Enable validation
function enableValidation(formsList) {
  const formsArray = Array.from(document.querySelectorAll(formsList ['formSelector']));
  formsArray.forEach(data => {
    const inputsArray = Array.from(data.querySelectorAll(formsList ['inputSelector']));
    inputsArray.forEach(inputData => {
      inputData.addEventListener('input', () => verifiedValidityInput(formsList, inputData));
    });
  });
}
