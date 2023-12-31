INSERT INTO users (firstname) VALUES ('Joshua');

INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, table_color, user_id) VALUES (DEFAULT,'light', '#fafafb', '#484b6a', '#d2d3db', '#a7aac3', '#fafafa', '#d1d3e0', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, table_color, user_id) VALUES (DEFAULT,'dark','#1d2125', '#a5b2c0', '#fafbfc', 'rgb(0,0,0,.3)', '#f6f6f6', '#cccccc', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, table_color, user_id) VALUES (DEFAULT,'newyears','#14054c','#fff786', '#fffff0','#d7b030','#cfcfcf', '#ebd694', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, table_color, user_id) VALUES (DEFAULT,'valentines','#ff257e','#d60000', '#ffc5e6','#fd9ed0', '#ffeef7', '#fee6f3', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, table_color, user_id) VALUES (DEFAULT,'4thofjuly', '#00d2ff', '#ffffff', '#ff6666', '#223E88','#D8D8D8','#adbeeb', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, table_color, user_id) VALUES (DEFAULT,'halloween', '#fd9702', '#e102ff', '#000000', '#ff7100', '#ae03ff', '#ffb980', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, table_color, user_id) VALUES (DEFAULT,'thanksgiving', '#633f21', '#dbba33', '#b6562a', '#9c2f2f', '#b6562a', '#e29d9d', 1);
INSERT INTO themes (id, theme, background_color, text_color, border_color, navbar_color, input_color, table_color,  user_id) VALUES (DEFAULT,'xmas', '#378b29','#ff7878', '#b1cbbb','#ff0000', '#b1cbbb', '#ff9999', 1);

INSERT INTO lists (id, list_type, user_id) VALUES (DEFAULT,'todo', 1);
INSERT INTO lists (id, list_type, user_id) VALUES (DEFAULT,'grocery', 1);
INSERT INTO lists (id, list_type, user_id) VALUES (DEFAULT,'xmas', 1);
INSERT INTO lists (id, list_type, user_id) VALUES (DEFAULT,'birthday', 1);

INSERT INTO grocery_list (id, item, price, user_id) VALUES (DEFAULT,'eggs', '$2.50', 1);

INSERT INTO xmas_list (id, gift_name, gift_price, user_id) VALUES (DEFAULT,'PS5', '$500', 1);



