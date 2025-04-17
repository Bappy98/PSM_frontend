import { Link } from "react-router-dom"


function Button({children,className='justify-end',link,type,onclick}) {
  return (
    <div className={`${className} flex  py-5 mx-5`}>
       <Link to={link}>
       <button type={type} onClick={onclick}  className="relative flex items-center justify-center p-3 bg-blue-500 text-white rounded"
    >{children}</button>
       </Link>
    </div>
  )
}

export default Button