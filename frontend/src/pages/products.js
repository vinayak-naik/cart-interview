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
  Dialog,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import Card from "../components/card";
import style from "./products.module.css";

const AllProductsComponent = ({ match }) => {
  const [addDialog, setAddDialog]=useState(false)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState([]);
  const [addSuccess, setAddSuccess] = useState([]);


  const getProducts=async()=>{
    const { data } = await axios.get(
      `http://localhost:2000/api/v1/product`
    );
    setProduct(data);
  }
  console.log(product)

  useEffect(() => {
    getProducts()
  }, [addSuccess])

const addProductHandler=async()=>{
  const { data } = await axios.post(
    `http://localhost:2000/api/v1/product`,
    { name, price },
  );
  setAddSuccess(data)
  setAddDialog(false)
  setName("")
  setPrice("")
}
  return (
    <div className={style.doc}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} className={style.addButtonBox}>
          <Button variant="contained" className={style.addButton} onClick={()=>setAddDialog(true)}>
            Add Product
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            
            {product && product.map((item, k)=>(
            
<Card name={item.name} price={item.price}/>

            ))}






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
          {product && product.map((item, k)=>(
            <Grid container spacing={2}  className={style.tableRowHead} key={k}>
            <Grid item xs={4} > <div>{item.name} </div></Grid>
            <Grid item xs={2} > <div>{item.price} </div></Grid>
            <Grid item xs={2} > <div>Price </div></Grid>
            <Grid item xs={2} > <div>Total </div></Grid>
            <Grid item xs={2} > <div>Action </div></Grid>
          </Grid>


          ))}
          
        </Grid>
      </Grid>
      <Dialog open={addDialog} onClose={()=>setAddDialog(false)}>
        <DialogTitle>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2 style={{ color: "#388e3c" }}>Add Product</h2>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Name"
                variant="outlined"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Price"
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            
            

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                disabled={!name || !price }
                style={{ height: 50 }}
                onClick={addProductHandler}
              >
                {/* {loading ? <CircularProgress size={30} /> : "login"} */}
                create
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default AllProductsComponent;
