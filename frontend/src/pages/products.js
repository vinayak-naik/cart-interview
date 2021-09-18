import { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import {
  Box,
  Grid,
  Paper,
  CircularProgress,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import Card from "../components/card";
import style from "./products.module.css";

const AllProductsComponent = ({ match }) => {
  return (
    <div className={style.doc}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} className={style.addButtonBox}>
          <Button variant="contained" className={style.addButton}>
            Add Product
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}  className={style.tableHead}>
            <Grid item xs={4} className={style.tabletext}>Product Name</Grid>
            <Grid item xs={2} className={style.tabletext}>Qty</Grid>
            <Grid item xs={2} className={style.tabletext}>Price</Grid>
            <Grid item xs={2} className={style.tabletext}>Total</Grid>
            <Grid item xs={2} className={style.tabletext}>Action</Grid>
          </Grid>
          <Grid container spacing={2}  className={style.tableRowHead}>
            <Grid item xs={4} className={style.tableRowtext}>Product Name</Grid>
            <Grid item xs={2} className={style.tableRowtext}>Qty</Grid>
            <Grid item xs={2} className={style.tableRowtext}>Price</Grid>
            <Grid item xs={2} className={style.tableRowtext}>Total</Grid>
            <Grid item xs={2} className={style.tableRowtext}>Action</Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AllProductsComponent;
