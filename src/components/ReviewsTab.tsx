import { Camper } from "@/types/camper";
import css from "./ReviewsTab.module.css";

interface Props {
  camper: Camper;
}

export default function ReviewsTab({ camper }: Props) {
  return (
    <div className={css.tabContent}>
      {camper.reviews?.map((review, index) => (
        <div key={index} className={css.reviewItem}>
          <p><strong>{review.reviewer_name}</strong></p>
          <p>⭐ {review.reviewer_rating}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
