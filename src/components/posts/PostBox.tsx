// Importing necessary modules from react-router-dom and postType
import { Link } from "react-router-dom";
import { Author } from "../../types/postType";

// Defining the TypeScript interface for the props that PostBox component will accept
interface PostBoxProps {
    label: string;   // Text label or title of the post
    id: string;      // Unique identifier for the post, used for routing
    author: Author;  // Author object containing author details
    date: string;    // Date string for the post
}

const PostBox : React.FC<PostBoxProps> = ({
                                              label,
                                              id,
                                              author,
                                              date
                                          }) => {
    return (
        // Link component for client-side navigation to the details page of the post
        <Link to={`/details/${id}`} className="col-span-1 cursor-pointer group">
            <article className="flex flex-col gap-2 w-full">
                <div className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                        shadow-md
                        bg-gray-100
                        bg-gradient-to-br
                    ">
                    {/* Container for the title or label of the post */}
                    <div className="
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                        ">
                        <h3 className="p-5 flex justify-center font-semibold text-lg">
                            {/* Heading for the post's label */}
                            {label}
                        </h3>
                    </div>
                </div>
                {/* Div for displaying author's information */}
                <div className="flex flex-row items-center gap-1">
                    <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
                    <div className="font-semibold pl-2">
                        {author.name}
                    </div>
                </div>
                <time dateTime={date} className="font-light text-neutral-500 text-sm">
                    {date}
                </time>
            </article>
        </Link>
    );

}

export default PostBox;