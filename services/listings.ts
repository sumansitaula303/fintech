const API_KEY = process.env.EXPO_PUBLIC_CRYPTO_API_KEY;
export const cryptoListings = async () => {
    console.log(API_KEY);
  try {
        const response = await fetch(
            "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=EUR",
            {
                headers: {
                    'X-CMC_PRO_API_KEY': API_KEY!,
                },
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching cryptocurrency listings:", error);
        throw error; // Re-throw the error after logging it
    }
};
