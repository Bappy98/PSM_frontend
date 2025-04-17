import { Icon } from '@iconify/react'
import React from 'react'

function Branches({data}) {
    console.log(data);
    
  return (
    <div>
        <div className='text-2xl font-bold text-center my-8'>Branches</div>
        <div className='flex flex-wrap justify-evenly gap-5'>
            {data?.map((item,i)=>(
                <div key={i} className='w-72 justify-center text-center shadow-lg p-4'>
                    <div className='h-44 w-44 text-center mx-auto'>
                        <img src={item.logo} alt="" className='h-full w-full object-cover' />
                    </div>
                    <div>
                        <div className='font-bold text-xl'>{item.user_id.name}</div>
                        <div className='flex justify-center'><span><Icon className='text-xl mx-3 text-blue-600' icon={'heroicons:phone'}/></span>{item.phone}</div>
                        <div className='flex justify-center'><span><Icon className='text-xl text-blue-600' icon={'heroicons:map-pin-solid'}/></span><span>{item.address}</span></div>

                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Branches