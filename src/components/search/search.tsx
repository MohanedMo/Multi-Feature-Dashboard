import { Icon } from "@iconify/react/dist/iconify.js";
import "./search.css"

interface InputComponentProps {
  value: string;
  totalPosts: number; 
  onChange: (value: string) => void;
  onClearSearch: () => void;
}


const Search = ({value, totalPosts, onChange, onClearSearch}: InputComponentProps) => {

    const changeString = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
    return ( 
        <div className="search-section">
            <div className="search-container">
              <Icon icon="material-symbols:search-rounded"  style={{color: "#a3a3a3"}} />
              <input
                type="text"
                placeholder="Search posts by title..."
                onChange={changeString}
                value={value}
                className="search-input"
              />
              {value && (
                <button onClick={onClearSearch} className="clear-button">
                  <Icon icon="material-symbols:close-rounded"  style={{color: "#a3a3a3", marginTop:"3px"}} />
                </button>
              )}
            </div>
            <div className="search-stats">
              {value ? (
                <>
                  {totalPosts} results for "{value}"
                </>
              ) : (
                <>{totalPosts} total posts</>
              )}
            </div>
          </div>
     );
}
 
export default Search;