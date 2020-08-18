import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  

export default function TableProducts() {
    const classes = useStyles();
    
    const [product, setProduct] = useState({ products: [] });
    useEffect(() => {
        loadUsers();
      }, []);

        const loadUsers = async () => {
            const result = await axios(
                'http://localhost:5000/product',
            );

            setProduct(result.data);
        };
        
    const { products } = product;

    const deleteUser = async _id => {
        await axios.delete(`http://localhost:5000/product/delete/${_id}`);
          loadUsers();
    };


    return (

        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell>{product.desc}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.image}</TableCell>
                <TableCell>
                <Button variant="contained" color="primary">Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => deleteUser(product._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }