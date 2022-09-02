from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Instruction

def instruction_length(form, field):
    instruction = field.data
    if len(instruction) < 10:
        raise ValidationError('Must be at least 10 characters long')

class InstructionForm(FlaskForm):
    instruction = StringField('instruction', validators=[DataRequired(), instruction_length])
    recipeId = IntegerField('recipeId', validators=[DataRequired()])
