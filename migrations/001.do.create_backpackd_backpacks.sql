CREATE TABLE backpackd_backpacks (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    userItems json NOT NULL,
    total NUMERIC NOT NULL
);