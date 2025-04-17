import {apiSlice} from './../apiSlice'

export const userOrderApi = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getMedicineForOrder:builder.query({
            query:()=>({
                url:"/stock",
                method:"GET"
            })
        })
    })
})

export const {useGetMedicineForOrderQuery} = userOrderApi