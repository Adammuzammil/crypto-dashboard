import SingleCoin from "@/app/ui/dashboard/SingleCoin";

async function getCoinData(id) {
  const response = await fetch(`https://api.coinranking.com/v2/coin/${id}`);
  return response.json();
}

const Coin = async ({ params }) => {
  const { uuid } = params;
  const data = await getCoinData(uuid);

  return (
    <div>
      <SingleCoin data={data} />
    </div>
  );
};

export default Coin;
