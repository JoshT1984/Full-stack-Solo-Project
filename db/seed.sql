INSERT INTO users (firstname, lastname) VALUES ('Joshua', 'Thompson');

INSERT INTO themes (id, theme, background_color, text_color, border_color, user_id) VALUES (DEFAULT,'xmas', '#378b29', '#ff7878', '#ff0000', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, user_id) VALUES (DEFAULT,'newyears','#14054c', '#ffd376', '#fffff0', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, user_id) VALUES (DEFAULT,'valentines', '#ff257e','#d60000', '#ffc5e6', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, user_id) VALUES (DEFAULT,'4thofjuly', '#00d2ff', '#ffffff', '#ff0000', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, user_id) VALUES (DEFAULT,'thanksgiving', '#633f21', '#dbba33', '#b6562a', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, user_id) VALUES (DEFAULT,'halloween', '#fd9702', '#e102ff', '#000000', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, user_id) VALUES (DEFAULT,'dark','#1d2125', '#9fadbc', '#fafbfc', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, user_id) VALUES (DEFAULT,'light', '#fafafa', '#484b6a', '#d2d3db', 1);

INSERT INTO lists (id, list_type, format, user_id) VALUES (DEFAULT,'todo', 'todo', 1);
INSERT INTO lists (id, list_type, format, user_id) VALUES (DEFAULT,'grocery', 'grocery', 1);
INSERT INTO lists (id, list_type, format, user_id) VALUES (DEFAULT,'xmas', 'xmas', 1);
INSERT INTO lists (id, list_type, format, user_id) VALUES (DEFAULT,'birthday', 'birthday', 1);

INSERT INTO grocery_list (id, item, price, user_id) VALUES (DEFAULT,'eggs', '$2.50', 1);

INSERT INTO todo_list (id, complete_by, task, user_id) VALUES (DEFAULT,'today', 'wash car', 1);

INSERT INTO xmas_list (id, gift_name, gift_price, user_id) VALUES (DEFAULT,'PS5', '$500', 1);



