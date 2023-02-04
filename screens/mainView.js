document.addEventListener("DOMContextLoaded", function () {
  window.bridge.updateMessage(updateMessage);
});

function updateMessage(event, message) {
  console.log("message loagged in view");
  let element = document.getElementById("message");
  element.innerHTML = message;
}
