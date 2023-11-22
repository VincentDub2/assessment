import { Category } from "../../types/postType";
import CategoryBox from "./CategoryBox";

// Interface defining the props for FilterBar
interface FilterBarProps {
    categories: Category[]; // Array of category objects
}

const FilterBar: React.FC<FilterBarProps> = ({ categories }) => {
    return (
        <nav className="fixed w-full bg-white z-10 shadow-sm">
            {/* Flex container for the category boxes */}
            <ul className="flex flex-row items-stretch justify-between overflow-x-auto">
                {categories.map((item) => (
                    <li key={item.id} className="flex items-stretch">
                        <CategoryBox label={item.name}/>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default FilterBar;
