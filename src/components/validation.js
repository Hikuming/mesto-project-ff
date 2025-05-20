const showInputError = (formElement, inputElement, errorMessage, config) => {
  const erorrElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  erorrElement.textContent = errorMessage;
  erorrElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const erorrElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  erorrElement.classList.remove(config.errorClass);
  erorrElement.textContent = "";
  inputElement.setCustomValidity("");
};

const checkInputValidity = (formElement, inputElement, config) => {
  switch (inputElement.type) {
    case "url":
      if (inputElement.validity.typeMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity("");
      }
      break;
    case "text":
      if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity("");
      }
      break;
    default:
      console.log("no type");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
};
