kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
});

const MOVE_SPEED = 120;
const JUMP_FORCE = 400; // increased from 360
const BIG_JUMP_FORCE = 550; // increased from 550
let CURRENT_JUMP_FORCE = JUMP_FORCE;
let isJumping = true;
const FALL_DEATH = 400;

const sounds = {
    jump: new Audio('./sounds/jump.mp3'),
    coin: new Audio('./sounds/coin.mp3'),
    gameover: new Audio('./sounds/gameover.mp3'),
    mushroom: new Audio('./sounds/mushroom.mp3'),
    pipe: new Audio('./sounds/pipe.mp3'),
    goomba: new Audio('./sounds/goomba.mp3'),
    bowser: new Audio('./sounds/bowser.mp3'), // Add this line
};

// Set the volume for the sounds
sounds.gameover.volume = 0.9; // Set volume to maximum (1.0 is the maximum value)
sounds.jump.volume = 0.1;
sounds.coin.volume = 0.1;
sounds.mushroom.volume = 0.1;
sounds.pipe.volume = 0.8;
sounds.goomba.volume = 1;
sounds.bowser.volume = 1; // Adjust the volume as needed

// Set the root directory for images
loadRoot('https://i.imgur.com/');
loadSprite('coin', 'wbKxhcd.png');
loadSprite('evil-shroom', 'KPO3fR9.png');
loadSprite('brick', 'pogC9x5.png');
loadSprite('block', 'M6rwarW.png');
loadSprite('mario', 'Wb1qfhK.png');
loadSprite('mushroom', '0wMd92p.png');
loadSprite('surprise', 'gesQ1KP.png');
loadSprite('unboxed', 'bdrLpi6.png');
loadSprite('pipe-top-left', 'ReTPiWY.png');
loadSprite('pipe-top-right', 'hj2GK4n.png');
loadSprite('pipe-bottom-left', 'c1cYSbt.png');
loadSprite('pipe-bottom-right', 'nqQ79eI.png');

loadSprite('blue-block', 'fVscIbn.png');
loadSprite('blue-brick', '3e5YRQd.png');
loadSprite('blue-steel', 'gqVoI2b.png');
loadSprite('blue-evil-shroom', 'SvV4ueD.png');
loadSprite('blue-surprise', 'RMqCc1G.png');
loadSprite('gameover', '7BfwFge.gif');
loadSprite('bowser', 'tFz6kLn.png');
loadSprite('luigi', 'huQGELy.png' );
// Use absolute paths for sound files

const mushroomFacts = [
    "Mushrooms are more closely related to humans than to plants.",
    "Some mushrooms can glow in the dark.",
    "Mushrooms make vitamin D when exposed to sunlight.",
    "There are over 10,000 types of mushrooms.",
    "Mushrooms have been used in medicine for thousands of years.",
    "The largest living organism on Earth is a mushroom in Oregon.",
    "Mushrooms can break down plastic waste.",
    "Mushrooms are packed with antioxidants.",
    "Some mushrooms can create their own wind to spread spores.",
    "Mushrooms can talk to each other through underground networks.",
    "Mushrooms were the first living things on Earth to grow on land.",
    "Mushrooms belong to the kingdom Fungi, not plants.",
    "Certain mushrooms can be used as natural pesticides.",
    "Mushrooms are low in calories and rich in nutrients.",
    "The oldest mushroom fossils are over 400 million years old.",
    "Some mushrooms can grow as fast as 2 inches per hour.",
    "Mushrooms can be used to make dyes for fabrics.",
    "Eating mushrooms can help lower blood pressure and cholesterol.",
    "Mushrooms were used in ancient Egypt for religious rituals.",
    "Mushrooms can be turned into eco-friendly packaging materials.",
    "Button mushrooms are originally from Europe.",
    "Mushrooms are 90% water.",
    "Some mushrooms need damp, dark places to grow.",
    "Mushrooms can be found everywhere, even in deserts and rainforests.",
    "Certain mushrooms smell like rotten meat to attract flies.",
    "Mushrooms help boost your immune system.",
    "Truffles are a type of underground mushroom that is very expensive.",
    "Mushrooms can grow without sunlight for years.",
    "Some mushrooms are poisonous and can cause illness or death.",
    "Mushrooms help break down decaying organic matter like leaves and wood.",
    "The mycelium of mushrooms can be used to make sustainable packaging.",
    "Mushrooms can help detoxify the body.",
    "Mushrooms were a popular food during World War II.",
    "Mushrooms are often used in vegetarian and vegan meals as a meat substitute.",
    "Mushrooms grow in different climates, from hot jungles to cool forests.",
    "Mushrooms release spores for reproduction instead of seeds.",
    "The part of the mushroom we eat is called the cap.",
    "Some mushrooms grow in clusters, while others grow alone.",
    "Mushrooms are a great source of B vitamins.",
    "Some mushrooms can glow at night.",
    "The spores of mushrooms can travel long distances in the air.",
    "Mushrooms contain chitin, the same material in insect shells.",
    "Mushrooms are a rich source of minerals like copper, potassium, and phosphorus.",
    "Mushrooms can be used to make vegan cheese and meat substitutes.",
    "Some mushrooms are used to make natural antibiotics, like penicillin.",
    "Mushrooms are an important food source for many animals.",
    "Mushrooms are used in cooking worldwide in dishes like soups, salads, and pizza.",
    "Mycelium can grow over vast areas underground.",
    "Some mushrooms can be poisonous if eaten raw but safe when cooked.",
    "Certain mushrooms have medicinal properties that help with health issues.",
    "Mushrooms are a common ingredient in Asian cuisine.",
    "Mushrooms were one of the first organisms to evolve on land.",
    "The term 'toadstool' is used to describe toxic mushrooms in folklore.",
    "Mushrooms can be used for biodegradable packaging and eco-friendly products.",
    "Mushrooms are high in fiber, which helps with digestion.",
    "Some mushrooms can grow from compost and decaying organic material.",
    "Mushrooms can reduce inflammation in the body.",
    "Mushrooms can be cultivated indoors in controlled environments.",
    "Mushrooms are key players in the decomposition process of organic materials.",
    "Certain mushrooms, like shiitakes, are grown on logs.",
    "Mushrooms are rich in antioxidants, which help fight free radicals in the body.",
    "Some mushrooms have been used for centuries in Chinese medicine.",
    "The matsutake mushroom is one of the most expensive in the world.",
    "Mushrooms grow in the wild and can also be farmed.",
    "Mushrooms can be found in forests, fields, and even urban areas.",
    "The gills of mushrooms are where spores are produced.",
    "Mushrooms are packed with vitamins like vitamin D and B12.",
    "Mushrooms can be eaten raw, cooked, or dried.",
    "Mushrooms can improve the flavor of dishes with their earthy taste.",
    "Mushrooms can be used to make natural food preservatives.",
    "Mushrooms are often used to make soups, sauces, and gravies.",
    "Mushrooms can be a healthy addition to any diet.",
    "Some mushrooms, like lion’s mane, are known to help brain function.",
    "Mushrooms can help reduce cholesterol levels in the body.",
    "Certain mushrooms are prized by chefs for their flavor and texture.",
    "Mushrooms have been shown to have anti-cancer properties.",
    "Some mushrooms are grown in the dark to keep them white.",
    "Mushrooms are used in the production of biofuels.",
    "Mushrooms are a source of plant-based protein.",
    "The mycelium of mushrooms is used to create eco-friendly materials.",
    "Mushrooms can be used to create biodegradable plastics.",
    "Some mushrooms are used to make medicines that help with immunity.",
    "Mushrooms can be used to make wine and beer.",
    "Some mushrooms are edible when cooked but toxic when raw.",
    "Mushrooms can improve heart health by lowering blood pressure.",
    "Mushrooms are grown in many different ways, including on logs, in fields, and indoors.",
    "Mushrooms can be used in the production of vegan leather.",
    "Mushrooms can break down and decompose dead plants and animals.",
    "Some mushrooms are grown on sawdust or other organic matter.",
    "Mushrooms are important in the food chain, breaking down organic waste.",
    "Some mushrooms contain toxins that can make you sick or even kill you.",
    "Mushrooms are used in traditional dishes worldwide, from pizza to stir-fries.",
    "Some mushrooms, like reishi, are known for their calming effects.",
    "Mushrooms help improve the soil by adding nutrients as they break down.",
    "Mushrooms can help fight off infections in the body.",
    "Mushrooms are a great source of dietary fiber.",
    "Mushrooms have been used in various cultures for centuries as a food and medicine.",
    "Some mushrooms, like the porcini, are highly sought after for their flavor.",
    "Mushrooms are naturally low in fat and calories, making them a healthy choice.",
    "Some mushrooms are used to make vegan jerky and other plant-based snacks.",
    "Mushrooms can be used as natural dyes for fabrics and materials.",
    "Mushrooms are often used as an ingredient in vegan burgers and plant-based meat.",
    "Mushrooms are a key ingredient in many Asian soups and dishes.",
    "Certain mushrooms, like maitake, are thought to have cancer-fighting properties.",
    "Mushrooms are one of the few plant-based sources of vitamin D.",
    "Some mushrooms grow in trees, while others grow on the ground.",
    "Mushrooms are high in potassium, which helps regulate blood pressure.",
    "Mushrooms are used in the production of tempeh, a fermented food.",
    "Some mushrooms have been shown to improve memory and mental clarity.",
    "Mushrooms can be used to make eco-friendly packaging materials.",
    "Certain mushrooms are known for their ability to boost energy.",
    "Mushrooms can be a great source of antioxidants for your body.",
    "Mushrooms can be found in many different colors, shapes, and sizes.",
    "Mushrooms are one of the oldest organisms on Earth, dating back over 400 million years.",
    "The mycelium of mushrooms can help regenerate damaged ecosystems.",
    "Some mushrooms are used in cooking because they add umami flavor to food.",
    "Mushrooms can be dried and stored for later use.",
    "Mushrooms can be cultivated indoors with controlled conditions for maximum growth.",
    "Mushrooms are often used in natural and herbal remedies.",
    "Some mushrooms have been used in ancient rituals to help people with spiritual experiences.",
    "Mushrooms are a low-fat source of protein and other nutrients.",
    "Certain mushrooms, like chanterelles, are highly sought after by chefs and foodies.",
    "Mushrooms can be eaten raw, sautéed, grilled, or used in a variety of recipes.",
    "Mushrooms are important for the health of forests and other ecosystems.",
    "Mushrooms are often used as a garnish or topping for various dishes.",
    "Mushrooms can be used in soups, stews, salads, and stir-fries.",
    "Some mushrooms have been found to have anti-inflammatory properties.",
    "Mushrooms can be used in teas to help with relaxation and stress reduction.",
    "Some mushrooms have properties that are believed to boost your mood.",
    "Mushrooms are often harvested in the wild or grown in controlled environments.",
    "Mushrooms are rich in fiber, which helps support your digestive system.",
    "Mushrooms are considered a superfood for their many health benefits."
];

scene('start', () => {
    add([
        text('Mario Game', 60),
        origin('center'),
        pos(width() / 2, height() / 2 - 100),
        color(1, 1, 0), // RGB values for yellow
    ]);

    add([
        text('Choose Your Character', 20), // Smaller text size
        origin('center'),
        pos(width() / 2, height() / 2),
        color(1, 1, 0), // RGB values for yellow
    ]);

    // Add Mario sprite to the start scene
    const mario = add([
        sprite('mario'),
        pos(width() / 2 - 30, height() / 2 + 50), // Position Mario to the left
        origin('center'),
        scale(2), // Adjust the scale as needed
    ]);

    // Add Luigi sprite to the start scene
    const luigi = add([
        sprite('luigi'),
        pos(width() / 2 + 30, height() / 2 + 50), // Position Luigi to the right
        origin('center'),
        scale(0.16), // Adjust the scale as needed
    ]);

    // Start the game when clicking on Mario
    mario.clicks(() => {
        go('game', { level: 0, score: 0 });
    });

    // Show message when clicking on Luigi
    luigi.clicks(() => {
        const message = add([
            text('! Character not unlocked yet !', 20),
            origin('center'),
            pos(width() / 2, height() / 2 + 100),
            color(1, 0, 0), // RGB values for red
        ]);

        // Remove the message after 3 seconds
        wait(2, () => {
            destroy(message);
        });
    });
});

scene('game', ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj');

    const maps = [
        [
            '                                      ',
            '                                      ',
            '                                      ',
            '                                      ',
            '                                      ',
            '     %   =*=%=                        ',
            '                                      ',
            '                            -+        ',
            '                    ^   ^   ()        ',
            '==============================   =====',
        ],
        [
            '£                                       £',
            '£                                       £',
            '£                                       £',
            '£                                       £',
            '£                                       £',
            '£        @@@@@@              x x        £',
            '£                          x x x        £',
            '£                        x x x x  x   -+£',
            '£               z   z  x x x x x  x   ()£',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],
    ];

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin'), 'coin'],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
        '^': [sprite('evil-shroom'), solid(), 'dangerous', body()],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],
        '!': [sprite('blue-block'), solid(), scale(0.5)],
        '£': [sprite('blue-brick'), solid(), scale(0.5)],
        'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
        '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
        'x': [sprite('blue-steel'), solid(), scale(0.5)],
    };
    const gameLevel = addLevel(maps[level], levelCfg);

    add([
        text('level ' + parseInt(level + 1)),
        pos(30, 6), // Position the level text above the score text
        layer('ui'),
    ]);

    const scoreLabel = add([
        text('score ' + score),
        pos(30, 26), // Adjusted position to be below the level text
        layer('ui'),
        {
            value: score,
        },
    ]);

    // Add mushroom text on the upper right corner
    

    // Add Bowser sprite to the right of the green pipe on the right block that's standing alone
    if (level === 0) {
        add([
            sprite('bowser'),
            pos(700, 145), // Adjust the position as needed
            origin('center'),
            scale(0.06), // Make Bowser smaller
            'bowser', // Add a tag to Bowser
        ]);
    }

    function big() {
        let timer = 0;
        let isBig = false;
        return {
            update() {
                if (isBig) {
                    timer -= dt(); // delta time
                    if (timer <= 0) {
                        this.smallify();
                    }
                }
            },
            isBig() {
                return isBig;
            },
            smallify() {
                this.scale = vec2(1);
                CURRENT_JUMP_FORCE = JUMP_FORCE;
                timer = 0;
                isBig = false;
            },
            biggify(time) {
                this.scale = vec2(2);
                CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
                timer = time;
                isBig = true;
            },
        };
    }

    const player = add([
        sprite('mario'),
        solid(),
        pos(30, 0),
        body(),
        big(),
        origin('bot'),
    ]);

    action('mushroom', (m) => {
        // move anything with tag 'mushroom'
        m.move(100, 0);
    });

    // when player bump a brick, break brick, generate coin
    player.on('headbump', (obj) => {
        if (obj.is('coin-surprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1)); // create coin above the surprise box after headbump
            destroy(obj);
            gameLevel.spawn('}', obj.gridPos.sub(0, 0)); // create empty box to replace surprise box after headbump
        }
        if (obj.is('mushroom-surprise')) {
            gameLevel.spawn('#', obj.gridPos.sub(0, 1)); // create mushroom above the surprise box after headbump
            destroy(obj);
            gameLevel.spawn('}', obj.gridPos.sub(0, 0));
        }
    });

    player.collides('mushroom', (m) => {
        destroy(m);
        player.biggify(10);
        sounds.mushroom.play(); // Play mushroom sound

        // Select a random mushroom fact
        const randomFact = mushroomFacts[Math.floor(Math.random() * mushroomFacts.length)];

        // Add text box when mushroom is activated
        const mushroomText = add([
            text(randomFact, 7),
            pos(player.pos.x, player.pos.y - 100), // Position the text above the player
            origin('center'),
            layer('ui'),
            color(1, 1, 1), // RGB values for white
        ]);

        // Remove the text box after 5 seconds
        wait(5, () => {
            destroy(mushroomText);
        });
    });

    player.collides('coin', (c) => {
        destroy(c);
        scoreLabel.value++;
        scoreLabel.text = 'score ' + scoreLabel.value;
        sounds.coin.play(); // Play coin sound
    });

    player.collides('dangerous', (d) => {
        if (isJumping) {
            destroy(d);
            sounds.goomba.play(); // Play goomba sound when Mario kills a Goomba
        } else {
            go('lose', { score: scoreLabel.value });
            sounds.gameover.play(); // Play game over sound
        }
    });

    // Add collision detection between Mario and Bowser
    player.collides('bowser', (b) => {
        if (player.isBig() && isJumping) {
            destroy(b);
            sounds.goomba.play(); // Play goomba sound when Mario kills Bowser
        } else {
            go('lose', { score: scoreLabel.value });
            sounds.gameover.play(); // Play game over sound
        }
    });

    player.action(() => {
        camPos(player.pos);
        if (player.pos.y >= FALL_DEATH) {
            go('lose', { score: scoreLabel.value });
            sounds.gameover.play(); // Play game over sound
        }
    });

    player.collides('pipe', () => {
        sounds.bowser.play(); // Play Bowser sound when Mario stands on the green pipe
        keyPress('down', () => {
            sounds.pipe.play(); // Play pipe sound
            go('game', {
                level: (level + 1) % maps.length, // continue looping the levels
                score: scoreLabel.value,
            });
        });
    });

    const ENEMY_SPEED = 20;
    action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0);
    });

    // keyboard control player direction
    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0); // move(x-axis, y-axis)
    });
    keyDown('right', () => {
        player.move(MOVE_SPEED, 0);
    });
    keyDown('a', () => {
        player.move(-MOVE_SPEED, 0); // move(x-axis, y-axis)
    });
    keyDown('d', () => {
        player.move(MOVE_SPEED, 0);
    });

    player.action(() => {
        if (player.grounded()) {
            isJumping = false;
        }
    });
    keyPress('space', () => {
        if (player.grounded()) {
            isJumping = true;
            player.jump(CURRENT_JUMP_FORCE);
            sounds.jump.play(); // Play jump sound
        }
    });

    keyPress('up', () => {
        if (player.grounded()) {
            isJumping = true;
            player.jump(CURRENT_JUMP_FORCE);
            sounds.jump.play(); // Play jump sound
        }
    });
    keyPress('w', () => {
        if (player.grounded()) {
            isJumping = true;
            player.jump(CURRENT_JUMP_FORCE);
            sounds.jump.play(); // Play jump sound
        }
    });
});

scene('lose', ({ score }) => {
    // Retrieve high scores from localStorage
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Add the current score to the high scores list
    highScores.push(score);

    // Sort the high scores in descending order and keep only the highest score
    highScores.sort((a, b) => b - a);
    const highestScore = highScores[0];

    // Save the updated high scores list to localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    add([
        sprite('gameover'),
        origin('center'),
        pos(width() / 2, height() / 2 - 50),
    ]);

    add([
        text('Score: ' + score, 32),
        origin('center'),
        pos(width() / 2, height() / 2 + 50),
        color(1, 1, 0), // RGB values for yellow
    ]);

    add([
        text('High Score: ' + highestScore, 10),
        origin('center'),
        pos(width() / 2, height() / 2 + 100),
        color(1, 1, 0), // RGB values for yellow
    ]);

    sounds.gameover.play(); // Play game over sound

    keyPress('enter', () => {
        sounds.gameover.pause(); // Pause the game over sound
        sounds.gameover.currentTime = 0; // Reset the sound to the beginning
        go('game', { level: 0, score: 0 });
    });
});

// Start with the start scene
start('start');