class Player extends Plane{
    
    setup() {
        super.setup('player');
        this.initBullet('playerBullet', this.scene.playerBullets);
        this.gameControllerId = 'game-controller-loop';
        this.event();
    }

    up() {
        if (this.y <= 0) return;
        this.y-=this.speed;
    }
    left() {
        if (this.x <= 0) return;
        this.x-=this.speed;
    }
    right() {
        if (this.x+this.w >= config.game.w) return;
        this.x+=this.speed;
    }
    down() {
        if (this.y+this.h >= config.game.h) return;
        this.y+=this.speed;
    }

    event() {
        const called = callback=>{
            if (!this.run) return;
            if (this.scene.pauseFlag) return;
            if (this.scene.game.data.end) return;
            callback.call(this);
        };
        const keys = {
            'w': this.up,
            'a': this.left,
            's': this.down,
            'd': this.right,
        };
        Object.keys(keys).map((key) => {
            hotkey.reg(key, () => {
               called(keys[key]);
            }); 
        });
        
        hotkey.reg(' ', () => {
            called(()=>{
                res.replay('shoot');
                this.fire();
            });
        }, true);

        {
            let dir = null;
            const controller = $('.game-controller');
            on(controller,'mousemove',e=>{
                const target = e.target;
                dir = target.className;
            });
            on(controller,'mouseout',()=>{
                dir = null;
            });
            on(controller,'touchmove',e=>{
                const target = e.target;
                dir = target.className;
            });
            on(controller,'touchend',()=>{
                dir = null;
            });
            const loop = ()=>{
                called(()=>{
                    this[dir] && this[dir]();
                });
            }
            raf.reg(this.gameControllerId,loop);
        }
    }

    uninstall (){
        raf.remove(this.gameControllerId);
    }
}