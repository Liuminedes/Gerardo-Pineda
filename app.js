/* ══════════════════════════════════════════════════
   KIA ADVISOR — app.js
   Precios: Lista Almotores Marzo 2026
   NO EV  → Precio Lista Sugerido (más alto)
   EV     → Precio Público Sugerido (con descuento)
   Equipamiento: datos reales almotoreskia.com
═══════════════════════════════════════════════════ */

const WA_NUMBER = "573122992037";

const WA_OPTIONS = [
  { icon:"🚗", label:"Cotizar un vehículo",               msg:"¡Hola Gerardo! Me gustaría cotizar un vehículo KIA. ¿Me puedes ayudar?" },
  { icon:"💳", label:"Opciones de financiación",           msg:"¡Hola Gerardo! Quiero información sobre las opciones de financiación y cuotas disponibles." },
  { icon:"💰", label:"Compra de contado",                  msg:"¡Hola Gerardo! Estoy interesado/a en comprar un KIA de contado. ¿Qué beneficios hay?" },
  { icon:"🛡️", label:"Garantías y posventa",               msg:"¡Hola Gerardo! Quiero saber más sobre la garantía de 7 años / 150.000 km." },
  { icon:"📦", label:"Disponibilidad y entrega inmediata", msg:"¡Hola Gerardo! ¿Qué modelos KIA tienen disponibles para entrega inmediata?" },
  { icon:"🏎️", label:"Hablar directamente con Gerardo",      msg:"¡Hola Gerardo Pineda! Quisiera hablar contigo sobre los vehículos KIA disponibles." },
];

function buildVehicleWaMsg(v, version, year, trimPrice) {
  var isEV   = v.tag === "Eléctrico";
  var price  = trimPrice || getDisplayPrice(v);
  var vStr   = version ? " · " + version + " " + year : "";
  var pType  = isEV ? "Precio público sugerido" : "Precio lista sugerido";
  return [
    "¡Hola Gerardo! 👋",
    "",
    "Estoy interesado/a en el *" + v.name + vStr + "* y me gustaría recibir una cotización personalizada.",
    "",
    "📋 *Información del vehículo:*",
    "• Modelo: " + v.name + vStr,
    "• Categoría: " + v.category,
    "• Tipo: " + v.tag,
    "• " + pType + ": *" + fp(price) + "*",
    "",
    "💬 Me gustaría conocer:",
    "• Precio final con descuentos",
    "• Opciones de financiación y cuotas",
    "• Colores y versiones disponibles",
    "• Tiempo de entrega",
    "",
    "¡Quedo atento/a a tu respuesta! 🏎️",
  ].join("\n");
}

// ─── CATÁLOGO ─────────────────────────────────────
const VEHICLES = [
  {
    id:1, name:"Kia Picanto", year:"2026/2027", category:"Automóvil", tag:"Gasolina",
    img:"https://cdn.kia.com.co/Home_PICANTO_2151954d8e.png",
    description:"El compañero perfecto para la ciudad. Ágil, eficiente y cargado de tecnología moderna. Hatchback 5 puertas con 6 airbags de serie y Android Auto / CarPlay inalámbrico.",
    specs:{ "Motor":"1.0L / 1.25L MPI", "Potencia":"66 – 83 hp", "Transmisión":"Manual 5 vel / Automática 4 vel", "Combustible":"Gasolina", "Carrocería":"Hatchback 5 puertas", "Largo":"3.595 mm", "Ancho":"1.595 mm", "Airbags":"6", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Vibrant",      year:2026, precioLista:59990000,  precioPublico:58990000,  features:["Motor 1.0L 66 hp y 95 Nm","Transmisión mecánica 5 vel","Dirección asistida eléctricamente","ABS + EBD + ESC","6 airbags","ISOFIX","Cámara de reversa","CarPlay/Android Auto inalámbrico","USB + Bluetooth","Clúster digital LCD","A/C manual","Eleva vidrios eléctricos","Espejos ajuste eléctrico","Rines 14 pulgadas con copa"] },
      { version:"Vibrant Plus", year:2026, precioLista:62580000,  precioPublico:61580000,  features:["Equipamiento Vibrant +","Motor 1.25L 83 hp","Rines 14 pulgadas aluminio","Control de luces automático"] },
      { version:"Zenith MT",    year:2026, precioLista:66990000,  precioPublico:65990000,  features:["Equipamiento Vibrant +","Motor 1.25L 83 hp","Rines 14 pulgadas aluminio","Auto light","Espejos abatibles eléctricos con direccionales"] },
      { version:"Zenith AT",    year:2026, precioLista:71990000,  precioPublico:70990000,  features:["Equipamiento Zenith MT +","Transmisión automática 4 vel"] },
      { version:"GT Line",      year:2026, precioLista:79990000,  precioPublico:78990000,  features:["Equipamiento Zenith AT +","Rines 15 pulgadas bi-tono","Keyless Entry","Tapicería en cuero","Faros MFR LED","Sunroof eléctrico"] },
      { version:"Vibrant",      year:2027, precioLista:59990000,  precioPublico:58990000,  features:["Motor 1.0L 66 hp","Transmisión mecánica 5 vel","6 airbags","CarPlay/Android Auto inalámbrico","A/C manual"] },
      { version:"Zenith MT",    year:2027, precioLista:66990000,  precioPublico:65990000,  features:["Equipamiento Vibrant +","Motor 1.25L 83 hp","Rines aluminio","Auto light"] },
      { version:"Zenith AT",    year:2027, precioLista:72990000,  precioPublico:71990000,  features:["Equipamiento Zenith MT +","Transmisión automática 4 vel"] },
      { version:"GT Line",      year:2027, precioLista:80990000,  precioPublico:79990000,  features:["Equipamiento Zenith AT +","Rines 15 pulgadas bi-tono","Keyless Entry","Tapicería en cuero","Faros MFR LED","Sunroof eléctrico"] },
    ]
  },
  {
    id:2, name:"Kia Soluto", year:"2026/2027", category:"Automóvil", tag:"Gasolina",
    img:"https://cdn.kia.com.co/Kia_Soluto_c8cb068fa6.webp",
    description:"Sedán subcompacto con diseño elegante y el baúl más amplio de su segmento (475L). Motor 1.4L eficiente, pantalla táctil 9 pulgadas con CarPlay inalámbrico y garantía de 7 años.",
    specs:{ "Motor":"1.4L MPI DOHC", "Potencia":"94 hp", "Torque":"133 Nm", "Transmisión":"Manual 5 vel / Automática", "Combustible":"Gasolina", "Carrocería":"Sedán 4 puertas", "Largo":"4.300 mm", "Ancho":"1.700 mm", "Alto":"1.460 mm", "Baúl":"475 L", "Airbags":"2", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Emotion MT", year:2026, precioLista:67990000,  precioPublico:66990000,  features:["Motor 1.4L 94 hp y 133 Nm","Transmisión mecánica 5 vel","Dirección electro asistida","Rin 14 pulgadas lámina","ABS + EBD","2 Airbags delanteros","ISOFIX","Cámara de reversa","Eleva vidrios eléctricos","Espejos ajuste eléctrico","Puerto USB y auxiliar","A/C manual","Clúster 2.8 pulgadas LCD","Controles audio en volante","Pantalla táctil 9 pulgadas","CarPlay y Android Auto inalámbrico","4 Parlantes + 2 Tweeters"] },
      { version:"Emotion AT", year:2026, precioLista:80990000,  precioPublico:79990000,  features:["Equipamiento Emotion MT +","Transmisión automática"] },
      { version:"Emotion",    year:2027, precioLista:81990000,  precioPublico:80990000,  features:["Motor 1.4L 94 hp","Transmisión mecánica 5 vel","2 Airbags","ISOFIX","Cámara de reversa","Pantalla 9 pulgadas CarPlay/Android Auto","A/C manual"] },
    ]
  },
  {
    id:3, name:"Kia K3 Sedán", year:"2026/2027", category:"Automóvil", tag:"Gasolina",
    img:"https://cdn.kia.com.co/Kia_K3_general_24ab8b257a.png",
    description:"El all-new K3 redefine el sedán compacto. Motor 1.6L 121 hp con transmisión automática de 6 velocidades, pantalla táctil, ADAS y diseño inspirado en los modelos eléctricos de KIA.",
    specs:{ "Motor":"1.6L MPI DOHC", "Potencia":"121 hp", "Torque":"151 Nm", "Transmisión":"Manual 6 vel / Automática 6 vel", "Combustible":"Gasolina", "Carrocería":"Sedán 4 puertas", "Baúl":"502 L", "Airbags":"6", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Desire MT",  year:2026, precioLista:81990000,  precioPublico:80990000,  features:["Motor 1.6L 121 hp","Transmisión mecánica 6 vel","6 airbags","ABS + EBD + ESC + HAC","CarPlay/Android Auto","A/C manual","Rines 15 pulgadas","Cámara de reversa"] },
      { version:"Vibrant AT", year:2026, precioLista:88990000,  precioPublico:87990000,  features:["Equipamiento Desire MT +","Transmisión automática 6 vel","Rines 16 pulgadas","Control crucero"] },
      { version:"Zenith AT",  year:2026, precioLista:94990000,  precioPublico:93990000,  features:["Equipamiento Vibrant AT +","A/C Climatizador","Faros LED + DRL LED","Sensores parqueo","Tapicería en cuero"] },
      { version:"GT Line AT", year:2026, precioLista:106990000, precioPublico:105990000, features:["Equipamiento Zenith AT +","ADAS: FCA + LKA + BCA","Sunroof eléctrico","Asiento eléctrico","Rines 17 pulgadas"] },
      { version:"Desire MT",  year:2027, precioLista:82990000,  precioPublico:81990000,  features:["Motor 1.6L 121 hp","6 airbags","CarPlay/Android Auto","A/C manual","Rines 15 pulgadas"] },
      { version:"Vibrant AT", year:2027, precioLista:89990000,  precioPublico:88990000,  features:["Equipamiento Desire MT +","Transmisión automática 6 vel","Rines 16 pulgadas"] },
      { version:"Zenith AT",  year:2027, precioLista:95990000,  precioPublico:94990000,  features:["Equipamiento Vibrant AT +","A/C Climatizador","Faros LED","Tapicería en cuero"] },
      { version:"GT Line AT", year:2027, precioLista:107990000, precioPublico:106990000, features:["Equipamiento Zenith AT +","ADAS completo","Sunroof eléctrico","Rines 17 pulgadas"] },
    ]
  },
  {
    id:4, name:"Kia K3 Cross", year:"2026/2027", category:"Crossover", tag:"Gasolina",
    img:"https://cdn.kia.com.co/Home_K3_CROSS_d433f3dea9.png",
    description:"La versatilidad de un crossover con la eficiencia del K3. Mayor altura al piso (175 mm), rieles en techo y personalidad aventurera. Motor 1.6L con opciones manual y automática.",
    specs:{ "Motor":"1.6L MPI DOHC", "Potencia":"121 hp", "Transmisión":"Manual / Automática 6 vel", "Combustible":"Gasolina", "Carrocería":"Crossover", "Guard. al suelo":"175 mm", "Rieles de techo":"Sí", "Airbags":"6", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Vibrant MT", year:2026, precioLista:82990000,  precioPublico:81990000,  features:["Motor 1.6L 121 hp","Transmisión mecánica 6 vel","6 airbags","Guardia al suelo 175 mm","Rieles de techo","CarPlay/Android Auto","A/C manual","Rines 16 pulgadas"] },
      { version:"Vibrant AT", year:2026, precioLista:89990000,  precioPublico:88990000,  features:["Equipamiento Vibrant MT +","Transmisión automática 6 vel","Control crucero"] },
      { version:"Zenith AT",  year:2026, precioLista:96990000,  precioPublico:95990000,  features:["Equipamiento Vibrant AT +","A/C Climatizador","Faros LED","Tapicería en cuero"] },
      { version:"GT Line AT", year:2026, precioLista:107990000, precioPublico:106990000, features:["Equipamiento Zenith AT +","ADAS completo","Sunroof eléctrico","Rines 17 pulgadas"] },
      { version:"Vibrant MT", year:2027, precioLista:83990000,  precioPublico:82990000,  features:["Motor 1.6L 121 hp","6 airbags","CarPlay/Android Auto","Rieles de techo","Guardia al suelo 175 mm"] },
      { version:"Vibrant AT", year:2027, precioLista:90990000,  precioPublico:89990000,  features:["Equipamiento Vibrant MT +","Transmisión automática 6 vel"] },
      { version:"Zenith AT",  year:2027, precioLista:97990000,  precioPublico:96990000,  features:["Equipamiento Vibrant AT +","A/C Climatizador","Faros LED","Tapicería en cuero"] },
      { version:"GT Line AT", year:2027, precioLista:108990000, precioPublico:107990000, features:["Equipamiento Zenith AT +","ADAS completo","Sunroof eléctrico"] },
    ]
  },
  {
    id:5, name:"Kia Sonet", year:"2026/2027", category:"SUV", tag:"Gasolina",
    img:"https://cdn.kia.com.co/Nueva_Sonet_Plata029_c9e475c6eb.png",
    description:"SUV compacto con motor 1.5L Smart Stream de 114 hp. 6 airbags de serie, frenos de disco en las 4 ruedas, pantalla táctil 8 pulgadas con CarPlay inalámbrico y Sunroof en versión Zenith.",
    specs:{ "Motor":"1.5L Smart Stream", "Potencia":"114 hp", "Torque":"144 Nm", "Transmisión":"Manual 6 vel / IVT 8 vel", "Combustible":"Gasolina", "Carrocería":"SUV Compacto", "Guard. al suelo":"200 mm", "Baúl":"392 L", "Airbags":"6", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Vibrant MT", year:2026, precioLista:90990000,  precioPublico:89990000,  features:["Motor 1.5L 114 hp y 144 Nm","Transmisión mecánica 6 vel","Rin 16 pulgadas bi-tono","Frenos disco 4 ruedas","HAC + DBC","Llave inteligente","A/C automático","Pantalla 8 pulgadas","6 Parlantes","Espejos eléctricos abatibles"] },
      { version:"Vibrant MT", year:2026, precioLista:91990000,  precioPublico:90990000,  features:["Motor 1.5L 114 hp","Transmisión mecánica 6 vel","6 airbags","A/C automático","Pantalla 8 pulgadas"] },
      { version:"Vibrant AT", year:2026, precioLista:97990000,  precioPublico:96990000,  features:["Equipamiento Vibrant MT +","Transmisión IVT 8 vel"] },
      { version:"Vibrant AT", year:2026, precioLista:98990000,  precioPublico:97990000,  features:["Equipamiento Vibrant MT +","Transmisión IVT 8 vel"] },
      { version:"Zenith AT",  year:2026, precioLista:111990000, precioPublico:110990000, features:["Equipamiento Vibrant AT +","Modos manejo Eco/Sport/Comfort/Smart","Tapicería cuero","Faros LED","DRL LED","Luces traseras LED","Sunroof eléctrico","CC + MSLA","PDW + TPMS"] },
      { version:"Zenith AT",  year:2026, precioLista:112990000, precioPublico:111990000, features:["Equipamiento Vibrant AT +","Modos de manejo","Sunroof eléctrico","Tapicería en cuero","Faros LED"] },
      { version:"Vibrant MT", year:2027, precioLista:91990000,  precioPublico:90990000,  features:["Motor 1.5L 114 hp","Transmisión mecánica 6 vel","6 airbags","Pantalla 8 pulgadas","A/C automático"] },
      { version:"Vibrant AT", year:2027, precioLista:98990000,  precioPublico:97990000,  features:["Equipamiento Vibrant MT +","Transmisión IVT 8 vel"] },
      { version:"Vibrant AT", year:2027, precioLista:99990000,  precioPublico:98990000,  features:["Equipamiento Vibrant MT +","Transmisión IVT 8 vel"] },
      { version:"Zenith AT",  year:2027, precioLista:112990000, precioPublico:111990000, features:["Equipamiento Vibrant AT +","Modos de manejo","Sunroof eléctrico","Tapicería en cuero","Faros LED"] },
      { version:"Zenith AT",  year:2027, precioLista:113990000, precioPublico:112990000, features:["Equipamiento Vibrant AT +","Modos de manejo","Sunroof eléctrico","Tapicería en cuero"] },
    ]
  },
  {
    id:6, name:"Kia Stonic", year:"2026/2027", category:"SUV", tag:"Híbrido",
    img:"https://cdn.kia.com.co/Minuatura_nueva_stonic_b12460b5f8.png",
    description:"SUV urbano con sistema híbrido suave 48V (MHEV). Motor 1.0L Turbo de 120 hp con caja automática DCT de 7 velocidades. Excelente eficiencia sin enchufar.",
    specs:{ "Motor":"1.0L T-GDi + 48V MHEV", "Potencia":"120 hp", "Torque":"172 Nm", "Transmisión":"Manual 6 vel / DCT 7 vel", "Combustible":"Híbrido 48V", "Guard. al suelo":"171 mm", "Baúl":"352 L", "Airbags":"6", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Desire MT",  year:2026, precioLista:92990000,  precioPublico:91990000,  features:["Motor 1.0T + 48V MHEV — 120 hp","Transmisión mecánica 6 vel","6 airbags","CarPlay/Android Auto inalámbrico","A/C automático","Rines 16 pulgadas"] },
      { version:"Desire AT",  year:2026, precioLista:99990000,  precioPublico:98990000,  features:["Motor 1.0T + 48V MHEV — 120 hp","Transmisión DCT 7 vel","6 airbags","CarPlay/Android Auto","A/C automático","Rines 16 pulgadas"] },
      { version:"Vibrant AT", year:2026, precioLista:107990000, precioPublico:106990000, features:["Equipamiento Desire AT +","Tapicería en cuero","Faros LED","DRL LED","Sensores parqueo","Control crucero","Sunroof eléctrico"] },
      { version:"Desire MT",  year:2027, precioLista:93990000,  precioPublico:92990000,  features:["Motor 1.0T 48V MHEV 120 hp","Transmisión mecánica 6 vel","6 airbags","CarPlay/Android Auto"] },
      { version:"Desire AT",  year:2027, precioLista:100990000, precioPublico:99990000,  features:["Motor 1.0T 48V MHEV 120 hp","DCT 7 vel","6 airbags","CarPlay/Android Auto"] },
      { version:"Vibrant AT", year:2027, precioLista:108990000, precioPublico:107990000, features:["Equipamiento Desire AT +","Tapicería en cuero","Faros LED","Sunroof eléctrico"] },
    ]
  },
  {
    id:7, name:"Kia Seltos", year:"2026/2027", category:"SUV", tag:"Gasolina",
    img:"https://cdn.kia.com.co/Seltos_dd569d37c9.png",
    description:"SUV mediano con presencia imponente y tecnología completa. Motor 1.6L en versión Vibrant y Zenith. Pantalla táctil 10.25 pulgadas, control crucero y modos de terreno en Zenith.",
    specs:{ "Motor":"1.6L MPI DOHC", "Potencia":"121 hp", "Torque":"151 Nm", "Transmisión":"Manual 6 vel / Automática 6 vel", "Combustible":"Gasolina", "Carrocería":"SUV Mediano 5 puertas", "Guard. al suelo":"190 mm", "Baúl":"433 L", "Airbags":"6", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Vibrant MT", year:2026, precioLista:111990000, precioPublico:110990000, features:["Motor 1.6L 121 hp","Transmisión mecánica 6 vel","6 airbags","Pantalla 10.25 pulgadas","CarPlay/Android Auto","A/C automático","CC","Rines 17 pulgadas","Faros LED"] },
      { version:"Zenith AT",  year:2026, precioLista:123990000, precioPublico:122990000, features:["Equipamiento Vibrant MT +","Transmisión automática 6 vel","Modos terreno (Normal/Barro/Arena)","Tapicería en cuero","Sunroof panorámico","Cluster 10.25 pulgadas","Asiento conductor eléctrico"] },
      { version:"Vibrant MT", year:2027, precioLista:113990000, precioPublico:112990000, features:["Motor 1.6L 121 hp","Pantalla 10.25 pulgadas","6 airbags","Faros LED","Rines 17 pulgadas"] },
      { version:"Zenith AT",  year:2027, precioLista:125990000, precioPublico:124990000, features:["Equipamiento Vibrant MT +","Transmisión automática 6 vel","Modos de terreno","Tapicería en cuero","Sunroof panorámico"] },
    ]
  },
  {
    id:8, name:"Kia EV3", year:"2025/2026", category:"Eléctrico", tag:"Eléctrico",
    img:"https://cdn.kia.com.co/Foto_para_home_Photoroom_8d33e77119.png",
    description:"World Car of the Year 2025. SUV eléctrico compacto con hasta 555 km de autonomía WLTP. Carga rápida CCS 1, V2L de hasta 3.6 kW y mantenimiento incluido por 3 años o 45.000 km.",
    specs:{ "Motor":"Eléctrico 215 hp (160 kW)", "Torque":"310 Nm", "Autonomía":"Hasta 555 km WLTP", "Carga rápida":"100 kW CCS 1 — 10 a 80% en 35 min", "V2L":"Sí — 3.6 kW", "Transmisión":"Automática 1 vel", "Tracción":"FWD", "Carrocería":"SUV Compacto EV", "Mantenimiento":"3 años o 45.000 km incluido", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Light",   year:2025, precioLista:121990000, precioPublico:120990000, features:["Motor eléctrico 215 hp y 310 Nm","Batería 64.2 kWh — 400 km WLTP","Carga rápida CCS 1 100 kW","Carga AC 11 kW","V2L hasta 3.6 kW","6 airbags + cortina","CarPlay/Android Auto","WALLBOX incluido","Mantenimiento 3 años o 45.000 km"] },
      { version:"Light +", year:2026, precioLista:136990000, precioPublico:135990000, features:["Batería 88.1 kWh — 555 km WLTP","Carga rápida 100 kW CCS 1","V2L incluido","WALLBOX + mantenimiento incluidos"] },
      { version:"Light +", year:2025, precioLista:141990000, precioPublico:140990000, features:["Batería 88.1 kWh — 555 km WLTP","Carga rápida 100 kW","V2L 3.6 kW","WALLBOX + mantenimiento incluidos"] },
    ]
  },
  {
    id:9, name:"Kia Niro Híbrido", year:"2026/2027", category:"Híbrido", tag:"Híbrido",
    img:"https://cdn.kia.com.co/Home_NIRO_c51d7b4bb1.png",
    description:"SUV híbrido completo (HEV) con motor 1.6L GDi + motor eléctrico. 141 hp combinados, transmisión DCT de 6 velocidades y consumo aproximado de 18 a 20 km por litro.",
    specs:{ "Motor gasolina":"1.6L GDi — 105 hp", "Motor eléctrico":"44 hp", "Potencia total":"141 hp combinados", "Transmisión":"DCT 6 vel", "Combustible":"Híbrido HEV", "Baúl":"451 L", "Consumo":"18 – 20 km/litro", "Airbags":"6", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Desire",  year:2026, precioLista:122990000, precioPublico:121990000, features:["Motor 1.6L GDi + eléctrico — 141 hp","DCT 6 vel","Consumo 18-20 km/litro","6 airbags","CarPlay/Android Auto","A/C","Control crucero","Rines aluminio"] },
      { version:"Vibrant", year:2026, precioLista:140990000, precioPublico:139990000, features:["Equipamiento Desire +","Tapicería en cuero","Faros LED","Sunroof panorámico","Sensores parqueo"] },
      { version:"Zenith",  year:2026, precioLista:148990000, precioPublico:147990000, features:["Equipamiento Vibrant +","ADAS completo","Asiento conductor eléctrico","Cargador inalámbrico"] },
      { version:"Desire",  year:2027, precioLista:123990000, precioPublico:122990000, features:["Motor 1.6L HEV — 141 hp","DCT 6 vel","6 airbags","CarPlay/Android Auto","Control crucero"] },
      { version:"Vibrant", year:2027, precioLista:141990000, precioPublico:140990000, features:["Equipamiento Desire +","Tapicería en cuero","Faros LED","Sunroof"] },
      { version:"Zenith",  year:2027, precioLista:149990000, precioPublico:148990000, features:["Equipamiento Vibrant +","ADAS completo","Asiento eléctrico","Cargador inalámbrico"] },
    ]
  },
  {
    id:10, name:"Kia Sportage", year:"2026/2027", category:"SUV", tag:"Gasolina",
    img:"https://cdn.kia.com.co/New_Sportage_Gray_para_miniatura_f2975e922a.png",
    description:"El SUV más icónico de KIA. 4 versiones con 3 motorizaciones: 2.0L MPI, 1.6T gasolina y 1.6T HEV híbrido. Pantalla táctil 12.3 pulgadas curva y baúl de 586L.",
    specs:{ "Motor Desire":"2.0L MPI — 154 hp", "Motor Vibrant":"1.6T — 177 hp", "Motor HEV":"1.6T HEV — 231 hp", "Transmisión":"Automática 6/8 vel", "Combustible":"Gasolina / Híbrido", "Baúl":"586 L", "Airbags":"6", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Desire",      year:2026, precioLista:130990000, precioPublico:129990000, features:["Motor 2.0L MPI 154 hp y 192 Nm","AT 6 vel con modo manual","GPS georeferenciación incluido","Llave inteligente con encendido remoto","CC convencional","Rin 17 pulgadas bi-tono","A/C manual"] },
      { version:"Vibrant",     year:2026, precioLista:145990000, precioPublico:144990000, features:["Equipamiento Desire +","Motor 1.6T 177 hp y 265 Nm","AT 8 vel con levas","Modos manejo Eco/Normal/Sport/My Drive","Sunroof panorámico","Exploradoras LED","A/C bi-zona"] },
      { version:"Vibrant HEV", year:2026, precioLista:156990000, precioPublico:155990000, features:["Equipamiento Vibrant +","Motor 1.6T HEV 231 hp y 367 Nm","BCA incluido"] },
      { version:"Zenith",      year:2026, precioLista:171990000, precioPublico:170990000, features:["Equipamiento Vibrant HEV +","Rines 18 pulgadas","Tapicería en cuero","Asiento eléctrico","Cluster 12.3 pulgadas","Espejo electrocrómico","Cargador inalámbrico","Apertura eléctrica baúl"] },
      { version:"Desire",      year:2027, precioLista:132990000, precioPublico:131990000, features:["Motor 2.0L MPI 154 hp","AT 6 vel","GPS incluido","CC","Rin 17 pulgadas","A/C manual"] },
      { version:"Vibrant",     year:2027, precioLista:147990000, precioPublico:146990000, features:["Equipamiento Desire +","Motor 1.6T 177 hp","AT 8 vel","Modos manejo","Sunroof panorámico","A/C bi-zona"] },
      { version:"Vibrant HEV", year:2027, precioLista:161990000, precioPublico:160990000, features:["Equipamiento Vibrant +","Motor 1.6T HEV 231 hp","BCA incluido"] },
      { version:"Zenith",      year:2027, precioLista:179990000, precioPublico:178990000, features:["Equipamiento Vibrant HEV +","Rines 18 pulgadas","Tapicería cuero","Asiento eléctrico","Cluster 12.3 pulgadas","Cargador inalámbrico"] },
    ]
  },
  {
    id:11, name:"Kia K4", year:"2026", category:"Automóvil", tag:"Gasolina",
    img:"https://cdn.kia.com.co/K4_Gris_Claro_010_355b7547e6.png",
    description:"Sedán compacto premium con diseño futurista. Motor 2.0L 147 hp, pantalla dual curva de 12.3 pulgadas y tecnología ADAS completa.",
    specs:{ "Motor":"2.0L MPI DOHC", "Potencia":"147 hp", "Torque":"179 Nm", "Transmisión":"Automática 6 vel", "Combustible":"Gasolina", "Carrocería":"Sedán 4 puertas", "Baúl":"502 L", "Pantalla":"12.3 pulgadas dual curva + HUD", "Airbags":"6+", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"GT Line", year:2026, precioLista:138990000, precioPublico:137990000, features:["Motor 2.0L 147 hp y 179 Nm","AT 6 vel","Pantalla dual curva 12.3 pulgadas","Cluster digital 12.3 pulgadas","HUD","CarPlay/Android Auto","6 airbags + cortina","ADAS: FCA + LKA + SCC + BCW","A/C bi-zona","Tapicería en cuero","Sunroof panorámico","Faros LED","Rines 17 pulgadas","Asiento eléctrico","Cargador inalámbrico"] },
    ]
  },
  {
    id:12, name:"Kia EV5", year:"2026", category:"Eléctrico", tag:"Eléctrico",
    img:"https://cdn.kia.com.co/Kia_EV_5_lateral_fb7c94e710.png",
    description:"SUV eléctrico mediano para 5 pasajeros. Techo panorámico de serie, V2L de 3.6 kW, hasta 450 km de autonomía y mantenimiento incluido por 3 años.",
    specs:{ "Motor":"Eléctrico 204 hp (150 kW)", "Torque":"255 Nm", "Autonomía":"Hasta 450 km WLTP", "Carga rápida":"100 kW — 10 a 80% en 40 min", "V2L":"Sí — 3.6 kW", "Techo panorámico":"De serie", "Carrocería":"SUV Mediano EV", "Mantenimiento":"3 años o 45.000 km incluido", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Light",      year:2026, precioLista:156990000, precioPublico:155990000, features:["Motor eléctrico 204 hp y 255 Nm","Batería 64.2 kWh","Carga rápida 100 kW","Carga AC 11 kW","V2L 3.6 kW","Techo panorámico de serie","6 airbags + cortina","CarPlay/Android Auto","WALLBOX + mantenimiento incluidos"] },
      { version:"Light Plus", year:2026, precioLista:171990000, precioPublico:170990000, features:["Batería 88.1 kWh — 450 km WLTP","Carga rápida 100 kW","V2L incluido","WALLBOX + mantenimiento incluidos"] },
      { version:"Wind",       year:2026, precioLista:184990000, precioPublico:183990000, features:["Equipamiento Light Plus +","Mayor equipamiento interior premium","ADAS avanzado incluido","WALLBOX + mantenimiento incluidos"] },
    ]
  },
  {
    id:13, name:"Kia Sorento", year:"2027", category:"SUV", tag:"Híbrido",
    img:"https://cdn.kia.com.co/SORENTO_8836ba88a7.png",
    description:"SUV familiar de 7 pasajeros en 3 filas. Motor 1.6T HEV híbrido con 230 hp y tracción AWD. Pantalla dual 12.3 pulgadas, sonido Meridian de 12 parlantes y ADAS completo.",
    specs:{ "Motor HEV":"1.6L T-GDi HEV — 230 hp", "Transmisión":"Automática 6 vel", "Combustible":"Híbrido HEV", "Tracción":"AWD", "Carrocería":"SUV Grande 7 pax", "Pantalla":"12.3 pulgadas + Cluster 12.3", "Sonido":"Meridian 12 parlantes", "Airbags":"7", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Zenith HEV", year:2027, precioLista:231990000, precioPublico:230990000, features:["Motor 1.6T HEV + eléctrico — 230 hp","AT 6 vel","AWD inteligente","7 pasajeros 3 filas","7 airbags","ADAS completo","Pantalla 12.3 pulgadas","Sonido Meridian 12 parlantes","Tapicería en cuero","Sunroof panorámico","Asiento eléctrico","Cargador inalámbrico","Apertura eléctrica baúl"] },
    ]
  },
  {
    id:14, name:"Kia Tasman", year:"2026/2027", category:"Pick-Up", tag:"Diésel",
    img:"https://cdn.kia.com.co/Tasman_pincipal_9272625581.png",
    description:"La primera pick-up de KIA. Motor 2.2L CRDi Turbo Diésel 202 hp con tracción 4WD real, bloqueo de diferencial y carga útil de 900 kg. Arrastre de 3.500 kg.",
    specs:{ "Motor":"2.2L CRDi Turbo Diésel", "Potencia":"202 hp", "Torque":"441 Nm", "Transmisión":"Automática 8 vel", "Combustible":"Diésel", "Tracción":"4WD Hi/Lo + bloqueo diferencial", "Carga útil":"900 kg", "Cap. arrastre":"3.500 kg", "Guard. al suelo":"228 mm", "Airbags":"6", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Desire",  year:2026, precioLista:191990000, precioPublico:190990000, features:["Motor 2.2L CRDi 202 hp y 441 Nm","AT 8 vel","4WD Hi/Lo + bloqueo diferencial","Carga útil 900 kg","Arrastre 3.500 kg","Guardia al suelo 228 mm","6 airbags","Pantalla 12.3 pulgadas","CarPlay/Android Auto","Cámara de reversa"] },
      { version:"Vibrant", year:2026, precioLista:237990000, precioPublico:236990000, features:["Equipamiento Desire +","Tapicería en cuero","Faros LED premium","Sunroof panorámico","Asiento eléctrico","Cargador inalámbrico","ADAS: FCA + LKA + BCA"] },
      { version:"X Line",  year:2026, precioLista:262990000, precioPublico:261990000, features:["Equipamiento Vibrant +","Acabados X Line exclusivos","Rines 18 pulgadas","Paragolpes reforzados","Barras laterales"] },
      { version:"Desire",  year:2027, precioLista:193990000, precioPublico:192990000, features:["Motor 2.2L CRDi 202 hp","AT 8 vel","4WD + bloqueo diferencial","Carga útil 900 kg","Pantalla 12.3 pulgadas","6 airbags"] },
      { version:"Vibrant", year:2027, precioLista:239990000, precioPublico:238990000, features:["Equipamiento Desire +","Tapicería cuero","Sunroof","Asiento eléctrico","ADAS incluido"] },
      { version:"X Line",  year:2027, precioLista:264990000, precioPublico:263990000, features:["Equipamiento Vibrant +","Rines 18 pulgadas","Acabados X Line premium","Paragolpes reforzados"] },
    ]
  },
  {
    id:15, name:"Kia EV6", year:"2025", category:"Eléctrico", tag:"Eléctrico",
    img:"https://cdn.kia.com.co/EV_6_Nueva_version_1_656166bcae.png",
    description:"Crossover eléctrico con arquitectura 800V para carga ultra-rápida. 0 a 100 km/h en 5.1 segundos, autonomía de 528 km WLTP y V2L de 3.6 kW.",
    specs:{ "Motor":"229 hp (168 kW) RWD", "Torque":"350 Nm", "0 a 100":"5.1 seg", "Autonomía":"528 km WLTP", "Batería":"77.4 kWh", "Carga rápida":"800V — 18 min (10 a 80%)", "V2L":"3.6 kW", "Airbags":"7", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"GT Line", year:2025, precioLista:253990000, precioPublico:252990000, features:["Motor eléctrico 229 hp — RWD","350 Nm — 0 a 100 en 5.1 seg","Batería 77.4 kWh — 528 km WLTP","Carga 800V — 18 min (10 a 80%) a 240 kW","Carga AC 11 kW","V2L 3.6 kW","7 airbags","ADAS completo","Pantalla 12 pulgadas + Cluster 12 pulgadas","Tapicería en cuero","Sunroof panorámico","Faros LED Matrix","Rines 19 pulgadas","Asiento eléctrico","Cargador inalámbrico"] },
    ]
  },
  {
    id:16, name:"Kia Carnival Híbrida", year:"2026", category:"Híbrido", tag:"Híbrido",
    img:"https://cdn.kia.com.co/34_deep_chroma_Azul_b75244520a.png",
    description:"Minivan premium de 8 pasajeros con tecnología híbrida HEV. Puertas corredizas eléctricas, sonido Bose de 12 parlantes, pantalla 12.3 pulgadas y 245 hp combinados.",
    specs:{ "Motor gasolina":"1.6L T-GDi — 180 hp", "Motor eléctrico":"90 hp", "Potencia total":"245 hp combinados", "Transmisión":"Automática 6 vel", "Combustible":"Híbrido HEV", "Carrocería":"Minivan 8 pax", "Sonido":"Bose 12 parlantes", "Airbags":"7", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"Zenith HEV", year:2026, precioLista:271990000, precioPublico:270990000, features:["Motor 1.6T + eléctrico — 245 hp","AT 6 vel","8 pasajeros 3 filas","Puertas traseras corredizas eléctricas","7 airbags","Pantalla 12.3 pulgadas","Sonido Bose 12 parlantes","Tapicería en cuero premium","Techo panorámico","ADAS incluido","Asientos 2a fila eléctricos","Cargador inalámbrico","Apertura eléctrica baúl"] },
    ]
  },
  {
    id:17, name:"Kia EV9", year:"2026", category:"Eléctrico", tag:"Eléctrico",
    img:"https://cdn.kia.com.co/Kia_EV_9_general_b926b62dd0.png",
    description:"La cima absoluta de KIA en Colombia. SUV eléctrico de 7 pasajeros con arquitectura 800V, 563 km de autonomía WLTP, sonido Meridian de 14 parlantes y HUD de realidad aumentada.",
    specs:{ "Motor RWD":"160 hp (115 kW)", "Motor AWD":"379 hp (279 kW)", "0 a 100":"5.3 seg (AWD)", "Autonomía":"563 km WLTP (RWD)", "Batería":"99.8 kWh", "Carga rápida":"800V — 24 min (10 a 80%)", "V2L / V2H":"3.68 kW", "Sonido":"Meridian 14 parlantes", "Airbags":"7+", "Garantía":"7 años o 150.000 km" },
    trims:[
      { version:"GT Line", year:2026, precioLista:361990000, precioPublico:360990000, features:["Motor eléctrico RWD 160 hp o AWD 379 hp","0 a 100 en 5.3 seg (AWD)","Batería 99.8 kWh — 563 km WLTP","Carga 800V — 24 min (10 a 80%)","V2L / V2H 3.68 kW","7 pasajeros 3 filas","7 airbags + cortina","ADAS completo","Pantalla 12 pulgadas + Cluster + HUD AR","Sonido Meridian 14 parlantes","Tapicería en cuero premium","Techo solar panorámico","Asientos eléctricos + calefacción","Cargador inalámbrico","Llave digital en smartphone"] },
    ]
  },
];

// ─── HELPERS ──────────────────────────────────────
function fp(n) {
  return "$" + n.toLocaleString("es-CO");
}
function fpShort(n) {
  // Math.floor para nunca redondear hacia arriba ($59.9M no debe mostrar $60M)
  if (n >= 1000000) {
    var m = Math.floor(n / 100000) / 10; // trunca al decimal
    return "$" + (m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)) + "M";
  }
  return fp(n);
}
function getDisplayPrice(v) {
  // Siempre el precio más bajo para atraer al cliente en la card
  var allPrices = v.trims.map(function(t){ return t.precioLista; });
  return Math.min.apply(null, allPrices);
}

// ─── THEME ────────────────────────────────────────
var html = document.documentElement;
document.getElementById("themeToggle").addEventListener("click", function() {
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
});

// ─── RENDER CARDS ─────────────────────────────────
var activeCategory = "Todos";

function renderCards(category) {
  var grid = document.getElementById("vehicleGrid");
  var list = category === "Todos" ? VEHICLES : VEHICLES.filter(function(v){ return v.category === category; });

  grid.innerHTML = list.map(function(v) {
    var isEV = v.tag === "Eléctrico";
    var price = getDisplayPrice(v);
    var priceLabel = isEV ? "Precio público desde" : "Precio lista desde";
    var idx = VEHICLES.findIndex(function(x){ return x.id === v.id; });
    return (
      '<div class="vehicle-card" onclick="openVehicleModal(' + idx + ')">' +
        '<div class="card-tag tag-' + v.tag.replace(/\s/g,"-") + '">' + v.tag + '</div>' +
        '<div class="card-img-wrap">' +
          '<img src="' + v.img + '" alt="' + v.name + '" loading="lazy" onerror="this.style.display=\'none\'"/>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-meta">' + v.category + ' · ' + v.year + '</div>' +
          '<div class="card-name">' + v.name + '</div>' +
          '<div class="card-desc">' + v.description + '</div>' +
          '<div class="card-footer-row">' +
            '<div>' +
              '<div class="card-price-label">' + priceLabel + '</div>' +
              '<div class="card-price">' + fpShort(price) + '</div>' +
            '</div>' +
            '<button class="card-cta">Ver ficha</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }).join("");
}

document.getElementById("filterBar").addEventListener("click", function(e) {
  var btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(function(b){ b.classList.remove("active"); });
  btn.classList.add("active");
  activeCategory = btn.dataset.cat;
  renderCards(activeCategory);
});

renderCards("Todos");

// ─── VEHICLE MODAL ────────────────────────────────
var vehicleModal    = document.getElementById("vehicleModal");
var currentVehicle  = null;

function openVehicleModal(idx) {
  var v     = VEHICLES[idx];
  var isEV  = v.tag === "Eléctrico";
  var price = getDisplayPrice(v);
  currentVehicle = v;

  document.getElementById("mSub").textContent   = v.category + " · " + v.year;
  document.getElementById("mTitle").textContent = v.name;
  document.getElementById("mImg").src           = v.img;
  document.getElementById("mImg").alt           = v.name;
  document.getElementById("mDesc").textContent  = v.description;
  document.getElementById("mPrice").innerHTML   =
    '<span style="font-size:11px;opacity:.6;display:block;margin-bottom:2px">' +
    (isEV ? "Precio público desde" : "Precio lista desde") + '</span>' + fp(price);

  var tagEl = document.getElementById("mTag");
  tagEl.className   = "modal-tag tag-" + v.tag.replace(/\s/g,"-");
  tagEl.textContent = v.tag;

  // ── Specs generales del modelo ──────────────────
  var specsHtml = Object.entries(v.specs).map(function(e) {
    return '<div class="spec-cell"><div class="spec-key">' + e[0] + '</div><div class="spec-val">' + e[1] + '</div></div>';
  }).join("");

  // ── Versiones con características ──────────────
  var trimsHtml = "";
  if (v.trims && v.trims.length) {
    var trimRows = v.trims.map(function(t, ti) {
      var p    = isEV ? t.precioPublico : t.precioLista;
      var bono = t.precioLista - t.precioPublico;
      var bonoHtml = bono > 0
        ? '<span class="trim-bono">Bono ' + fp(bono) + '</span>' : "";

      var featList = "";
      if (t.features && t.features.length) {
        var chips = t.features.map(function(f, fi) {
          return '<li class="' + (fi===0?"chip-base":"") + '">' + f + '</li>';
        }).join("");
        featList = '<div class="trim-feat-title">Equipamiento incluido</div><ul class="trim-chips">' + chips + '</ul>';
      }

      return (
        '<div class="trim-row" onclick="selectTrim(this,' + ti + ',\'' + v.name.replace(/'/g,"\\'") + '\',\'' + t.version.replace(/'/g,"\\'") + '\',' + t.year + ',' + p + ')" data-idx="' + ti + '">' +
          '<div class="trim-row-header">' +
            '<div class="trim-info">' +
              '<span class="trim-version">' + t.version + '</span>' +
              '<span class="trim-year">' + t.year + '</span>' +
            '</div>' +
            '<div class="trim-right">' +
              '<span class="trim-price">' + fp(p) + '</span>' +
              bonoHtml +
              '<span class="trim-chevron">›</span>' +
            '</div>' +
          '</div>' +
          '<div class="trim-features-wrap" id="trim-feat-' + ti + '" style="display:none">' +
            featList +
          '</div>' +
        '</div>'
      );
    }).join("");

    trimsHtml =
      '<div class="trims-section">' +
        '<div class="trims-title">' +
          '<span>Versiones disponibles</span>' +
          '<span class="trims-note">' + (isEV ? "Precio público sugerido" : "Precio lista sugerido") + '</span>' +
        '</div>' +
        '<div class="trims-grid">' + trimRows + '</div>' +
      '</div>';
  }

  document.getElementById("mSpecs").innerHTML = trimsHtml + specsHtml;

  document.getElementById("mWaBtn").onclick = function() {
    openWaWithVehicle(v);
  };

  vehicleModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

// Al tocar una versión: expand/collapse características + resaltar + actualizar WA
function selectTrim(el, trimIdx, modelName, version, year, price) {
  var v        = VEHICLES.find(function(x){ return x.name === modelName; });
  var featWrap = document.getElementById("trim-feat-" + trimIdx);
  var chevron  = el.querySelector(".trim-chevron");
  var isOpen   = featWrap.style.display !== "none";

  // Colapsar todos los demás
  document.querySelectorAll(".trim-features-wrap").forEach(function(w){ w.style.display = "none"; });
  document.querySelectorAll(".trim-chevron").forEach(function(c){ c.textContent = "›"; c.style.transform = ""; });
  document.querySelectorAll(".trim-row").forEach(function(r){ r.classList.remove("trim-selected"); });

  if (!isOpen) {
    featWrap.style.display = "block";
    chevron.textContent = "›";
    chevron.style.transform = "rotate(90deg)";
    el.classList.add("trim-selected");
  }

  // Actualizar botón WA con versión seleccionada
  document.getElementById("mWaBtn").onclick = function() {
    openWaWithVehicle(v, version, year, price);
  };
}

function closeVehicleModal(e) {
  if (e.target === vehicleModal) closeVehicleModalDirect();
}
function closeVehicleModalDirect() {
  vehicleModal.classList.remove("open");
  document.body.style.overflow = "";
}

// ─── WA: con vehículo ─────────────────────────────
function openWaWithVehicle(v, version, year, trimPrice) {
  var msg = buildVehicleWaMsg(v, version, year, trimPrice);
  var container = document.getElementById("waOptions");

  var optHtml = WA_OPTIONS.map(function(o) {
    return '<button class="wa-option" onclick="sendWa(\'' + escapeMsg(o.msg) + '\')">' +
      '<span class="wa-option-icon">' + o.icon + '</span>' +
      '<span>' + o.label + '</span>' +
      '<span class="wa-option-arrow">›</span>' +
    '</button>';
  }).join("");

  container.innerHTML =
    '<button class="wa-option wa-option-highlight" onclick="sendWa(\'' + escapeMsg(msg) + '\')">' +
      '<span class="wa-option-icon">🚗</span>' +
      '<div class="wa-option-text">' +
        '<span class="wa-option-label">Cotizar el ' + v.name + '</span>' +
        '<span class="wa-option-sub">Precio desde ' + fp(getDisplayPrice(v)) + ' · Mensaje pre-armado</span>' +
      '</div>' +
      '<span class="wa-option-arrow">›</span>' +
    '</button>' +
    '<div class="wa-divider">o elige otra consulta</div>' +
    optHtml;

  document.getElementById("waModal").classList.add("open");
  document.body.style.overflow = "hidden";
  vehicleModal.classList.remove("open");
}

// ─── WA: menú general ─────────────────────────────
function openWa(prefillMsg) {
  var container = document.getElementById("waOptions");
  container.innerHTML = WA_OPTIONS.map(function(o) {
    return '<button class="wa-option" onclick="sendWa(\'' + escapeMsg(prefillMsg || o.msg) + '\')">' +
      '<span class="wa-option-icon">' + o.icon + '</span>' +
      '<span>' + o.label + '</span>' +
      '<span class="wa-option-arrow">›</span>' +
    '</button>';
  }).join("");
  document.getElementById("waModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function escapeMsg(msg) {
  return (msg || "").replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g,"\\n");
}

// ─── NOMBRE → WHATSAPP ────────────────────────────
var pendingMsg = "";

function sendWa(msg) {
  pendingMsg = (msg || "").replace(/\\n/g, "\n");
  document.getElementById("waModal").classList.remove("open");
  document.getElementById("nameModal").classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(function() {
    var inp = document.getElementById("nameInput");
    inp.value = ""; inp.focus();
  }, 120);
}

function confirmName(skip) {
  var rawName = document.getElementById("nameInput").value.trim();
  var name    = (!skip && rawName.length > 0) ? rawName : null;
  var finalMsg = pendingMsg;
  if (name) {
    finalMsg = finalMsg
      .replace("¡Hola Gerardo! 👋", "¡Hola Gerardo! 👋 Soy *" + name + "*")
      .replace("¡Hola Gerardo!",    "¡Hola Gerardo! Soy *" + name + "*");
    if (finalMsg.indexOf(name) === -1) {
      finalMsg = "Mi nombre es *" + name + "*.\n\n" + finalMsg;
    }
  }
  closeNameModalDirect();
  window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(finalMsg), "_blank");
}

function closeNameModal(e) {
  if (e.target === document.getElementById("nameModal")) closeNameModalDirect();
}
function closeNameModalDirect() {
  document.getElementById("nameModal").classList.remove("open");
  document.body.style.overflow = "";
  pendingMsg = "";
}
function closeWaModal(e) {
  if (e.target === document.getElementById("waModal")) closeWaModalDirect();
}
function closeWaModalDirect() {
  document.getElementById("waModal").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeVehicleModalDirect();
    closeWaModalDirect();
    closeNameModalDirect();
  }
});
