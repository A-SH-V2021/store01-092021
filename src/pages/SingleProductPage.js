import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/user_context";

const SingleProductPage = () => {
  const { id } = useParams();
  // const history = useHistory();
  const {
    fetchSingleProduct,
    single_pro_loading,
    single_pro_error,
    single_product,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  // useEffect(() => {
  //   console.log(single_pro_error);
  //   if (single_pro_error) {
  //     setTimeout(() => {
  //       history.push("/");
  //     }, 3000);
  //   }
  // }, [single_pro_error]);

  if (single_pro_loading) {
    return <Loading />;
  }

  if (single_pro_error) {
    return <Error />;
  }
  const {
    id: sku,
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    company,
    images,
  } = single_product;

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back product
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{price / 100}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>avilable: </span>
              {stock > 0 ? "in stock" : "out of stock"}
            </p>
            <p className="info">
              <span>sku: </span>
              {sku}
            </p>
            <p className="info">
              <span>company: </span>
              {company}
            </p>
            {stock > 0 && <AddToCart />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
