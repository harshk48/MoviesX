import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { Link } from "react-router-dom";
import { faChevronRight, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { removeWishlist } from "./utils/authService.js";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ---- Sortable wrapper for a single card ----
const SortableMovieCard = ({ movie, selectedMode, deletewishlist, movieDetailsHandle }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: movie.imdbID });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : "auto",
    width: 280,
    flex: "0 0 auto",
    // keep the dragged card within bounds, never let it push layout wider than viewport
    maxWidth: "100%",
    boxSizing: "border-box",
  };

  return (
    <Grid ref={setNodeRef} style={style}>
      <Card
        sx={{
          width: 280,
          maxWidth: "100%",
          m: 2,
          position: "relative",
          backgroundColor: selectedMode === "Dark" ? "#2c2c2c" : "#fff",
        }}
        className="movie-card"
      >
        {/* Drag handle */}
        <Box
          {...attributes}
          {...listeners}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            cursor: "grab",
            touchAction: "none",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:active": { cursor: "grabbing" },
          }}
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </Box>

        {/* Poster */}
        <CardMedia
          component="img"
          height="300"
          image={movie.Poster}
          alt={movie.Title}
        />

        {/* Content */}
        <CardContent className="details-info">
          <Typography variant="h6">{movie.Title}</Typography>

          <Typography variant="body2" color="text.secondary">
            {movie.Year}
          </Typography>

          {/* Buttons */}
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={(e) => {
                e.preventDefault();
                deletewishlist(movie);
              }}
            >
              Remove from Wishlist
            </Button>

            <Button
              type="button"
              variant="outlined"
              color="error"
              component={Link}
              to="/details"
              onClick={movieDetailsHandle(movie.imdbID)}
            >
              Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

// ---- Main component ----
const WishList = () => {
  const { wishList, setWishList } = useContext(AuthContext);
  const { setMovieDetails, selectedMode } = useContext(AuthContext);
  const [orderedList, setOrderedList] = useState(wishList || []);

  useEffect(() => {
    setOrderedList(wishList || []);
  }, [wishList]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const deletewishlist = async (movie) => {
    try {
      const result = await removeWishlist(movie);

      if (!result?.success) {
        console.error(result?.message || "Error removing movie");
        return;
      }
      setWishList((prev) => {
        const updatedWishlist =
          result.wishlist?.length >= 0
            ? result.wishlist
            : prev.filter((item) => item.imdbID !== movie.imdbID);

        return updatedWishlist;
      });
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  const movieDetailsHandle = (id) => () => {
    const selectedMovie = orderedList.find((movie) => movie.imdbID === id);
    setMovieDetails(selectedMovie);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrderedList((items) => {
      const oldIndex = items.findIndex((i) => i.imdbID === active.id);
      const newIndex = items.findIndex((i) => i.imdbID === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);

      setWishList(newOrder);

      return newOrder;
    });
  };

  return (
    // overflowX hidden on the outer wrapper stops the page from gaining
    // a horizontal scrollbar / shifting right while a card is being dragged
    <Box sx={{ p: 2, overflow: "hidden",  maxWidth: "100%", boxSizing: "border-box" }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom className="heading">
        WishLists{" "}
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{ color: "rgb(207, 21, 21)" }}
        />
      </Typography>

      {/* Empty State */}
      {orderedList?.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 3 }}
          className="heading"
        >
          No Wishlist
        </Typography>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedList.map((m) => m.imdbID)}
            strategy={rectSortingStrategy}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                maxWidth: "100%",
                margin: 0,
                boxSizing: "border-box",
              }}
            >
              {orderedList?.map((movie) => (
                <SortableMovieCard
                  key={movie.imdbID}
                  movie={movie}
                  selectedMode={selectedMode}
                  deletewishlist={deletewishlist}
                  movieDetailsHandle={movieDetailsHandle}
                />
              ))}
            </Grid>
          </SortableContext>
        </DndContext>
      )}
    </Box>
  );
};

export default WishList;