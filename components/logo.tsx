import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="logo"
      width={320}
      height={320}
      priority={true}
      
    />
  )
}