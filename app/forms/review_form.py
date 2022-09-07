from flask_wtf import FlaskForm
from wtforms import IntegerField, TextField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

def review_length(form, field):
    review = field.data
    if len(review) < 10 or len(review) > 1000:
        raise ValidationError('Review must be between 10 and 1000 characters')
def rating_limit(form, field):
    rating = field.data
    if rating < 1:
        raise ValidationError('Rating must be at least 1')
    if rating > 5:
        raise ValidationError('Rating cannot be greater than 5')

class ReviewForm(FlaskForm):
    review = TextField('review', validators=[DataRequired(), review_length])
    rating = IntegerField('rating', validators=[DataRequired(), rating_limit])
