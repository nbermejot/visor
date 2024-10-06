function removeMetar() {
  map.eachLayer(function (layer) {
    if (layer.myTag && layer.myTag === "metar") {
      map.removeLayer(layer);
    }
  });
}


function removeAviso() {
  map.eachLayer(function (layer) {
    if (layer.myTag && layer.myTag === "aviso") {
      map.removeLayer(layer);
    }
  });
}
function loadMetar() {
  fetch("data/metar/aeropuertos.geojson")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
	      let layerdraw = L.geoJson(data, { 
             pointToLayer: function(feature, latLng) {
				if (feature.properties.tipo == 'red' && feature.properties.color2 == 'dodgerblue') {
				  return new L.shapeMarker(latLng, {
				    pane: 'metar',
				    shape: 'square',
				    color: 'black',
				    fillOpacity: 1,
				    weight: 2,
					opacity: 1,
				    radius: 7,
				    className: 'pulse_square',
				    fillColor: feature.properties.color
				 }); 
			     } else if (feature.properties.tipo == 'red') {
				  return new L.shapeMarker(latLng, {
				    pane: 'metar',
				    shape: 'square',
				    color: 'black',
				    fillOpacity: 0.8,
				    weight: 2,
					opacity: 1,
				    radius: 7,
				    className: 'pulse_square',
				    fillColor: feature.properties.color
				 }); 
			     } else if (feature.properties.color2 == 'dodgerblue') {
				  return new L.shapeMarker(latLng, {
				    pane: 'metar',
				    shape: 'square',
				    color: 'black',
				    fillOpacity: 0.8,
				    weight: 2,
					opacity: 1,
				    radius: 7,
				    fillColor: feature.properties.color
				 });
			     } else {
				 return new L.shapeMarker(latLng, {
				    pane: 'metar',
				    shape: 'square',
				    color: feature.properties.color2,
				    fillOpacity: 0.8,
				    weight: 2,
					opacity: 1,
				    radius: 7,
				    fillColor: feature.properties.color
				 })	 
			 }			 
	     },
         onEachFeature: function (feature, layer) {
            layer.bindTooltip(popupMetar(feature.properties.name, feature.properties.color,feature.properties.color2, feature.properties.metar,
			                             feature.properties.taf, feature.properties.aviso, feature.properties.tipo), {
                    maxWidth: 400,
                    className : 'leaflet-popup-content-metar',
					pane : 'metar_tooltip'
            })
         }
	     });
	     layerdraw.addTo(map);
         layerdraw.myTag = "metar";	
  })
  .catch(err=>console.log(err))  
}




function popupMetar(nombre, color, color2,  metar, taf, tipo){
  let info_metar;
	if (color == 'white' || color == 'yellow' || color == 'lime' || color == '#FF000000') {
	   info_metar = "<p style='color:black;border:1px solid gray;background-color:" + color + ";'><b>METAR - " + nombre + "</b></p><p><b>"+ metar + "</b></p>"
	} else {
	   info_metar = "<p style='color:white;border:1px solid gray;background-color:" + color + ";'><b>METAR - " + nombre + "</b></p><p><b>"+ metar + "</b></p>"
	}
	if (color2 == 'white' || color2 == 'yellow' || color2 == 'lime' || color2 == '#FF000000') {
	   info_metar += "<p style='color:black;border:1px solid gray;background-color:"+ color2 +";'><b>TAF</b></p><p><b>"+ taf + "</b></p>"
    } else {
	   info_metar += "<p style='color:white;border:1px solid gray;background-color:"+ color2 +";'><b>TAF</b></p><p><b>"+ taf + "</b></p>"
	}
	return info_metar
}

function addLegendMetar(metar) {
  const legend = L.control.htmllegend({
      position: "bottomright",
      legends: [
      {
        name: "Colores METAR",
        layer: metar,
        elements: [
          {
            label: "Vis≥8000 m / CEIL≥2500 ft",
            html: "",
            style: {
              "background-color": "dodgerblue",
              width: "20px",
              height: "20px",
            },
          },
          {
            label: "VIS≥5000 m / CEIL≥1500 ft",
            html: "",
            style: {
              "background-color": "white",
              width: "20px",
              height: "20px",
            },
          },
          {
            label: "VIS≥3700 m / CEIL≥700 ft",
            html: "",
            style: {
              "background-color": "lime",
              width: "20px",
              height: "20px",
            },
          },
          {
            label: "VIS≥1600 m / CEIL≥300 ft",
            html: "",
            style: {
              "background-color": "yellow",
              width: "20px",
              height: "20px",
            },
          },
          {
            label: "VIS≥800 m / CEIL≥200 ft",
            html: "",
            style: {
              "background-color": "orange",
              width: "20px",
              height: "20px",
            },
          },
          {
            label: "VIS≤800 m / CEIL≤200 ft",
            html: "",
            style: {
              "background-color": "red",
              width: "20px",
              height: "20px",
            },
          },
          {
            label: "Cerrado no por nubes o VIS",
            html: "",
            style: {
              "background-color": "black",
              width: "20px",
              height: "20px",
            },
          },
		  {
            label: "  Aviso en vigor",
            html: "",
            style: {
			  width: "0",
              height: "0", 
              "border-top": "8px solid transparent",
              "border-bottom": "8px solid transparent",
              "border-left": "8px solid red",
            },
          },
		  {
            label: "  Aviso próxim.en vigor",
            html: "",
            style: {
			  width: "0",
              height: "0", 
              "border-top": "8px solid transparent",
              "border-bottom": "8px solid transparent",
              "border-left": "8px solid azure",
            },
          },
        ],
      },
    ],
    collapseSimple: true,
    detectStretched: true,
    collapsedOnInit: true,
    defaultOpacity: 1,
    visibleIcon: "icon icon-eye",
    hiddenIcon: "icon icon-eye-slash",
  });
  return legend;
}

function isEmpty(geoJson) {
  let res = false;
  for (let key in geoJson) {
	  console.log("DATA", geoJson[key]);
      if (geoJson[key].length === 0) {
          res = true;
          break;
      }
  }
  return res
}


function loadAviso2() {
  fetch("data/avisos/avisos.geojson")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
		  
		  const avisoIsEmpty = isEmpty(data);
		  console.log("¿ESTA VACIO AVISOS:GEOJSON?", avisoIsEmpty);
		  if (avisoIsEmpty == false) {
	          let warning = L.geoJson(data, { 
                  pointToLayer: function(feature, latLng) {
				      if (feature.properties.active != '') {
				          return new L.shapeMarker(latLng, {
				              pane: 'aviso',
				              shape: 'triangle',
						      rotation: 90,
				              color: 'black',
				              fillOpacity: 1,
				              weight: 1,
					          opacity: 1,
				              radius: 2,
						      fillColor: 'red'
				          })	 
				      } else if (feature.properties.future != ''){
					      return new L.shapeMarker(latLng, {
				              pane: 'aviso',
				              shape: 'triangle',
						      rotation: 90,
				              color: 'black',
				              fillOpacity: 1,
				              weight: 1,
					          opacity: 1,
				              radius: 2,
						      fillColor: 'cyan'
					      })
				      }
	         },
		     onEachFeature: function (feature, layer) {
                 layer.on('mouseover',function(e) {
				      $("#text_airep").html(popupAviso(feature.properties.name,
                                   					   feature.properties.active,
													   feature.properties.future,
													   feature.properties.hazard));
                 });
             },
	         });
	         warning.addTo(map);
             warning.myTag = "aviso";
		  } else {
             $("#text_airep").html("<h6>No hay avisos de aeródromo</h6>");
		  }			  
      })
      .catch(err=>console.log(err))	  
}


//Función que añade los avisos al mapa. Si no hay avisos escribe "No hay avisos" en el texarea
//Los avisos se cargan en el textarea
async function loadAviso() {
  try {
    await $.ajax({
	    type: "POST",
		scriptCharset: "utf-8",
		contentType: "application/json; charset=utf-8",
		url: "data/avisos/avisos.geojson",
		dataType: "json",
	    cache: false,
        success: function (data) {
			
		  const avisoIsEmpty = isEmpty(data);
		  console.log("¿ESTA VACIO AVISOS:GEOJSON?", avisoIsEmpty);
		  if (avisoIsEmpty == false) {
	          let warning = L.geoJson(data, { 
                  pointToLayer: function(feature, latLng) {
				      if (feature.properties.active != '') {
				          return new L.shapeMarker(latLng, {
				              pane: 'aviso',
				              shape: 'triangle',
						      rotation: 90,
				              color: 'white',
				              fillOpacity: 1,
				              weight: 1,
					          opacity: 1,
				              radius: 3,
						      fillColor: 'red'
				          })	 
				      } else if (feature.properties.future != ''){
					      return new L.shapeMarker(latLng, {
				              pane: 'aviso',
				              shape: 'triangle',
						      rotation: 90,
				              color: 'black',
				              fillOpacity: 1,
				              weight: 1,
					          opacity: 1,
				              radius: 3,
						      fillColor: 'white'
					       })
				      }
	           },
               onEachFeature: function (feature, layer) {
                   layer.on('mouseover',function(e) {
				       $("#text_airep").html(popupAviso(feature.properties.name,
                                   					    feature.properties.active,
														feature.properties.future,
														feature.properties.hazard));
                   });
               }
	          });
	        warning.addTo(map);
            warning.myTag = "aviso";
		  } else {
             $("#text_airep").html("<h6>No hay avisos de aeródromo</h6>");
		  }			
      }
  })
  } catch (error) {
    console.error("Error al descargar avisos.geojson", error);
  }  
}

function popupAviso(name, active, future, hazard){
  let info = "<h6>" + name + "</h6>";
  info += "<hr style='color:cyan;margin-top:1px;height:1px;background-color:cyan;'></hr>";
	 if(active != '') {
         info += "<h6><span style='color:cyan;'>" + hazard + "</span></h6>";
		 info += "<b>ACTIVOS: </b><span style='color:orange;'>" + active + "</span></br>";
	 } 
	 if (future != '') {
	     info += "<b>PRÓXIMAMENTE EN VIGOR: </b>" + future + "</br>";
	 }
  return info;
}





