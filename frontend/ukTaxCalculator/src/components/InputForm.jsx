import React from 'react'
import { useState } from 'react'


const InputForm = ( { calculateTax } ) => {
    const [salary, setSalary] = useState(0)
    const [loading, setLoading] = useState(false);
   
    const submitForm = async (e) => {
        try {
            e.preventDefault()
            console.log(salary, typeof salary)
            setLoading(true)
            await calculateTax(parseFloat(salary))
        }catch(error){
            console.error('Error:', error)
        }finally {
            setLoading(false)
        };


    };

    return (
        <form onSubmit={submitForm}> 
                <h2 className="text-3xl text-center font-semibold mb-6">Annual Salary (£)</h2>
                <div className="mb-4 text-center justify-items-center w-full">
                <input
                    type="number"
                    id="salary"
                    name="salary"
                    className="border rounded w-80 py-2 px-3 mb-2"
                    placeholder="eg. 30000"
                    required
                    min={0}
                    step={0.0001}
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block text-center"
                type='submit'
                disabled={loading}
                >
                    {loading ? "Loading ..." : "Calculate" }
                    </button>
                </div>
        </form>
    )
}

export default InputForm
