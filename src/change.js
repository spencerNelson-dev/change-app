
// createBaseMatrix and solveMatrix were taken from:
// https://en.wikipedia.org/wiki/Change-making_problem

// for the calucate function I used this video for inspiration:
// https://www.youtube.com/watch?v=Y0ZqKpToTic


export class Change {

  // creates a (coins + 1) * (value + 1) matrix
  createBaseMatrix(coins, value) {

    let matrix = []

    // our row is the length of value + 1
    let row = new Array(value + 1).fill(0, 0)

    // Our cols will be the the number of coins + 1
    for (let i = 0; i < coins.length + 1; i++) {
      matrix.push([...row])
    }

    // we set every element in the first row,
    // except for the first as infinity
    for (let i = 1; i < value + 1; i++) {

      matrix[0][i] = Infinity
    }

    return matrix
  }

  // Using classic dynamic programming by finding the combinations
  // of all smaller values that would sum to the current threshold.
  solveMatrix(coins, value) {

    let matrix = this.createBaseMatrix(coins, value)

    for (let coin = 1; coin < coins.length + 1; coin++) {

      for (let r = 1; r < value + 1; r++) {

        // just use the coin coins[coin - 1]
        if (coins[coin - 1] === r) {
          matrix[coin][r] = 1
        }
        // coins[coin - 1] cannot be included.
        // Use the previous solution for making r,
        // excluding coins[coin - 1].
        else if (coins[coin - 1] > r) {
          matrix[coin][r] = matrix[coin - 1][r]
        }
        // coins[c - 1] can be used.
        // Decide which one of the following solutions is the best
        // 1. Using the previous solution for making r (without using coins[c - 1]).
        // 2. Using the previous solution for making r - coins[c - 1] (without
        //      using coins[c - 1]) plus this 1 extra coin.
        else {
          matrix[coin][r] = Math.min(matrix[coin - 1][r], 1 + matrix[coin][r - coins[coin - 1]])
        }
      }
    }

    return matrix
  }

  calculate(coinArray = [], target) {

    // check or negitive target
    if (target < 0) {
      throw new Error("Negative totals are not allowed.")
    }

    // set the expected number of coins
    const coinMatrix = this.solveMatrix(coinArray, target)
    const expectedNumberOfCoins = coinMatrix[coinArray.length][target]

    // check to see if the target is possible
    // given the selected coins
    if (expectedNumberOfCoins === Infinity) {
      throw new Error(`The total ${target} cannot be represented in the given currency.`)
    }

    let rtnArr = []

    // set matrix location
    // this is the element that we are evaluating
    // in the coinMatrix
    let [i, j] = [coinArray.length, target]

    // while not on a zero value of the coin matrix
    while (coinMatrix[i][j] > 0) {

      // if the target is bigger than the coin
      if (j >= coinArray[i - 1]) {

        // if the element above the location is less
        // than the element to the left + 1
        // move the location up a row
        // else move the location left and add that value to the rtnArr
        if (coinMatrix[i - 1][j] < 1 + coinMatrix[i][j - coinArray[i - 1]]) {

          // go up
          i = i - 1

        } else {

          // go left
          j = j - coinArray[i - 1]

          // add this value at the current location to the return array
          rtnArr.unshift(coinArray[i - 1])
        }
        // if the target is less than the coin
      } else {

        // move the location up
        i = i - 1
      }

    } // end of while loop

    return rtnArr

  } // end of calcuate
} // end of Change class



/*
Solved using recursion with solveMatrix to check if solution is optimal

    // check or negitive target
    if(target < 0){
      throw new Error("Negative totals are not allowed.")
    }

    // set the expected number of coins
    const expectedNumberOfCoins = this.solveMatrix(coinArray, target)[coinArray.length][target]

    // check to see if the target is possible
    // given the selected coins
    if(expectedNumberOfCoins == Infinity){
      throw new Error(`The total ${target} cannot be represented in the given currency.`)
    }

    // reverse our coin array so we start with
    // the largest coin
    let reverseCoin = coinArray.reverse()

    // set our return array
    let rtnArr = []

    // set another target variable so we
    // don't changes the orginal target
    let currentTarget = target

    // count represets the index value
    // of the coin Array
    let count = 0

    // While our target is not met
    while(currentTarget != 0){

      // looking at our fist coin
      // which should be the largest
      let coin = reverseCoin[count]

      // if the coin is undefined
      // this happens when we go through each coin
      // without reaching zero
      if(coin === undefined){

        // Our "stuck" coin will be the first
        // coin in our return array
        // we will remove it from our return array
        // and add it back to the target value
        let stuckCoin = rtnArr.shift()
        currentTarget += stuckCoin

        // we will start our loop back at
        // the coin after our stuck coin
        count = reverseCoin.indexOf(stuckCoin) + 1
        coin = reverseCoin[count]
      }

      // if our coin brings our target below zero
      // we move on to the next smaller coin
      // we do not update the target
      if(currentTarget - coin < 0){

        count++
      }
      // if our coin brings our target to 0
      // then we add the coin to our return array
      // and update the target to escape the loop
      else if (currentTarget - coin == 0){

        rtnArr.unshift(coin)
        currentTarget -= coin

      }
      // if our coin leaves some target left over
      // we subtract the coin from our target and
      // add it to our return array
      else if (currentTarget - coin > 0) {

        currentTarget -= coin
        rtnArr.unshift(coin)
      }

    } // end of while

    // if we find a valid set of coins, we want
    // to make sure that it is the smallest set
    // if it is not, we run calculate again with
    // the largest coin removed
    if(rtnArr.length > expectedNumberOfCoins){

      //TODO
      // instead of popping of the largest coin,
      // we should remove the all coins greater than
      // and equal to the largest coin in the return array

      coinArray.reverse().pop()

      let newArr = coinArray

      rtnArr = this.calculate(newArr, target)

    }

    return rtnArr

*/
