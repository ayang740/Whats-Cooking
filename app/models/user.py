from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

recipe_ingredient = db.table('recipe_ingredient',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.id')),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredients.id'))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email
        }

    # RELATIONSHIPS
    recipes = db.relationship('Recipe', back_populates='user', cascade='all, delete')  # User can have many recipes
    user_reviews = db.relationship('Review', back_populates='user', cascade='all, delete')  # User can have many reviews
    

class Recipe(db.Model):
    __tablename__= 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    active_time = db.Column(db.Integer)
    total_time = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='recipes')  # Recipes can only belong to one user
    ingredients = db.relationship('Ingredient', back_populates='recipe_ingredient', cascade='all, delete')  # Recipe can have many ingredients
    instructions = db.relationship('Instruction', back_populates='recipe_instruction', cascade='all, delete')  # Recipe can have many instructions
    reviews = db.relationship('Review', back_populates='recipe_reviews', cascade='all, delete') # Recipe can have many reviews
    
    def post_to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'imageUrl': self.image_url,
            'description': self.description,
            'servings': self.servings,
            'activeTime': self.active_time,
            'totalTime' :self.total_time,
            'userId': self.user_id,
            'user': {
                'name': User.query.get(self.user_id).name
            },
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'ingredients': [ingredient.ingredient_to_dict() for ingredient in self.ingredients],
            'instructions': [instruction.instruction_to_dict() for instruction in self.instructions]
        }

class Ingredient(db.Model):
    __tablename__="ingredients"

    id = db.Column(db.Integer, primary_key=True)
    ingredient = db.Column(db.String(255), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

     # RELATIONSHIPS
    recipe_ingredient = db.relationship('Recipe', back_populates='ingredients')  # Ingredients can only belong to one recipe

    def ingredient_to_dict(self):
        return {
            'id': self.id,
            'ingredient': self.ingredient,
            'recipeId': self.recipe_id
        }

class Instruction(db.Model):
    __tablename__="instructions"

    id = db.Column(db.Integer, primary_key=True)
    instruction = db.Column(db.Text, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

     # RELATIONSHIPS
    recipe_instruction = db.relationship('Recipe', back_populates='instructions')  # Instructions can only belong to one recipe

    def instruction_to_dict(self):
        return {
            'id': self.id,
            'instruction': self.instruction,
            'recipeId': self.recipe_id
        }

class Review(db.model):
    __tablename__="reviews"

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='user_reviews')  # Review can only belong to one user
    recipe_reviews = db.relationship('Recipe', back_populates='reviews')  # Review can only belong to one recipe

    def review_to_dict(self):
        return {
            'id': self.id,
            'review': self.comment,
            'rating': self.rating,
            'userId': self.user_id,
            'recipeId': self.recipe_id,
            'user': {
                'name': User.query.get(self.user_id).name
            },
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
