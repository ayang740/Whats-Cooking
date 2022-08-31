from app.models import db, User, Recipe, Ingredient, Instruction


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', name='Demo User', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', name='Marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', name='Bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()

def seed_recipes():
    recipe1 = Recipe(
        name='Lemon-Pistachio Loaf',
        image_url='https://assets.epicurious.com/photos/5da0c42f7e9a8e0008826fbb/1:1/w_2240,c_limit/Lemon-Pistachio-Loaf-recipe-BA-101119.jpg',
        description='Don’t even think about lifting this cake out of the pan before it’s completely—and we mean completely—cool. Because it’s vegan, with no eggs for structure, its delicate crumb needs time to set.',
        servings=6,
        user_id=1
    )

    recipe2 = Recipe(
        name='Tuna Melt',
        image_url='https://assets.epicurious.com/photos/62fa60b420010a51b1b27f3a/1:1/w_2240,c_limit/Tuna_Melt_RECIPE_081120_38323.jpg',
        description='The best tuna melt is properly cheesy and made with a tuna salad that’s good enough to shine on its own. In this tuna melt recipe, I keep things simple with chopped celery, pickles, and mayonnaise. The dill pickles—along with the quick-pickled onion—add crunch and tang, which complement the rich flavor of the olive-oil-packed tuna.',
        servings=4,
        active_time=25,
        total_time=45,
        user_id=2
    )
    recipe3 = Recipe(
        name='Make-Ahead Crispy Chicken Cutlets',
        image_url='https://assets.epicurious.com/photos/5ac79fe3ada0b51f73de75c0/master/w_1280,c_limit/SUNDAY-STASH-Crispy-Chicken-Cutlets-hero-09032018.jpg',
        description='This is hands-down the easiest way to make delicious chicken cutlets for your family—no messy dredging or frying required! Stash a big batch in the freezer so they\'re ready to cook at a moment\'s notice.',
        servings=10,
        active_time=50,
        total_time=70,
        user_id=1
    )


    db.session.add(recipe1)
    db.session.add(recipe2)
    db.session.add(recipe3)

    db.session.commit()

def seed_ingredients():
    ingredient1 = Ingredient(ingredient='⅓ cup vegetable oil, plus more for pan', recipe_id=1)
    ingredient2 = Ingredient(ingredient='¾ cup raw pistachios', recipe_id=1)
    ingredient3 = Ingredient(ingredient='Zest of 2 lemons', recipe_id=1)
    ingredient4 = Ingredient(ingredient='1¾ cups all-purpose flour', recipe_id=1)
    ingredient5 = Ingredient(ingredient='1 cup granulated sugar', recipe_id=1)
    ingredient6 = Ingredient(ingredient='2 tsp. baking powder', recipe_id=1)
    ingredient7 = Ingredient(ingredient='¾ tsp. kosher salt', recipe_id=1)
    ingredient8 = Ingredient(ingredient='¾ tsp. kosher salt', recipe_id=1)
    ingredient9 = Ingredient(ingredient='5 Tbsp. extra-virgin olive oil', recipe_id=1)
    ingredient10 = Ingredient(ingredient='7 Tbsp. fresh lemon juice, divided', recipe_id=1)
    ingredient11 = Ingredient(ingredient='2 cups powdered sugar', recipe_id=1)
    ingredient12 = Ingredient(ingredient='½ medium onion, thinly sliced', recipe_id=2)
    ingredient13 = Ingredient(ingredient='1 cup seasoned rice vinegar', recipe_id=2)
    ingredient14 = Ingredient(ingredient='2 (5-oz.) cans tuna packed in olive oil, drained', recipe_id=2)
    ingredient15 = Ingredient(ingredient='¼ cup mayonnaise, plus more for spreading', recipe_id=2)
    ingredient16 = Ingredient(ingredient='2 Tbsp. chopped celery', recipe_id=2)
    ingredient17 = Ingredient(ingredient='1 Tbsp. chopped dill pickles', recipe_id=2)
    ingredient18 = Ingredient(ingredient='Kosher salt, freshly ground pepper', recipe_id=2)
    ingredient19 = Ingredient(ingredient='8 slices sourdough bread', recipe_id=2)
    ingredient20 = Ingredient(ingredient='8 slices sharp cheddar', recipe_id=2)
    ingredient21 = Ingredient(ingredient='Dill pickle spears (for serving; optional)', recipe_id=2)
    ingredient22 = Ingredient(ingredient='2 large egg yolks', recipe_id=3)
    ingredient23 = Ingredient(ingredient='½ cup mayonnaise)', recipe_id=3)
    ingredient24 = Ingredient(ingredient='2 tsp. kosher salt)', recipe_id=3)
    ingredient25 = Ingredient(ingredient='4 lb. skinless, boneless chicken cutlets, pounded ¼" thick (for smaller pieces, quarter cutlet before pounding)', recipe_id=3)
    ingredient26 = Ingredient(ingredient='¾ cup extra-virgin olive oil', recipe_id=3)
    ingredient27 = Ingredient(ingredient='6 cups panko (Japanese breadcrumbs)', recipe_id=3)
    ingredient28 = Ingredient(ingredient='2 Tbsp. mustard powder, garlic powder, finely grated Parmesan, or dried herbs (optional)', recipe_id=3)

    db.session.add(ingredient1)
    db.session.add(ingredient2)
    db.session.add(ingredient3)
    db.session.add(ingredient4)
    db.session.add(ingredient5)
    db.session.add(ingredient6)
    db.session.add(ingredient7)
    db.session.add(ingredient8)
    db.session.add(ingredient9)
    db.session.add(ingredient10)
    db.session.add(ingredient11)
    db.session.add(ingredient12)
    db.session.add(ingredient13)
    db.session.add(ingredient14)
    db.session.add(ingredient15)
    db.session.add(ingredient16)
    db.session.add(ingredient17)
    db.session.add(ingredient18)
    db.session.add(ingredient19)
    db.session.add(ingredient20)
    db.session.add(ingredient21)
    db.session.add(ingredient22)
    db.session.add(ingredient23)
    db.session.add(ingredient24)
    db.session.add(ingredient25)
    db.session.add(ingredient26)
    db.session.add(ingredient27)
    db.session.add(ingredient28)

    db.session.commit()

def seed_instructions():

    instruction1 = Instruction(instruction='Place a rack in middle of oven; preheat to 325°F. Grease a 9x5" loaf pan with vegetable oil, then line with parchment paper, leaving overhang on long sides. Oil parchment paper (for insurance and an easy release).', recipe_id=1)
    instruction2 = Instruction(instruction='Pulse pistachios in a food processor until finely ground (it’s okay if some of the pieces are a bit larger). Set aside a heaping tablespoonful.', recipe_id=1)
    instruction3 = Instruction(instruction='Whisk lemon zest, flour, granulated sugar, baking powder, salt, and remaining pistachios in a large bowl. Whisk olive oil, 2 Tbsp. lemon juice, remaining ⅓ cup vegetable oil, and ½ cup water in a small bowl to combine. Pour oil mixture into dry ingredients and fold with a rubber spatula to combine, being very careful not to overmix (this batter contains a high ratio of liquid, which means it can get gummy if overworked). Pour into prepared pan and tilt to distribute; batter should come halfway up the sides.', recipe_id=1)
    instruction4 = Instruction(instruction='Bake cake until golden brown all over, it springs back when gently pressed, and a tester inserted into the center comes out clean, 50–60 minutes. Transfer pan to a wire rack and let cake cool completely in pan, at least 2 hours. Using parchment overhang, lift cake out of pan and place on rack. Peel away parchment.', recipe_id=1)
    instruction5 = Instruction(instruction='Whisk powdered sugar and 3 Tbsp. lemon juice in a medium bowl, drizzling in remaining 2 Tbsp. lemon juice as needed until you have a thick but pourable glaze. Pour glaze over cake, letting it drip down the sides. Immediately top cake with reserved pistachios, then let sit until glaze is set, at least 30 minutes.', recipe_id=1)
    instruction6 = Instruction(instruction='Do Ahead: Cake can be made 3 days ahead. Store airtight at room temperature.', recipe_id=1)
    instruction7 = Instruction(instruction='Combine ½ medium onion, thinly sliced, and 1 cup seasoned rice vinegar in a small bowl. Set aside.', recipe_id=2)
    instruction8 = Instruction(instruction='Gently mix two 5-oz. cans tuna packed in olive oil, drained, ¼ cup mayonnaise, 2 Tbsp. chopped celery, and 1 Tbsp. chopped pickles in a medium bowl until just combined. Season with kosher salt and freshly ground pepper.', recipe_id=2)
    instruction9 = Instruction(instruction='Heat a dry large cast-iron skillet over medium-low. Spread mayonnaise over 1 side of 2 slices sourdough bread. Place bread, mayo side down, in skillet; top 1 bread slice with 2 slices sharp cheddar. Cover with a lid and cook until bread is golden brown underneath and cheese is melted, about 4 minutes. (The cheese should form a crispy skirt around the bread.)', recipe_id=2)
    instruction10 = Instruction(instruction='Uncover skillet and top bread with melted cheddar with one fourth of tuna salad, then some drained reserved pickled onion. Close up sandwich and gently press down on sandwich with a spatula. Transfer to a cutting board and slice in half on a diagonal. Repeat cooking process 3 more times with more mayonnaise and remaining tuna salad, pickled onion, 6 slices sourdough bread, and 6 slices sharp cheddar to make 3 more sandwiches.', recipe_id=2)
    instruction11 = Instruction(instruction='Serve sandwiches on plates with dill pickle spears if desired.', recipe_id=2)
    instruction12 = Instruction(instruction='Whisk egg yolks, mayonnaise, and salt in a large bowl until smooth. Add chicken and turn several times with tongs until evenly coated.', recipe_id=3)
    instruction13 = Instruction(instruction='Heat oil in a large skillet over medium-high until shimmering. Add panko and cook, stirring constantly with a wooden spoon, making sure to get around the edges to incorporate darker breadcrumbs, until golden brown, about 5 minutes. Let cool slightly, then stir in mustard powder, if using.', recipe_id=3)
    instruction14 = Instruction(instruction='Using tongs, place a cutlet in skillet. Pat surrounding toasted panko onto cutlet with one of your hands, pressing firmly to adhere. Turn and repeat on the other side with more breadcrumbs. Lightly shake off excess breadcrumbs. Transfer to a wire rack set inside a rimmed baking sheet (if you are making these ahead and freezing, skip wire rack and place directly on a baking sheet). Repeat with remaining cutlets, spacing evenly apart on baking sheet. Discard any remaining panko. At this point, breaded cutlets can be frozen up to 3 months. Freeze chicken on baking sheets until firm, about 1 hour, then transfer to resealable freezer bags or layer in an airtight container with sheets of parchment between cutlets.', recipe_id=3)
    instruction15 = Instruction(instruction='Preheat oven to 450°F and bake cutlets until cooked through and juices run clear when pierced with a knife, 10–12 minutes. If cutlets are frozen, they will take a little longer, 14–16 minutes. You can also bake chicken 1 or 2 at a time in a toaster oven at 450°F. Bake directly on rack, 12–14 minutes.', recipe_id=3)

    db.session.add(instruction1)
    db.session.add(instruction2)
    db.session.add(instruction3)
    db.session.add(instruction4)
    db.session.add(instruction5)
    db.session.add(instruction6)
    db.session.add(instruction7)
    db.session.add(instruction8)
    db.session.add(instruction9)
    db.session.add(instruction10)
    db.session.add(instruction11)
    db.session.add(instruction12)
    db.session.add(instruction13)
    db.session.add(instruction14)
    db.session.add(instruction15)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_instructions():
    db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
    db.session.commit()