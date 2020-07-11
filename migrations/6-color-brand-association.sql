use grupo_2_sweetmakeup;

drop table color_product;

alter table colors
add column brandId int(11),
add constraint foreign key (brandId) references brands(id);

UPDATE colors
SET brandId = 1
WHERE id in (1,2,3,4,5,6,7,8,9,10);
UPDATE colors
SET brandId = 2
WHERE id in (11,12,13,14,15,16,17,18,19,20);
UPDATE colors
SET brandId = 3
WHERE id in (21,22,23,24,25,26,27,28,29,30);
UPDATE colors
SET brandId = 4
WHERE id in (31,32,33,34,35,36,37,38,39,40);
UPDATE colors
SET brandId = 5
WHERE id in (41,42,43,44,45,46,47,48,49,50);
UPDATE colors
SET brandId = 6
WHERE id in (51,52,53,54,55,56,57,58,59,60);
UPDATE colors
SET brandId = 7
WHERE id in (61,62,63,64,65,66,67,68,69,70);
UPDATE colors
SET brandId = 8
WHERE id in (71,72,73,74,75,76,77,78,79,80);
UPDATE colors
SET brandId = 9
WHERE id in (81,82,83,84,85,86,87,88,89,90);
UPDATE colors
SET brandId = 10
WHERE id in (91,92,93,94,95,96,97,98,99,100);
UPDATE colors
SET brandId = 11
WHERE id in (101,102,103,104,105,106,107,108,109,110);
UPDATE colors
SET brandId = 12
WHERE id in (111,112,113,114,115,116,117,118,119,120);
UPDATE colors
SET brandId = 13
WHERE id in (121,122,123,124,125,126,127,128,129,130);
UPDATE colors
SET brandId = 14
WHERE id in (131,132,133,134,135,136,137,138,139,140);
UPDATE colors
SET brandId = 15
WHERE id in (141,142,143,144,145,146,147,148,149,150);
UPDATE colors
SET brandId = 16
WHERE id in (151,152,153,154,155,156,157,158,159,160);
UPDATE colors
SET brandId = 17
WHERE id in (161,162,163,164,165,166,167,168,169,170);
UPDATE colors
SET brandId = 18
WHERE id in (171,172,173,174,175,176,177,178,179,180);
UPDATE colors
SET brandId = 19
WHERE id in (181,182,183,184,185,186,187,188,189,190);
UPDATE colors
SET brandId = 20
WHERE id in (191,192,193,194,195,196,197,198,199,200);