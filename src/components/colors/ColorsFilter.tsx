import { TextField } from "@mui/material";

const ColorsFilter = ({ searchTerm, setSearchTerm }: any) => {
  return (
    <TextField
      label="Search by name or hex"
      placeholder="Type something"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ marginBottom: "20px" }}
    />
  );
};

export default ColorsFilter;
