DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('Thriller'),('Romance'),('Fiction'),('Biography');
-- Thriller Books (category_id: 1001)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Moonstone', 'Wilkie Collins', '', 13.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Gone Girl', 'Gillian Flynn', '', 8.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Devil in a Blue Dress', 'Walter Mosley', '', 6.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Presumed Innocent', 'Scott Turow', '', 7.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Girl with the Dragon Tattoo', 'Stieg Larsson', '', 9.00, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Silence of the Lambs', 'Thomas Harris', '', 10.00, 0, TRUE, FALSE, 1001);

-- Romance Books (category_id: 1002)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Pride and Prejudice', 'Jane Austen', '', 6.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Notebook', 'Nicholas Sparks', '', 15.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('One True Loves: A Novel', 'Taylor Jenkins', '', 3.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Beach Read', 'Emily Henry', '', 13.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Me Before You', 'Jojo Moyes', '', 10.00, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Time Traveler\'s Wife', 'Audrey Niffenegger', '', 11.00, 0, TRUE, FALSE, 1002);

-- Fiction Books (category_id: 1003)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('1984', 'George Orwell', '', 9.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('To Kill a Mockingbird', 'Harper Lee', '', 7.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', '', 8.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Brave New World', 'Aldous Huxley', '', 10.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Catch-22', 'Joseph Heller', '', 12.00, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Catcher in the Rye', 'J.D. Salinger', '', 9.50, 0, TRUE, FALSE, 1003);

-- Biography Books (category_id: 1004)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Steve Jobs', 'Walter Isaacson', '', 12.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Diary of a Young Girl', 'Anne Frank', '', 6.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Long Walk to Freedom', 'Nelson Mandela', '', 14.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Educated', 'Tara Westover', '', 11.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Wright Brothers', 'David McCullough', '', 9.00, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Becoming', 'Michelle Obama', '', 12.00, 0, TRUE, FALSE, 1004);