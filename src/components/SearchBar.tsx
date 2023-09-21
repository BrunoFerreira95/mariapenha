const SearchBar = ({ filter, change }) => {
  return (
    <div className="">
      <input
        type="text"
        placeholder="Pesquisar"
        className="bg-slate-100 text-black sm:w-96 w-80 sm:h-11 h-8 rounded-xl"
        value={filter}
        onChange={change}
      />
    </div>
  );
};

export default SearchBar;
