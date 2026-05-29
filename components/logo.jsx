import react from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="absolute right-20 top-10 z-50 p-2 bg-transparent rounded-full ">
      <Image
        src="/erxes-logo.png"
        alt="Logo"
        width={200}
        height={200}
        className="object-cover brightness-0 invert opacity-70"
      />
    </div>
  );
}
