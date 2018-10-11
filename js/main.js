res.loadAssets(() => {
    const game = new Game();
    game.start();
});

on(window,'load',()=>{
    setTimeout(()=>{
        on(
            $('video'),
            'mouseover',
            ()=>{
                $('video').play();
            }
        )
    },50);
});