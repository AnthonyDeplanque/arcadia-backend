/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS HABITAT (
  habitat_id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(150) NOT NULL,
  description VARCHAR(500) NOT NULL,
  commentaire_habitat VARCHAR(500),
  PRIMARY KEY (habitat_id)
);

CREATE TABLE IF NOT EXISTS IMAGE (
  image_id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  PRIMARY KEY (image_id)
);

CREATE TABLE IF NOT EXISTS SERVICE (
  service_id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(50) NOT NULL,
  description VARCHAR(250),
  PRIMARY KEY (service_id)
);

CREATE TABLE IF NOT EXISTS AVIS (
  avis_id INT NOT NULL AUTO_INCREMENT,
  pseudo VARCHAR(150) NOT NULL,
  commentaire VARCHAR(550),
  is_visible BOOLEAN,
  PRIMARY KEY (avis_id)
);

CREATE TABLE IF NOT EXISTS RACE (
  race_id INT NOT NULL AUTO_INCREMENT,
  nom_commun VARCHAR(150) NOT NULL,
  nom_scientifique VARCHAR(150) NOT NULL,
  type_habitat VARCHAR(150) NOT NULL,
  famille VARCHAR(50),
  origine VARCHAR(150),
  PRIMARY KEY (race_id)
);

/* 
 0 = ADMIN
 1 = VETERINAIRE
 2 = EMPLOYEE
 */
CREATE TABLE IF NOT EXISTS ROLE (
  role_id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(50) NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE IF NOT EXISTS UTILISATEUR (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(150) NOT NULL,
  hashed_password VARCHAR(150) NOT NULL,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (role_id) REFERENCES ROLE(role_id)
);

CREATE TABLE IF NOT EXISTS ANIMAL (
  animal_id INT NOT NULL AUTO_INCREMENT,
  prenom VARCHAR(150) NOT NULL,
  habitat_id INT NOT NULL,
  race_id INT NOT NULL,
  PRIMARY KEY (animal_id),
  FOREIGN KEY (habitat_id) REFERENCES HABITAT(habitat_id),
  FOREIGN KEY (race_id) REFERENCES RACE(race_id)
);

CREATE TABLE IF NOT EXISTS RAPPORT_VETERINAIRE (
  rapport_id INT NOT NULL AUTO_INCREMENT,
  date_rapport DATE NOT NULL,
  etat VARCHAR(500),
  taille INT,
  masse INT,
  alimentation VARCHAR(50),
  nourriture VARCHAR(150),
  quantite DECIMAL(15, 2),
  detail VARCHAR(500),
  user_id INT NOT NULL,
  animal_id INT NOT NULL,
  PRIMARY KEY (rapport_id),
  FOREIGN KEY (user_id) REFERENCES UTILISATEUR(user_id),
  FOREIGN KEY (animal_id) REFERENCES ANIMAL(animal_id)
);

CREATE TABLE IF NOT EXISTS contient (
  animal_id INT NOT NULL,
  image_id INT NOT NULL,
  PRIMARY KEY (animal_id, image_id),
  FOREIGN KEY (animal_id) REFERENCES ANIMAL(animal_id),
  FOREIGN KEY (image_id) REFERENCES IMAGE(image_id)
);

CREATE TABLE IF NOT EXISTS comporte (
  habitat_id INT NOT NULL,
  image_id INT NOT NULL,
  PRIMARY KEY (habitat_id, image_id),
  FOREIGN KEY (habitat_id) REFERENCES HABITAT(habitat_id),
  FOREIGN KEY (image_id) REFERENCES IMAGE(image_id)
);

INSERT INTO
  ROLE(label)
VALUES
  ('ADMINISTRATEUR'),
  ('VETERINAIRE'),
  ('EMPLOYE');

INSERT INTO
  UTILISATEUR(username, hashed_password, nom, prenom, role_id)
VALUES
  (
    "ADMIN",
    "$argon2i$v=19$m=4096,t=3,p=1$7H2e6MET/YUN+Gh7pFB56g$41+1OLPTnEIV6dnFEjnCWBPYVhxC0NMB5/djwdqG4ds",
    "Bon",
    "Jean",
    1
  );