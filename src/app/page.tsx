import page from "./page.module.css"
import Image from "next/image"; 
import { BusFront } from 'lucide-react';
import HomeComponent from "./component/HomeComponent";
export default function Home() {
  return <div className={page.outer}>
        <HomeComponent />
      
      </div>
}
