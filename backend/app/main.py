from fastapi import FastAPI, UploadFile, File, HTTPException
from .models import CSVAnalysisResponse
from .utils import process_csv

app = FastAPI()

@app.post("/uploadcsv/", response_model=CSVAnalysisResponse)
async def upload_csv(file: UploadFile = File(...)):
    if file.filename.endswith('.csv'):
        try:
            data = await process_csv(file.file)
            return {"data": data}
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
    else:
        raise HTTPException(status_code=400, detail="Invalid file format")
