import requests

url = "http://127.0.0.1:8000/predict"
files = {"file": open("image.png", "rb")}
data = {"task": "Breast_cancer"}


response = requests.post(url, files=files, data=data)

# Print response status and text
print("Status Code:", response.status_code)
print("Raw Response:", response.text)  # Check raw response before parsing JSON


print(response.json())