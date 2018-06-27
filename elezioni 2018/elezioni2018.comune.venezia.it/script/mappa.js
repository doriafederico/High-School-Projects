var basename = 'DarkGray';
var layer = null;
var coalizioni;
var coalizioniLayer;
var map;
var popolazione = 270000;
var popMedia = 1063;
var legend = null;


$(document).ready(function () {
    var myIcon = L.icon({
        iconUrl: 'img/sede2.png',
        iconRetinaUrl: 'img/sede3.png',
        iconSize: [34, 34],
        iconAnchor: [18, 18],
        popupAnchor: [-3, -3]
    });
    var myPin = L.icon({
        iconUrl: 'img/pin.png',
        iconRetinaUrl: 'img/pin.png',
        iconSize: [36 * 2 / 3, 59 * 2 / 3],
        iconAnchor: [18, 30],
        popupAnchor: [0, 0]
    });

    map = L.map('map').setView([45.450, 12.300], 12);


    var data = {"type": "Point", "coordinates": [12.300, 45.450]}

    var southWest = L.latLng(45.100, 12.100);
    var northEast = L.latLng(45.600, 12.600);
    var mapbounds = map.getBounds();


    setCoalizioni();

    var searchControl = L.esri.Geocoding.geosearch().addTo(map);

    var results = L.layerGroup().addTo(map);

    searchControl.on("results", function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
            results.addLayer(L.marker(data.results[i].latlng));
        }
    });

    var selezione = L.control({
        position: 'topleft'
    });
    selezione.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'sel-wrapper info legend');
        if (tipo == 'S')
            div.innerHTML = '<select name="selelez" id="selelez" onChange="mysel(this);" >' +
                    '<option value="perLista" SELECTED>Mappa per Candidato</option>' +
                    '<option value="perPartito">Mappa per Lista</option>' +
                    '</select>' +
                    '<select name="partiti" id="partiti" onChange="mysel(this);">' +
                    '<option value="1276" SELECTED>MOVIMENTO 5 STELLE</option>' +
                    '<option value="1277">ITALIA AGLI ITALIANI</option>' +
                    '<option value="1278">PARTITO REPUBBLICANO ITALIANO - ALA</option>' +
                    '<option value="1279">POTERE AL POPOLO!</option>' +
                    '<option value="1280">GRANDE NORD</option>' +
                    '<option value="1282">PARTITO DEMOCRATICO</option>' +
                    '<option value="1281">ITALIA EUROPA INSIEME</option>' +
                    '<option value="1284">CIVICA POPOLARE LORENZIN</option>' +
                    '<option value="1283">+EUROPA</option>' +
                    '<option value="1285">PER UNA SINISTRA RIVOLUZIONARIA</option>' +
                    '<option value="1286">LIBERI E UGUALI</option>' +
                    '<option value="1287">PARTITO VALORE UMANO</option>' +
                    '<option value="1288">CASAPOUND ITALIA</option>' +
                    '<option value="1289">IL POPOLO DELLA FAMIGLIA</option>' +
                    '<option value="1292">FRATELLI D\'ITALIA CON GIORGIA MELONI</option>' +
                    '<option value="1293">NOI CON L\'ITALIA - UDC</option>' +
                    '<option value="1291">FORZA ITALIA</option>' +
                    '<option value="1290">LEGA</option>' +
                    '</select>';
        else
            div.innerHTML = '<select name="selelez" id="selelez" onChange="mysel(this);" >' +
                    '<option value="perLista" SELECTED>Mappa per Candidato</option>' +
                    '<option value="perPartito">Mappa per Lista</option>' +
                    '</select>' +
                    '<select name="partiti" id="partiti" onChange="mysel(this);">' +
                    '<option value="1258" SELECTED>IL POPOLO DELLA FAMIGLIA</option>' +
                    '<option value="1262">LEGA</option>' +
                    '<option value="1261">FRATELLI D\'ITALIA CON GIORGIA MELONI</option>' +
                    '<option value="1259">NOI CON L\'ITALIA - UDC</option>' +
                    '<option value="1260">FORZA ITALIA</option>' +
                    '<option value="1263">GRANDE NORD</option>' +
                    '<option value="1264">POTERE AL POPOLO!</option>' +
                    '<option value="1265">ITALIA AGLI ITALIANI</option>' +
                    '<option value="1266">CASAPOUND ITALIA</option>' +
                    '<option value="1267">10 VOLTE MEGLIO</option>' +
                    '<option value="1268">PARTITO VALORE UMANO</option>' +
                    '<option value="1269">LIBERI E UGUALI</option>' +
                    '<option value="1270">MOVIMENTO 5 STELLE</option>' +
                    '<option value="1271">+EUROPA</option>' +
                    '<option value="1273">CIVICA POPOLARE LORENZIN</option>' +
                    '<option value="1272">PARTITO DEMOCRATICO</option>' +
                    '<option value="1274">ITALIA EUROPA INSIEME</option>' +
                    '<option value="1275">PARTITO REPUBBLICANO ITALIANO - ALA</option>' +
                    '</select>';

        return div;
    };
    selezione.addTo(map);

    $("#partiti").hide();

    var baseLayers = {
        "Strade": L.esri.basemapLayer("Streets"),
        "Immagini": L.esri.basemapLayer("Imagery"),
        "Grigio Scuro": layer,
        "Topografico": L.esri.basemapLayer("Topographic"),
    };
    L.control.layers(baseLayers).addTo(map);
});

function setCoalizioni() {
    if (legend != null) {
        map.removeControl(legend);
    }
    if (coalizioniLayer != null) {
        map.removeLayer(coalizioniLayer);
    }
    if (layer === null) {
        layer = L.esri.basemapLayer(basename);
        map.addLayer(layer);
    }

    var jf = tipo === 'S' ? "/data/json/CoalizioniS.json?quando=" : "/data/json/CoalizioniC.json?quando=";

    $.getJSON(jf + new Date().valueOf(), function (data) {
        coalizioni = data;
        coalizioniLayer = L.geoJson(data, {
            style: function (feature) {
                var col = getColor(feature.properties.COD_LISTA);

                return  {
                    fillColor: col,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.9
                };
            }
        });
        coalizioniLayer.addTo(map);

        coalizioniLayer.bindPopup(function (evt) {
            return  L.Util.template(
                    '<div class=\"info legend popup">Sezione: <b>{SEZ}</b><br><br>' + getColorSimbolo(evt.feature.properties.COD_LISTA) + '<br><span style="font-weight:bold;font-size:120%">{LISTA}</span><br><br><span style="font-weight:bold;font-size:300%">{PERC_VOTI}%</span><br><br>Voti <b>{NUM_VOTI}</b><br></div>', evt.feature.properties);
        });




        legend = L.control({
            position: 'bottomright'
        });


        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend leaflet-control'),
                    labels = [],
                    from, to;
            var totale = function () {
                var ris = 0;
                for (let i = 0; i < coalizioni.features.length; i++) {
                    ris += coalizioni.features[i].properties.NUM_VOTI;
                }
                return ris;
            };

			labels.push("<div id='divl' style='display:block'>");			
            labels.push("<table><tr><td><div style='padding-left:5px' onclick='setleg(\"off\");'><b>X</b></div></td><td><h2>" + (tipo === 'S' ? "Senato della Repubblica" : "Camera dei Deputati") + " - Coalizioni</h2></td></tr>");

            var par = "";
            var np = "";
            for (let i = 0; i < coalizioni.legenda.length; i++) {
                col = coalizioni.legenda[i].COD_LISTA;
                var str = '<tr><td><i style="background:' + getColor(col) + ';opacity:0.9">' + '</i></td><td> ' + getColorName(col) + ' </td></tr>';
                col === "NP" ? np = str : col === "P" ? par = str : labels.push(str);

            }
            if (par != "")
                labels.push(par);
            if (np != "")
                labels.push(np);
			
			labels.push("</table></div>");
			labels.push("<div id='divl2' style='display:none' onclick='setleg(\"on\");'><b><u>legenda</u></b>");
			labels.push("</div>");


            div.innerHTML = labels.join('');
            return div;
        };
        legend.addTo(map);

        $('.leaflet-bottom.leaflet-left').html('<div class="leaflet-control" style="padding-bottom:0px"><a href="https://www.comune.venezia.it/it/ponmetrovenezia" target="_blank" style="border: none; outline: none;"><img style="padding:0px;height: 50px" alt="Comune di Venezia" src="/immagini/logo/banner-logo.png" title="Comune di Venezia>"></a>' +
                '<a href="http://www.venis.it" target="_blank" style="border: none; outline: none;"><img src="/immagini/logo/venis_n.png" alt="Powered by Venis S.p.A." style="border: none;height: 35px;padding-bottom:10px;padding-left:15px"></a></div>');


    });
}


function setPartito(id) {
    if (legend != null) {
        map.removeControl(legend);
    }
    if (coalizioniLayer != null) {
        map.removeLayer(coalizioniLayer);
    }
    if (layer === null) {
        layer = L.esri.basemapLayer(basename);
        map.addLayer(layer);
    }

    var jf = tipo === 'S' ? "/data/json/partitoS" + id + ".json?quando=" : "/data/json/partitoC" + id + ".json?quando=";

    $.getJSON(jf + new Date().valueOf(), function (data) {
        oggetto = data;
        var codiceLista = oggetto.features[0].properties.COD_LISTA;
        var Lista = oggetto.features[0].properties.LISTA;
        var classe = getClasse(oggetto);
        coalizioniLayer = L.geoJson(data, {
            style: function (feature) {
                var col = getColorPartito(codiceLista, parseFloat(feature.properties.PERC_VOTI.replace(",", ".")), classe);
                console.log(col);
                return {
                    fillColor: col,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.9
                };
            }
        });
        coalizioniLayer.addTo(map);

        coalizioniLayer.bindPopup(function (evt) {
            return  L.Util.template(
                    '<div class=\"info legend popup">Sezione: <b>{SEZ}</b><br><br>' + getColorSimbolo(evt.feature.properties.COD_LISTA) + '<br><span style="font-weight:bold;font-size:120%">{LISTA}</span><br><br><span style="font-weight:bold;font-size:300%">{PERC_VOTI}%</span><br><br>Voti <b>{NUM_VOTI}</b><br></div>', evt.feature.properties);
        });



        legend = L.control({
            position: 'bottomright'
        });
        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend leaflet-control'),
                    labels = [],
                    from, to;
					
			labels.push("<div id='divl' style='display:block'>");
            labels.push("<table><tr><td><div style='padding-left:5px' onclick='setleg(\"off\");'><b>X</b></div></td><td><h2>" + (tipo === 'S' ? "Senato della Repubblica" : "Camera dei Deputati") + "</h2><h3>Lista " + Lista + "</h3></td></tr>");

            var els = classe[0] === classe[1] ? 2 : classe.length;
            for (let i = 0; i < els - 1; i++) {
                col = classe[i];
                to = classe[i + 1];
                console.log(getColorPartito(codiceLista, to, classe));
                labels.push(
                        '<tr><td><i style="background:' + getColorPartito(codiceLista, to, classe) + ';opacity:0.9">' + '</i></td><td>' + (Math.floor(col * 100) / 100).toFixed(2) + '% - ' + (Math.floor(to * 100) / 100).toFixed(2) + '%</td></tr>');
            }

			labels.push("</table></div>");
			labels.push("<div id='divl2' style='display:none' onclick='setleg(\"on\");'><b><u>legenda</u></b>");
			labels.push("</div>");

            div.innerHTML = labels.join('');
            return div;
        };
        legend.addTo(map);

        $('.leaflet-bottom.leaflet-left').html('<div class="leaflet-control" style="padding-bottom:0px"><a href="https://www.comune.venezia.it/it/ponmetrovenezia" target="_blank" style="border: none; outline: none;"><img style="padding:0px;height: 50px" alt="Comune di Venezia" src="/immagini/logo/banner-logo.png" title="Comune di Venezia>"></a>' +
                '<a href="http://www.venis.it" target="_blank" style="border: none; outline: none;"><img src="/immagini/logo/venis_n.png" alt="Powered by Venis S.p.A." style="border: none;height: 35px;padding-bottom:10px;padding-left:15px"></a></div>');


    });
}


function setBasemap(basemap) {
    if (layer) {
        map.removeLayer(layer);
    }
    layer = L.esri.basemapLayer(basemap);
    map.addLayer(layer);
}

function changeBasemap(basemaps) {
    var basemap = basemaps.value;
    setBasemap(basemap);
}
function mysel(sel) {
    if (sel.options[sel.selectedIndex].value == "perLista") {
        setCoalizioni();
        $("#partiti").hide();
    } else if (sel.options[sel.selectedIndex].value == "perPartito") {
        $("#partiti").show();
        setPartito(tipo === 'S' ? 1276 : 1258);
    } else {
        setPartito(parseInt(sel.options[sel.selectedIndex].value));

    }
}

function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [h, s, v];
}

function hsvToRgb(h, s, v) {
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return [r * 255, g * 255, b * 255];
}

function rgbSaturation(color, saturation) {
    var hsv = rgbToHsv(color.r, color.g, color.b);
    if (hsv[2] < 0.1)
        hsv[2] = 1 - saturation
    else
        hsv[1] = saturation;
    cc = saturation == 1.0 ? [color.r, color.g, color.b] :
            hsvToRgb(hsv[0], hsv[1], hsv[2]);
    return cc;

}

function colorRgbToString(color) {
    return "rgb(" + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]) + ")";
}

function getColorPartito(d, perc, classe) {

//	var saturazioni = [0.10, 0.20, 0.40, 0.70, 1.0];
    var saturazioni = [0.12, 0.40, 0.65, 1.0];
    for (let i = 1; i < classe.length; i++) {
        if (perc >= classe[i - 1] && perc <= classe[i]) {
            cl = colorRgbToString(rgbSaturation(getColorP(d), saturazioni[i - 1]));
            //console.log(cl + "-" + classe[i]);
            return cl;
        }
    }
    return colorRgbToString(rgbSaturation(getColorP(d), saturazioni[saturazioni.length - 1]));
}

function getClasse(oggetto) {
    var max = 0.0;
    var min = 100;

    for (let i = 0; i < oggetto.features.length; i++) {
        perc_voti = parseFloat(oggetto.features[i].properties.PERC_VOTI.replace(",", "."));
        if (perc_voti > max) {
            max = perc_voti;
        }
        if (perc_voti < min) {
            min = perc_voti;
        }
    }
    var ris;
    var step = (max - min) / 4;

    ris = [min, min + step, min + step * 2, min + step * 3, max];

    return ris;
}

function getColor(d) {
    if (tipo == 'S') {
        return d === "347" ? '#2F64B6' :
                d === "346" ? '#2548a3' :
                d === "345" ? '#727070' :
                d === "344" ? '#941062' :
                d === "343" ? '#FF0000' :
                d === "342" ? '#EE2B31' :
                d === "341" ? '#BB0000' :
                d === "340" ? '#285893' :
                d === "339" ? '#9C0E32' :
                d === "338" ? '#24B059' :
                d === "336" ? '#F1DF23' :
                d === "337" ? '#221E1F' :
                d === "P" ? '#666666' :
                d === "NP" ? '#ededed' : '#ededed';
    } else {
        return d === "334" ? '#BB0000' :
                d === "333" ? '#F1DF23' :
                d === "332" ? '#FF0000' :
                d === "331" ? '#941062' :
                d === "330" ? '#EE2B31' :
                d === "335" ? '#24B059' :
                d === "328" ? '#221E1F' :
                d === "327" ? '#9C0E32' :
                d === "326" ? '#285893' :
                d === "325" ? '#2F64B6' :
                d === "324" ? '#2548a3' :
                d === "329" ? '#727070' :
                d === "P" ? '#666666' :
                d === "NP" ? '#ededed' : '#ededed';
    }

}

function getColorName(d) {
    if (tipo == 'S') {
        return d === "347" ? 'Maria Elisabetta ALBERTI CASELLATI' :
                d === "346" ? 'Caterina BALDO' :
                d === "345" ? 'Tino Andrea BOZZA' :
                d === "344" ? 'Maurizio CALLEGARI' :
                d === "343" ? 'Giulio MARCON' :
                d === "342" ? 'Alessandro BUSETTO' :
                d === "341" ? 'Andrea FERRAZZI' :
                d === "340" ? 'Corrado CALLEGARI' :
                d === "339" ? 'Gino BAODUZZI' :
                d === "338" ? 'Rosalba SARTIN' :
                d === "336" ? 'Marco NARDIN' :
                d === "337" ? 'Maurizio MARCHIORI' :
                d === "P" ? 'Pareggio' :
                d === "NP" ? 'Non Pervenuto' : '';
    } else {
        return d === "334" ? 'Nicola PELLICANI' :
                d === "333" ? 'Enrico SCHENATO' :
                d === "332" ? 'Michele MOGNATO' :
                d === "331" ? 'Marianna ZENNARO' :
                d === "330" ? 'Emine Elif AKAY' :
                d === "335" ? 'Tiziano DANIELI' :
                d === "328" ? 'Rudi FAVARO' :
                d === "327" ? 'Ilaria BONIBURINI' :
                d === "326" ? 'Pierangelo DEL ZOTTO' :
                d === "325" ? 'Giorgia ANDREUZZA' :
                d === "324" ? 'Carlo NICOLETTI' :
                d === "329" ? 'Lea CARIOLIN' :
                d === "P" ? 'Pareggio' :
                d === "NP" ? 'Non Pervenuto' : '';
    }
}

function getColorSimbolo(d) {
    if (tipo == 'S') {
        return d === '336' ? '<img src="/immagini/451/01_1276_MOVIMENTO5STELLE_SIE.PNG" style="width:62px">' :
                d === '337' ? '<img src="/immagini/451/02_1277_ITALIAAGLIITALIANI_SIE.PNG" style="width:62px">' :
                d === '338' ? '<img src="/immagini/451/03_1278_PARTITOREPUBBLICANOITALIANOALA_SIE.PNG" style="width:62px">' :
                d === '339' ? '<img src="/immagini/451/04_1279_POTEREALPOPOLO_SIE.PNG" style="width:62px">' :
                d === '340' ? '<img src="/immagini/451/05_1280_GRANDENORD_SIE.PNG" style="width:62px">' :
                d === '341' ? '<img src="/immagini/451/06_1282_PARTITODEMOCRATICO_SIE.PNG" style="width:62px"> <img src="/immagini/451/07_1281_ITALIAEUROPAINSIEME_SIE.PNG" style="width:62px"> <img src="/immagini/451/08_1284_CIVICAPOPOLARELORENZIN_SIE.PNG" style="width:62px"> <img src="/immagini/451/09_1283_PIUEUROPA_SIE.PNG" style="width:62px">' :
                d === '342' ? '<img src="/immagini/451/10_1285_PERUNASINISTRARIVOLUZIONARIA_SIE.PNG" style="width:62px">' :
                d === '343' ? '<img src="/immagini/451/11_1286_LIBERIEUGUALI_SIE.PNG" style="width:62px">' :
                d === '344' ? '<img src="/immagini/451/12_1287_PARTITOVALOREUMANO_SIE.PNG" style="width:62px">' :
                d === '345' ? '<img src="/immagini/451/13_1288_CASAPOUNDITALIA_SIE.PNG" style="width:62px">' :
                d === '346' ? '<img src="/immagini/451/14_1289_ILPOPOLODELLAFAMIGLIA_SIE.PNG" style="width:62px">' :
                d === '347' ? '<img src="/immagini/451/15_1292_FRATELLIDITALIACONGIORGIAMELONI_SIE.PNG" style="width:62px"> <img src="/immagini/451/16_1293_NOICONLITALIAUDC_SIE.PNG" style="width:62px"> <img src="/immagini/451/17_1291_FORZAITALIA_SIE.PNG" style="width:62px"> <img src="/immagini/451/18_1290_LEGA_SIE.PNG" style="width:62px">' :
        d === '1276' ? '<img src="/immagini/451/01_1276_MOVIMENTO5STELLE_SIE.PNG" style="width:62px">' :
                d === '1277' ? '<img src="/immagini/451/02_1277_ITALIAAGLIITALIANI_SIE.PNG" style="width:62px">' :
                d === '1278' ? '<img src="/immagini/451/03_1278_PARTITOREPUBBLICANOITALIANOALA_SIE.PNG" style="width:62px">' :
                d === '1279' ? '<img src="/immagini/451/04_1279_POTEREALPOPOLO_SIE.PNG" style="width:62px">' :
                d === '1280' ? '<img src="/immagini/451/05_1280_GRANDENORD_SIE.PNG" style="width:62px">' :
                d === '1282' ? '<img src="/immagini/451/06_1282_PARTITODEMOCRATICO_SIE.PNG" style="width:62px">' :
                d === '1284' ? '<img src="/immagini/451/08_1284_CIVICAPOPOLARELORENZIN_SIE.PNG" style="width:62px">' :
                d === '1283' ? '<img src="/immagini/451/09_1283_PIUEUROPA_SIE.PNG" style="width:62px">' :
                d === '1281' ? '<img src="/immagini/451/07_1281_ITALIAEUROPAINSIEME_SIE.PNG" style="width:62px">' :
                d === '1285' ? '<img src="/immagini/451/10_1285_PERUNASINISTRARIVOLUZIONARIA_SIE.PNG" style="width:62px">' :
                d === '1286' ? '<img src="/immagini/451/11_1286_LIBERIEUGUALI_SIE.PNG" style="width:62px">' :
                d === '1287' ? '<img src="/immagini/451/12_1287_PARTITOVALOREUMANO_SIE.PNG" style="width:62px">' :
                d === '1288' ? '<img src="/immagini/451/13_1288_CASAPOUNDITALIA_SIE.PNG" style="width:62px">' :
                d === '1289' ? '<img src="/immagini/451/14_1289_ILPOPOLODELLAFAMIGLIA_SIE.PNG" style="width:62px">' :
                d === '1292' ? '<img src="/immagini/451/15_1292_FRATELLIDITALIACONGIORGIAMELONI_SIE.PNG" style="width:62px">':
                d === '1293' ? '<img src="/immagini/451/16_1293_NOICONLITALIAUDC_SIE.PNG" style="width:62px">':
                d === '1291' ? '<img src="/immagini/451/17_1291_FORZAITALIA_SIE.PNG" style="width:62px">':
                d === '1290' ? '<img src="/immagini/451/18_1290_LEGA_SIE.PNG" style="width:62px">': '';
    } else {
        return d === '324' ? '<img src="/immagini/447/01_1258_ILPOPOLODELLAFAMIGLIA_SIE.PNG" style="width:62px">' :
                d === '325' ? '<img src="/immagini/447/02_1262_LEGA_SIE.PNG" style="width:62px"> <img src="/immagini/447/03_1261_FRATELLIDITALIACONGIORGIAMELONI_SIE.PNG" style="width:62px"> <img src="/immagini/447/04_1259_NOICONLITALIAUDC_SIE.PNG" style="width:62px"> <img src="/immagini/447/05_1260_FORZAITALIA_SIE.PNG" style="width:62px">' :
                d === '326' ? '<img src="/immagini/447/06_1263_GRANDENORD_SIE.PNG" style="width:62px">' :
                d === '327' ? '<img src="/immagini/447/07_1264_POTEREALPOPOLO_SIE.PNG" style="width:62px">' :
                d === '328' ? '<img src="/immagini/447/08_1265_ITALIAAGLIITALIANI_SIE.PNG" style="width:62px">' :
                d === '329' ? '<img src="/immagini/447/09_1266_CASAPOUNDITALIA_SIE.PNG" style="width:62px">' :
                d === '330' ? '<img src="/immagini/447/10_1267_DIECIVOLTEMEGLIO_SIE.PNG" style="width:62px">' :
                d === '331' ? '<img src="/immagini/447/11_1268_PARTITOVALOREUMANO_SIE.PNG" style="width:62px">' :
                d === '332' ? '<img src="/immagini/447/12_1269_LIBERIEUGUALI_SIE.PNG" style="width:62px">' :
                d === '333' ? '<img src="/immagini/447/13_1270_MOVIMENTO5STELLE_SIE.PNG" style="width:62px">' :
                d === '334' ? '<img src="/immagini/447/14_1271_PIUEUROPA_SIE.PNG" style="width:62px"> <img src="/immagini/447/15_1273_CIVICAPOPOLARELORENZIN_SIE.PNG" style="width:62px"> <img src="/immagini/447/16_1272_PARTITODEMOCRATICO_SIE.PNG" style="width:62px"> <img src="/immagini/447/17_1274_ITALIAEUROPAINSIEME_SIE.PNG" style="width:62px">' :
                d === '335' ? '<img src="/immagini/447/18_1275_PARTITOREPUBBLICANOITALIANOALA_SIE.PNG" style="width:62px">' : 
                d === '1258' ? '<img src="/immagini/447/01_1258_ILPOPOLODELLAFAMIGLIA_SIE.PNG" style="width:62px">' :
                d === '1262' ? '<img src="/immagini/447/02_1262_LEGA_SIE.PNG" style="width:62px">' :
                d === '1261' ? '<img src="/immagini/447/03_1261_FRATELLIDITALIACONGIORGIAMELONI_SIE.PNG" style="width:62px">' :
                d === '1259' ? '<img src="/immagini/447/04_1259_NOICONLITALIAUDC_SIE.PNG" style="width:62px">' :
                d === '1260' ? '<img src="/immagini/447/05_1260_FORZAITALIA_SIE.PNG" style="width:62px">' :
                d === '1263' ? '<img src="/immagini/447/06_1263_GRANDENORD_SIE.PNG" style="width:62px">' :
                d === '1264' ? '<img src="/immagini/447/07_1264_POTEREALPOPOLO_SIE.PNG" style="width:62px">' :
                d === '1265' ? '<img src="/immagini/447/08_1265_ITALIAAGLIITALIANI_SIE.PNG" style="width:62px">' :
                d === '1266' ? '<img src="/immagini/447/09_1266_CASAPOUNDITALIA_SIE.PNG" style="width:62px">' :
                d === '1267' ? '<img src="/immagini/447/10_1267_DIECIVOLTEMEGLIO_SIE.PNG" style="width:62px">' :
                d === '1268' ? '<img src="/immagini/447/11_1268_PARTITOVALOREUMANO_SIE.PNG" style="width:62px">' :
                d === '1269' ? '<img src="/immagini/447/12_1269_LIBERIEUGUALI_SIE.PNG" style="width:62px">' :
                d === '1270' ? '<img src="/immagini/447/13_1270_MOVIMENTO5STELLE_SIE.PNG" style="width:62px">' :
                d === '1271' ? '<img src="/immagini/447/14_1271_PIUEUROPA_SIE.PNG" style="width:62px">' :
                d === '1273' ? '<img src="/immagini/447/15_1273_CIVICAPOPOLARELORENZIN_SIE.PNG" style="width:62px">' :
                d === '1272' ? '<img src="/immagini/447/16_1272_PARTITODEMOCRATICO_SIE.PNG" style="width:62px">' :
                d === '1274' ? '<img src="/immagini/447/17_1274_ITALIAEUROPAINSIEME_SIE.PNG" style="width:62px">' :
                d === '1275' ? '<img src="/immagini/447/18_1275_PARTITOREPUBBLICANOITALIANOALA_SIE.PNG" style="width:62px">' : '';
    }
}


function getColorP(d) {
    var col;
    if (tipo == 'S') {
        col = d === "1276" ? '#EFAF0B' : //MOVIMENTO 5 STELLE  
                d === "1293" ? '#0000E6' : //NOI CON L'ITALIA - UDC  	
                d === "1291" ? '#0000E6' : //FORZA ITALIA  
                d === "1290" ? '#0000E6' : //LEGA  
                d === "1289" ? '#0033FF' : //IL POPOLO DELLA FAMIGLIA  
                d === "1288" ? '#0a0b0c' : //CASAPOUND ITALIA  
                d === "1287" ? '#800055' : //PARTITO VALORE UMANO  
                d === "1286" ? '#FF0000' : //LIBERI E UGUALI  
                d === "1285" ? '#CC0000' : //PER UNA SINISTRA RIVOLUZIONARIA  
                d === "1284" ? '#B40864' : //CIVICA POPOLARE LORENZIN   
                d === "1283" ? '#FF3300' : //+EUROPA  
                d === "1282" ? '#BB0000' : //PARTITO DEMOCRATICO   
                d === "1281" ? '#FF3300' : //ITALIA EUROPA INSIEME  
                d === "1280" ? '#258388' : //GRANDE NORD  
                d === "1279" ? '#D60000' : //POTERE AL POPOLO!  
                d === "1278" ? '#2DB300' : //PARTITO REPUBBLICANO ITALIANO - ALA 
                d === "1277" ? '#0E0C0C' : //ITALIA AGLI ITALIANI  
                d === "1292" ? '#0000E6' : '#ededed'; //FRATELLI D'ITALIA CON GIORGIA MELONI  
    } else {
        col = d === "1258" ? '#0033FF' : //IL POPOLO DELLA FAMIGLIA
                d === "1259" ? '#0000E6' : //NOI CON L'ITALIA - UDC
                d === "1275" ? '#2DB300' : //PARTITO REPUBBLICANO ITALIANO - ALA   
                d === "1274" ? '#FF3300' : //ITALIA EUROPA INSIEME 
                d === "1273" ? '#B40864' : // CIVICA POPOLARE LORENZIN
                d === "1272" ? '#BB0000' : //PARTITO DEMOCRATICO
                d === "1271" ? '#FF3300' : //+EUROPA 
                d === "1270" ? '#EFAF0B' : //MOVIMENTO 5 STELLE  
                d === "1269" ? '#FF0000' : //LIBERI E UGUALI 
                d === "1268" ? '#800055' : //PARTITO VALORE UMANO
                d === "1267" ? '#CC0000' : //10 VOLTE MEGLIO
                d === "1266" ? '#0a0b0c' : //CASAPOUND ITALIA
                d === "1265" ? '#0E0C0C' : //ITALIA AGLI ITALIANI
                d === "1264" ? '#D60000' : //POTERE AL POPOLO! 
                d === "1263" ? '#258388' : //GRANDE NORD
                d === "1262" ? '#0000E6' : //LEGA  
                d === "1261" ? '#0000E6' : //FRATELLI D'ITALIA CON GIORGIA MELONI
                d === "1260" ? '#2F64B6' : '#ededed'; //FORZA ITALIA
    }
    var colrgb = hexToRgbNew(col)
    return colrgb;
}

function hexToRgbNew(hex, alpha) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
    if (alpha) {
        return {'r': r, 'g': g, 'b': b};
    } else {
        return {'r': r, 'g': g, 'b': b};
    }
}

function setleg(vs) {
	vs === 'off' ? $("#divl").css("display","none"): $("#divl").css("display","block");
	vs === 'off' ? $("#divl2").css("display","block"): $("#divl2").css("display","none");
}
