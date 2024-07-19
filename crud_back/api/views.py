from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import generics, permissions
from api.serializers import UsuarioSerializer, SingiInSerializer
from rest_framework.response import Response
from api.models import Usuario

class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })

class SignInView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = SingiInSerializer
    permission_classes = [permissions.AllowAny]

class UsuarioView(generics.RetrieveUpdateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = UsuarioSerializer(user)
        return Response(serializer.data, status=200)

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = UsuarioSerializer(user, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)