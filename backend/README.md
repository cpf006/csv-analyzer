## Install requirements
```bash
pip install requirements.txt
```

## Run Server
```bash
uvicorn app.main:app --reload
```

You should see the app running at http://127.0.0.1:8000

## Run Tests
```bash
pytest app/tests/test_main.py
```

