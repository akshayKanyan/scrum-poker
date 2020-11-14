export const UserDashboardStyle = (theme) => {
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
    Story: {
      color: "blue",
      whiteSpace: "pre",
    },
    pointsCard: {
      width: "145px",
      height: "195px",
      borderRadius: "10px",
      boxShadow: "5px 5px 25px",
      fontSize: "50px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    cardsWrapper: {
      flexWrap: "wrap",
    },
    selectedStoryPoint: {
      color: "green !important",
    },
    estimationsStopped: {
      color: "white !important",
      background: "grey !important",
      cursor: "default",
    },
    estimatedStopSelected: {
      color: "white !important",
      background: "green !important",
      cursor: "default",
    },
  };
};
