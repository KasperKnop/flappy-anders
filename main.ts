enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Gap = SpriteKind.create()
    export const obstacle = SpriteKind.create()
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    anders.vy = -100
    animation.runImageAnimation(
    anders,
    assets.animation`andersAnim`,
    50,
    false
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (otherSprite.image.equals(scoreCollider)) {
        info.changeScoreBy(1)
        sprites.destroy(otherSprite)
    } else {
        game.over(false)
    }
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    game.over(false)
})
let projectile: Sprite = null
let bottomImage: Image = null
let topImage: Image = null
let randomObstacleIndex = 0
let scoreCollider: Image = null
let anders: Sprite = null
scene.setBackgroundImage(assets.image`background`)
info.setScore(0)
anders = sprites.create(assets.image`anders`, SpriteKind.Player)
anders.ay = 300
anders.setFlag(SpriteFlag.AutoDestroy, true)
game.onUpdateInterval(1500, function () {
    randomObstacleIndex = randint(0, 3)
    if (randomObstacleIndex == 0) {
        topImage = assets.image`obstacle1`
        bottomImage = assets.image`obstacle2`
    } else if (randomObstacleIndex == 1) {
        topImage = assets.image`obstacle3`
        bottomImage = assets.image`obstacle4`
    } else if (randomObstacleIndex == 2) {
        topImage = assets.image`obstacle5`
        bottomImage = assets.image`obstacle6`
    } else {
        topImage = assets.image`obstacle7`
        bottomImage = assets.image`obstacle8`
    }
    projectile = sprites.createProjectileFromSide(topImage, -45, 0)
    projectile.top = 0
    projectile = sprites.createProjectileFromSide(bottomImage, -45, 0)
    projectile.bottom = scene.screenHeight()
    scoreCollider = assets.image`scoreCollider`
    projectile = sprites.createProjectileFromSide(scoreCollider, -45, 0)
    projectile.bottom = scene.screenHeight()
    projectile.setFlag(SpriteFlag.Invisible, true)
})
