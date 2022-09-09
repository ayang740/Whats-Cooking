from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

    if len(email) < 5:
        raise ValidationError('Please provide a valid email')

    if ('@' and '.') not in email:
        raise ValidationError('Please provide a valid email')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def name_length(form, field):
    name = field.data
    if len(name) < 3:
        raise ValidationError('Name must be at least 3 characters long')

    if len(name) > 25:
        raise ValidationError('Name cannot be over 25 characters long')

def password(form, field):
    password = field.data
    if len(password) < 5:
        raise ValidationError('Password must be at least 5 characters long')

def confirm_password(form, field):
    confirm_password = field.data
    password = form.password.data
    if confirm_password != password:
        raise ValidationError('Confirm password does not match password')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Please provide a username'), username_exists])
    name = StringField('name', validators=[DataRequired(message='Please provide a name'), name_length])
    email = StringField('email', validators=[DataRequired(message='Please provide an email'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Please provide a password'), password])
    repeatPassword = StringField('repeatPassword', validators=[DataRequired(message='Please confirm your password'), confirm_password])
