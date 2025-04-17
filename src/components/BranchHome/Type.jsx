import Title from '@/components/title/Title'
import { medicineType } from '@/data/Type'


function Type() {
  return (
    <div className='container mx-auto'>
       <div className='py-4'>
       <Title className={'flex justify-center'}>Our Products</Title>
       </div>
       <div className='flex flex-wrap gap-4 justify-center'>
       {medicineType.map((item,i)=>(
       <div className='bg-white rounded-lg cursor-pointer'>
         <div className='lg:h-48 h-24 lg:w-48 w-24 rounded-lg'>
          <img src={item.image} className='h-full w-full rounded-lg object-cover' alt="" />
        </div>
          <div className='text-center lg:text-xl lg:font-bold py-1'>{item.name}</div>
       </div>
       ))}
       </div>
    </div>
  )
}

export default Type