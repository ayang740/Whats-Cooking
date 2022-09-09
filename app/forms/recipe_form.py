from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField, FieldList, FormField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import Recipe


def name_length(form, field):
    name = field.data

    if len(name) < 3 or len(name) > 100:
        raise ValidationError('Recipe name must be between 3 and 100 characters')

def image_url(form, field):
    imageUrl = field.data

    if imageUrl[-4:] != ('.jpg' or '.gif' or '.png' or '.tif' or '.bmp' or '.eps'):
        raise ValidationError('Please provide a valid image url (.jpg, .png, .gif, etc)')

def description_length(form, field):
    description = field.data

    if len(description) < 10 or len(description) > 3000:
        raise ValidationError('Description must be between 10 and 3000 characters')

def servings_amount(form, field):
    servings = field.data
    
    if servings < 1 or servings > 50:
        raise ValidationError('Must be between 1 and 50 servings')

def active_times(form, field):
    activeTime = field.data

    if activeTime < 1:
        raise ValidationError('Active time cannot be less than 1 minute')


def total_times(form, field):
    totalTime = field.data
    activeTime = form.activeTime.data

    if totalTime < 1:
        raise ValidationError('Total time cannot be less than 1 minute')

    if activeTime > totalTime:
        raise ValidationError('Active time cannot be greater than total time')


class RecipeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Please provide a recipe name"), name_length])
    imageUrl = StringField('imageUrl', validators=[DataRequired(message="Please provide an image"), image_url])
    description = TextField('description', validators=[DataRequired(message="Please provide a description"), description_length])
    servings = IntegerField('servings', validators=[DataRequired(message="Please provide the number of servings"), servings_amount])
    activeTime = IntegerField('activeTime', validators=[DataRequired(message="Please provide the active time needed to make this recipe"), active_times])
    totalTime = IntegerField('totalTime', validators=[DataRequired(message="Please provide the total time needed to make this recipe"), total_times])
