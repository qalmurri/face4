from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class ClientRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def add_user_to_group(self, user):
#        try:
#            group = Group.objects.get(name='staff')
#            user.groups.add(group)
#            user.save()
#        except Group.DoesNotExist:
#            raise serializers.ValidationError({"group": "The specified group does not exist."})
        pass

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        self.add_user_to_group(user)
        
        return user
    
class ClientLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        # Verifikasi kredensial pengguna
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            # Jika kredensial valid, buat Refresh dan Access Token
            refresh = RefreshToken.for_user(user)
            attrs['refresh'] = str(refresh)
            attrs['access'] = str(refresh.access_token)
        else:
            raise serializers.ValidationError("Invalid credentials")
        
        return attrs
    
class ClientLogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, attrs):
        refresh_token = attrs.get('refresh_token')

        # Validasi token
        try:
            token = RefreshToken(refresh_token)
            # Blacklist token
            token.blacklist()
        except Exception as e:
            raise serializers.ValidationError("Invalid or expired token.")

        return attrs
    
###############
### TESTING ###
###############

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

    @staticmethod
    def get_all_users():
        # Method untuk mengambil semua user
        return User.objects.all()