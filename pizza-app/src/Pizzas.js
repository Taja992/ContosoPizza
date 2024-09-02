import React, { useState, useEffect } from 'react';

function Pizzas() {
    const [pizzas, setPizzas] = useState([]);
    const [name, setName] = useState('');
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5032/pizza')
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => setPizzas(data))
            .catch(error => setError(error.message));
    }, []);

    const handleAddPizza = () => {
        const newPizza = { name, isGlutenFree, price: parseFloat(price) };

        fetch('http://localhost:5032/pizza', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPizza)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                setPizzas([...pizzas, data]);
                setName('');
                setIsGlutenFree(false);
                setPrice('');
                setError('');
            })
            .catch(error => setError(error.message));
    };

    return (
        <>
            <h1>Pizzas</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <ul>
                {pizzas.map(pizza => (
                    <li key={pizza.id}>{pizza.name} Gluten Free: {pizza.isGlutenFree ? 'Yes' : 'No'} - ${pizza.price}</li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <input
                    type="checkbox"
                    checked={isGlutenFree}
                    onChange={e => setIsGlutenFree(e.target.checked)}
                />
                <button onClick={handleAddPizza}>Add</button>
            </div>
        </>
    );
}

export default Pizzas;