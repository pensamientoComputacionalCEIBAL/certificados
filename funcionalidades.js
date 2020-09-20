const api = new XMLHttpRequest ();
var url, datos, validadorDeConsulta;

$( document ).ready(function() {

$( "#vDocumento" ).click(function() { validarDocumento (); });

$("#documento").keypress(function(e) { 
var code = (e.keyCode ? e.keyCode : e.which); 
if(code == 13){ validarDocumento(); return false; } });

$("#documento").focus();

});


function validarDocumento () {
 url = 'https://spreadsheets.google.com/feeds/list/1wsu2QIMU5_AA7lfNse7uKTOzUY2dsdXGPuLdubpyvtQ/1/public/values?alt=json';
 api.open('GET',url,true);
 api.send();
 $("#resultados").html("¡Tu petición está siendo procesada!, <b>por favor espera…</b>");

 api.onreadystatechange = function () {
 if (this.status == 500) { sinResultados (); }
 else if (this.status == 200 && this.readyState == 4) {
  datos = JSON.parse (this.responseText); // Transformación a formato JSON.
// var i = 0, validadorDeConsulta = 0;
  var i = datos.feed.entry.length - 1; validadorDeConsulta = 0;
  while (i >= 0) {
//  while (i < datos.feed.entry.length) {
  if (datos.feed.entry[i]["gsx$documentodeidentidad."].$t == $("#documento").val()) {
   validadorDeConsulta = 1;
   $("#resultados").html(
   '<li class ="list-group-item shadow-sm"> <b>Nombre del participante: </b>' + datos.feed.entry[i]["gsx$nombredelparticipante."].$t +
   ' (<b>Doc. <i class="text-danger">' + datos.feed.entry[i]["gsx$documentodeidentidad."].$t + '</b></i>)</li>' +
   '<li class ="list-group-item shadow-sm"> <b>Certificación que has obtenido: </b>' + datos.feed.entry[i]["gsx$nombredelcursoquehaaprobado."].$t + '</li>' +
   '<li class ="list-group-item shadow-sm"> <b>Mes en que es expedido: </b>' + datos.feed.entry[i]["gsx$mesenelquesehaaprobado."].$t + 
   ', <b>horas de esfuerzo totales: </b>' + datos.feed.entry[i]["gsx$horasdeesfuerzototales."].$t + '</li>' +
   '<li class ="list-group-item shadow-sm text-center">' +
   '<a href=' + datos.feed.entry[i]["gsx$mergeddocurl-generadorprimero"].$t + ' target="_blank"><strong>¡CLIC AQUÍ PARA DESCARGAR!</strong></a>' + '</li>');
   // i = datos.feed.entry.length; }
   i = 0; }
  // i++; } }
  i--; } }
  if (validadorDeConsulta == 0) { sinResultados (); } }
$("#documento").focus(); }

function sinResultados () {
$("#resultados").html('¡Ups!, <b>¡no hay resultados para el documento ingresado!.</b>');

} 

/*
gsx$documentmergestatus-generadorprimero: {$t: "Data merged and appended successfully; PDF created…ano@ceibal.edu.uy; Timestamp: Sep 13 2020 7:07 PM"}
gsx$documentodeidentidad.: {$t: "47259101"}
gsx$linktomergeddoc-generadorprimero: {$t: "Sep 13 2020 8:07 PM"}
gsx$marcatemporal: {$t: "13/09/2020 20:07:06"}
gsx$mergeddocid-generadorprimero: {$t: "1ceTOi8NdqR5HQIBaGKK_7L3j1GQgMdHP"}
gsx$mergeddocurl-generadorprimero: {$t: "https://drive.google.com/file/d/1ceTOi8NdqR5HQIBaGKK_7L3j1GQgMdHP/view?usp=drivesdk"}
gsx$mesenelquesehaaprobado.: {$t: "Mayo"}
gsx$nombredelcursoquehaaprobado.: {$t: "Propuestas pedagógicas: escribe tu propia aventura"}
gsx$nombredelparticipante.: {$t: "Fernando Sabaño"}
*/