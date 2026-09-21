BEGIN TRANSACTION;
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT  NOT NULL,
  email TEXT NOT NULL
);
INSERT INTO "usuarios" VALUES(1,'Ana','ana@email.com');
INSERT INTO "usuarios" VALUES(2,'Luis','luis@email.com');
DELETE FROM "sqlite_sequence";
INSERT INTO "sqlite_sequence" VALUES('usuarios',2);
COMMIT;
