import pandas as pd
from fastapi import UploadFile
import io

async def process_csv(file: UploadFile):
    contents = file.read()
    df = pd.read_csv(io.BytesIO(contents))
    results = {}
    for column in df.columns:
        if pd.api.types.is_numeric_dtype(df[column]):
            results[column] = {
                "average": round(float(df[column].mean()), 2),
                "min": int(df[column].min()),
                "max": int(df[column].max()),
                "std_dev": round(float(df[column].std()), 2)
            }
        else:
            value_counts = df[column].value_counts().to_dict()
            top_five = df[column].value_counts().head(5).to_dict() 

            results[column] = {
                "unique_values": int(df[column].nunique()),
                "most_common": str(df[column].mode().iloc[0]),
                "value_counts": {k: int(v) for k, v in value_counts.items()},
                "top_5_values": {k: int(v) for k, v in top_five.items()}
            }

        results[column]["missing_values"] = int(df[column].isnull().sum())
        results[column]["unique_count"] = int(df[column].nunique())

    return results
