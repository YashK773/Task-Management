from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "" 
mongo = PyMongo(app)

@app.route('/todos', methods=['GET'])
def get_todos():
    todos = mongo.db.todos.find()  
    todo_list = []
    for todo in todos:
        todo['_id'] = str(todo['_id'])  # Convert ObjectId to string
        todo_list.append(todo)
    return jsonify(todo_list)

@app.route('/todos', methods=['POST'])
def add_todo():
    todo_data = request.json
    todo_id = mongo.db.todos.insert_one(todo_data).inserted_id  
    return jsonify(str(todo_id)), 201

@app.route('/todos/<todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    mongo.db.todos.delete_one({'_id': ObjectId(todo_id)})
    return jsonify({'status': 'deleted'}), 200

@app.route('/todos/<todo_id>', methods=['PUT'])
def update_todo(todo_id):
    todo_data = request.json
    mongo.db.todos.update_one({'_id': ObjectId(todo_id)}, {'$set': todo_data})
    return jsonify({'status': 'updated'}), 200

if __name__ == '__main__':
    app.run(debug=True)
