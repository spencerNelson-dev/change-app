import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import { Change } from './change'

function App() {

  const [coins, setCoins] = React.useState('1,5,10,25,50')
  const [target, setTarget] = React.useState('123')
  const [solution, setSolution] = React.useState('Your change will be here!')

  const paperStyle = {
    margin: 16,
    padding: 16
  }

  const onClickHandler = () => {

    // change our coins string into an array
    // remove whitespace and split at commas
    let coinsArray = coins.replace(/\s/g, '').split(',')

    // change the string to numbers
    for (let index = 0; index < coinsArray.length; index++) {
      coinsArray[index] = Number(coinsArray[index])
    }

    // change the target to a number
    let myTarget = Number(target)

    // create a change object
    const change = new Change()


    try {
      // get our solution
      let mySolution = change.calculate(coinsArray, myTarget)

      // sort our solution
      mySolution = mySolution.sort((a, b) => a - b)

      // set our state
      setSolution(mySolution.toString())
    } catch (error) {
      //if an error set state to our error message
      setSolution(error.message)
    }

  }

  return (
    <div style={{ padding: '0 25% 0 25%', textAlign: 'center' }}>
      <Grid container justify='center' direction='column' >
        <Grid item >
          <Paper elevation={3} style={paperStyle}>
            <div>
              <h1>Change Maker</h1>
            </div>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} style={paperStyle}>
            <div style={{ padding: '0 25% 0 25%' }}>
              <TextField id="coins"
                label="Coins"
                value={coins}
                onChange={(event) => { setCoins(event.target.value) }}
                fullWidth
                helperText='seperate coin values by commas'
              />

              <br />
              <TextField id="target"
                label="Your target value"
                fullWidth
                value={target}
                onChange={(event) => { setTarget(event.target.value) }}
                helperText='its got to be a number'
              />
            </div>
            <div>
              <Button onClick={onClickHandler} variant='contained' color='primary'>Find the Change!</Button>
            </div>
          </Paper>
        </Grid>
        <Grid item >
          <Paper elevation={3} style={paperStyle}>
            <div>
              <h2>Your Change is...</h2>
            </div>
            <div>
              {solution}
            </div>
          </Paper>
        </Grid>
      </Grid>


    </div>
  )
}

export default App;
