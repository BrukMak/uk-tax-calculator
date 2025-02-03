from pydantic import BaseModel
from typing import List

# Request model (input)
class TaxRequest(BaseModel):
    annual_income: float

# Tax breakdown model
class TaxBreakdown(BaseModel):
    band: str
    taxable_income: float
    tax_paid: float

# National Insurance breakdown model
class NIBreakdown(BaseModel):
    rate: str
    taxable_income: float
    contribution: float

# Response model (output)
class TaxResponse(BaseModel):
    annual_income: float
    income_tax: float
    total_national_insurance: float
    total_tax: float
    take_home_pay: float
    take_home_pay_monthly: float
    tax_breakdown: List[TaxBreakdown]
    national_insurance_breakdown: List[NIBreakdown]
