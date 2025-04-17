import React from "react";

export const Checkbox = React.forwardRef(({indeterminate,...reset},ref)=>{
    const defaultRfe = React.useRef()
    const resolvedRef = ref ||defaultRfe
    React.useEffect(()=>{
        resolvedRef.current.indeterminate = indeterminate
    },[resolvedRef,indeterminate])
    return (
        <>
        <input type="checkbox" ref={resolvedRef} {...reset}/>
        </>
    )
})