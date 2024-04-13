import { Box } from "@mui/material";
import { Logout } from "@mui/icons-material";

function SignOut() {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <Box
        onClick={logOut}
        sx={{ cursor: "pointer" }}
        display="flex"
        alignItems="center"
      >
        <Logout /> Log Out
      </Box>
    </>
  );
}

export default SignOut;
