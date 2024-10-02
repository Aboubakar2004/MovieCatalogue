import SearchBar from "./Searchbar";

function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-transparent text-black rounded-lg shadow-lg align-top">
      <div className="text-xl font-bold">AbStream</div>
      <div className="flex-1 mx-4">
        <SearchBar />
      </div>
      <div className="text-lg">Autre chose, je ne sais pas encore</div>
    </div>
  );
}

export default Header;
