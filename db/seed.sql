INSERT INTO users (firstname) VALUES ('Joshua');

INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, hr_color,  user_id) VALUES (DEFAULT,'xmas', '#378b29','#ff7878', '#ff0000','#ff0000', '#b1cbbb', '#ffffff', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, hr_color, user_id) VALUES (DEFAULT,'newyears','#14054c','#fff786', '#fffff0','#d7b030','#cfcfcf', '#03172f', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, hr_color, user_id) VALUES (DEFAULT,'valentines','#ff257e','#d60000', '#ffc5e6','#fd9ed0', '#ffeef7', '#fd9ed0', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, hr_color, user_id) VALUES (DEFAULT,'4thofjuly', '#00d2ff', '#ffffff', '#ff0000', '#223E88','#D8D8D8','#800500', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, hr_color, user_id) VALUES (DEFAULT,'thanksgiving', '#633f21', '#dbba33', '#b6562a', '#9c2f2f', '#b6562a', '#511f16', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, hr_color, user_id) VALUES (DEFAULT,'halloween', '#fd9702', '#e102ff', '#000000', '#ff7100', '#ae03ff', '#fd9701', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, hr_color, user_id) VALUES (DEFAULT,'dark','#1d2125', '#9fadbc', '#fafbfc', 'rgb(0,0,0,.45)', '#f6f6f6', '#1d2124', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, hr_color, user_id) VALUES (DEFAULT,'light', '#fafafb', '#484b6a', '#d2d3db', '#a7aac3', '#fafafa', '#484b5a', 1);

INSERT INTO lists (id, list_type, format, user_id) VALUES (DEFAULT,'todo', 'todo', 1);
INSERT INTO lists (id, list_type, format, user_id) VALUES (DEFAULT,'grocery', 'grocery', 1);
INSERT INTO lists (id, list_type, format, user_id) VALUES (DEFAULT,'xmas', 'xmas', 1);
INSERT INTO lists (id, list_type, format, user_id) VALUES (DEFAULT,'birthday', 'birthday', 1);

INSERT INTO grocery_list (id, item, price, user_id) VALUES (DEFAULT,'eggs', '$2.50', 1);

INSERT INTO todo_list (id, task, complete_by, user_id) VALUES (DEFAULT,'today', 'wash car', 1);

INSERT INTO xmas_list (id, gift_name, gift_price, user_id) VALUES (DEFAULT,'PS5', '$500', 1);



