from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import CSVAnalysisResponse
from .utils import process_csv

app = FastAPI()

origins = [
    "http://localhost:3000",  # React frontend (Should be updated for production to be stored in env)
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
