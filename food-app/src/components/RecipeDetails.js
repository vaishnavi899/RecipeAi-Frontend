import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [review, setReview] = useState("");
    const [similarRecipes, setSimilarRecipes] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/recipes/${recipeId}`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the recipe details!", error);
            });
    }, [recipeId]);

    const handleReviewSubmit = () => {
        axios.post(`http://localhost:5000/api/recipes/${recipeId}/review`, { review })
            .then(response => {
                setSimilarRecipes(response.data.similar_recipes);
            })
            .catch(error => {
                console.error("There was an error submitting the review!", error);
            });
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{recipe.Name}</h1>
            <img src={recipe.Images} alt={recipe.Name} style={{ width: '300px', height: 'auto' }} />
            <p>{recipe.Description}</p>

            <div>
                <h3>Submit Your Review</h3>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    rows="4"
                    cols="50"
                />
                <button onClick={handleReviewSubmit}>Submit Review</button>
            </div>

            {similarRecipes.length > 0 && (
                <div>
                    <h2>Similar Recipes</h2>
                    <div className="similar-recipes">
                        {similarRecipes.map(similarRecipe => (
                            <div key={similarRecipe.RecipeId} className="recipe-card">
                                <img src={similarRecipe.Images} alt={similarRecipe.Name} />
                                <h3>{similarRecipe.Name}</h3>
                                <button onClick={() => navigate(`/recipe/${similarRecipe.RecipeId}`)}>
                                    View Recipe
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetail;
