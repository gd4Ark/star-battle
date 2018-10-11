class Rank extends Scene{
    setup() {
        super.setup();
        this.event();
        const {
            name,
            score,
            time,
        } = this.game.data;
        localStorageData.add({
            name,
            score,
            time,
        });
        this.rank();
    }

    rank(){
       let html = ""; 
       let position = 0; 
       let data = [].concat(localStorageData.get().data);
       const some = (a,b)=>{
           return (
                (a.score === b.score) && (a.time === b.time)
           );
       }
       data.sort((a,b)=>{
           if (a.score === b.score){
               return a.time < b.time;
           }
           return a.score < b.score;
       });
       localStorageData.update(data);
       data.map((el,index)=>{
            const prev = data[index-1];
            if (prev){
                position += some(prev,el) ? 0 : 1; 
            }else{
                position++;
            }
            html += `
                <tr>
                    <td>${position}</td>
                    <td>${el.name}</td>
                    <td>${el.score}</td>
                    <td>${el.time}</td>
                </tr>
            `;
       });
       $('#rank table tbody').innerHTML = html;
    }

    event(){
        on(
            $('#restart-btn'),
            'click',
            () => {
                this.game.start();
            }
        )
    }
}