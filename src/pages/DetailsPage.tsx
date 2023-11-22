import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {Post} from "../types/postType";
import {IoChevronBackSharp} from "react-icons/io5";
import {formatDate} from "../utils/dateUtils";



const DetailsPage = () => {
    let { id } = useParams();
    let navigate = useNavigate();

    // State for storing the post data and loading state
    const [post, setPost] = useState<Post|undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Function to fetch post data
    const fetchOnePost = async () => {
        try {
            const response = await axios.get(`/api/posts`);
            if (response.status === 200){
                const post = response.data.posts.find((post: Post) => post.id === id);
                setPost(post);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    // useEffect to fetch data on component mount
    useEffect(() => {
        fetchOnePost();
    }, [id]);

    //Comeback to the home page with the filter of the category selected
    const handleCategoryClick = (categoryName: string) => {
        navigate(`/?category=${encodeURIComponent(categoryName)}`);
    };

    //Comeback to the home page
    const handleBackClick = () => {
        navigate(-1);
    };


    // Render loading state, error, or post details
    return (
        <div className="container mx-auto px-4 py-6">
            {loading ? (
                <p className="text-center">Loading ...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="flex items-center mb-4">
                <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <div className="flex flex-row">
                        <IoChevronBackSharp className="mt-0.5
                                                        cursor-pointer
                                                        text-4xl
                                                        mb-4
                                                        text-red-400
                                                        hover:text-red-500
                                                        transition
                                                        "
                                            onClick={handleBackClick}
                        />
                        <h1 className="pl-3 text-4xl font-bold text-gray-800 mb-3">{post?.title}</h1>

                    </div>
                    <p className="p-8 min-h-[500px] text-gray-600 mb-4">{post?.summary}</p>
                    <div className="flex items-center mb-4">
                        <img src={post?.author.avatar} alt={post?.author.name} className="w-10 h-10 rounded-full mr-3"/>
                        <span className="text-gray-700 font-semibold">{post?.author.name}</span>
                        <p className="text-gray-600 text-sm ml-2">{formatDate(post?.publishDate)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {post?.categories.map(category => (
                            <span key={category.id}
                                  className="bg-gray-200
                                            text-gray-700
                                            text-sm
                                            font-semibold
                                            px-2
                                            py-1
                                            rounded
                                            hover:bg-gray-300
                                            cursor-pointer
                                            "
                                  onClick={()=>handleCategoryClick(category.name)}
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                </article>
                </div>
            )}
        </div>
    );
}

export default DetailsPage;
