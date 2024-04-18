const showCircle = () => {
  const styles: Partial<CSSStyleDeclaration> = {
    position: "fixed",
    left: "-9999px",
    top: "-9999px",
    width: "200px",
    height: "200px",
    borderRadius: "200px",
    backgroundColor: "rgba(255,255,0,0.4)",
    translate: "-50% -50%",
    pointerEvents: "none",
    zIndex: "calc(infinity)",
  };

  const circleElement = document.createElement("div");
  document.body.appendChild(circleElement);

  Object.assign(circleElement.style, styles);

  document.addEventListener("mousemove", (e) => {
    circleElement.style.left = `${e.clientX}px`;
    circleElement.style.top = `${e.clientY}px`;
  });

  document.addEventListener("mouseout", () => {
    circleElement.style.left = "-9999px";
    circleElement.style.top = "-9999px";
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
