class Start extends Scene{
    setup() {
        super.setup();
        this.game.initData();
        this.event();
    }

    event(){
        on(
            $('#start-btn'),
            'click',
            () => {
                this.game.play();
            }
        )
    }
}