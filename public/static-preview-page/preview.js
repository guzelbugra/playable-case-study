document.addEventListener("DOMContentLoaded", contentReady);

function contentReady() {
  // send ping to notify content loaded
  window.top.postMessage(
    JSON.stringify({
      type: "Loaded",
      message: "Ready",
    }),
    "*"
  );
  // adding event listener in order to recieve data when change occurs
  window.addEventListener("message", function (e) {
    const data = e.data;

    switch (data.type) {
      case "Select":
        document.getElementById("selectInput").innerText = data.content;
        break;
      case "Switch":
        document.getElementById("switchInput").innerText = data.content;
        break;
      case "Text":
        document.getElementById("textInput").innerText = data.content;
        break;
      case "Image":
        document
          .getElementById("imageInput")
          .setAttribute(
            "src",
            data.content || `${window.location.origin}/empty-image.png`
          );
        break;
      default:
        console.log("Type Not Found");
    }
  });
}
