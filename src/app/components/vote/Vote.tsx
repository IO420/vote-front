'use client'; // Ensure this is a client component
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useFetch } from '@/app/services/fetch';
 // Adjust the path to where your useFetch is located

export default function Vote() {
  const pathname = usePathname();
  const id = pathname.split('/').pop(); // Assuming the ID is at the end of the URL

  // State to manage form input values
  const [option, setOption] = useState('');
  const { fetchData, error } = useFetch(); // Using the custom fetch hook

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare data to be sent to the backend
    const data = {
      id_elections: id, // Use the ID from the URL
      option,
    };

    try {
      // Use the custom fetch function to send data
      const result = await fetchData(data, '/user-elections', 'POST', true); // Use the token

      console.log(result); // Handle success as needed

      // Clear form after submission
      setOption(''); // Clear option
    } catch (err) {
      console.error("Submission error:", err); // Handle errors if needed
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2 className="title">Vote</h2>

        <label>Vote Option</label>
        <input 
          type="text" 
          value={option} 
          onChange={(e) => setOption(e.target.value)} 
          required // Make this field required
        />

        <button type="submit">Submit</button>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if present */}
      </form>
    </div>
  );
}
