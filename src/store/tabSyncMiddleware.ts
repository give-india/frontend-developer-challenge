var attachedEventListener = false;

export const tabSync = (store: any) => (next: any) => (action: any) => {
  if (!attachedEventListener) {
    window.addEventListener(
      "storage",
      (event: any) => {
        try {
          if (event.key !== "persist:root") {
            let crossTabAction = JSON.parse(event.newValue);
            store.dispatch(crossTabAction);
          }
        } catch (err) {}
      },
      false
    );
    attachedEventListener = true;
  }
  localStorage.setItem(action.type, JSON.stringify(action));
  next(action);
};
