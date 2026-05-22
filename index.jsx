import React, { useMemo, useState } from "react";

const materiales = {
  papel: {
    nombre: "Hoja de papel",
    icono: "📄",
    fisicos: ["tijeras"],
    quimicos: ["fuego"],
  },
  manzana: {
    nombre: "Manzana",
    icono: "🍎",
    fisicos: ["tijeras"],
    quimicos: ["oxigeno"],
  },
  platano: {
    nombre: "Plátano",
    icono: "🍌",
    fisicos: ["tijeras"],
    quimicos: ["oxigeno"],
  },
  aguacate: {
    nombre: "Aguacate",
    icono: "🥑",
    fisicos: ["tijeras"],
    quimicos: ["oxigeno"],
  },
  clavo: {
    nombre: "Clavo",
    icono: "🔩",
    fisicos: ["martillo"],
    quimicos: ["oxigeno"],
  },
  llave: {
    nombre: "Llave",
    icono: "🗝️",
    fisicos: ["martillo"],
    quimicos: ["oxigeno"],
  },
  madera: {
    nombre: "Madera",
    icono: "🪵",
    fisicos: ["tijeras"],
    quimicos: ["fuego"],
  },
  vela: {
    nombre: "Vela",
    icono: "🕯️",
    fisicos: ["hielo"],
    quimicos: ["fuego"],
  },
  cerillo: {
    nombre: "Cerillo",
    icono: "🔥",
    fisicos: ["agua"],
    quimicos: ["fuego"],
  },
  agua: {
    nombre: "Agua",
    icono: "💧",
    fisicos: ["frio", "calor"],
    quimicos: [],
  },
  chocolate: {
    nombre: "Chocolate",
    icono: "🍫",
    fisicos: ["calor", "frio"],
    quimicos: [],
  },
  liga: {
    nombre: "Liga",
    icono: "🪢",
    fisicos: ["estirar"],
    quimicos: ["fuego"],
  },
};

const herramientas = {
  tijeras: "✂️",
  fuego: "⚡",
  oxigeno: "🫧",
  martillo: "🔨",
  agua: "🚿",
  frio: "🧊",
  calor: "☀️",
  hielo: "❄️",
  estirar: "↔️",
  vaso: "🥛",
};

export default function SimuladorCientifico() {
  const [material, setMaterial] = useState("papel");
  const [oxigenoActivo, setOxigenoActivo] = useState(true);
  const [herramientaSeleccionada, setHerramientaSeleccionada] = useState(null);
  const [resultado, setResultado] = useState("Selecciona un material y arrastra una herramienta.");
  const [tipoCambio, setTipoCambio] = useState("Sin experimento");
  const [explicacion, setExplicacion] = useState("");
  const [historial, setHistorial] = useState([]);
  const [estadoVisual, setEstadoVisual] = useState("normal");
  const [frutaCortada, setFrutaCortada] = useState(false);

  const materialActual = materiales[material];

  const herramientasDisponibles = useMemo(() => {
    return [...materialActual.fisicos, ...materialActual.quimicos, "vaso"];
  }, [materialActual]);

  const aplicarCambio = (herramienta) => {
    let nuevoResultado = "";
    let nuevoTipo = "";
    let nuevaExplicacion = "";

    if (herramienta === "vaso") {
      setOxigenoActivo(false);
      nuevoResultado = "🥛 El oxígeno fue eliminado del ambiente.";
      nuevoTipo = "Control del ambiente";
      nuevaExplicacion =
        "Sin oxígeno muchas reacciones químicas, como la combustión y oxidación, no pueden ocurrir.";
    }

    if (material === "papel") {
      if (herramienta === "tijeras") {
        nuevoResultado = "📄✂️ El papel fue cortado.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "Solo cambió la forma del papel. No se creó una nueva sustancia.";
      }

      if (herramienta === "fuego") {
        if (oxigenoActivo) {
          nuevoResultado = "📄🔥 El papel se quemó.";
          nuevoTipo = "Cambio químico - combustión";
          nuevaExplicacion =
            "La combustión necesita calor y oxígeno. Se formaron nuevas sustancias como humo y ceniza.";
        } else {
          nuevoResultado = "🚫🔥 El papel no pudo quemarse.";
          nuevoTipo = "Sin combustión";
          nuevaExplicacion =
            "La combustión no ocurre porque no hay oxígeno en el ambiente.";
        }
      }
    }

    if (["manzana", "platano", "aguacate"].includes(material)) {
      if (herramienta === "tijeras") {
        setFrutaCortada(true);
        setEstadoVisual("cortado");
        nuevoResultado = `${materialActual.icono}✂️ El alimento fue cortado.`;
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "Cambió el tamaño y la forma, pero sigue siendo el mismo alimento.";
      }

      if (herramienta === "oxigeno") {
        if (!frutaCortada) {
          nuevoResultado = "✂️ Primero debes cortar el alimento para observar la oxidación.";
          nuevoTipo = "Paso necesario";
          nuevaExplicacion =
            "La oxidación ocurre más fácilmente cuando el interior del alimento entra en contacto con el oxígeno.";
        } else if (oxigenoActivo) {
          setEstadoVisual("oxidado");
          nuevoResultado = `${materialActual.icono}➡️🟤 El alimento se oxidó.`;
          nuevoTipo = "Cambio químico - oxidación";
          nuevaExplicacion =
            "El oxígeno reaccionó con el alimento y cambió su color. Se produjo oxidación.";
        } else {
          nuevoResultado = `${materialActual.icono} permanece fresco.`;
          nuevoTipo = "Sin oxidación";
          nuevaExplicacion =
            "Sin oxígeno la oxidación no puede ocurrir fácilmente.";
        }
      }
    }

    if (["clavo", "llave"].includes(material)) {
      if (herramienta === "martillo") {
        nuevoResultado = `${materialActual.icono}🔨 El objeto metálico cambió de forma.`;
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "Solo cambió la forma del metal. No apareció una nueva sustancia.";
      }

      if (herramienta === "oxigeno") {
        if (oxigenoActivo) {
          nuevoResultado = `${materialActual.icono}➡️🟤 El metal se oxidó.`;
          nuevoTipo = "Cambio químico - oxidación";
          nuevaExplicacion =
            "El metal reaccionó con el oxígeno formando óxido.";
        } else {
          nuevoResultado = `${materialActual.icono} no se oxidó.`;
          nuevoTipo = "Sin oxidación";
          nuevaExplicacion =
            "La oxidación necesita presencia de oxígeno.";
        }
      }
    }

    if (material === "agua") {
      if (herramienta === "frio") {
        nuevoResultado = "💧➡️🧊 El agua se congeló.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "El agua cambió de líquido a sólido, pero sigue siendo agua.";
      }

      if (herramienta === "calor") {
        nuevoResultado = "💧➡️☁️ El agua se evaporó.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "El agua cambió de líquido a vapor.";
      }
    }

    if (material === "chocolate") {
      if (herramienta === "calor") {
        nuevoResultado = "🍫➡️🫠 El chocolate se derritió.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "El chocolate cambió de estado por el calor.";
      }

      if (herramienta === "frio") {
        nuevoResultado = "🍫❄️ El chocolate se endureció.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "El frío hizo que el chocolate cambiara de consistencia.";
      }
    }

    if (material === "vela") {
      if (herramienta === "fuego") {
        if (oxigenoActivo) {
          nuevoResultado = "🕯️🔥 La vela encendió.";
          nuevoTipo = "Cambio químico - combustión";
          nuevaExplicacion =
            "La cera entra en combustión gracias al oxígeno.";
        } else {
          nuevoResultado = "🕯️❌ La vela no pudo encender.";
          nuevoTipo = "Sin combustión";
          nuevaExplicacion =
            "Sin oxígeno el fuego se apaga.";
        }
      }

      if (herramienta === "hielo") {
        nuevoResultado = "🕯️❄️ La vela se endureció por el frío.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "Solo cambió la consistencia de la cera.";
      }
    }

    setResultado(nuevoResultado);
    setTipoCambio(nuevoTipo);
    setExplicacion(nuevaExplicacion);

    if (nuevoResultado) {
      setHistorial((prev) => [
        {
          material: materialActual.nombre,
          herramienta,
          tipo: nuevoTipo,
        },
        ...prev,
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-5xl font-bold text-center text-blue-700 mb-3">
          🔬 Laboratorio Virtual
        </h1>

        <h2 className="text-2xl text-center text-orange-600 mb-8">
          Si se oxida, entonces hay oxígeno
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-3xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-5 text-blue-700">
              🧪 Selecciona un material
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {Object.entries(materiales).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setMaterial(key);
                    setOxigenoActivo(true);
                    setEstadoVisual("normal");
                    setFrutaCortada(false);
                  }}
                  className={`p-4 rounded-2xl text-xl font-bold transition-all ${
                    material === key
                      ? "bg-orange-400 text-white scale-105"
                      : "bg-white hover:bg-orange-100"
                  }`}
                >
                  <div className="text-4xl">{value.icono}</div>
                  {value.nombre}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 rounded-3xl p-6 shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">
              🧫 Mesa de experimentos
            </h3>

            <div className="w-full bg-yellow-100 rounded-3xl border-8 border-yellow-700 min-h-[350px] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xl font-bold bg-white px-4 py-2 rounded-full shadow">
                Oxígeno: {oxigenoActivo ? "🟢 Presente" : "🔴 Ausente"}
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (herramientaSeleccionada) {
                    aplicarCambio(herramientaSeleccionada);
                  }
                }}
                className="text-[120px] transition-all duration-700 flex items-center justify-center w-full h-[180px]"
              >
                {material === "manzana" && estadoVisual === "normal" && "🍎"}
                {material === "manzana" && estadoVisual === "cortado" && "🍎✂️"}
                {material === "manzana" && estadoVisual === "oxidado" && "🍎➡️🟤"}

                {material === "platano" && estadoVisual === "normal" && "🍌"}
                {material === "platano" && estadoVisual === "cortado" && "🍌✂️"}
                {material === "platano" && estadoVisual === "oxidado" && "🍌➡️🟤"}

                {material === "aguacate" && estadoVisual === "normal" && "🥑"}
                {material === "aguacate" && estadoVisual === "cortado" && "🥑✂️"}
                {material === "aguacate" && estadoVisual === "oxidado" && "🥑➡️🟤"}

                {!['manzana','platano','aguacate'].includes(material) && materialActual.icono}
              </div>

              <p className="text-2xl font-bold mt-3 text-center px-4">
                {resultado}
              </p>

              <div className="mt-3 bg-blue-100 px-5 py-2 rounded-full font-bold text-blue-800">
                {tipoCambio}
              </div>

              <p className="mt-4 px-6 text-center text-lg text-gray-700 max-w-xl">
                {explicacion}
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-3xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-5 text-green-700">
              🧰 Herramientas
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {herramientasDisponibles.map((herramienta) => (
                <button
                  key={herramienta}
                  draggable
                  onDragStart={() => setHerramientaSeleccionada(herramienta)}
                  onClick={() => aplicarCambio(herramienta)}
                  className="bg-white rounded-2xl p-4 shadow hover:scale-105 transition-all"
                >
                  <div className="text-5xl text-center">
                    {herramientas[herramienta]}
                  </div>
                  <p className="text-center font-bold mt-2 capitalize">
                    {herramienta}
                  </p>
                </button>
              ))}
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (herramientaSeleccionada) {
                  aplicarCambio(herramientaSeleccionada);
                }
              }}
              className="mt-6 border-4 border-dashed border-green-400 rounded-3xl p-6 text-center bg-white"
            >
              <p className="text-xl font-bold text-green-700">
                Arrastra aquí la herramienta para experimentar
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-6 border-4 border-orange-200 overflow-x-auto">
          <h3 className="text-3xl font-bold text-orange-700 mb-5">
            📊 Tabla comparativa final
          </h3>

          <table className="w-full border-collapse text-lg">
            <thead>
              <tr className="bg-orange-400 text-white">
                <th className="p-4 border">Material</th>
                <th className="p-4 border">Herramienta</th>
                <th className="p-4 border">¿Cambio físico?</th>
                <th className="p-4 border">¿Cambio químico?</th>
                <th className="p-4 border">Explicación</th>
              </tr>
            </thead>

            <tbody>
              {historial.map((item, index) => (
                <tr key={index} className="bg-orange-50">
                  <td className="border p-3">{item.material}</td>
                  <td className="border p-3 capitalize">
                    {item.herramienta}
                  </td>
                  <td className="border p-3 text-center text-2xl">
                    {item.tipo.includes("físico") ? "✅" : "❌"}
                  </td>
                  <td className="border p-3 text-center text-2xl">
                    {item.tipo.includes("químico") ||
                    item.tipo.includes("oxidación") ||
                    item.tipo.includes("combustión")
                      ? "✅"
                      : "❌"}
                  </td>
                  <td className="border p-3">{item.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-6 border-4 border-blue-200 overflow-x-auto">
          <h3 className="text-3xl font-bold text-blue-700 mb-5">
            ⚖️ Diferencias entre cambios físicos y químicos
          </h3>

          <table className="w-full border-collapse text-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-4 border">Aspecto</th>
                <th className="p-4 border">🧊 Cambio físico</th>
                <th className="p-4 border">⚗️ Cambio químico</th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-blue-50">
                <td className="border p-3 font-bold">¿Se forma una nueva sustancia?</td>
                <td className="border p-3">❌ No</td>
                <td className="border p-3">✅ Sí</td>
              </tr>

              <tr className="bg-white">
                <td className="border p-3 font-bold">¿Cambia la forma o el estado?</td>
                <td className="border p-3">✅ Sí</td>
                <td className="border p-3">✅ También puede ocurrir</td>
              </tr>

              <tr className="bg-blue-50">
                <td className="border p-3 font-bold">¿Puede regresar a su estado original?</td>
                <td className="border p-3">✅ Generalmente sí</td>
                <td className="border p-3">❌ Generalmente no</td>
              </tr>

              <tr className="bg-white">
                <td className="border p-3 font-bold">Ejemplos</td>
                <td className="border p-3">Cortar papel, congelar agua, derretir chocolate</td>
                <td className="border p-3">Quemar papel, oxidar frutas, oxidar metales</td>
              </tr>

              <tr className="bg-blue-50">
                <td className="border p-3 font-bold">¿Interviene el oxígeno?</td>
                <td className="border p-3">❌ No siempre</td>
                <td className="border p-3">✅ En oxidación y combustión sí</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-100 rounded-3xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              🔥 Combustión
            </h3>

            <ul className="space-y-2 text-lg">
              <li>✅ Necesita oxígeno</li>
              <li>✅ Produce calor y fuego</li>
              <li>✅ Es un cambio químico</li>
              <li>✅ Forma nuevas sustancias</li>
            </ul>
          </div>

          <div className="bg-orange-100 rounded-3xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">
              🟤 Oxidación
            </h3>

            <ul className="space-y-2 text-lg">
              <li>✅ Ocurre por contacto con oxígeno</li>
              <li>✅ Cambia el color o apariencia</li>
              <li>✅ Es un cambio químico</li>
              <li>✅ Puede suceder lentamente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
