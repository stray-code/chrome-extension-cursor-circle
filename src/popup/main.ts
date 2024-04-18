import van from "vanjs-core";

const App = () => {
  const { div, input, label } = van.tags;

  const enabled = van.state(true);

  chrome.storage.local.get(["SETTINGS"], (value) => {
    if (!value?.SETTINGS) {
      return;
    }

    enabled.val = value.SETTINGS.enabled;
  });

  return div(
    {
      style: "white-space: nowrap",
    },
    label(
      input({
        id: "enabled",
        type: "checkbox",
        checked: enabled,
        onchange: async (e) => {
          enabled.val = e.target.checked;

          chrome.storage.local.set({
            SETTINGS: {
              enabled: enabled.val,
            },
          });

          const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });

          if (!tab.id) {
            return;
          }

          chrome.tabs.sendMessage(tab.id, { type: "RELOAD" });
        },
      }),
      "表示する",
    ),
  );
};

van.add(document.getElementById("app")!, App());
