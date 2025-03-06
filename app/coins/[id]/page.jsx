import SingleCoin from "@/components/dashboard/SingleCoin";

async function getCoinData(id) {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  return response.json();
}

const Coin = async ({ params }) => {
  const { id } = params;
  const data = await getCoinData(id);
  console.log(data);

  return <div>{<SingleCoin data={data} />}</div>;
};

export default Coin;
