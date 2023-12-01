import { Box } from "@mui/material";
import { Chat } from "./components";

/**
 * #FED9ED Lightest
 * #E7BCDE Lighter
 * #BB9CC0 Darker
 * #67729D Darkest
 */

function App() {
  return (
    <>
      <Box sx={{ background: "black", width: "100vw", height: "100vh" }}>
        <Chat />
      </Box>
    </>
  );
}

export default App;
