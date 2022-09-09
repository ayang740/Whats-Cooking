from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Recipe, db, Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

#get all reviews
@review_routes.get('/')
def get_all_reviews():
    all_reviews = Review.query.all()
    response = {'all_reviews': [review.review_to_dict() for review in all_reviews]}
    return response

#post review
@review_routes.post('/')
@login_required
def post_review():
    review_form = ReviewForm()
    review_form['csrf_token'].data = request.cookies['csrf_token']
    if review_form.validate_on_submit():
        data = review_form.data
        review_data = request.json
        recipe_id_data = review_data['recipe_id']

        new_review = Review(
            review = data['review'],
            rating = data['rating'],
            user_id = current_user.id,
            recipe_id = recipe_id_data
        )

        db.session.add(new_review)
        db.session.commit()

        
        return {'new_review': new_review.review_to_dict()}

    # Return the validation errors, and put 403 at end
    else:
        return {'errors': validation_errors_to_error_messages(review_form.errors)}, 403

#edit review
@review_routes.put('/<int:id>')
@login_required
def edit_review(id):
    form = ReviewForm()
    review = Review.query.get_or_404(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        data = form.data
        review.review = data['review']
        review.rating = data['rating']
 
        db.session.commit()

        return {'review': review.review_to_dict()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403


#delete review
@review_routes.delete('/<int:id>')
@login_required
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Successfully deleted'}
