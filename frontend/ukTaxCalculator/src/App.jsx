import React from 'react'
import Hero from './components/Hero'
import InputForm from './components/InputForm'
import Result from './components/Result'
import Breakdown from './components/Breakdown'
import { useState } from 'react'


const App = () => {
  const [data, setData] = useState({
    annual_income: 0,
    income_tax: 0,
    national_insurance_breakdown: [],
    take_home_pay: 0,
    take_home_pay_monthly: 0,
    tax_breakdown: [],
    total_national_insurance: 0,
    total_tax: 0,

  });

  const calculateTax = async (salary) => {
    console.log(salary, typeof salary)
    try {
      const res = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ annual_income: salary }),  // Correct structure
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(data);  // Log the result
      setData(data);  // Set the result
      return data;  // Return the result
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <Hero />
      <InputForm calculateTax = {calculateTax} />
      <Result data={data}/>
  
    </>
    )
}

export default App
