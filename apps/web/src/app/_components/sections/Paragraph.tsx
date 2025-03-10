import Image from "next/image";
import logo from '../../../../public/cashmere-color.svg'
export function Paragraph() {
    return (
        <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-row items-center jusitfy-between gap-16 w-1/2">
            <Image alt="Logo Cashmere studio" src={logo} />
            <div className="flex flex-col items-start gap-2">
                <h4 className="text-xl font-semibold w-3/4">
                    Cashmere Studio Milano trasforma
                    le tue idee in realtà sonore.
                </h4>
                <p className="text-[#758A9C] text-base font-light">
                    Cashmere Studio è il tuo punto di riferimento per la registrazione e la
                    produzione musicale a Milano.
                </p>
            </div>
        </div>
        </div>
    )
}