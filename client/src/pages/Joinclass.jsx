import React, { useState } from 'react';
import axios from 'axios';

const JoinClassForm = ({ username,addClass, onClose }) => {
    console.log(username)
    const [classcode, setclasscode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setclasscode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the class code and student ID/username to the backend API for joining the class
            const requestData = {
                classcode,
                username
            };
            const response = await axios.post('http://localhost:3000/class/join', requestData);
            console.log('Class joined:', response.data);
            // Close the form after successful submission
            const newclass=response.data
            // addClass(newclass)
            onClose();
        } catch (error) {
            console.error('Error joining class:', error);
            // Set error message if joining the class fails
            setErrorMessage('Invalid class code. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="classcode" className="block font-semibold">Class Code:</label>
                <input
                    type="text"
                    id="classcode"
                    value={classcode}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full"
                />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-300 ease-in-out">Join Class</button>
        </form>
    );
};

export default JoinClassForm;
