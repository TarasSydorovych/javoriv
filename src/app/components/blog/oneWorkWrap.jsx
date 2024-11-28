import Link from "next/link";
import styles from "./works.module.css";

export default function OneWorkWrap({ work, lng }) {
  return (
    <div className={styles.workItem}>
      <Link href={`/works/${work._id}`}>
        {work.photos.length > 0 && (
          <img
            src={work.photos[0]}
            alt={work.translations[lng].title}
            className={styles.workImage}
          />
        )}
        <h2>{work.translations[lng].title}</h2>
        <p>{work.translations[lng].shortDescription}</p>
      </Link>
    </div>
  );
}
