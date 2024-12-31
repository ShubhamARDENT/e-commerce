import { Container, Typography, Box, Button } from "@mui/material";

import { useRouteError, Link } from "react-router";

const Error = () => {
  interface RouteError {
    message: string;
    data?: string;
    status: number;
    error: string;
  }
  const error = useRouteError() as RouteError;

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          background: "gray",
          padding: "20px",
          borderRadius: "6px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component={"p"} sx={{ marginBottom: "10px" }}>
          {error.data}
        </Typography>
        <Typography component={"p"} sx={{ marginBottom: "10px" }}>
          error status: {error.status}
        </Typography>
        <Link to="/">
          <Button sx={{ background: "white", color: "black" }}>
            Back to Home page
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Error;
