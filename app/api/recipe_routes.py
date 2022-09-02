from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Recipe, db, Ingredient, Instruction
from app.forms import RecipeForm, IngredientForm, InstructionForm

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

#get all recipes
@recipe_routes.get('/')
def get_all_recipes():
    all_recipes = Recipe.query.all()
    response = {'all_recipes': [recipe.post_to_dict() for recipe in all_recipes]}
    return response

#get one recipe
@recipe_routes.get('/<int:id>')
def get_one_recipe(id):
    one_recipe = Recipe.query.get_or_404(id)
    response = {'one_recipe': one_recipe}
    return response

#post recipe
@recipe_routes.post('/')
@login_required
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

#edit recipe
@recipe_routes.put('/<int:id>')
@login_required
def edit_recipe(id):
    form = RecipeForm()
    recipe = Recipe.query.get_or_404(id)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        recipe.name = data['name']
        recipe.image_url = data['imageUrl']
        recipe.description = data['description']
        recipe.servings = data['servings']
        recipe.active_time = data['activeTime']
        recipe.total_time = data['totalTime']
        db.session.commit()
        return {'recipe': recipe.post_to_dict()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403

#delete recipe
@recipe_routes.delete('/<int:id>')
@login_required
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return {'message': 'Successfully deleted'}

#post recipe ingredient
@recipe_routes.post('/ingredients')
@login_required
def post_recipe_ingredient():
    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_ingredient = Ingredient(
            ingredient = data['ingredient'],
            recipe_id = data['recipeId']
        )
        db.session.add(new_ingredient)
        db.session.commit()
        return {'new_ingredient': new_ingredient.ingredient_to_dict()}

    # Return the validation errors, and put 403 at end
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403

#post recipe instruction
@recipe_routes.post('/instructions')
@login_required
def post_recipe_instruction():
    form = InstructionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_instruction = Instruction(
            instruction = data['instruction'],
            recipe_id = data['recipeId']
        )
        db.session.add(new_ingredient)
        db.session.commit()
        return {'new_ingredient': new_ingredient.ingredient_to_dict()}

    # Return the validation errors, and put 403 at end
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403