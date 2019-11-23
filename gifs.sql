CREATE TABLE gifs (
  ID SERIAL PRIMARY KEY,
  created_on VARCHAR(30),
  comment VARCHAR(30),
  authorid VARCHAR(30),
  gifid VARCHAR(30),
  title VARCHAR(30),
  url VARCHAR(30)
);
INSERT INTO gifs (created_on, comment, gifid, title, url)
VALUES ('22-11-2019', 'giving', '4b', 'charity', 'facebook.com');

SELECT * FROM gifs;