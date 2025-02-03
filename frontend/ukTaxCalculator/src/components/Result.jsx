import React from 'react'
import { FaPoundSign } from "react-icons/fa";

const Result = ({data}) => {
  
  return (
    <>
      <div className=" w-full gap-6 justify-items-center">
            <main className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%]">
              <div className="bg-white p-6 rounded-lg text-center md:text-left">
              <h1 className="text-3xl font-bold mb-4 text-center">Tax Calculation</h1>
                
                <table className="table-auto w-full">

                  <thead>
                    <tr className='bg-indigo-200'>
                      <th className="px-4 py-2">Tax</th>
                      <th className="px-4 py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td className="border px-4 py-2 w-1/2">Annual Income</td>
                      <td className="border
                        px-4 py-2 w-1/2">£{ data.annual_income }</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Income Tax {/*<div className=' text-blue-500 text-xs '> See Breakdown</div>*/}</td>
                      <td className="border
                        px-4 py-2">£{data.income_tax}</td>
                    </tr> 
                    <tr>
                      <td className="border px-4 py-2">National Insurance  {/*<div className=' text-blue-500 text-xs '> See Breakdown</div>*/} </td>
                      <td className="border px-4 py-2">£{data.total_national_insurance}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Total Paid</td>
                      <td className="border px-4 py-2">£{data.total_tax}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Take Home per Year</td>
                      <td className="border px-4 py-2">£{data.take_home_pay}</td>

                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Take Home per Month</td>
                      <td className="border px-4 py-2">£{data.take_home_pay_monthly}</td>

                    </tr>
                  </tbody>  
                </table>
              </div>


            </main>
        </div>
    </>
  )
}

export default Result
