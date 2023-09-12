import Link from "next/link";

export default function Drawerside() {
  return (
    <div className="w-screen drawer-side ">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="gap-2 p-4 overflow-y-auto menu w-[80%] bg-base-100">
        <li className="mb-8">
          <picture className="inline-block bg-logoSmall w-[100px] h-[60px] bg-contain bg-no-repeat " />
        </li>
        <li>
          <Link href="/instituto">Instituto</Link>
        </li>
        <li>
          <Link href="/estudios">Estudios</Link>
          <ul className="">
            <li>
              <Link href="/radiologia">Radiología</Link>
            </li>
            <li>
              <Link href="/resonancia">Resonancias</Link>
            </li>
            <li>
              <Link href="/ecografia">Ecografías</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/contacto#turnos">Turnos</Link>
        </li>
        <li>
          <Link href="/contacto">Contáctenos</Link>
        </li>
        <li className="flex items-center justify-center text-[15px] font-bold leading-tight uppercase rounded-lg btn bg-mainpim btn-block mt-9">
          <a
            href="https://wa.me/5492233489143?text=Quisiera%20pedir%20un%20turno"
            target="_blank"
            rel="noreferrer"
          >
            Sacar Turno
          </a>
        </li>
        <li className="flex items-center justify-center text-[15px] font-bold leading-tight uppercase rounded-lg btn bg-secpim btn-block text-mainpim hover:text-[#fff] border-none">
          <a href="/login-medicos">Acceso Profesionales</a>
        </li>
      </ul>
    </div>
  );
}
