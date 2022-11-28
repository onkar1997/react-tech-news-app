import { useGlobalContext } from "../context"

const Pagination = () => {

  const {page, nbPages, getPrevPage, getNextPage} = useGlobalContext()

  return (
    <>
      <div className="pagination-btn">
        <button onClick={() => getPrevPage()}>PREV</button>
        <p className="page-num">{page+1} of {nbPages}</p>
        <button onClick={() => getNextPage()}>NEXT</button>
      </div>
    </>
  )
}

export default Pagination