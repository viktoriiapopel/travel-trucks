import { Camper } from "@/types/camper";
import css from "./FeaturesTab.module.css";

interface Props {
  camper: Camper;
}

export default function FeaturesTab({ camper }: Props) {
  return (
    <div className={css.tabContent}>
      <ul>
        {camper.AC && <li>AC</li>}
        {camper.bathroom && <li>Bathroom</li>}
        {camper.kitchen && <li>Kitchen</li>}
        {camper.TV && <li>TV</li>}
        {camper.radio && <li>Radio</li>}
        {camper.refrigerator && <li>Refrigerator</li>}
        {camper.microwave && <li>Microwave</li>}
        {camper.gas && <li>Gas</li>}
        {camper.water && <li>Water</li>}
        {camper.transmission && <li>{camper.transmission}</li>}
        {camper.engine && <li>{camper.engine}</li>}
      </ul>
    </div>
  );
}
