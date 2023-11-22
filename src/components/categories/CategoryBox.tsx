import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

// Interface defining the props for CategoryBox
interface CategoryBoxProps {
    label: string; // Label or name of the category
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
                                                     label,
                                                 }) => {
    // Hook to manage URL search parameters
    let [searchParams, setSearchParams] = useSearchParams();

    // State to track whether the category is selected
    const [selected, setSelected] = useState<boolean>(false);

    // Getting the current categories from the URL search parameters
    const selectedCategories = searchParams.getAll("category");

    // Function to toggle the category selection
    const toggleCategory = (categoryName: string) => {
        let updatedCategories = [...selectedCategories];
        const categoryIndex = updatedCategories.indexOf(categoryName);

        if (categoryIndex > -1) {
            updatedCategories.splice(categoryIndex, 1); // Remove the category if it's already present
            setSelected(false);
        } else {
            updatedCategories.push(categoryName); // Add the category if it's not present
            setSelected(true);
        }
        // Update the URL search parameters only if the categories have changed
        if (updatedCategories.length !== selectedCategories.length || !updatedCategories.every((cat, index) => cat === selectedCategories[index])) {
            setSearchParams({ category: updatedCategories });
        }
    };

    // Set the initial state based on the URL search parameters
    useEffect(() => {
        setSelected(selectedCategories.includes(label));
    }, [label,searchParams]);

    return (
        <button
            onClick={()=>toggleCategory(label)}
            aria-pressed={selected}
            className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
        >
            {/* Displaying the category label */}
            <span className="flex justify-center font-medium text-sm">
                {label}
            </span>
        </button>
    );
}

export default CategoryBox;