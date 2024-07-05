import os
import logging
from pymongo import MongoClient
from abc import ABC, abstractmethod

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class TodoService(ABC):
    @abstractmethod
    def get_all_todos(self):
        pass

    @abstractmethod
    def create_todo(self, data):
        pass

    @abstractmethod
    def delete_all_todos(self):
        pass

class MongoTodoService(TodoService):
    def __init__(self):
        self.db = self._connect_to_mongodb()

    def _connect_to_mongodb(self):
        mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
        return MongoClient(mongo_uri)['test_db']

    def get_all_todos(self):
        todos = self.db['todo_collection'].find()
        todo_list = [todo.get('todo', 'No description') for todo in todos]  # Use .get() to handle missing keys
        return todo_list

    def create_todo(self, data):
        description = data.get('description', 'No description')  # Ensure description is extracted correctly
        logger.debug(f"Creating TODO with description: {description}")
        result = self.db['todo_collection'].insert_one({'description': description})
        return result
    
    def delete_all_todos(self):
        self.db['todo_collection'].delete_many({})