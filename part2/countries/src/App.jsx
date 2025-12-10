import { useState } from "react"
import Search from "./components/Search"
import Countries from "./components/Countries";

function App() {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => setSearch(event.target.value);

  return (
    <>
     <Search search={search} onSearchChange={handleSearchChange}/>
     <Countries search={search} />
    </>
  )
}

export default App
