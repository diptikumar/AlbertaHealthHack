from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__)

# Ensure the volunteers.json file exists
volunteers_file = 'volunteers.json'
if not os.path.exists(volunteers_file):
    with open(volunteers_file, 'w') as file:
        json.dump([], file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/submit_volunteer', methods=['POST'])
def submit_volunteer():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Invalid data'}), 400
    
    try:
        with open(volunteers_file, 'r+') as file:
            volunteers = json.load(file)
            volunteers.append(data)
            file.seek(0)
            json.dump(volunteers, file, indent=4)
        return jsonify({'message': 'Volunteer added successfully!'}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error creating profile. Please try again.'}), 500

@app.route('/search_volunteers', methods=['GET'])
def search_volunteers():
    disability = request.args.get('disability', '').lower()
    try:
        with open(volunteers_file, 'r') as file:
            volunteers = json.load(file)
        results = [v for v in volunteers if disability in v['disability'].lower()]
        return jsonify(results), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error searching profiles. Please try again.'}), 500

if __name__ == '__main__':
    app.run(debug=True)

