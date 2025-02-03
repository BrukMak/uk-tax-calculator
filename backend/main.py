from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
from models import TaxRequest, TaxResponse, TaxBreakdown, NIBreakdown

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["https://uk-tax-calculator.vercel.app/"],  # Allow requests from this origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)




def calculate_tax (annual_income: float) -> TaxResponse:
    """
    Calculate the UK Income Tax for the tax year 2024/25 based on the given income.
    
    Parameters:
        income (float): The annual gross income in pounds sterling.
        
    Returns:
        tax (float): The total income tax due.
    """
    # Tax thresholds and rates for 2024/25
    personal_allowance = 12570  # Initial Personal Allowance
    allowance_taper_threshold = 100000  # Income level where Personal Allowance starts to reduce
    allowance_zero_threshold = 125140  # Income level where Personal Allowance is zero
    basic_rate_limit = 50270  # Upper limit for Basic Rate
    higher_rate_limit = 125140  # Upper limit for Higher Rate

    # Tax rates
    basic_rate = 0.20
    higher_rate = 0.40
    additional_rate = 0.45

    # Adjust Personal Allowance for high income
    if annual_income <= allowance_taper_threshold:
        adjusted_personal_allowance = personal_allowance
    elif annual_income < allowance_zero_threshold:
        # Reduce Personal Allowance by £1 for every £2 over £100,000
        reduction = (annual_income - allowance_taper_threshold) / 2
        adjusted_personal_allowance = max(personal_allowance - reduction, 0)
    else:
        adjusted_personal_allowance = 0

    # Calculate Taxable Income
    taxable_income = max(annual_income - adjusted_personal_allowance, 0)

    # Initialize tax
    tax = 0.0
    tax_breakdown = []

    # Calculate tax for each band
    # Basic Rate
    if taxable_income > 0:
        # Calculate the upper limit for Basic Rate based on adjusted Personal Allowance
        basic_rate_threshold = (12570 if adjusted_personal_allowance == personal_allowance else 0) + 37700
        basic_rate_taxable = min(taxable_income, basic_rate_threshold)
        tax_amount = basic_rate_taxable * basic_rate
        tax += tax_amount
        tax_breakdown.append(TaxBreakdown(band="Basic Rate", taxable_income=basic_rate_taxable, tax_paid=tax_amount))
    else:
        basic_rate_taxable = 0

    # Higher Rate
    if taxable_income > basic_rate_limit:
        higher_rate_taxable = min(taxable_income - basic_rate_threshold, higher_rate_limit - basic_rate_threshold)
        tax_amount = higher_rate_taxable * higher_rate
        tax += tax_amount
        tax_breakdown.append(TaxBreakdown(band="Higher Rate", taxable_income=higher_rate_taxable, tax_paid=tax_amount))
    else:
        higher_rate_taxable = 0

    # Additional Rate
    if taxable_income > higher_rate_limit:
        additional_rate_taxable = taxable_income - higher_rate_limit
        tax_amount = additional_rate_taxable * additional_rate
        tax += tax_amount
        tax_breakdown.append(TaxBreakdown(band="Additional Rate", taxable_income=additional_rate_taxable, tax_paid=tax_amount))
    else:
        additional_rate_taxable = 0

    
    
    
    
    # National Insurance
    ni_brackets = [
        {"threshold": 50270, "rate": 0.08, "name": "8%"},
        {"threshold": float("inf"), "rate": 0.02, "name": "2%"}
    ]

    ni_paid = 0
    previous_threshold = 12570
    ni_breakdown = []

    for bracket in ni_brackets:
        if annual_income > previous_threshold:
            amount_ni = min(annual_income - previous_threshold, bracket["threshold"] - previous_threshold)
            ni_amount = amount_ni * bracket["rate"]
            ni_breakdown.append(NIBreakdown(rate=bracket["name"], taxable_income=amount_ni, contribution=ni_amount))
            ni_paid += ni_amount
            previous_threshold = bracket["threshold"]

    
    # Step 4: Final Calculation
    take_home_pay = annual_income - (tax + ni_paid)
    total_paid = tax + ni_paid
    
    return TaxResponse(
        annual_income=annual_income,
        income_tax=round(tax, 2),
        total_national_insurance=round(ni_paid, 2),
        total_tax=round(total_paid, 2),
        take_home_pay=round(take_home_pay, 2),
        take_home_pay_monthly=round(take_home_pay / 12, 2),
        tax_breakdown=tax_breakdown,
        national_insurance_breakdown=ni_breakdown
    )




@app.post("/calculate-tax", response_model=TaxResponse)
async def calculate_tax_endpoint(request: TaxRequest):
    return calculate_tax(request.annual_income)
