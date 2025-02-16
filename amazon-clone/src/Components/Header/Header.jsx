import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import styles from "./Header.module.css";
import LowerHeader from "./LowerHeader";
function Header() {
  return (
    <>
      <section>
        <div className={styles.header_container}>
          {/* Logo Section*/}
          <div className={styles.logo_container}>
            <a href="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </a>
            {/* delivery */}
            <span>
              <SlLocationPin />
            </span>
            <div className={styles.delivery}>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
          <div className={styles.search}>
            {/* search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="search product" />
            <BsSearch size={39} />
          </div>
          <div className={styles.order_container}>
            {/* right side  */}
            <a href="" className={styles.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/255px-Flag_of_the_United_States_%28Pantone%29.svg.png"
                alt="USA flag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>
            <a href="">
              <p>Sign In</p>
              <span>Account and Lists</span>
            </a>
            {/* orders */}
            <a href="">
              <p>returns</p>
              <span>& Orders</span>
            </a>
            {/* cart */}
            <a href="" className={styles.cart}>
              <BiCart size={35} />
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
