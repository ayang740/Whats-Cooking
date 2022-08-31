from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Recipe, db, Ingredient, Instruction
from app.forms import RecipeForm

recipe_routes = Blueprint('recipes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@recipe_routes.get('/')
def get_all_recipes():
    all_recipes = Recipe.query.all()
    response = {'all_recipes': [recipe.post_to_dict() for recipe in all_recipes]}
    return response

@recipe_routes.post('/')

def post_recipe():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_recipe = Recipe(
            name = data['name'],
            image_url = data['imageUrl'],
            description = data['description'],
            servings = data['servings'],
            active_time = data['activeTime'],
            total_time = data['totalTime'],
            user_id = current_user.id
        )
        db.session.add(new_recipe)
        db.session.commit()
        return {'new_recipe': new_recipe.post_to_dict()}

    # Return the validation errors, and put 403 at end
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403
