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
        '$2a$12$jZ/bmvRs6fJ6seI7eF7AnOt1LCFtnn7Q33qYFd2aZaUJnb4ouFw06'
    );

INSERT INTO
    backpackd_backpacks (name, useritems, total, user_id)
VALUES
    (
        'First Backpack',
        '{"Backpack Gear":{"Backpack":{"brand":"Gregory","size":"65L","weight":"4.4"},"Backpack Cover":{"brand":"Gregory","size":"","weight":".5"},"Trekking Poles":{"brand":"Trail Buddy","size":"","weight":"2.0"}},"Shelter":{"Tent/Tarp/Bivy/Hammock":{"brand":"REI Co-op Flash Air Hammock","size":"","weight":"2.8"}},"Sleeping":{"Sleeping Bag":{"brand":"The North Face Wasatch 45","size":"Regular","weight":"2.25"},"Sleeping Pad":{"brand":"Therm-a-Rest Z Lite Sol Sleeping Pad","size":"Short","weight":".6"}},"Navigation":{"Compass":{"brand":"Suunto A-10 Compass","size":"","weight":".06"},"Solar/portable Charger":{"brand":"Goal Zero Nomad 7 Plus Solar Panel","size":"","weight":".7"}},"Food & Water":{"Water Filter":{"brand":"Sawyer Mini Water Filter","size":"Mini","weight":".12"}},"Emergency":{"First Aid Kit":{"brand":"Adventure Medical Kits Mountain Series Hiker Medical Kit","size":"","weight":".4"}}}',
        13.83,
        1
    ),
    (
        'Second Backpack',
        '{"Backpack Gear":{"Backpack":{"brand":"Osprey Aether AG 70 Pack","size":"L","weight":"5.12"},"Trekking Poles":{"brand":"REI Co-op Passage Trekking Poles","size":"","weight":"1.12"}},"Shelter":{"Tent/Tarp/Bivy/Hammock":{"brand":"REI Co-op Quarter Dome 1 Tent","size":"1 person","weight":"2.35"}},"Sleeping":{"Sleeping Bag":{"brand":"REI Co-op Down Time 0 Down Sleeping Bag","size":"Short","weight":"3.6"},"Sleeping Pad":{"brand":"Big Agnes Q-Core SLX Sleeping Pad","size":"Regular Wide","weight":"1"},"Sleeping Pillow":{"brand":"Sea to Summit Aeros Ultralight Pillow","size":"Delux","weight":".4"}},"Navigation":{"Map":{"brand":"Unknown","size":"","weight":".12"},"Compass":{"brand":"Suunto A-10 Compass","size":"","weight":".06"},"Solar/portable Charger":{"brand":"Powertraveller Solar Adventurer Solar Charger","size":"","weight":".6"}},"Food & Water":{"Water Reservoir":{"brand":"Osprey Hydraulics Reservoir","size":"3L","weight":".5"},"Water Filter":{"brand":"Katadyn Vario Water Filter","size":"","weight":"1.12"},"Meals":{"brand":"Backpacker Pantry Pad Thai Veggie","size":"","weight":"3"}}}',
        18.99,
        1
    );

COMMIT