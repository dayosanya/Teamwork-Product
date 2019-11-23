DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  ID SERIAL PRIMARY KEY,
  created_on VARCHAR(30),
  authorid VARCHAR(30),
  title VARCHAR(30),
  article VARCHAR(30),
  comment VARCHAR(30),
  commentid VARCHAR(30),
  post VARCHAR(30)
  );
INSERT INTO articles (created_on, authorid, title, article, comment, commentid, post)
 VALUES ('Nov-20-2019', 'Potter7', 'events', 'gossips', 'coming', '47', 'done');
 
 SELECT * FROM articles;

