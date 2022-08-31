from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Ingredient

def ingredient_length(form, field):
    ingredient = field.data
    if len(ingredient) < 3 or len(ingredient) > 50:
        raise ValidationError('Must be between 3 and 50 characters')

class IngredientForm(FlaskForm):
    ingredient = StringField('ingredient', validators=[DataRequired(), ingredient_length])

    
    