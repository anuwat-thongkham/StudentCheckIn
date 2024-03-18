import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      Home
      <Link href="/about">About</Link>
    </div>
  );
}
