import "./style.css";

const showCircle = () => {
  const circleElement = document.createElement("div");
  circleElement.classList.add("chrome-extension-cursor-circle");

  document.body.appendChild(circleElement);

  circleElement.style.setProperty("left", "-9999px", "important");
  circleElement.style.setProperty("top", "-9999px", "important");

  document.addEventListener("mousemove", (e) => {
    circleElement.style.setProperty("left", `${e.clientX}px`, "important");
    circleElement.style.setProperty("top", `${e.clientY}px`, "important");
  });

  document.addEventListener("mouseleave", () => {
    circleElement.style.setProperty("left", "-9999px", "important");
    circleElement.style.setProperty("top", "-9999px", "important");
  });
};

const init = () => {
  chrome.storage.local.get(["SETTINGS"], (value) => {
    if (!value?.SETTINGS?.enabled) {
      return;
    }

    showCircle();
  });
};

init();

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "RELOAD") {
    window.location.reload();
  }
});
