import Title from '@/components/title/Title'
import { useGetMedicineQuery } from '@/store/api/medicine/medicineApiSlice'
import { textSlice } from '@/util/textSlice';
import { Link } from 'react-router-dom';


function Medicine() {
  const {data:medicine,error} = useGetMedicineQuery()
  console.log(medicine);
  //const {data} = medicine

  
  return (
    <div>
      <Title>Medicine</Title>
      <div className='flex lg:gap-5 flex-wrap justify-around'>
      {medicine.map((item,i)=>(
        <div className='border-4 w-52 lg:w-96 lg:h-[29rem]'>
          <div className='lg:h-64 lg:w-96 lg:p-6 h-24 w-32'><img src={item.image} alt={item.name} className='h-full w-full object-contain' /></div>
          <div className='flex justify-between lg:mx-4 justify-items-stretch my-auto'>
          <div className=''>
          <div className='flex gap-5 flex-wrap items-center'>
          <div className='lg:text-2xl'>{item.name}</div>
          <div className='font-bold'>{item.dosages}</div>

          </div>
          <div>Type: {item.type}</div>
          <div>Price: {item.unitPrice}</div>
          </div>
          <div><img src={item.company?.logo} alt="" className='lg:h-12 lg:w-12 h-4 w-4' /></div>
          </div>
          {/* <div>{item.dosages}</div> */}
          <div className='m-2 text-lg text-justify hidden lg:block'>{textSlice(item.description,75)}</div>
          <Link className='bg-green-600 text-center block lg:mx-6 lg:p-1  text-white'>Read More</Link>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Medicine