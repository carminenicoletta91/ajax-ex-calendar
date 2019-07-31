$(document).ready(function() {
  // funzione al click su icona next o prev
  $(".next,.prev").click(function(){
    console.log($(this));
    // variabile che prende il valore della classe
    var classe=$(this).attr("class");
    console.log(classe);
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
    // dichiaro variabile per ritornarmi il valore del mese tramite attr rif
    var mese=$(".box-carousel >div#mesi >div.active").attr("rif");
    console.log(mese);
    // dichiaro variabile che crea la data del mese corrispondente
    var data = moment("2018-"+mese+"-01","YYYY-MM-DD");
    console.log(data);
    for(var i=1;i<=data.daysInMonth();i++){
    $(".box-carousel >div#mesi >div.active ul").append ("<li>"+data.format(i+"-MMMM-YYYY")+ "</li>");
  }
    var number =mese - 1;
  $.ajax({

  url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+number,
  method:"GET",
  success:function(data){
    console.log(data.response);
  }


})
  });
  // appena aggiorno pagina
  var mese=$(".box-carousel >div#mesi >div.active").attr("rif");
  console.log(mese);
  var data = moment("2018-"+mese+"-01","YYYY-MM-DD");
  console.log(data);
  for(var i=1;i<=data.daysInMonth();i++){
  $(".box-carousel >div#mesi >div.active ul").append("<li>"+data.format(i+"-MMMM-YYYY")+ "</li>");
}
  var number=mese-1;



   $.ajax({

   url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+number,
   method:"GET",
   success:function(data){
     console.log(data.response);
   }


});

   function nextdiv(){
     var activediv=$(".box-carousel >div#mesi >div.active");
     activediv.removeClass("active");
     activediv.next("div" ).addClass("active");
   }
   function prevdiv(){
     var activediv=$(".box-carousel >div#mesi >div.active");
     activediv.removeClass("active");
     activediv.prev("div" ).addClass("active");
   }















})
