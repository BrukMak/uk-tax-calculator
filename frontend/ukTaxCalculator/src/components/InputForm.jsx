import React from 'react'
import { useState } from 'react'


const InputForm = ( { calculateTax } ) => {
    const [salary, setSalary] = useState(0)
    const submitForm = (e) => {

        
        e.preventDefault()
        const title = e.target.title.value
        calculateTax(parseFloat(salary))

    }

    return (
        <form onSubmit={submitForm}> 
                <h2 className="text-3xl text-center font-semibold mb-6">Annual Salary (£)</h2>
                <div className="mb-4 text-center  w-auto justify-items-center">
                <input
                    type="float"
                    id="salary"
                    name="salary"
                    className="border rounded w-60 py-2 px-3 mb-2"
                    placeholder="eg. 30000"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 block text-center"
                type='submit'>
                    Calculate
                    </button>
                </div>
        </form>
    )
}

export default InputForm
