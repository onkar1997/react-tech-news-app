import { useGlobalContext } from "../context"

const Search = () => {

  const { query, searchPost } = useGlobalContext();

  return (
    <>
      <h1>!! TECHY NEWS !!</h1>
      <hr />
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Search here..." name="query" value={query} onChange={(e) => searchPost(e.target.value)} />
      </form>
    </>
  )
}

export default Search