import SingleCoin from "@/app/ui/dashboard/SingleCoin";

async function getCoinData(name) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${name}`
  );
  return response.json();
}

const Coin = async ({ params }) => {
  const { name } = params;
  const coinName = name.toLowerCase();
  const data = await getCoinData(coinName);

  return <div>{<SingleCoin data={data} />}</div>;
};

export default Coin;
