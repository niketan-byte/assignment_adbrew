import logging
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import MongoTodoService  # Import the service class

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class TodoListView(APIView):
    todo_service = MongoTodoService()  # Instantiate the service class

    def get(self, request):
        todo_list = self.todo_service.get_all_todos()
        return Response(todo_list, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        logger.debug(f"Received data: {data}")
        try:
            if 'description' not in data or not data['description']:
                logger.warning("Description not provided or empty")
                return Response({"error": "Description not provided"}, status=status.HTTP_400_BAD_REQUEST)
            result = self.todo_service.create_todo(data)
            logger.debug(f"Inserted ID: {result.inserted_id}")
            return Response({"id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request):
        try:
            self.todo_service.delete_all_todos()
            return Response({"status": "All TODOs deleted"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
