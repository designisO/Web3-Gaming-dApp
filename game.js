var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game;
var platforms;
var player;
var cursor;

var jumpHeight = -300;

// lauch game variable only if user is signed in.
(function launch(){
    let user = Moralis.User.current();
    if (!user) {
        console.log("Please Connect Wallet. Thanks!")
    }
    else{
        console.log(user.get('ethAddress') + " " + "logged in.")
        game = new Phaser.Game(config);
    }
})()

function preload ()
{
    this.load.image('background', 'assets/BG.png');
    this.load.image('ground', 'assets/tiles/2.png');
    this.load.image('ground2', 'assets/tiles/3.png');
    this.load.image('ground3', 'assets/tiles/1.png');
    this.load.image('player', 'assets/player.png');
}

function create ()
{
    this.add.image(400, 300, 'background').setScale(0.65);


    platforms = this.physics.add.staticGroup();
    // bottom platforms
    platforms.create(750, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(685, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(620, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(555, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(490, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(425, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(360, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(295, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(230, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(165, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(100, 575, 'ground').setScale(0.5).refreshBody();
    platforms.create(35, 575, 'ground').setScale(0.5).refreshBody();

    // mid row platforms
    platforms.create(570, 300, 'ground2').setScale(0.5).refreshBody();
    platforms.create(505, 300, 'ground').setScale(0.5).refreshBody();
    platforms.create(440, 300, 'ground3').setScale(0.5).refreshBody();
    platforms.create(375, 400, 'ground').setScale(0.5).refreshBody();
    platforms.create(310, 400, 'ground').setScale(0.5).refreshBody();
    platforms.create(160, 300, 'ground').setScale(0.5).refreshBody();
    platforms.create(100, 400, 'ground').setScale(0.5).refreshBody();
    platforms.create(35, 400, 'ground').setScale(0.5).refreshBody();
    
    player = this.physics.add.sprite(100, 450, 'player').setScale(0.1).refreshBody();
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

}
else
{
    player.setVelocityX(0);

}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(jumpHeight);
}
}