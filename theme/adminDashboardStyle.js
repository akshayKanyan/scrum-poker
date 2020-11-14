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
      maxHeight: 37,
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
    storyArea: {
      marginRight: 30,
      width: 1000,
    },
    cardName: {
      fontWeight: "bold",
      marginTop: 20,
    },
    cardsWrapper: {
      flexWrap: "wrap",
    },
    doneEstimation: {
      backgroundColor: "green",
      height: "100%",
      width: "100%",
      opacity: 0.6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    doneIcon: {
      fontSize: "73px",
      color: "white",
    },
    flipTheCard: {
      transform: "rotateY(180deg)",
    },
    backCard: {
      transform: "rotateY(180deg)",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "50px",
    },
    notAnswred: {
      fontSize: "15px",
    },
  };
};
