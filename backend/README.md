# Install requirements
pip install requirements.txt

# Run Server
uvicorn app.main:app --reload

(You should see the app running at http://127.0.0.1:8000)

# Run Tests
pytest app/tests/test_main.py


