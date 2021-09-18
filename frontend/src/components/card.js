import { Box, Button, Grid } from "@material-ui/core";
import React from "react";
import style from "./card.module.css";
import { Delete, Edit } from "@material-ui/icons"; 

const Card = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box className={style.box}>
        <Box className={style.innerBox}>
          <Grid container spacing={2} direction="column">
            <Grid item className={style.imageBox}>
              Image
            </Grid>
            <Grid item className={style.text}>
              Product Name
            </Grid>
            <Grid item className={style.text}>
              Price
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                fullWidth
                className={style.cartButton}
              >
                Add To Cart
              </Button>
            </Grid>
            <Grid item className={style.buttonBox}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                className={style.editButton} 
              >
                Edit
              </Button>
              <Button
                variant="contained"
                endIcon={<Delete />}
                className={style.deleteButton}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default Card;
