export function openModal(popupFrame, classActive, keydownHandle) {
  popupFrame.classList.add(classActive);
  document.addEventListener("keydown", keydownHandle)
    
}

export function closeModal(popupFrame, classActive, keydownHandle) {
  popupFrame.classList.remove(classActive);
  document.removeEventListener("keydown", keydownHandle)
}

export function closeModalBackdrop({ currentTarget, target }) {
  const classActive = "popup_is-opened";
  if (currentTarget === target) {
    closeModal(currentTarget, classActive);
  }
}

