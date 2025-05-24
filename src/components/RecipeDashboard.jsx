import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipeDashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const [similarRecipes, setSimilarRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the recipes!", error);
            });
    }, []);

    const handleReviewSubmit = (recipeId) => {
        axios.post(`http://localhost:5000/api/recipes/${recipeId}/review`, {
            review: "This is a sample review." // You can replace this with user input
        })
        .then(response => {
            setSimilarRecipes(response.data.similar_recipes);
        })
        .catch(error => {
            console.error("There was an error submitting the review!", error);
        });
    };

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <div>
            <h1>Recipe Dashboard</h1>
            <div className="recipe-cards">
                {recipes.map(recipe => (
                    <div className="recipe-card" key={recipe.RecipeId} onClick={() => handleRecipeClick(recipe.RecipeId)}>
                        <img src={recipe.Images} alt={recipe.Name} />
                        <h3>{recipe.Name}</h3>
                    </div>
                ))}
            </div>

            {similarRecipes.length > 0 && (
                <div>
                    <h2>Similar Recipes</h2>
                    <div className="similar-recipes">
                        {similarRecipes.map(recipe => (
                            <div key={recipe.RecipeId} className="recipe-card" onClick={() => handleRecipeClick(recipe.RecipeId)}>
                                <img src={recipe.Images} alt={recipe.Name} />
                                <h3>{recipe.Name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDashboard;
