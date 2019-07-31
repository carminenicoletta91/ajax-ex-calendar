$(document).ready(function() {
  genera();
  // funzione al click su icona next o prev
  $(".next,.prev").click(function(){
    var classe=$(this).attr("class");
    // console.log(classe);
    // se classe è uguale a prev
    if(classe==="prev"){
      // esegui funzione prevdiv
      prevdiv();
      $(".box-carousel >div#mesi >div ul li").remove();
    // oppure se classe è uguale a next
    }else if(classe==="next"){
      // esegui funzione next
      nextdiv();
      $(".box-carousel >div#mesi >div ul li").remove();
    }
    genera();
  });
  // funzione per popolare il mio div contenente ul
  // con inserimento di chiamata ajax per visualizzare festività
  function genera(){
    // dichiaro variabile per ritornarmi il valore del mese tramite attr rif
    var mesenum=$(".box-carousel >div#mesi >div.active").attr("rif");
    // console.log(mese);
    // dichiaro variabile che crea la data del mese corrispondente
    var datadelmese = moment("2018-"+mesenum+"-01");
    // console.log(data);
    // inserisco il nome del mese nel mio h2
    $(".mesenome").html(datadelmese.format("MMMM YYYY").toUpperCase());
    // ciclo for per scorrere i giorni del mese corrente
    for(var i=1;i<=datadelmese.daysInMonth();i++){
    $(".box-carousel >div#mesi >div.active ul").append ("<li>"+datadelmese.format(i+"-MMMM-YYYY")+ "</li>");
  }
    $.ajax({//chiamata ajax ad api
      url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+(mesenum-1),
      method:"GET",
      success:function(data){
        $(".box-carousel >div#mesi >div.active ul li").each(
          function(){
            // ciclo for per scorrere gli oggetti che ricevo dalla chiamata
            for(var i=0;i<data.response.length;i++){
              // creo variabile j per scorrere le mie date degli oggetti ricevuti
              var j=i;
              var datameserisp = data.response[i].date;
              // creo variabile per formattare la risposta ricevuta in una data consona al confronto
              var nuovadata =moment(datameserisp).format("D-MMMM-YYYY");
              // console.log(nuovadata);
              // creo variabile per trasformare oggetto li in una stringa
              var miadatastringa = $(this).text();
              // console.log("LA TUA STRINGA:"+miastringa);
              // confronto la data dell'oggetto ricevuto con la data presente nel li
              if(nuovadata === miadatastringa ){
                // in caso di riscontro positivo
                // aggiungo in una nuova variabile la stringa del li più la stringa con la festività
                var element = $(this).text(miadatastringa +"-"+ data.response[j].name)
                element.addClass("rosso");
                // console.log("hai vinto "+metti);
              }
            }
          });
        },
      error:function(error){//funzione in caso di error
        alert("errore"+error);
      }

    });//chiusura chiamata ajax
  }//chiusura funzione genera

  // funzione per visualizzare il mese successivo
  function nextdiv(){
    var activediv=$(".box-carousel >div#mesi >div.active");
    activediv.removeClass("active");
    if(activediv.hasClass("last")){
      alert("Calendario 2018 terminato");
      alert("refresh pagina");
      location.reload();
    }else{
      activediv.next("div" ).addClass("active");
    }
  }
  // funzione per visualizzare mese precedente
  function prevdiv(){
    var activediv=$(".box-carousel >div#mesi >div.active");
    activediv.removeClass("active");
    if(activediv.hasClass("first")){
      alert("Calendario 2018 terminato");
      alert("refresh pagina");
      location.reload();
    }else{
    activediv.prev("div" ).addClass("active");
    }
  }
})
