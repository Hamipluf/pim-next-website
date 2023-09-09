import React, { useState } from "react";
import axios from "axios";

function index() {
  const [medicData, setMedicData] = useState({
    matricula: undefined,
    email: undefined,
    telefono: undefined,
  });
  const [succsesResponse, setSuccsesResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const [toggleVisibility, settoggleVisibility] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/medicos/create", medicData)
      .then((res) => {
        console.log(res.data);
        setMedicData(res.data.medic);
        console.log(medicData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="hero min-h-screen bg-lightpim">
        <div className="hero-content">
          <div className="max-w-md">
            {errorResponse && (
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="m-auto">{errorResponse}</span>
              </div>
            )}
            {succsesResponse && (
              <div className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="m-auto">{succsesResponse}</span>
              </div>
            )}
            <h1 className="text-5xl mx-5 font-bold">
              Bienvenido a puertoimagenes
            </h1>
            <p className="py-6 mx-5">Porfavor rellene los siguientes campos</p>
            <button onClick={() => settoggleVisibility(!toggleVisibility)}>
              Toglle
            </button>
            <form
              className="form-control h-96"
              onSubmit={(e) => handleSubmit(e)}
            >
              <label className="input-group input-group-vertical m-5">
                <span>
                  N° Matricula <span className="text-error">*</span>
                </span>
                <input
                  type="text"
                  placeholder="Matricula"
                  required
                  className="input input-bordered"
                  onChange={(e) =>
                    setMedicData({ ...medicData, matricula: e.target.value })
                  }
                />
              </label>
              {/* Si no encuentra al medico guarado en la DB se muestran los campos para recoleccion de datos */}
              {toggleVisibility && (
                <>
                  <label className={`input-group input-group-vertical m-5 `}>
                    <span>
                      Email <span className="text-error">*</span>
                    </span>
                    <input
                      type="email"
                      placeholder="medico@example.com"
                      className={`input input-bordered `}
                      onChange={(e) =>
                        setMedicData({ ...medicData, email: e.target.value })
                      }
                    />
                  </label>
                  <label className={`input-group input-group-vertical m-5 `}>
                    <span>
                      Telefono <span className="text-error">*</span>
                    </span>
                    <input
                      type="tel"
                      placeholder="+54 11 15474882"
                      className={`input input-bordered `}
                      onChange={(e) =>
                        setMedicData({ ...medicData, telefono: e.target.value })
                      }
                    />
                  </label>
                </>
              )}
              {medicData && (
                <>
                  <h2 className="text-xl font-bold text-mainpim">
                    Matricula:{" "}
                    <span className="text-[#000]">{medicData.matricula}</span>
                  </h2>
                  <h3 className="text-lg font-semibold text-mainpim">
                    Email: <span className="text-[#000]">{medicData.email}</span>
                  </h3>
                  <h3 className="text-lg font-semibold text-mainpim">
                    Telefono:{" "}
                    <span className="text-[#000]">{medicData.telefono}</span>
                  </h3>
                </>
              )}
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
