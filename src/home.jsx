import React from "react";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import PublicIcon from "@mui/icons-material/Public";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import TheatersIcon from "@mui/icons-material/Theaters";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { boxVariant } from "./animation";
const Home = () => {
  return (
    <>
      <Box className="hero-section">
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Book Movies, Buy Movies To Watch Online
          </Typography>

          <Typography variant="h6" sx={{ mb: 3 }}>
            The search is over! Let movieX help you find the perfect movie to
            watch tonight for free.
          </Typography>

          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/category"
            sx={{
              bgcolor: "#a00000",
              "&:hover": { bgcolor: "#800000" },
            }}
          >
            Explore
          </Button>
        </Container>
      </Box>

      {/* 🎬 FEATURE CARDS */}
      <motion.div
        className="movie-container"
        variants={boxVariant}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
      >
        <Container sx={{ py: 5 }} >
          <Grid container spacing={4}  sx={{ display: "flex",justifyContent:"center"}}>
            {/* Card 1 */}
            <Grid item xs={12} sm={6} md={4} >
              <Card sx={{ textAlign: "center", p: 2, height: "100%" }}>
                <CardContent>
                  <PublicIcon sx={{ color: "green", fontSize: 50 }} />
                  <Typography variant="h5" sx={{ color: "green", mt: 1 }}>
                    Works Worldwide
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No other free streaming service delivers more content to and
                    from more countries worldwide.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: "center", p: 2, height: "100%" }}>
                <CardContent>
                  <OndemandVideoIcon sx={{ color: "red", fontSize: 50 }} />
                  <Typography variant="h5" sx={{ color: "red", mt: 1 }}>
                    Device-Friendly
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stream the good stuff from your favorite devices including
                    Apple, Android, Smart TVs and more.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: "center", p: 2, height: "100%" }}>
                <CardContent>
                  <TheatersIcon sx={{ color: "blue", fontSize: 50 }} />
                  <Typography variant="h5" sx={{ color: "blue", mt: 1 }}>
                    Thousands of Titles
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose from movies, shows, sports and music documentaries,
                    AMC series, Live TV and more.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </motion.div>
    </>
  );
};

export default Home;
