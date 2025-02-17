import torch
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

import sys
import os

# Add the project root directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from model.model import load_model, preprocess_image

app = FastAPI()

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL if deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

task_models = {}  # Cache for loaded models

@app.get("/")
def home():
    return {"message": "FastAPI is running on Render"}

@app.post("/predict")
async def predict(file: UploadFile = File(...), task: str = Form(...), classes: int = Form(...)):
    # classes = 2
    try:
        if task not in task_models:
            task_models[task] = load_model(task, classes)

        model = task_models[task]
        image = preprocess_image(await file.read())

        with torch.no_grad():
            outputs = model(image)
            _, predicted = outputs.max(1)

        return {"task": task, "prediction": predicted.item()}

    # except FileNotFoundError as e:
    #     return {"error": str(e)}
    except FileNotFoundError as e:
        return JSONResponse(status_code=404, content={"error": str(e)})
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

if __name__ == "__main__":
    # uvicorn.run(app, host="0.0.0.0", port=10000)
    port = int(os.getenv("PORT", 10000))  # ✅ Use the Render-assigned port
    uvicorn.run(app, host="0.0.0.0", port=port)
