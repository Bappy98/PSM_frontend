
import DataGrid from "@/components/shared/dataTable/DataGrid"
import Button from "@/components/Button/Button"
import Loading from "@/components/shared/Loading"
import { useBranchListQuery } from "@/store/api/branch/branchApi"

function BranchList() {
  const {data} = useBranchListQuery()
  const COLUMN = [
    {
      Header: "No.",
      accessor: (row, i) => i + 1,
    },
    {
      Header:"Branch Name",
      accessor:row => row.user_id?.name
    },
    {
      Header:"Address",
      accessor:row => row.address
    },
    {
      Header:"Phone",
      accessor:row => row.phone
    },
  ]
  if(!data) {
    return <Loading/>
  }

  return (
    <div>
      <Button link={'/branch-create'}>Add Branch Info</Button>
      <DataGrid data={data} column={COLUMN}/>
    </div>
  )
}

export default BranchList