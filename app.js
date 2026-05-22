const { useMemo, useState } = React;

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
};

const herramientas = {
  tijeras: "✂️",
  fuego: "🔥",
  oxigeno: "🫧",
  martillo: "🔨",
  frio: "🧊",
  calor: "☀️",
  hielo: "❄️",
  vaso: "🥛",
};

function SimuladorCientifico() {
  const [material, setMaterial] = useState("papel");
  const [oxigenoActivo, setOxigenoActivo] = useState(true);
  const [resultado, setResultado] = useState("Selecciona un material.");
  const [tipoCambio, setTipoCambio] = useState("");
  const [explicacion, setExplicacion] = useState("");
  const [historial, setHistorial] = useState([]);

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

      nuevoResultado = "🥛 El oxígeno fue eliminado.";
      nuevoTipo = "Control del ambiente";
      nuevaExplicacion =
        "Sin oxígeno muchas reacciones químicas no ocurren.";
    }

    if (material === "papel") {
      if (herramienta === "tijeras") {
        nuevoResultado = "📄✂️ El papel fue cortado.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "Solo cambió la forma del papel.";
      }

      if (herramienta === "fuego") {
        if (oxigenoActivo) {
          nuevoResultado = "📄🔥 El papel se quemó.";
          nuevoTipo = "Cambio químico";
          nuevaExplicacion =
            "La combustión necesita oxígeno.";
        } else {
          nuevoResultado = "🚫🔥 El papel no pudo quemarse.";
          nuevoTipo = "Sin combustión";
          nuevaExplicacion =
            "No hay oxígeno suficiente.";
        }
      }
    }

    if (material === "agua") {
      if (herramienta === "frio") {
        nuevoResultado = "💧➡️🧊 El agua se congeló.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "Cambió de líquido a sólido.";
      }

      if (herramienta === "calor") {
        nuevoResultado = "💧➡️☁️ El agua se evaporó.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "Cambió de líquido a gas.";
      }
    }

    if (material === "chocolate") {
      if (herramienta === "calor") {
        nuevoResultado = "🍫🫠 El chocolate se derritió.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "El calor cambió su estado.";
      }

      if (herramienta === "frio") {
        nuevoResultado = "🍫❄️ El chocolate se endureció.";
        nuevoTipo = "Cambio físico";
        nuevaExplicacion =
          "El frío cambió su consistencia.";
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
          Cambios físicos y químicos
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-50 rounded-3xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-5 text-blue-700">
              🧪 Materiales
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {Object.entries(materiales).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setMaterial(key);
                    setOxigenoActivo(true);
                  }}
                  className={`p-4 rounded-2xl text-xl font-bold transition-all ${
                    material === key
                      ? "bg-orange-400 text-white"
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
              🧫 Experimento
            </h3>

            <div className="text-[120px] mb-4">
              {materialActual.icono}
            </div>

            <div className="text-xl font-bold mb-3">
              Oxígeno:
              {oxigenoActivo ? " 🟢 Presente" : " 🔴 Ausente"}
            </div>

            <p className="text-2xl font-bold text-center">
              {resultado}
            </p>

            <div className="mt-3 bg-blue-100 px-5 py-2 rounded-full font-bold text-blue-800">
              {tipoCambio}
            </div>

            <p className="mt-4 text-center text-lg text-gray-700">
              {explicacion}
            </p>
          </div>

          <div className="bg-green-50 rounded-3xl p-6 shadow-lg">

            <h3 className="text-2xl font-bold mb-5 text-green-700">
              🧰 Herramientas
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {herramientasDisponibles.map((herramienta) => (
                <button
                  key={herramienta}
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
          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-6 border-4 border-orange-200 overflow-x-auto">

          <h3 className="text-3xl font-bold text-orange-700 mb-5">
            📊 Historial
          </h3>

          <table className="w-full border-collapse text-lg">

            <thead>
              <tr className="bg-orange-400 text-white">
                <th className="p-4 border">Material</th>
                <th className="p-4 border">Herramienta</th>
                <th className="p-4 border">Tipo</th>
              </tr>
            </thead>

            <tbody>
              {historial.map((item, index) => (
                <tr key={index} className="bg-orange-50">
                  <td className="border p-3">{item.material}</td>
                  <td className="border p-3">{item.herramienta}</td>
                  <td className="border p-3">{item.tipo}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SimuladorCientifico />);
