use grupo_2_sweetmakeup;

drop table user_product;

alter table products
add column userId int(11),
add constraint foreign key (userId) references users(Id);

UPDATE products
SET userId = 1
WHERE id in (1,2,3,4,5,6,7,8,9,10);
UPDATE products
SET userId = 2
WHERE id in (11,12,13,14,15,16,17,18,19,20);
UPDATE products
SET userId = 3
WHERE id in (21,22,23,24,25,26,27,28,29,30);
UPDATE products
SET userId = 4
WHERE id in (31,32,33,34,35,36,37,38,39,40);
UPDATE products
SET userId = 5
WHERE id in (41,42,43,44,45,46,47,48,49,50);
UPDATE products
SET userId = 6
WHERE id in (51,52,53,54,55,56,57,58,59,60);
UPDATE products
SET userId = 7
WHERE id in (61,62,63,64,65,66,67,68,69,70);
UPDATE products
SET userId = 8
WHERE id in (71,72,73,74,75,76,77,78,79,80);
UPDATE products
SET userId = 9
WHERE id in (81,82,83,84,85,86,87,88,89,90);
UPDATE products
SET userId = 10
WHERE id in (91,92,93,94,95,96,97,98,99,100); 