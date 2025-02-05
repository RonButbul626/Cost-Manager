import React, { useState, useEffect } from "react";

const AddCost = ({ onAdd, existingCosts }) => {
    const [sum, setSum] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        // יצירת רשימה של כל המוצרים הקיימים מכל הקטגוריות
        if (existingCosts) {
            const products = existingCosts.map(cost => ({
                name: cost.description.toLowerCase(),
                category: cost.category
            }));
            setAllProducts(products);
        }
    }, [existingCosts]);

    const categories = [
        "Fruits and vegetables", "Dairy", "Bakery", "Meat and Seafood",
        "Beverages", "Packaged and Canned Goods", "Frozen Foods",
        "Snacks and Confectionery", "Personal Care and Household Items",
        "Health and Wellness", "Baby Products", "Pet Supplies",
        "Cooking and Baking Essentials", "Alcohol and Tobacco Products",
        "Ready-to-Eat and Prepared Foods"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!sum || !category || !description) {
            alert("Please fill in all fields.");
            return;
        }

        // בדיקה שהתיאור מכיל רק תווים באנגלית ומספרים
        if (!/^[a-zA-Z0-9 ]+$/.test(description)) {
            alert("The product name must be in English only.");
            return;
        }

        const lowerDescription = description.toLowerCase();

        // בדיקה אם המוצר כבר קיים
        const existingProduct = allProducts.find(product => product.name === lowerDescription);

        if (existingProduct) {
            alert(`The product already exists in the system under the category: ${existingProduct.category}`);
            return;
        }

        // הוספת המוצר
        onAdd({
            sum: parseFloat(sum),
            category,
            description,
            date: new Date().toISOString(),
        });

        setSum("");
        setCategory("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Sum:</label>
            <input type="number" value={sum} onChange={(e) => setSum(e.target.value)} required />

            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <label>Description:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

            <button type="submit">Add Cost</button>
        </form>
    );
};

export default AddCost;
