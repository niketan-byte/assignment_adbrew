from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import MongoTodoService  # Import the service class

class TodoListView(APIView):
    todo_service = MongoTodoService()  # Instantiate the service class

    def get(self, request):
        todo_list = self.todo_service.get_all_todos()
        return Response(todo_list, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        result = self.todo_service.create_todo(data)
        return Response({"id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)