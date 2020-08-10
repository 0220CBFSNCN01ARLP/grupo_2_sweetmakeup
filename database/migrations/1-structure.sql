CREATE DATABASE `grupo_2_sweetmakeup`;

USE `grupo_2_sweetmakeup`;

CREATE TABLE brands
(
  id int(11) NOT NULL
  AUTO_INCREMENT,
  name varchar
  (500) DEFAULT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY
  (id)
);


  CREATE TABLE categories
  (
    id int(11) NOT NULL
    AUTO_INCREMENT,
  name varchar
    (100) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY
    (id)
);



    CREATE TABLE colors
    (
      id int(11) NOT NULL
      AUTO_INCREMENT,
  name varchar
      (500) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY
      (id)
);



      CREATE TABLE tags
      (
        id int(11) NOT NULL
        AUTO_INCREMENT,
  name varchar
        (500) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY
        (id)
);



        CREATE TABLE users
        (
          id int(11) NOT NULL
          AUTO_INCREMENT,
  firstName varchar
          (500) NOT NULL,
  lastName varchar
          (500) NOT NULL,
  email varchar
          (100) NOT NULL,
  password varchar
          (100) NOT NULL,
  avatar varchar
          (100) DEFAULT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY
          (id)
);


          CREATE TABLE addresses
          (
            id int(11) NOT NULL
            AUTO_INCREMENT,
  street varchar
            (100) DEFAULT NULL,
  number int
            (10) DEFAULT NULL,
  city varchar
            (100) DEFAULT NULL,
  province varchar
            (100) DEFAULT NULL,
  zipCode varchar
            (100) DEFAULT NULL,
  floor varchar
            (100) DEFAULT NULL,
  apartment varchar
            (100) DEFAULT NULL,
  phone varchar
            (100) DEFAULT NULL,
  neighborhood varchar
            (100) DEFAULT NULL,
  observations text DEFAULT NULL,
  userId int
            (11) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY
            (id),
  foreign key
            (userId) references users
            (id)  
);


            CREATE TABLE products
            (
              id int(11) NOT NULL
              AUTO_INCREMENT,
  name varchar
              (500) NOT NULL,
  description varchar
              (500) DEFAULT NULL,
  ingredients varchar
              (500) DEFAULT NULL,
  price decimal
              (10,2) NOT NULL,
  discount decimal
              (4,2) DEFAULT NULL,
  weight decimal
              (10,2) DEFAULT NULL,
  height decimal
              (10,2) DEFAULT NULL,
  width decimal
              (10,2) DEFAULT NULL,
  length decimal
              (10,2) DEFAULT NULL,
  brandId int
              (11) NOT NULL,
  categoryId int
              (11) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY
              (id),
  FOREIGN KEY
              (categoryId) REFERENCES categories
              (id),
  FOREIGN KEY
              (brandId) REFERENCES brands
              (id)
);



              CREATE TABLE purchases
              (
                id int(11) NOT NULL
                AUTO_INCREMENT,
  userId int
                (11) NOT NULL,
  date date DEFAULT NULL,
  total decimal
                (6,2) DEFAULT NULL,
  payment varchar
                (100) DEFAULT NULL,
  invoice varchar
                (100) DEFAULT NULL,
  addressId int
                (11) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY
                (id),
  FOREIGN KEY
                (addressId) REFERENCES addresses
                (id),
  FOREIGN KEY
                (userId) REFERENCES users
                (id)
);




                CREATE TABLE user_product
                (
                  id int(11) NOT NULL
                  AUTO_INCREMENT,
  userId int
                  (11) NOT NULL,
  productId int
                  (11) NOT NULL,
  PRIMARY KEY
                  (id),
  FOREIGN KEY
                  (productId) REFERENCES products
                  (id),
  FOREIGN KEY
                  (userId) REFERENCES users
                  (id)
);



                  CREATE TABLE color_product
                  (
                    id int(11) NOT NULL
                    AUTO_INCREMENT,
  colorId int
                    (11) NOT NULL,
  productId int
                    (11) NOT NULL,
  PRIMARY KEY
                    (id),
  FOREIGN KEY
                    (colorId) REFERENCES colors
                    (id),
  FOREIGN KEY
                    (productId) REFERENCES products
                    (id)
);



                    CREATE TABLE images
                    (
                      id int(11) NOT NULL
                      AUTO_INCREMENT,
  route varchar
                      (500) NOT NULL,
  size varchar
                      (500) DEFAULT NULL,
  fileType varchar
                      (500) DEFAULT NULL,
  productId int
                      (11) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY
                      (id),
  FOREIGN KEY
                      (productId) REFERENCES products
                      (id)
);



                      CREATE TABLE product_purchase
                      (
                        id int(11) NOT NULL
                        AUTO_INCREMENT,
  price decimal
                        (10,2) DEFAULT NULL,
  quantity decimal
                        (10,2) DEFAULT NULL,
  productId int
                        (11) NOT NULL,
  purchaseId int
                        (11) NOT NULL,
  PRIMARY KEY
                        (id),
  FOREIGN KEY
                        (productId) REFERENCES products
                        (id),
  FOREIGN KEY
                        (purchaseId) REFERENCES purchases
                        (id)
);


                        CREATE TABLE product_tag
                        (
                          id int(11) NOT NULL
                          AUTO_INCREMENT,
  tagId int
                          (11) NOT NULL,
  productId int
                          (11) NOT NULL,
  PRIMARY KEY
                          (id),
  FOREIGN KEY
                          (tagId) REFERENCES tags
                          (id),
  FOREIGN KEY
                          (productId) REFERENCES products
                          (id)
);


                          ALTER TABLE products  
ADD link  varchar(300);

                          ALTER TABLE products  
ADD shipping  varchar(300) ;

                          ALTER TABLE products  
ADD returnPolitic  varchar(300);