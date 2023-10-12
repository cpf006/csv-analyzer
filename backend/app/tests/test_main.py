from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_valid_csv_upload():
    with open("app/tests/test_files/valid.csv", "rb") as f:
        response = client.post("/uploadcsv/", files={"file": f})
    assert response.status_code == 200
    data = response.json()['data']
    assert "Name" in data
    assert "Age" in data
    assert "Salary" in data
    assert data["Name"]["missing_values"] == 0
    assert data["Name"]["unique_count"] == 3
    assert data["Age"]["missing_values"] == 0
    assert data["Age"]["unique_count"] == 3
    assert data["Salary"]["missing_values"] == 0
    assert data["Salary"]["unique_count"] == 3

def test_invalid_file_upload():
    with open("app/tests/test_files/invalid.txt", "rb") as f:
        response = client.post("/uploadcsv/", files={"file": f})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid file format"}

def test_numeric_column_analysis():
    with open("app/tests/test_files/valid.csv", "rb") as f:
        response = client.post("/uploadcsv/", files={"file": f})
    data = response.json()['data']

    assert data["Age"]["average"] == round((25 + 30 + 28) / 3, 2)
    assert data["Age"]["min"] == 25
    assert data["Age"]["max"] == 30
    assert "std_dev" in data["Age"]
    assert "missing_values" in data["Age"]
    assert "unique_count" in data["Age"]