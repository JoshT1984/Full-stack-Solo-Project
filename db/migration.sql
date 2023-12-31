DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS themes;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS grocery_list;
DROP TABLE IF EXISTS todo_list;
DROP TABLE IF EXISTS xmas_list;

CREATE TABLE users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    firstname TEXT
);

CREATE TABLE themes (
    id SERIAL NOT NULL PRIMARY KEY,
    theme TEXT,
    navbar_color TEXT,
    input_color TEXT,
    table_color TEXT,
    background_color TEXT,
    text_color TEXT,
    border_color TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE lists (
    id SERIAL NOT NULL PRIMARY KEY,
    list_type TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE "grocery_list"(
    id SERIAL NOT NULL PRIMARY KEY,
    item TEXT,
    price TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE todo_list (
    id SERIAL NOT NULL PRIMARY KEY,
    task TEXT,
    complete_by TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE xmas_list (
    id SERIAL NOT NULL PRIMARY KEY,
    gift_name TEXT,
    gift_price TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


