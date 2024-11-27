from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
import joblib
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # Change this in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)  # Token valid for 30 minutes
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# MongoDB connection setup
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB connection string
db = client['backpropagation_challenge']
users_collection = db['users']
contact_collection = db['contact_messages']  # New collection for storing contact form messages

# Load the trained model when the Flask app starts
try:
    model_1 = joblib.load('decision_tree_model.pkl')  # Ensure this path is correct
except FileNotFoundError:
    print("Error: decision_tree_model.pkl not found. Make sure the model file exists.")

# User registration
@app.route('/signup', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if users_collection.find_one({'username': username}):
        return jsonify({"msg": "Username already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users_collection.insert_one({
        'username': username,
        'password': hashed_password
    })

    return jsonify({"msg": "User registered successfully"}), 201

# User login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = users_collection.find_one({'username': username})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

# Route for prediction
@app.route('/predict', methods=['POST'])
@jwt_required()
def predict():
    print("predict")
    try:
        # Process the input data and return a prediction
        input_data = request.get_json()
        print(input_data);

        # Validate input data
        if not input_data or not isinstance(input_data, dict) or len(input_data) == 0:
            return jsonify({'msg': 'Invalid input data. Please provide a valid JSON object.'}), 400
        
        # Assuming you're passing a list of input features to the model
        prediction = model_1.predict([list(input_data.values())])
        
        # Convert the prediction to a Python native type (e.g., int)
        prediction_value = int(prediction[0])  # Convert numpy int64 to Python int

        # Store the prediction and input data in the user's history
        current_user = get_jwt_identity()  # Get the current user
        prediction_entry = {
            'prediction': prediction_value,
            'input_data': input_data,  # Store the user inputs as well
            'timestamp': datetime.now()
        }

        # Update the user's document to include the new prediction entry
        users_collection.update_one(
            {'username': current_user},
            {'$push': {'history': prediction_entry}}  # Push the new entry into the history array
        )

        return jsonify({'prediction': prediction_value})
    except Exception as e:
        # If an error occurs, return a helpful message
        return jsonify({'msg': str(e)}), 500

# Route for fetching user history
@app.route('/user-history', methods=['GET'])
@jwt_required()
def get_user_history():
    current_user = get_jwt_identity()  # Get the current user
    print(current_user)  # Debug: Check the current user

    user = users_collection.find_one({'username': current_user}, {'_id': 0, 'history': 1})

    # Check if user exists and has a history
    if user and 'history' in user:
        return jsonify(user['history']), 200
    else:
        return jsonify({"msg": "No history found for this user"}), 404  # No history or user not found

if __name__ == '__main__':
    app.run(debug=True, port=5000)
