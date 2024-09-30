const API_KEY = process.env.EXPO_PUBLIC_CRYPTO_API_KEY;
export const CryptoInfo = async (ids: string) => {
    console.log(API_KEY);
    console.log(ids)
  try {
        const response = await fetch(
            `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,
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
