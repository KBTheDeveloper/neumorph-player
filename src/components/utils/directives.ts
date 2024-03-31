export const moveCaret = (el, position) => {
  switch (position) {
    case "end":
      if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
      } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        const range = el.createTextRange();
        range.collapse(false);
        range.select();
      }
      break;
    case "start":
      if (typeof el.selectionStart == "number") {
        el.selectionEnd = el.selectionStart = el.value.length;
      } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        const range = el.createTextRange();
        range.collapse(true);
        range.select();
      }
  }
};
