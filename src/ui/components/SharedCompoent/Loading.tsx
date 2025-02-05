import { Backdrop, CircularProgress } from "@mui/material";

const Loading = ({ open }: { open: boolean }) => {
  return (
    <Backdrop
      sx={{
        color: "#03f8fc",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
