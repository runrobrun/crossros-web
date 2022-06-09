import packageJson from "../../package.json";

export const environment = {
  version: packageJson.version,
  production: true,
  useEmulators: false,
  firebase: {
    apiKey: "AIzaSyBnCEFqnF15WOwueCrsEUBfd8gACOTkmOg",
    authDomain: "xc-roster-manager.firebaseapp.com",
    databaseURL: "https://xc-roster-manager.firebaseio.com",
    projectId: "xc-roster-manager",
    storageBucket: "xc-roster-manager.appspot.com",
    messagingSenderId: "136786443589",
    appId: "1:136786443589:web:f1ad366e45775bed0d922c",
    measurementId: "G-VX8R78XYDQ"
  }
};
