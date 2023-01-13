-- Active: 1673423312410@@pijardb-do-user-13063919-0.b.db.ondigitalocean.com@25060@blanja@public
INSERT INTO products(name,stock,price,category,photo,status,id_toko) VALUES('Baju Rawan','100','90000','Baju','http://res.cloudinary.com/dtow6mgju/image/upload/v1673512148/toko/cqr1eedqescmsubvicrl.jpg','1','c40a4c14-400b-4ea5-adfb-bd2e4c6949c0');

SELECT products.id, products.category,products.name,products.price,products.photo,products.status FROM products as products
WHERE products.status='1' AND products.name ILIKE '%%' ORDER BY ${sortBy} ${sortOrder} LIMIT 5
;

SELECT products.id, products.category,products.name,products.price,products.photo,products.status FROM products as products
WHERE products.status='1' AND products.name ILIKE '%%' AND products.id_toko = '' ORDER BY ${sortBy} ${sortOrder} LIMIT 5
;

UPDATE SET status='1' from transactions where id ='3';

SELECT orders.id,orders.status,orders.total ,orders.amount,product.name as product_name,product.price as price, 
product.category as category,product.photo as photo,users.alamat as alamat,users.fullname as username from transactions as orders 
INNER JOIN products as product ON orders.id_product = product.id
INNER JOIN users as users ON orders.id_users = users.id 
WHERE orders.id_users = '5a10e8a3-2a98-48e6-9cbd-98dd49201d51';

SELECT orders.id,orders.status,orders.total ,orders.amount,product.name as product_name,product.price as price, 
product.category as category,product.photo as photo,users.alamat as alamat,users.fullname as username from transactions as orders 
INNER JOIN products as product ON orders.id_product = product.id
INNER JOIN users as users ON orders.id_users = users.id 
WHERE orders.id = 1;

CREATE TABLE transactions(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_users VARCHAR(255) NOT NULL,
    id_product INT NOT NULL,
    total INT,
    amounty INT,
    status INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

SELECT orders.id,orders.status,orders.total ,orders.amount,product.name as product_name,product.price as price, 
      product.category as category,product.photo as photo,users.alamat as alamat,toko.fullname as nama_toko,users.fullname as username from transactions as orders 
      INNER JOIN products as product ON orders.id_product = product.id
      INNER JOIN users as users ON orders.id_users = users.id AND orders.id_toko = users.id
      WHERE orders.id = '3'