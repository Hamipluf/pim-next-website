import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import Header from "../header";
import Footer from "../footer";

function Index() {
  const [medicData, setMedicData] = useState({
    matricula: undefined,
    email: undefined,
    telefono: undefined,
  });
  const [successResponse, setSuccessResponse] = useState();
  const [errorClient, setErrorClient] = useState();
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookie = getCookie("medicData");

  useEffect(() => {
    if (cookie) {
      const splitCookie = cookie.split(",");
      const matriculaCookie = splitCookie[1].split('"');
      if (matriculaCookie) {
        const valueMatricula = matriculaCookie[3];
        setMedicData((prevData) => ({
          ...prevData,
          matricula: valueMatricula,
        }));
      }
    }
  }, [cookie]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de dato
    if (!medicData.matricula || medicData.matricula.trim() === "") {
      setErrorClient("El número de matrícula es obligatorio.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/medicos/create", medicData);
      setSuccessResponse(
        `Bienvenido ${response.data.medic.email}, serás redirigido hacia el SIM`
      );
      setTimeout(() => {
        window.location.assign("http://puertoimagenes.ddns.net:10001");
      }, 3000);
    } catch (err) {
      if (!err.response?.data.status) {
        setToggleVisibility(true);
        setErrorClient(err.response?.data.error);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className="hero  bg-lightpim">
        <div className="hero-content flex-col  m-10 ">
          {loading && (
            <div className="bg-mainpim px-4 py-2 rounded-md">
              <p className="text-lg text-lightpim">Verificando Datos...</p>
            </div>
          )}
          {errorClient && (
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>

              <span className="m-auto">{errorClient}</span>
            </div>
          )}
          {successResponse && (
            <div className="alert alert-success ">
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

              <span className="text-center">{successResponse}</span>
            </div>
          )}
          <form className="form-control mt-4" onSubmit={(e) => handleSubmit(e)}>
            <label className="input-group input-group-vertical mb-4">
              <span>
                N° Matricula <span className="text-error">*</span>
              </span>
              <input
                type="number"
                placeholder="Matricula"
                value={medicData.matricula}
                required
                className="input input-bordered lg:input-group-lg"
                onChange={(e) => {
                  setMedicData((prevData) => ({
                    ...prevData,
                    matricula: e.target.value,
                  }));
                  setErrorClient(undefined);
                }}
              />
            </label>
            {toggleVisibility && (
              <>
                <label className={`input-group input-group-vertical my-5`}>
                  <span>
                    Email <span className="text-error">*</span>
                  </span>
                  <input
                    type="email"
                    placeholder="medico@example.com"
                    className="input input-bordered lg:input-group-lg"
                    onChange={(e) => {
                      setMedicData((prevData) => ({
                        ...prevData,
                        email: e.target.value,
                      }));
                      setErrorClient(undefined);
                    }}
                  />
                </label>
                <label className={`input-group input-group-vertical my-5`}>
                  <span>
                    Telefono <span className="text-error">*</span>
                  </span>
                  <input
                    type="tel"
                    placeholder="+541115474882"
                    className="input input-bordered lg:input-group-lg"
                    onChange={(e) => {
                      setMedicData((prevData) => ({
                        ...prevData,
                        telefono: e.target.value,
                      }));
                      setErrorClient(undefined);
                    }}
                  />
                </label>
              </>
            )}
            <button type="submit" className="btn bg-[#6daad1] w-full">
              Send
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;

// SUCCSES

// ERROR
