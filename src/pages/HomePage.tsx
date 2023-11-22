// Import of axios
import axios from "axios";
// Import of useState to manage state
import {useEffect, useState} from "react";
import { useSearchParams } from 'react-router-dom';
// Import of types for post
import {Post} from "../types/postType";
import FilterBar from "../components/categories/FilterBar";
import PostList from "../components/posts/PostList";
import Container from "../components/Container";

const HomePage = () => {

    // State for posts
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // Not use

    // State for filtered posts
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [searchParams] = useSearchParams();
    const selectedCategories = searchParams.getAll("category");


    // Fetch posts from API
    const getPosts = async () => {
        try {
            const response = await axios.get(`/api/posts`);
            if (response.status === 200){
                setPosts(response.data.posts);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // useEffect for fetching posts, no dependency on 'posts'
    useEffect(() => {
        getPosts();
    }, []);

    // Function to filter posts by selected categories
    const filterPostsByCategories = (posts: Post[], selectedCategories: string[]) => {
        if (selectedCategories.length === 0) {
            // If no category is selected, return all posts
            return posts;
        }

        return posts.filter(post =>
            // Check if every selected category is present in the post's categories
            selectedCategories.every(selectedCat =>
                post.categories.some(category => category.name === selectedCat)
            )
        );
    };

    useEffect(() => {
        const updatedFilteredPosts = filterPostsByCategories(posts, selectedCategories);
        setFilteredPosts(updatedFilteredPosts);
    }, [searchParams,posts]);

    // Function to get distinct categories
    function getDistinctCategories() {
        const allCategories = new Set(posts.flatMap(post => post.categories.map(cat => cat.name)));
        return Array.from(allCategories).map(catName => ({ id: catName, name: catName }));
    }

    return (
        <div className="mx-auto px-4 py-6">
            {loading ? (
                <p className="text-center">Loading ...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
        <div className=""
        >
            <FilterBar categories={getDistinctCategories()} />
            <Container>
                <PostList posts={filteredPosts} />
            </Container>
        </div>
            )}
        </div>
    );
}

export default HomePage;
