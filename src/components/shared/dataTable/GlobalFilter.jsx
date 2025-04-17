

function GlobalFilter({filter,setFilter}) {
  return (
    <div className="flex justify-center my-1">
      <span>
        Search:{" "}
        <input type="text" value={filter} onChange={(e)=>setFilter(e.target.value)} className="px-2 py-1 rounded-md border"/>
      </span>
    </div>
  )
}

export default GlobalFilter