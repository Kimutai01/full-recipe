import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Vegie = () => {
  const [vegie, setVegie] = useState([]);
  useEffect(() => {
    getVegie();
  }, []);
  const getVegie = async () => {
    const check = localStorage.getItem("vegie");

    if (check) {
      setVegie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("vegie", JSON.stringify(data.recipes));
      setVegie(data.recipes);
    }
  };
  return (
    <div>
      <div>
        <Wrapper>
          <h3>Our vegeterian picks</h3>
          <Splide
            options={{
              perPage: 3,
              arrows: false,
              pagination: false,
              drag: "free",
              gap: "5rem",
            }}
          >
            {vegie.map((recipe) => (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Card>
              </SplideSlide>
            ))}
          </Splide>
        </Wrapper>
      </div>
    </div>
  );
};
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    color: white;
    text-align: center;
    font-size: 1rem;
    font - weight: 600;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
`;

const Gradient = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Vegie;
