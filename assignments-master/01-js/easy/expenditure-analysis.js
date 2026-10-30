/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  }
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let ans = [];
  for (let i = 0; i < transactions.length; i++) {
    let curr = transactions[i];
    let z = false;
    for (let j = 0; j < ans.length; j++) {
      if (ans[j]?.category === curr.category) {
        ans[j].totalSpent = ans[j].totalSpent + curr.price;
        z = true;
      }
    }
    if (!z) {
      ans.push({ category: curr.category, totalSpent: curr.price })
    }
  }
  return ans;
}

module.exports = calculateTotalSpentByCategory;
