import React, { useState } from "react";
import axios from "axios";

function index() {
  const [medicData, setMedicData] = useState({
    matricula: undefined,
    email: undefined,
    telefono: undefined,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/medicos/create", medicData);
    data
      ? console.log("Datos guardados con exito", data)
      : console.log("ERROR", data);
  };

  return (
    <>
      <div className="hero min-h-screen bg-lightpim">
        <div className="hero-content">
          <div className="max-w-md ">
            <h1 className="text-5xl mx-5 font-bold">
              Bienvenido a puertoimagenes
            </h1>
            <p className="py-6 mx-5">Porfavor rellene los siguientes campos</p>
            <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
              <label className="input-group input-group-vertical m-5">
                <span>
                  N° Matricula <span className="text-error">*</span>
                </span>
                <input
                  type="text"
                  placeholder="Matricula"
                  onChange={(e) =>
                    setMedicData({ ...medicData, matricula: e.target.value })
                  }
                  required
                  className="input input-bordered"
                />
              </label>
              <label className="input-group input-group-vertical m-5">
                <span>
                  Email <span className="text-error">*</span>
                </span>
                <input
                  type="email"
                  placeholder="medico@example.com"
                  onChange={(e) =>
                    setMedicData({ ...medicData, email: e.target.value })
                  }
                  required
                  className="input input-bordered"
                />
              </label>
              <label className="input-group input-group-vertical m-5">
                <span>
                  Telefono <span className="text-error">*</span>
                </span>
                <input
                  type="tel"
                  placeholder="+54 11 15474882"
                  onChange={(e) =>
                    setMedicData({ ...medicData, telefono: e.target.value })
                  }
                  required
                  className="input input-bordered"
                />
              </label>
              <button type="submit" className="btn bg-[#6daad1] w-full m-5">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
