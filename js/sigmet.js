//BORRA TODOS LOS SIGMETS
function removeSigmet() {
  map.eachLayer(function (layer) {
    if (layer.myTag && layer.myTag === "sigmet") {
      map.removeLayer(layer);
    }
  });
}
//BORRA TODOS LOS AIRMETS
function removeAirmet() {
  map.eachLayer(function (layer) {
    if (layer.myTag && layer.myTag === "airmet") {
      map.removeLayer(layer);
    }
  });
}
// BORRA AIREPS
function removeAirep() {
  map.eachLayer(function (layer) {
    if (layer.myTag && layer.myTag === "airep") {
      map.removeLayer(layer);
    }
  });
}

//PINTA TODOS LOS SIGMETS
function loadSigmet() {
  fetch("data/sigmet.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
	      removeSigmet();
          data.forEach(function(point){
			   let icaoId = point.icaoId;
			   let firName = point.firName;
			   let hazard = point.hazard;
			   let qualifier = point.qualifier;
			   let base = point.base;
			   let tope = point.top;
			   let dir = point.dir;
			   let spd = point.spd;
			   let chng = point.chng;
			   let rawSigmet = point.rawSigmet;
			   if (hazard === "TS") {
			      var sigmet = L.polygon(point.coords, {
                       weight: 5,
					   pane: "sigmet",
                       color: 'orange',
                       fillcolor: 'orange'
                   });
			   } else if (hazard === "TURB") {
				  var sigmet = L.polygon(point.coords, {
                       weight: 5,
					   pane: "sigmet",
                       color: 'red',
                       fillcolor: 'red'
                   });	
				} else if (hazard === "MTW") {
				  var sigmet = L.polygon(point.coords, {
                       weight: 5,
					   pane: "sigmet",
                       color: 'lime',
                       fillcolor: 'lime'
                   });	
				} else {
				  var sigmet = L.polygon(point.coords, {
                       weight: 5,
					   pane: "sigmet",
                       color: 'blue',
                       fillcolor: 'blue'
                   });	
				}
			   sigmet.bindTooltip(hazard, {
                  permanent: true,
                  direction: "center",
                  offset: [0, 0],
                  pane: "sigmet_tooltip",
				  className: 'leaflet-tooltip-own'
               });
			   sigmet.bindPopup(
                   popupSigmet(icaoId, firName, hazard, qualifier, base, tope, dir, spd, chng, rawSigmet),
                  {
                   maxWidth: 400,
                   className: "leaflet-popup-content-metar",
                   pane: "sigmet_tooltip",
                  }
               );
			   sigmet.on({
                  mouseover: function (e) {
                  this.setStyle({ fillOpacity: 0.5 });
                  },
                  mouseout: function (e) {
                  this.setStyle({ fillOpacity: 0.2 });
                  }
               });
			   sigmet.myTag = "sigmet";
			   sigmet.addTo(map);
	  });
	})
	.catch(err=>console.log(err))
}

function loadSigmetMtw() {
	$.ajax({
      type: "POST",
      url: "data/sigmet.json",
	  cache: false,
	  crossDomain: true,
	  headers: {'Access-Control-Allow-Origin':'*',
				}, // <-------- set this
      dataType: "json",
      success: function (data) {
          data.forEach(function(point){
			   let icaoId = point.icaoId;
			   let firName = point.firName;
			   let hazard = point.hazard;
			   let qualifier = point.qualifier;
			   let base = point.base;
			   let tope = point.top;
			   let dir = point.dir;
			   let spd = point.spd;
			   let chng = point.chng;
			   let rawSigmet = point.rawSigmet;
			   
			   if (hazard === "MTW") {
			      var sigmet = L.polygon(point.coords, {
                       weight: 5,
					   pane: "sigmet",
                       color: 'lime',
                       fillcolor: 'lime'
                   });
				   sigmet.addTo(map);
                   sigmet.myTag = "sigmet";
				   sigmet.bindTooltip("MTW", {
                       permanent: true,
                       direction: "center",
                       offset: [0, 0],
                       pane: "sigmet_tooltip",
                   });
				   sigmet.bindPopup(
                   popupSigmet(icaoId, firName, hazard, qualifier, base, tope, dir, spd, chng, rawSigmet),
                  {
                   maxWidth: 400,
                   className: "leaflet-popup-content-metar",
                   pane: "sigmet_tooltip",
                  }
               );
			   } else {
				   console.log("no encontrados sigmets de MTW")
			   }
	  });
	  }
  }); 
}

function loadSigmetTur() {
	$.ajax({
      type: "POST",
      url: "data/sigmet.json",
	  cache: false,
	  crossDomain: true,
	  headers: {'Access-Control-Allow-Origin':'*',
				}, // <-------- set this
      dataType: "json",
      success: function (data) {
          data.forEach(function(point){
			   let icaoId = point.icaoId;
			   let firName = point.firName;
			   let hazard = point.hazard;
			   let qualifier = point.qualifier;
			   let base = point.base;
			   let tope = point.top;
			   let dir = point.dir;
			   let spd = point.spd;
			   let chng = point.chng;
			   let rawSigmet = point.rawSigmet;
			   
			   if (hazard === "TURB") {
			      var sigmet = L.polygon(point.coords, {
                       weight: 5,
					   pane: "sigmet",
                       color: 'red',
                       fillcolor: 'red'
                   });
				   sigmet.addTo(map);
                   sigmet.myTag = "sigmet";
				   sigmet.bindTooltip("TURB", {
                       permanent: true,
                       direction: "center",
                       offset: [0, 0],
                       pane: "sigmet_tooltip",
                   });
				   sigmet.bindPopup(
                   popupSigmet(icaoId, firName, hazard, qualifier, base, tope, dir, spd, chng, rawSigmet),
                  {
                   maxWidth: 400,
                   className: "leaflet-popup-content-metar",
                   pane: "sigmet_tooltip",
                  }
               );
			   } else {
				   console.log("no encontrados sigmets de TURB")
			   }
	  });
	  }
  }); 
}

function loadSigmetTs() {
	$.ajax({
      type: "POST",
      url: "data/sigmet.json",
	  cache: false,
	  crossDomain: true,
	  headers: {'Access-Control-Allow-Origin':'*',
				}, // <-------- set this
      dataType: "json",
      success: function (data) {
          data.forEach(function(point){
			   let icaoId = point.icaoId;
			   let firName = point.firName;
			   let hazard = point.hazard;
			   let qualifier = point.qualifier;
			   let base = point.base;
			   let tope = point.top;
			   let dir = point.dir;
			   let spd = point.spd;
			   let chng = point.chng;
			   let rawSigmet = point.rawSigmet;
			   
			   if (hazard === "TS") {
			      var sigmet = L.polygon(point.coords, {
                       weight: 5,
					   pane: "sigmet",
                       color: 'orange',
                       fillcolor: 'orange'
                   });
				   sigmet.addTo(map);
                   sigmet.myTag = "sigmet";
				   sigmet.bindTooltip("TS", {
                       permanent: true,
                       direction: "center",
                       offset: [0, 0],
                       pane: "sigmet_tooltip",
                   });
				   sigmet.bindPopup(
                   popupSigmet(icaoId, firName, hazard, qualifier, base, tope, dir, spd, chng, rawSigmet),
                  {
                   maxWidth: 400,
                   className: "leaflet-popup-content-metar",
                   pane: "sigmet_tooltip",
                  }
               );
			   } else {
				   console.log("no encontrados sigmets de TS")
			   }
	  });
	  }
  }); 
}

function loadSigmetIce() {
	$.ajax({
      type: "POST",
      url: "data/sigmet.json",
	  cache: false,
	  crossDomain: true,
	  headers: {'Access-Control-Allow-Origin':'*',
				}, // <-------- set this
      dataType: "json",
      success: function (data) {
          data.forEach(function(point){
			   let icaoId = point.icaoId;
			   let firName = point.firName;
			   let hazard = point.hazard;
			   let qualifier = point.qualifier;
			   let base = point.base;
			   let tope = point.top;
			   let dir = point.dir;
			   let spd = point.spd;
			   let chng = point.chng;
			   let rawSigmet = point.rawSigmet;
			   
			   if (hazard === "ICE") {
			      var sigmet = L.polygon(point.coords, {
                       weight: 5,
					   pane: "sigmet",
                       color: 'blue',
                       fillcolor: 'blue'
                   });
				   sigmet.addTo(map);
                   sigmet.myTag = "sigmet";
				   sigmet.bindTooltip("Engelamiento", {
                       permanent: true,
                       direction: "center",
                       offset: [0, 0],
                       pane: "sigmet_tooltip",
                   });
				   sigmet.bindPopup(
                   popupSigmet(icaoId, firName, hazard, qualifier, base, tope, dir, spd, chng, rawSigmet),
                  {
                   maxWidth: 400,
                   className: "leaflet-popup-content-metar",
                   pane: "sigmet_tooltip",
                  }
               );
			   } else {
				   console.log("no encontrados sigmets de ICE")
			   }
	  });
	  }
  }); 
}

//AIRMET
async function loadAirmet() {
	  await $.ajax({
      type: "POST",
      url: "data/airmet/airmet.json",
	  cache: false,
	  crossDomain: true,
	  headers: {'Access-Control-Allow-Origin':'*',
				}, // <-------- set this
      dataType: "json",
      success: function (data) {
		  removeAirmet();
          data.forEach(function(point){
			   let icaoId = point.icaoId;
			   let firName = point.firName;
			   let hazard = point.hazard;
			   let rawAirmet = point.rawAirmet;
			   var airmet = L.polygon(point.coords, {
                       weight: 5,
					   pane: "sigmet",
                       color: 'white',
                       fillcolor: 'green'
                   });
			   airmet.bindTooltip(hazard, {
                  permanent: true,
                  direction: "center",
                  offset: [0, 0],
                  pane: "sigmet_tooltip",
               });
			   airmet.bindPopup(
                   popupAirmet(icaoId, firName, hazard, rawAirmet),
                  {
                   maxWidth: 400,
                   className: "leaflet-popup-content-metar",
                   pane: "sigmet_tooltip",
                  }
               );
			   airmet.on({
                  mouseover: function (e) {
                  this.setStyle({ fillOpacity: 0.5 });
                  },
                  mouseout: function (e) {
                  this.setStyle({ fillOpacity: 0.2 });
                  }
               });
			   airmet.myTag = "airmet";
			   airmet.addTo(map);
	  });
	  }
  }); 
}
function popupAirmet(icaoId, firName, hazard, rawAirmet) {
  let info = "<center><h5 style='background-color:green;'>AIRMET</h5></center>";
     info += "<b>Centro emisor: </b>" + icaoId + "</br>";
     info += "<b>FIR: </b>" + firName + "</br>";
     info += "<b>Fenómeno: </b>" + hazard + "</br>";
     info += "<b>----------------------------------------------------</b></br>" + rawAirmet;
  return info;
}
//POPUP SIGMET
function popupSigmet(icaoId, firName, hazard, qualifier, base, tope, dir, spd, chng, rawSigmet) {
  let info = "<center><h5 style='background-color:powderblue;'>SIGMET</h5></center>";
     info += "<b>Centro emisor: </b>" + icaoId + "</br>";
     info += "<b>FIR: </b>" + firName + "</br>";
     info += "<b>Fenómeno: </b>" + hazard + " " + qualifier + "</br>";
     info += "<b>Base/Tope: </b>" + base + "/" + tope + " FT</br>";
     info += "<b>Dir./Vel./Intensidad: </b>" + dir + " / " + spd + "KT" + " / " + chng + "</br>";
     info += "<b>----------------------------------------------------</b></br>" + rawSigmet;
  return info;
}



function popupSigmet2(rawSigmet) {
  let info = "<center><h5 style='background-color:powderblue;'>SIGMET</h5></center>";
     info += "<b>SIGMET: </b>" + rawSigmet + "</br>";
  return info;
}


//function renovarSigmet() {removeSigmet();loadSigmet();}

// CARGAR LOS AIREPS EN EL TEXTAREA 
function loadAirepText() {
 $.ajax({
           url : "data/airep.txt",
		   cache: false,
           dataType: "text",
           success : function (data) {
		       if (data.length === 0) {
			      $("#text_airep").html("<h6>NO HAY AIREPS EMITIDOS HOY</h6>");
			   } else {
				  data = data.replaceAll("UASP","<p><strong>-UASP");
				  data = data.replaceAll("=", "=</strong></p>");
                  $("#text_airep").html("<h6>Aireps: </h6><hr style='color:cyan;margin-top:1px;height:1px;background-color:cyan;'></hr>" + data);
			   }
           }
        });
} 
// BORRA EL CONTENIDO DEL TEXTAREA
function clearcontent() { 
     $(".cajita").empty();
} 

// CARGAR LOS AIRMETS EN EL TEXTAREA 
function loadAirmetText() {
 $.ajax({
           url : "data/airmet/airmet.txt",
		   cache: false,
           dataType: "text",
           success : function (data) {
		       if (data.length === 0) {
			      $("#text_airep").html("<h6>NO HAY AIRMETs EMITIDOS</h6>");
			   } else {
				  data = data.replaceAll("WASP","<p><strong>-WASP");
				  data = data.replaceAll("=", "=</strong></p>");
                  $("#text_airep").html(data);
			   }
           }
        });
}


//FUNCIÓN QUE PINTA LOS AIREPS EN EL MAPA
async function loadAirep() {
  try {
    await $.ajax({
      type: "POST",
      url: "data/airep.geojson",
      dataType: "json",
	  cache: false,
      success: function (response) {
        let airep = L.geoJson(response, {
          pointToLayer: function (feature, latLng) {
            if (feature.properties.tipo == "Turbulencia") {
              if (feature.properties.cat == "moderada") {
                return new L.marker(latLng, {
                  pane: "airep",
                  icon: turIcon_mod,
                });
              } else {
                return new L.marker(latLng, {
                  pane: "airep",
                  icon: turIcon_sev,
                });
              }
            } else if (feature.properties.tipo == "Engelamiento") {
              if (feature.properties.cat == "moderada") {
                return new L.marker(latLng, {
                  pane: "airep",
                  icon: engIcon_mod,
                });
              } else {
                return new L.marker(latLng, {
                  pane: "airep",
                  icon: engIcon_sev,
                });
              }
            } else if (feature.properties.tipo == "Onda de montaña") {
              if (feature.properties.cat == "moderada") {
                return new L.marker(latLng, {
                  pane: "airep",
                  icon: mtwIcon_mod,
                });
              } else {
                return new L.marker(latLng, {
                  pane: "airep",
                  icon: mtwIcon_sev,
                });
              }
            }
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup(
              popupAirep(
                feature.properties.tipo,
                feature.properties.color,
                feature.properties.cat,
                feature.properties.hora,
				feature.properties.lng,
				feature.properties.lat,
                feature.properties.raw
              ),
              {
                maxWidth: 400,
                className: "leaflet-popup-content-airep",
                pane: "sigmet_tooltip",
              }
            ),
			layer.bindTooltip(feature.properties.nivel, {
                       permanent: true,
                       direction: "center",
                       offset: [0, 25],
					   className: "leaflet-popup-tooltip-airep",
                       pane: "sigmet_tooltip",
            });
          },
        });
        airep.myTag = "airep";
        airep.addTo(map);
      },
    });
  } catch (error) {
    console.error("Error al descargar airep.geojson", error);
  }
}
//POPUP AIREP
function popupAirep(tipo, color, cat, hora, lng, lat, raw) {
  let info =
    "<p style='background-color:" + color + ";color:white;font-family:courier;font-weight:bold;'>AIREP de " + tipo + " en (" + lat + "," + lng + ")</p>";
  info += "<b>INTENSIDAD: </b> " + cat + "</br>";
  info += "<b>HORA OBSERVACIÓN: </b> " + hora + "</br>";
  info += "<b>AIREP: </b> " + raw + " ";
  return info;
}

//ICONOS PERSONALIZADOS
var turIcon_mod = L.icon({
  iconUrl: "./images/turbm.bmp",
  iconSize: [22, 22], // size of the icon
});
var turIcon_sev = L.icon({
  iconUrl: "./images/turbs.bmp",
  iconSize: [28, 28], // size of the icon
});
var engIcon_mod = L.icon({
  iconUrl: "./images/icem.bmp",
  iconSize: [22, 22], // size of the icon
});
var engIcon_sev = L.icon({
  iconUrl: "./images/ices.bmp",
  iconSize: [28, 28], // size of the icon
});
var mtwIcon_mod = L.icon({
  iconUrl: "./images/mtwm.bmp",
  iconSize: [22, 22], // size of the icon
});
var mtwIcon_sev = L.icon({
  iconUrl: "./images/mtws.bmp",
  iconSize: [28, 28], // size of the icon
});
