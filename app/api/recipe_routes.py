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

def instruction_length(instruction):
    if len(instruction) < 10:
        raise Exception(['Must be at least 10 characters long'])
    else:
        return True

def ingredient_length(ingredient):
    if len(ingredient) < 3 or len(ingredient) > 50:
        raise Exception(['Must be between 3 and 50 characters'])
    else:
        return True

#post recipe
@recipe_routes.post('/')
@login_required
def post_recipe():
    recipe_form = RecipeForm()
    recipe_form['csrf_token'].data = request.cookies['csrf_token']
    if recipe_form.validate_on_submit():
        data = recipe_form.data
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

        recipe_data = request.json
        ingredients_data = recipe_data["ingredients"]
        instructions_data = recipe_data["instructions"]

        if (len(ingredients_data) > 0 and len(instructions_data) > 0):
            for ingredient_data in ingredients_data:
                ingredient_validator = ingredient_length(ingredient_data)
                if ingredient_validator:
                    new_ingredient = Ingredient(
                        ingredient = ingredient_data,
                        recipe_id = new_recipe.id
                    )
                    db.session.add(new_ingredient)
                else:
                    return ingredient_validator
            
            for instruction_data in instructions_data:
                instruction_validator = instruction_length(instruction_data)
                if instruction_validator:
                    new_instruction = Instruction(
                        instruction = instruction_data,
                        recipe_id = new_recipe.id
                    )
                    db.session.add(new_instruction)
                else:
                    return instruction_validator

            db.session.commit()

        else:
            db.session.delete(new_recipe)
            return {'errors': ["Please include ingredients and instructions."]}, 403 
 
        return {'new_recipe': new_recipe.post_to_dict()}

    # Return the validation errors, and put 403 at end
    else:
        return {'errors': validation_errors_to_error_messages(recipe_form.errors)}, 403

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

        recipe_data = request.json
        ingredients_data = recipe_data["ingredients"]
        instructions_data = recipe_data["instructions"]

        if (len(ingredients_data) > 0 and len(instructions_data) > 0):
            for ingredient_data in ingredients_data:
                ingredient_validator = ingredient_length(ingredient_data['ingredient'])
                if 'id' in ingredient_data.keys():
                    ingredient = Ingredient.query.get(ingredient_data['id'])
                    if ingredient_validator:
                        ingredient.ingredient = ingredient_data['ingredient']
                    else:
                        return ingredient_validator
                elif 'id' not in ingredient_data.keys():
                    if ingredient_validator:
                        new_ingredient = Ingredient(
                            ingredient = ingredient_data['ingredient'],
                            recipe_id = recipe.id
                        )
                        db.session.add(new_ingredient)
                    else:
                        return ingredient_validator
                else:
                    print('hello')

            for instruction_data in instructions_data:
                instruction_validator = instruction_length(instruction_data['instruction'])
                if 'id' in instruction_data.keys():
                    instruction = Instruction.query.get(instruction_data['id'])
                    if instruction_validator:
                        instruction.instruction = instruction_data['instruction']
                    else:
                        return instruction_validator
                elif 'id' not in instruction_data.keys():
                    if instruction_validator:
                        new_instruction = Instruction(
                            instruction = instruction_data['instruction'],
                            recipe_id = recipe.id
                        )
                        db.session.add(new_instruction)
                    else:
                        return instruction_validator
                else:
                    print('hello')

            db.session.commit()
        else:
            return {'errors': ["Please include ingredients and instructions."]}, 403 

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

