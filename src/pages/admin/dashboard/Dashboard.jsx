import Loading from "@/components/shared/Loading";
import { useGetMedicineQuery } from "@/store/api/medicine/medicineApiSlice";

const Dashboard = () => {
  const { data } = useGetMedicineQuery();
  if (!data) {
    return <div><Loading/></div>;
  }
const total = data.length
  const pieData = [
    { name: "Medicines", value: total },
    { name: "Stocks", value: 2000 },
    { name: "Daily sells", value: 2000 },
  ];

  return (
    <div className="flex justify-around flex-wrap">
     {
      pieData.map((item)=>(
        <div  className="bg-white rounded-2xl shadow-lg h-24 w-96 m-4 flex justify-center items-center">
        <div className="text-center text-2xl font-bold text-blue-500">
          <div>{item.value}</div>
          <div>{item.name}</div>
        </div>
      </div>
      ))
     }
    </div>
  );
};

export default Dashboard;
