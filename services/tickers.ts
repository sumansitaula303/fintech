export const tickers = async () => {
  try {
        const response = await fetch(
            "https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2024-01-01&interval=1d"
        );
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const json = await response.json();
        // console.log(json)
        return json;
    } catch (error) {
        console.error("Error fetching cryptocurrency listings:", error);
        throw error; // Re-throw the error after logging it
    }
};
