import "quasar/dist/quasar.css";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v7";
// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {},
  extras: ["mdi-v7"],
  framework: {
    // svg-based example
    iconSet: "svg-mdi-v7",
  },
};
