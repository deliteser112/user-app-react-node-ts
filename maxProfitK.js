function maxProfitK(prices, k) {
  const n = prices.length;
  if (n <= 1 || k === 0) {
      return 0;
  }

  const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0));

  for (let i = 1; i <= k; i++) {
      let maxDiff = -prices[0];
      for (let j = 1; j < n; j++) {
          dp[i][j] = Math.max(dp[i][j - 1], prices[j] + maxDiff);
          maxDiff = Math.max(maxDiff, dp[i - 1][j] - prices[j]);
      }
  }

  return dp[k][n - 1];
}

function runTests() {
  const testCases = [
      { prices: [7, 1, 5, 3, 6, 4], k: 2 },
      { prices: [1, 2, 3, 4, 5], k: 2 },
      { prices: [7, 6, 4, 3, 1], k: 1 },
      { prices: [3, 2, 6, 5, 0, 3], k: 2 },
      { prices: [3, 3, 5, 0, 0, 3, 1, 4], k: 2 }
  ];

  testCases.forEach((testCase, index) => {
      const { prices, k } = testCase;
      const result = maxProfitK(prices, k);
      console.log(`Test Case ${index + 1}:`);
      console.log("Input:", prices, k);
      console.log("Output:", result);
      console.log("----------------------");
  });
}

runTests();