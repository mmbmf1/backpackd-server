-- BEGIN

    -- TRUNCATE
    -- backpackd_backpacks,
    -- backpackd_users
    -- RESTART IDENTITY CASCADE;

    INSERT INTO backpackd_users
        (user_name, first_name, last_name, user_email, password)
    VALUES
        ('ksalmond0',	'Kaela', 'Salmond', 'ksalmond0@tripod.com', 'rHe3mf0XW'),
        ('nchainey1',	'Nora',	'Chainey',	'nchainey1@patch.com',	'v7pKfno3TE'),
        ('pdonegan2',	'Philippe',	'Donegan',	'pdonegan2@google.fr',	'p91kLdEvw'),
        ('gasipenko3',	'Gabriell',	'Asipenko',	'gasipenko3@usatoday.com',	'nsQMFBPhB'),
        ('cpreshaw4',	'Corinna',	'Preshaw',	'cpreshaw4@narod.ru',	'ei6u6y'),
        ('pbatrip5',	'Paddy',	'Batrip',	'pbatrip5@smugmug.com',	'I2bdpB'),
        ('vcossam6',	'Vasily',	'Cossam',	'vcossam6@de.vu',	'2VxrtSYfyS'),
        ('tmcfaul7',	'Tremain',	'McFaul',	'tmcfaul7@dell.com',	'RKuwd7c7'),
        ('gvollam8',	'Georgetta',	'Vollam',	'gvollam8@tuttocitta.it',	'Y6XN1ea'),
        ('rgrimshaw9',	'Ronny',	'Grimshaw',	'rgrimshaw9@omniture.com',	'lmlAvmO');

-- COMMIT