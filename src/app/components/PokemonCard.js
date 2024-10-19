import Link from "next/link";
import Image from "next/image";

export default function PokemonCard({ name, image }) {
  return (
    <>
      <div className="flex justify-center p-8">
        <div className="w-[90%]  bg-white shadow-xl rounded-lg">
          <div className="flex justify-center bg-[#FFFFFF]">
            <Image
              src={image}
              alt={name}
              width={60}
              height={60}
              priority
              className="img-size"
            />
          </div>
          <div className="flex flex-col p-6 border-t  bg-[#FAFAFA]">
            <div className="flex flex-col h-full">
              <div className="flex-1 mb-[40%]">
                <p className="text-2xl text-[#133950]">
                  <strong>{name}</strong>
                </p>
              </div>

              <div className="flex-1">
                <p className=" text-[#5D9ABF]">
                  <span className="flex items-start justify-start p-3">
                    <Link href={`/pokemon/${name}`}>
                      <strong>Details</strong>
                    </Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-arrow-right"
                    >
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <polyline points="18 15 21 12 18 9"></polyline>
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
