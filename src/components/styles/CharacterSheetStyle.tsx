import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const characterSheetStyle = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
      },
      nested: {
        display: "block",
        paddingLeft: theme.spacing(4),
      },
      list: {
        border: "medium solid #ff00ff",
        width: 500,
      },
      list2: {
        marginTop: "10px",
        border: "medium solid #ff00ff",
        width: "100%",
      },
      pad10: {
        padding: 10,
      },
      flex: {
        display: "flex",
        wrapperInner: {
          display: "flex",
        },
      },
      contents: {
        display: "contents",
      },
      charaInfosText: {
        backgroundColor: theme.palette.background.paper,
        width: 400,
      },
      editButton: {
        align:"right",
      },
      skillList: {
        width: '100%',
        backgroundColor: 'gray',
      },
      skillCollaps: {
        display:'block'
      },
      skillPointTextField: {
        width:'100px'
      },
      expandBtn: {
        width: 'auto',
      }
    })
  );