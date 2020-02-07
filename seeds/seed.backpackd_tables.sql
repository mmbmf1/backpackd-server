BEGIN TRUNCATE backpackd_backpacks,
backpackd_users RESTART IDENTITY CASCADE;

INSERT INTO
    backpackd_users (
        user_name,
        first_name,
        last_name,
        user_email,
        password
    )
VALUES
    (
        'ksalmond0',
        'Kaela',
        'Salmond',
        'ksalmond0@tripod.com',
        'rHe3mf0XW'
    ),
    (
        'nchainey1',
        'Nora',
        'Chainey',
        'nchainey1@patch.com',
        'v7pKfno3TE'
    ),
    (
        'pdonegan2',
        'Philippe',
        'Donegan',
        'pdonegan2@google.fr',
        'p91kLdEvw'
    ),
    (
        'gasipenko3',
        'Gabriell',
        'Asipenko',
        'gasipenko3@usatoday.com',
        'nsQMFBPhB'
    ),
    (
        'cpreshaw4',
        'Corinna',
        'Preshaw',
        'cpreshaw4@narod.ru',
        'ei6u6y'
    ),
    (
        'pbatrip5',
        'Paddy',
        'Batrip',
        'pbatrip5@smugmug.com',
        'I2bdpB'
    ),
    (
        'vcossam6',
        'Vasily',
        'Cossam',
        'vcossam6@de.vu',
        '2VxrtSYfyS'
    ),
    (
        'tmcfaul7',
        'Tremain',
        'McFaul',
        'tmcfaul7@dell.com',
        'RKuwd7c7'
    ),
    (
        'gvollam8',
        'Georgetta',
        'Vollam',
        'gvollam8@tuttocitta.it',
        'Y6XN1ea'
    ),
    (
        'rgrimshaw9',
        'Ronny',
        'Grimshaw',
        'rgrimshaw9@omniture.com',
        'lmlAvmO'
    );

INSERT INTO
    backpackd_backpacks (name, useritems, summary, user_id)
VALUES
    (
        'First Backpack',
        '{"Backpack Gear":{"Backpack":{"brand":"Gregory","size":"65L","weight":"4.4"},"Backpack Cover":{"brand":"Gregory","size":"","weight":".5"},"Trekking Poles":{"brand":"Trail Buddy","size":"","weight":"2.0"}},"Shelter":{"Tent/Tarp/Bivy/Hammock":{"brand":"REI Co-op Flash Air Hammock","size":"","weight":"2.8"}},"Sleeping":{"Sleeping Bag":{"brand":"The North Face Wasatch 45","size":"Regular","weight":"2.25"},"Sleeping Pad":{"brand":"Therm-a-Rest Z Lite Sol Sleeping Pad","size":"Short","weight":".6"}},"Navigation":{"Compass":{"brand":"Suunto A-10 Compass","size":"","weight":".06"},"Solar/portable Charger":{"brand":"Goal Zero Nomad 7 Plus Solar Panel","size":"","weight":".7"}},"Food & Water":{"Water Filter":{"brand":"Sawyer Mini Water Filter","size":"Mini","weight":".12"}},"Emergency":{"First Aid Kit":{"brand":"Adventure Medical Kits Mountain Series Hiker Medical Kit","size":"","weight":".4"}}}',
        '{"total":[0,4.4,0.5,2,2.8,2.25,0.6,0.06,0.7,0.12,0.4]}',
        1
    ),
    (
        'Second Backpack',
        '{"Backpack Gear":{"Backpack":{"brand":"Osprey Aether AG 70 Pack","size":"L","weight":"5.12"},"Trekking Poles":{"brand":"REI Co-op Passage Trekking Poles","size":"","weight":"1.12"}},"Shelter":{"Tent/Tarp/Bivy/Hammock":{"brand":"REI Co-op Quarter Dome 1 Tent","size":"1 person","weight":"2.35"}},"Sleeping":{"Sleeping Bag":{"brand":"REI Co-op Down Time 0 Down Sleeping Bag","size":"Short","weight":"3.6"},"Sleeping Pad":{"brand":"Big Agnes Q-Core SLX Sleeping Pad","size":"Regular Wide","weight":"1"},"Sleeping Pillow":{"brand":"Sea to Summit Aeros Ultralight Pillow","size":"Delux","weight":".4"}},"Navigation":{"Map":{"brand":"Unknown","size":"","weight":".12"},"Compass":{"brand":"Suunto A-10 Compass","size":"","weight":".06"},"Solar/portable Charger":{"brand":"Powertraveller Solar Adventurer Solar Charger","size":"","weight":".6"}},"Food & Water":{"Water Reservoir":{"brand":"Osprey Hydraulics Reservoir","size":"3L","weight":".5"},"Water Filter":{"brand":"Katadyn Vario Water Filter","size":"","weight":"1.12"},"Meals":{"brand":"Backpacker Pantry Pad Thai Veggie","size":"","weight":"3"}}}',
        '{"total":[0,5.12,1.12,2.35,3.6,1,0.4,0.12,0.06,0.6,0.5,1.12,3]}',
        4
    );

COMMIT