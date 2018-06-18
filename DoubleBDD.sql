CREATE TABLE Post(
	id_Post INT NOT NULL AUTO_INCREMENT,
    titre VARCHAR(45),
    corps VARCHAR(500),
    date_Post DATE,
    id_User INT,
	PRIMARY KEY(id_Post)
);