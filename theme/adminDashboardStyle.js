export const AdminDashboardStyle = (theme) => {
  return {
    dummyButton: {
      [theme.breakpoints.down("xs")]: {},
    },
    roomName: {
      color: "red",
    },
    tableCell: {
      fontWeight: "bold",
    },
    Button: {
      width: 200,
      marginTop: 30,
    },
    textField: {
      width: 200,
    },
    container: {
      "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))",
      "grid-auto-rows": "minmax(200px, auto)",
      "grid-gap": "1em",
    },
    cardContainer: {
      maxWidth: "100%",
      "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))",
      "grid-auto-rows": "minmax(300px, auto)",
      background: theme.customColors.fafafa,
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        minWidth: "100%",
      },
    },
  };
};
