import MySQLdb
import random

db = MySQLdb.connect(
    host='localhost',
    user='root',
    passwd='root',
    db='furcifer'
)

cursor = db.cursor()
cursor.execute('SELECT food_id FROM food');
food_ids = cursor.fetchall()
food_ids = tuple(map(lambda food: int(food[0]), food_ids))
cursor.close()

cursor = db.cursor()
cursor.execute('SELECT restaurant_id FROM restaurant');
restaurant_ids = cursor.fetchall()
restaurant_ids = tuple(map(lambda resto: int(resto[0]), restaurant_ids))
cursor.close()
print(restaurant_ids)
for i in range(10):
    resto = random.choice(restaurant_ids)

    cursor = db.cursor()
    cursor.execute('INSERT INTO user_order(user_id, restaurant_id) VALUES(%s, %s)', (random.randint(1,5), resto,))
    db.commit()
    cursor.close()

    cursor = db.cursor()
    cursor.execute('SELECT LAST_INSERT_ID();')
    order_id = int(cursor.fetchone()[0])
    cursor.close()

    for i in random.sample(food_ids, random.randint(1,5)):
        food = random.choice(food_ids)

        cursor = db.cursor()
        cursor.execute('INSERT INTO order_food(order_id, food_id, quantity) VALUES(%s, %s, %s)', (order_id, food, random.randint(1,5)))
        db.commit()
        cursor.close()
