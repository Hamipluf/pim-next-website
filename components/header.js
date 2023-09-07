import { useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";

export default function Header() {
  const [status, setStatus] = useState("iddle");
  const myModal = useRef(null);

  const Userdata = async (event) => {
    event.preventDefault();
    setStatus("sending");

    let userdata = {
      asunto: event.target.asunto.value,
      name: event.target.name.value,
      mail: event.target.email.value,
      message: event.target.message.value,
    };

    axios
      .post("/api/email", {
        body: userdata,
      })
      .then(
        (onfulfilled) => {
          console.log("Response succeeded!");
          console.log(onfulfilled);
          setStatus("sent");
          // myModal.current.classList.remove('modal-open')
        },
        (onrejected) => {
          console.log("Response failed with err -> : ");
          console.log(onrejected);
          setStatus("error");
        }
      )
      .catch((onerror) => {
        console.log("Response failed with err -> : ");
        console.log(onerror);
        setStatus("error");
      });
  };

  return (
    <>
      <div className="flex flex-row navbar-end bg-[#ecece7] w-full p-6 lg:p-8 text-sm font-light">
        {/* nav contact */}
        <nav className="w-full md:w-auto">
          <ul className="flex flex-row items-center justify-end gap-4 text-xs lg:gap-10 ">
            <div className="flex flex-col gap-1 mr-auto w-min sm:hidden">
              <a href="tel:+5492235681552" className="flex items-center gap-2">
                <picture className="flex bg-phone w-[1rem] h-[1rem] bg-contain bg-no-repeat" />
                <span className="font-light">223 56 81 552</span>
              </a>
              <label
                htmlFor="my-modal"
                className="transition duration-150 ease-in-out cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                contacto@puertoimagenes.com.ar
              </label>

              {/* <!-- Modal --> */}
              <input
                type="checkbox"
                ref={myModal}
                id="my-modal"
                className="modal-toggle"
              />
              <label
                htmlFor="my-modal"
                className="cursor-pointer modal modal-middle"
              >
                <label className="relative modal-box" htmlFor="">
                  {status === "sent" ? (
                    <div className="flex flex-col items-center justify-center">
                      {/* confirmation svg */}
                      <div className="w4rAnimated_checkmark">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 130.2 130.2"
                        >
                          <circle
                            className="path circle"
                            fill="none"
                            stroke="#73AF55"
                            strokeWidth="6"
                            strokeMiterlimit="10"
                            cx="65.1"
                            cy="65.1"
                            r="62.1"
                          />
                          <polyline
                            className="path check"
                            fill="none"
                            stroke="#73AF55"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            points="100.2,40.2 51.5,88.8 29.8,67.5 "
                          />
                        </svg>
                      </div>
                      <h1 className="text-2xl font-bold text-center">
                        Mensaje enviado!
                      </h1>
                    </div>
                  ) : (
                    <form
                      className="flex flex-col items-center"
                      onSubmit={(ev) => Userdata(ev)}
                    >
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor="name"
                          className="text-2xl font-bold leading-tight text-center sm:text-2xl text-[#fff]"
                        >
                          Nombre Completo
                        </label>
                        <input
                          required
                          className="text-base w-full p-3 rounded-lg placeholder:text-mainpim placeholder:font-light font-light text-mainpim bg-[#ecece7]"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Nombre completo*"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor="email"
                          className="text-2xl font-bold leading-tight text-center sm:text-2xl text-[#fff]"
                        >
                          E-mail
                        </label>
                        <input
                          required
                          className="text-base w-full p-3 rounded-lg placeholder:text-mainpim placeholder:font-light font-light text-mainpim bg-[#ecece7]"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="E-mail*"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor="asunto"
                          className="text-2xl font-bold leading-tight text-center sm:text-2xl text-[#fff]"
                        >
                          Asunto
                        </label>
                        <input
                          required
                          className="text-base w-full p-3 rounded-lg placeholder:text-mainpim placeholder:font-light font-light text-mainpim bg-[#ecece7]"
                          type="text"
                          name="asunto"
                          id="asunto"
                          placeholder="Asunto*"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor="message"
                          className="text-2xl font-bold leading-tight text-center sm:text-2xl text-[#fff]"
                        >
                          Mensaje
                        </label>
                        <textarea
                          className="text-base w-full p-3 bg-[#ecece7] placeholder:text-mainpim placeholder:font-light font-light text-mainpim rounded-lg min-h-[8rem]"
                          name="message"
                          id="message"
                          placeholder="Mensaje*"
                        />
                      </div>
                      <div className="flex flex-row items-center justify-end w-full ">
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="flex items-center text-[14px] font-bold leading-none uppercase rounded-lg lg:min-h-14 btn bg-mainpim border-none my-4 disabled:text-[#999] disabled:loading"
                        >
                          Enviar Consulta
                        </button>
                      </div>
                      {status === "error" && (
                        <div className="flex flex-col items-center justify-center w-full bg-[#f87171] rounded-lg ">
                          <h1 className="text-2xl font-bold leading-tight text-center sm:text-2xl text-mainpim">
                            Ha ocurrido un error, por favor intente nuevamente.
                          </h1>
                        </div>
                      )}
                    </form>
                  )}
                </label>
              </label>
            </div>
            <li className="hidden sm:flex">
              <a href="tel:+5492235681552" className="flex items-center gap-2">
                <picture className="flex bg-phone w-[1rem] h-[1rem] bg-contain bg-no-repeat" />
                <span className="font-light">223 56 81 552</span>
              </a>
            </li>
            <li className="hidden sm:flex">
              <Link href="/contacto">contacto@puertoimagenes.com.ar</Link>
            </li>
            <li className="flex flex-row items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100083433698226"
                target="_blank"
                rel="noreferrer"
              >
                <picture className="flex bg-f w-[1rem] h-[1rem] bg-contain bg-no-repeat" />
              </a>
              <a
                href="https://www.instagram.com/puertoimagenes/"
                target="_blank"
                rel="noreferrer"
              >
                <picture className="flex bg-i w-[1.25rem] h-[1.25rem] leading-2 bg-contain bg-no-repeat mt-1" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <header className="flex items-center justify-between w-full p-4 font-bold lg:p-6 lg:flex-row">
        {/* logo */}
        <Link href="/">
          <picture className="cursor-pointer inline-block bg-logoSmall w-[100px] h-[60px] bg-contain bg-no-repeat sm:bg-logoLarge sm:w-[364.5px] sm:h-[56.7px]" />
        </Link>
        {/* hamburguer */}
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        {/* nav desktop */}
        <nav className="items-center hidden text-lg lg:flex">
          <ul className="flex justify-between gap-2 mr-2 xl:gap-4 xl:mr-4 ">
            <li className="flex items-center lg:w-[106px] xl:w-[136px] text-[15px] font-bold leading-tight capitalize rounded-lg lg:min-h-16 btn btn-ghost">
              <Link href="/instituto">Instituto</Link>
            </li>
            <li className="flex items-center lg:w-[106px] xl:w-[136px] text-[15px] font-bold leading-tight capitalize rounded-lg lg:min-h-16 btn btn-ghost">
              <Link href="/estudios">Estudios</Link>
            </li>
            <li className="flex items-center lg:w-[106px] xl:w-[136px] text-[15px] font-bold leading-tight capitalize rounded-lg lg:min-h-16 btn btn-ghost">
              <Link href="/contacto#turnos">Turnos</Link>
            </li>
            <li className="flex items-center lg:w-[106px] xl:w-[136px] text-[15px] font-bold leading-tight capitalize rounded-lg lg:min-h-16 btn btn-ghost">
              <Link href="/contacto">Contáctenos</Link>
            </li>
          </ul>
          <ul className="flex justify-between lg:mr-3 lg:gap-6">
            <li className="flex items-center lg:w-[106px] xl:w-[136px] text-[14px] font-bold leading-none uppercase rounded-lg lg:min-h-14 btn bg-primpim border-none btn-block">
              <a
                href="https://wa.me/5492233549036?text=Quisiera%20pedir%20un%20turno"
                target="_blank"
                rel="noreferrer"
              >
                Sacar Turno
              </a>
            </li>
            <li className="flex items-center lg:w-[106px] xl:w-[136px] text-[14px] font-bold leading-none uppercase rounded-lg lg:min-h-14 btn bg-mainpim border-none btn-block">
              <a href="/login-medicos" rel="noreferrer">
                Acceso Profecionales
              </a>
              {/* <a href="http://puertoimagenes.ddns.net:10001" target="_blank" rel="noreferrer">
                Acceso Profesionales
            </a> */}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
