import React from "react";
import { catagoryInfos } from "./catagoryFullInfos";
import CategoryCard from "./CategoryCard";
import styles from "./Category.module.css";
function Category() {
  return (
    <section className={styles.category_container}>
      {catagoryInfos.map((infos) => (
        <CategoryCard data={infos} />
      ))}
    </section>
  );
}

export default Category;
