const Search = ({search, onSearchChange}) => {
    const inputStyle = {
        borderRadius: '6px',
        border: '1px solid #ccc',
        padding: '8px 4px'
    };

    const labelStyle = {
        marginRight: '8px'
    }
    return (
        <div>
            <label htmlFor="search" style={labelStyle}>find countries</label>
            <input id="search" type="text" style={inputStyle} value={search} onChange={onSearchChange}/>
        </div>
    );
}

export default Search;