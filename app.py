import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

# Initialize Flask App
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing for frontend communication
CORS(app)

# We keep this section in case you want to blend model predictions with hardcoded rules later.
try:
    model = joblib.load('models/stacking_ensemble_model.pkl')
    scaler = joblib.load('models/scaler.pkl')
except FileNotFoundError as e:
    print(f"Error loading model files: {e}")
    model = None
    scaler = None
    print("Warning: Model files not found. Proceeding with hardcoded logic only.")

# Define the feature sets
NUMERIC_FEATURES = ['size', 'attachments', 'num_recipients', 'hour', 'day_of_week']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # --- 1. Receive and Validate Data ---
        json_data = request.get_json()
        if not json_data:
            return jsonify({'error': 'No data provided.'}), 400

        df = pd.DataFrame(json_data)

        # Validate columns
        for col in NUMERIC_FEATURES:
            if col not in df.columns:
                df[col] = 0
                print(f"Warning: Missing column '{col}' in request. Filled with default value.")

        # --- 2. Apply Hardcoded Anomaly Detection Rules ---
        # This function now returns a tuple: (anomaly_flag, status_description)
        def get_threat_description(row):
            # Rule 1: High number of recipients (mass mailing)
            if row['num_recipients'] > 100:
                return (1, "Mass Recipient Anomaly")
            # Rule 2: Exceptionally large file size with multiple attachments (data exfiltration)
            if row['size'] > 150000 and row['attachments'] > 1:
                return (1, "Large Data Exfiltration")
            # Rule 3: High attachment count for a moderately large file
            if row['attachments'] > 10:
                return (1, "High Attachment Count")
            # If no rules match, it's normal.
            return (0, "Normal")

        # Apply the function and expand the resulting tuples into two new columns
        df[['anomaly', 'status']] = df.apply(get_threat_description, axis=1, result_type='expand')
        
        # --- 3. Format and Return the Response ---
        results = df.to_dict(orient='records')
        
        return jsonify(results)

    except Exception as e:
        # General error handling
        print(f"An error occurred during prediction: {e}")
        return jsonify({'error': 'An internal error occurred. Please check the server logs.'}), 500


if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, port=5000)