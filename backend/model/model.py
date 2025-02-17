import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import io
import os

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

# Load EfficientNet model for a specific task
def load_model(task, classes):
    model_path = os.path.join(MODEL_DIR, f"{task}_best_model_effnetb0.pth")
    
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model for task '{task}' not found. {model_path}")

    model = models.efficientnet_b0(pretrained=False)
    # LOAD PRETRAINED EFFICIENTNET-B0
    model = models.efficientnet_b0(pretrained=True)

    # Modify classifier for your dataset
    num_features = model.classifier[1].in_features
    num_classes = classes  # Number of classes in your dataset
    model.classifier = nn.Sequential(
        nn.Dropout(0.5),  # Dropout to reduce overfitting
        nn.Linear(num_features, num_classes)
    )
    model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
    model.eval()
    return model

# Define preprocessing function
def preprocess_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.CenterCrop((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return transform(image).unsqueeze(0)
