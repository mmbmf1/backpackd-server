ALTER TABLE backpackd_backpacks
    DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS backpackd_users;