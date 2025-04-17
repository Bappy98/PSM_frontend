import Help from '@/components/BranchHome/Help'
import Type from '@/components/BranchHome/Type'
import AllMedicine from '@/components/public/allMedicine'
import Branches from '@/components/public/branches'
import Service from '@/components/public/service'
import Loading from '@/components/shared/Loading'
import { useBranchListQuery } from '@/store/api/branch/branchApi'
import { useGetMedicineForOrderQuery } from '@/store/api/userOrder/userOrderApiSlice'


function Home() {
  const {data} = useBranchListQuery()
  const {data:medicine} = useGetMedicineForOrderQuery()
  if(!data&&!medicine) {
    return <Loading/>
  }
  return (
    <div className=''>
         <Help/>
        <Type/>
        <AllMedicine data={medicine}/>
        <Branches data={data}/>
        <Service/>
    </div>
  )
}

export default Home