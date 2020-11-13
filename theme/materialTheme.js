import { createMuiTheme } from "@material-ui/core/styles";
import { constCustomColors, containerWidth } from "./sCTheme";
export const materialTheme = createMuiTheme({
  customColors: {
    ...constCustomColors,
  },
  containerWidth,
});
