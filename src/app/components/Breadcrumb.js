// src/app/components/Breadcrumb.js
import Link from "next/link";

const Breadcrumb = ({ name }) => {
  return (
    <nav className="max-w-xl md:ml-[40px] ml-[20px] mt-1 md:mt-0 mb-[0px]">
      <Link href="/" className="text-[#004368]">
        Home
      </Link>
      {name && (
        <>
          <span>/</span>
          <Link href={`/pokemon/${name}`} className="text-[#004368]">
            Pokémon
          </Link>
          <span>/</span>
          <span className="text-[#004368]">{name}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
