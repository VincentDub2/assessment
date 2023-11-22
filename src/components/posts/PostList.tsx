import {Post} from "../../types/postType";
import {useEffect, useState} from "react";
import PostBox from "./PostBox";
import {CiCircleMore} from "react-icons/ci";
import { formatDate } from "../../utils/dateUtils";

// The PostList component accepts an array of posts as props
interface PostListProps {
    posts: Post[];
}
const PostList : React.FC<PostListProps> = ({posts }) => {
    // State to manage how many posts are displayed at a time
    const postsPerPage = 10;
    const [displayedPostsCount, setDisplayedPostsCount] = useState(postsPerPage);

    // useEffect to reset the displayed posts count when the posts array changes
    useEffect(() => {
        setDisplayedPostsCount(postsPerPage);
    }, [posts]);

    // Function to load more posts
    const loadMorePosts = () => {
        setDisplayedPostsCount(prevCount => prevCount + postsPerPage);
    };

    return (
        <section className="
            grid
            grid-cols-2
            pt-32
            sm:grid-cols-2
            sm:gap-6
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-4
            ">
                {posts.slice(0, displayedPostsCount).map(post => (
                    <PostBox
                        key={post.id}
                        label={post.title}
                        id={post.id}
                        author={post.author}
                        date={formatDate(post.publishDate)}
                    />
                ))}
            {/* Load more button, only shown if there are more posts to display */}
                {displayedPostsCount < posts.length && (
                    <div className="col-span-full flex justify-center m-2">
                        {/* Wrapping the icon in a button for semantic markup and accessibility */}
                        <button onClick={loadMorePosts} aria-label="Load More Posts">
                            <CiCircleMore size={34} className="text-rose-400 hover:text-rose-200" />
                        </button>
                    </div>
                )}
        </section>
    );
}

export default PostList;