import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import '../style/global/global.scss'
import NoSupport from "@/component/noSupport";
export default function Home() {


  return (
    <div className="home">
      <NoSupport/>
      {/* Home
      <Link href="/about">About</Link> */}
    </div>
  );
}
