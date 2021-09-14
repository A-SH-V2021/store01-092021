import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ products }) => {
  const { id, colors, stock } = products;
  const [mainColor, setMainColor] = useState(colors[0]);
  let [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((old) => {
      let tempAmount = old + 1;
      if (tempAmount < stock) {
        return tempAmount;
      } else {
        return stock;
      }
    });
  };

  const decrease = () => {
    setAmount((old) => {
      let tempAmount = old - 1;
      if (tempAmount > 1) {
        return tempAmount;
      } else {
        return 1;
      }
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors :</span>
        <div className="">
          {colors.map((color, idx) => {
            return (
              <button
                key={idx}
                className={
                  mainColor === color ? "color-btn active" : "color-btn"
                }
                style={{ backgroundColor: color }}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-containe">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link to="/cart" className="btn">
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
