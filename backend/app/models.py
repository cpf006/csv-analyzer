from pydantic import BaseModel
from typing import Union, Dict, Any

class NumericColumnStats(BaseModel):
    average: float
    min: float
    max: float
    std_dev: float
    missing_values: int
    unique_count: int

class NonNumericColumnStats(BaseModel):
    unique_values: int
    most_common: str
    value_counts: Dict[str, int]
    top_n_values: Dict[str, int]
    missing_values: int
    unique_count: int

ColumnStats = Union[NumericColumnStats, NonNumericColumnStats]

class CSVAnalysisResponse(BaseModel):
    data: Dict[str, Any]
