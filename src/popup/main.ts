import van from "vanjs-core";

import { getLocalStorage, setLocalStorage } from "../utils";

const App = () => {
  const { div, input, label } = van.tags;

  const enabled = van.state(true);

  const init = async () => {
    const settings = await getLocalStorage("settings");

    if (!settings) {
      return;
    }

    enabled.val = settings.enabled;
  };

  init();

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

          await setLocalStorage("settings", { enabled: enabled.val });

          const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });

          if (!tab.id) {
            return;
          }

          await chrome.tabs.reload(tab.id);

          window.close();
        },
      }),
      "カーソルに円を表示する",
    ),
  );
};

van.add(document.getElementById("app")!, App());
