

function Title({children,className}) {
  return (
    <div className={`md:text-start md:text-xl mx-5 font-semibold mb-5 text-center ${className}`}>{children}</div>
  )
}

export default Title