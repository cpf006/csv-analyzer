# Install requirements
pip install requirements.txt

# Run Server
uvicorn app.main:app --reload

# Run Tests
pytest app/tests/test_main.py
