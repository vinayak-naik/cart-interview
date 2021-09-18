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
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import Card from "../components/card";
import style from "./products.module.css";
import { Add, Remove } from "@material-ui/icons";

const AllProductsComponent = ({ match }) => {
  const [addDialog, setAddDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [cartDialog, setCartDialog] = useState(false);
  const [count, setCount] = useState(1);
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [price, setPrice] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [product, setProduct] = useState([]);
  const [addSuccess, setAddSuccess] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState([]);
  const [updateId, setUpdateId] = useState([]);
  const [cart, setCart] = useState([]);

  const getProducts = async () => {
    const { data } = await axios.get(`http://localhost:2000/api/v1/product`);
    setProduct(data);
  };

  useEffect(() => {
    getProducts();
  }, [addSuccess, deleteSuccess, updateSuccess]);

  const addProductHandler = async () => {
    const { data } = await axios.post(`http://localhost:2000/api/v1/product`, {
      name,
      price,
    });
    setAddSuccess(data);
    setAddDialog(false);
    setName("");
    setPrice("");
  };
  const updateProductHandler = async () => {
    const { data } = await axios.put(
      `http://localhost:2000/api/v1/product/${updateId}`,
      { name: updateName, price: updatePrice }
    );
    setUpdateSuccess(data);
    setUpdateDialog(false);
    setUpdateName("");
    setUpdatePrice("");
  };
  const update = (id) => {
    setUpdateDialog(true);
    setUpdateId(id);
  };
  const addCart = (id) => {
    setCartDialog(true);
    setUpdateId(id);
  };
  const deleteProductHandler = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:2000/api/v1/product/${id}`
    );
    setDeleteSuccess(data);
  };

  const addCartHandler = () => {
    let checkData = cart.find((item) => item._id === updateId);

    if (checkData) {
      console.log(checkData);
    } else{
      let cartData = product.find((item) => item._id === updateId);
      const total = count * cartData.price;
      let newCartData = { ...cartData, total: total, count:count };
      cart.push(newCartData);
      setCart(cart);
      setCartDialog(false);
      setCount(1)
    }
  };
  const removeHandler=(id)=>{
    const filtered = cart.filter((item) => item._id !== id);

    setCart(filtered);

  }

  return (
    <div className={style.doc}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} className={style.addButtonBox}>
          <Button
            variant="contained"
            className={style.addButton}
            onClick={() => setAddDialog(true)}
          >
            Add Product
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {product &&
              product.map((item, k) => (
                <Card
                  name={item.name}
                  price={item.price}
                  update={() => update(item._id)}
                  delete={() => deleteProductHandler(item._id)}
                  addCart={() => addCart(item._id)}
                />
              ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} className={style.tableHead}>
            <Grid item xs={4} className={style.tabletext}>
              Product Name
            </Grid>
            <Grid item xs={2} className={style.tabletext}>
              Qty
            </Grid>
            <Grid item xs={2} className={style.tabletext}>
              Price
            </Grid>
            <Grid item xs={2} className={style.tabletext}>
              Total
            </Grid>
            <Grid item xs={2} className={style.tabletext}>
              Action
            </Grid>
          </Grid>
          {cart &&
            cart.map((item, k) => (
              <div>
                {product.find((i) => i._id === item._id) ? (
                  <Grid
                    container
                    spacing={2}
                    className={style.tableRowHead}
                    key={k}
                  >
                    <Grid item xs={4}>
                      <div>{item.name} </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div>{item.count}</div>
                    </Grid>
                    <Grid item xs={2}>
                      <div>{item.price}</div>
                    </Grid>
                    <Grid item xs={2}>
                      <div>{item.total}</div>
                    </Grid>
                    <Grid item xs={2}>
                      <Button onClick={()=>removeHandler(item._id)} style={{ backgroundColor: "red" }}>Remove</Button>
                    </Grid>
                  </Grid>
                ) : null}
              </div>
            ))}
        </Grid>
      </Grid>
      <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
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
                disabled={!name || !price}
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
      <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)}>
        <DialogTitle>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2 style={{ color: "#388e3c" }}>Update Product</h2>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Name"
                variant="outlined"
                type="text"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Price"
                variant="outlined"
                type="number"
                value={updatePrice}
                onChange={(e) => setUpdatePrice(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                disabled={!updateName || !updatePrice}
                style={{ height: 50 }}
                onClick={updateProductHandler}
              >
                {/* {loading ? <CircularProgress size={30} /> : "login"} */}
                Update
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
      </Dialog>
      <Dialog open={cartDialog} onClose={() => setCartDialog(false)}>
        <DialogTitle>
          <Box>
            <h2 style={{ color: "green" }}>Add Product</h2>
            <div className={style.countBox}>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={()=>setCount(count-1)}
                disabled={count<=1}

              ><Remove/></IconButton>
              <IconButton
                aria-label="delete"
                color="primary"
              >{count}</IconButton>

              <IconButton
                aria-label="delete"
                color="primary"
                onClick={()=>setCount(count+1)}
                disabled={count>=10}

              ><Add/></IconButton>
            </div>
            <Button
              variant="contained"
              size="large"
              fullWidth
              style={{ margin: "20px 0" }}
              onClick={addCartHandler}
            >
              Add To Cart
            </Button>
          </Box>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default AllProductsComponent;
