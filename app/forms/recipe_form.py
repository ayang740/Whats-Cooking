from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import Recipe

def name_length(form, field):
    name = field.data
    if len(name) < 3 or len(name) > 100:
        raise ValidationError('Must be between 3 and 100 characters')

def description_length(form, field):
    description = field.data
    if len(description) < 10 or len(description) > 1000:
        raise ValidationError('Must be between 10 and 1000 characters')

def servings_amount(form, field):
    servings = field.data
    if servings < 1 or servings > 100:
        raise ValidationError('Must be between 1 and 100 servings')

def times(form, field):
    activeTime = field.data
    totalTime = field.data

    if (activeTime and activeTime < 1) or (totalTime and totalTime < 1):
        raise ValidationError('Time cannot be less than 1 minute')


class RecipeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), name_length])
    imageUrl = StringField('imageUrl', validators=[DataRequired(), URL(require_tld=True, message='Invalid image url')])
    description = TextField('description', validators=[DataRequired(), description_length])
    servings = IntegerField('servings', validators=[DataRequired(), servings_amount])
    activeTime = IntegerField('activeTime', validators=[times])
    totalTime = IntegerField('totalTime', validators=[times])