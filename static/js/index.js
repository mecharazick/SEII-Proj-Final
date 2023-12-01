const BASEURL = "http://127.0.0.1:5000";

// map cart buttons
(function () {
  const BUTTONPREFIX = "#button";
  function ButtonFactory(id, element, handler) {
    if(!id || !element || !handler) {
        throw new Error("Missing parameter to make button");
    }
    return {
      id,
      element,
      handler: handler.bind(this),
    };
  }
  const buttons = [];
  for (i = 0; i < 5; i++) {
    const buttonId = `${BUTTONPREFIX}-${["left", "forward", "back", "right", "stop"][i]}`;
    const buttonEl = document.querySelector(buttonId);
    const buttonHandler = (e) => {
      e.preventDefault();
      console.log("clicked");
      const body = {
        command: buttonId.split("-")[1]
      };
      requestCommand(JSON.stringify(body));
    };
    buttons[i] = new ButtonFactory(buttonId, buttonEl, buttonHandler);
  }
  buttons.forEach(({ element, handler }) => {
    element.addEventListener("click", handler);
  });

  function requestCommand(body = undefined) {
    const METHOD = "POST";
    const CONTENTTYPE = "application/json"
    const url = new URL(`/command`, BASEURL);
    const request = new XMLHttpRequest();
    const handleRequestLoad = (ev) => {
        console.log(`Received response from ${request.responseURL}`);
    }
    request.addEventListener("load", handleRequestLoad);
    request.open(METHOD, url, true);
    if (!!body) {
      request.setRequestHeader("Content-Type", CONTENTTYPE);
      request.send(body);
      return;
    }
    request.send();
    return;
  }
})();

function strToBool(str) {
  if (str == "true") return true;
  else if (str == "false") return false;
  else return undefined;
}
