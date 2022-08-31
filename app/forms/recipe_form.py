from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Recipe

class RecipeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    imageUrl = StringField('imageUrl', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    servings = IntegerField('servings', validators=[DataRequired()])
    activeTime = IntegerField('activeTime')
    totalTime = IntegerField('totalTime')