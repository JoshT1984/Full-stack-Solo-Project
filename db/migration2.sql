


















DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS todo_list;
DROP TABLE IF EXISTS xmas_list;
DROP TABLE IF EXISTS themes;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS user_lists;
DROP TABLE IF EXISTS theme_list;
DROP TABLE IF EXISTS grocery_list;

CREATE TABLE "users"(
    "users_id" SERIAL PRIMARY KEY,
    "firstname" TEXT,
    "lastname" TEXT 
);

CREATE TABLE "todo_list"(
    "lists_id" SERIAL PRIMARY KEY,
    "complete_by" TEXT,
    "task" TEXT
);

CREATE TABLE "xmas_list"(
    "lists_id" SERIAL PRIMARY KEY,
    "gift_name" TEXT,
    "gift_price" TEXT
);

CREATE TABLE "themes"(
    "themes_id" SERIAL PRIMARY KEY,
    "theme" TEXT,
    "background_color" TEXT ,
    "text_color" TEXT,
    "border_color" TEXT 
);

CREATE TABLE "lists"(
    "lists_id" SERIAL PRIMARY KEY,
    "list_type" TEXT 
);

CREATE TABLE "grocery_list"(
    "lists_id" SERIAL PRIMARY KEY,
    "item" TEXT,
    "price" TEXT 
);

CREATE TABLE "theme_list"(
    "id" INTEGER PRIMARY KEY,
    "theme_id" INTEGER,
    "list_id" INTEGER,
    FOREIGN KEY("theme_id") REFERENCES "themes"("themes_id"),
    FOREIGN KEY("list_id") REFERENCES "lists"("lists_id")
);

CREATE TABLE "user_lists"(
    "id" INTEGER PRIMARY KEY,
    "user_id" INTEGER,
    "list_id" INTEGER,
    FOREIGN KEY("user_id") REFERENCES "users"("users_id"),
    FOREIGN KEY("list_id") REFERENCES "lists"("lists_id")
);
