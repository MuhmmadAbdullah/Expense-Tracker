import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import { ExpenseTrackerContext } from '../../../context/content';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../../../constants/categories'
import formatDate from '../../../utils/formatDate';
const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
}
const Form = () => {
  const classes = useStyles();
  const [formDate, setFormDate] = useState(initialState)
  const { addTransaction } = useContext(ExpenseTrackerContext);

  const createTransaction = () => {
    const transactions = { ...formDate, amount: Number(formDate.amount), id: uuidv4() }
    addTransaction(transactions);
    setFormDate(initialState);
  }

  const selectedCategories = formDate.type === 'Income' ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          ....
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={formDate.type} onChange={(e) => setFormDate({ ...formDate, type: e.target.value })}>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={formDate.category} onChange={(e) => setFormDate({ ...formDate, category: e.target.value })}>
            {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField type="number" label="Amount" fullWidth value={formDate.amount} onChange={(e) => setFormDate({ ...formDate, amount: e.target.value })} />
      </Grid>
      <Grid item xs={6}>
        <TextField type="date" label="Date" fullWidth value={formDate.date} onChange={(e) => setFormDate({ ...formDate, date: formatDate(e.target.value) })} />
      </Grid>
      <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
    </Grid>
  );
};

export default Form;
